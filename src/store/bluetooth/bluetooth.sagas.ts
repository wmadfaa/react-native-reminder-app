import { eventChannel, buffers } from 'redux-saga';
import { Platform, PermissionsAndroid } from 'react-native';
import { call, take, cancelled, actionChannel, put, race, cancel, fork } from 'redux-saga/effects';
import { BleManager, ScanOptions, Device, State, Service, Characteristic } from 'react-native-ble-plx';

import { BluetoothActionTypes, ConnectionState } from './bluetooth.types';
import * as actions from './bluetooth.actions';

interface IScanOptions {
  UUIDs?: string[] | null;
  options?: ScanOptions | null;
  localDeviceName?: string | null;
}

interface IDeviceScanChanelOptions extends IScanOptions {
  manager: BleManager;
}

export interface SensorTagTestMetadata {
  id: string;
  title: string;
  execute: (device: Device) => Generator;
}

function* readAllCharacteristics(device: Device) {
  try {
    const services: Service[] = yield call([device, device.services]);
    for (const service of services) {
      yield put(actions.log(`Found service: ${service.uuid}`));
      const characteristics: Characteristic[] = yield call([service, service.characteristics]);
      for (const characteristic of characteristics) {
        if (characteristic.uuid === '00002a02-0000-1000-8000-00805f9b34fb') continue;

        if (characteristic.isReadable) {
          var c = yield call([characteristic, characteristic.read]);
          if (characteristic.isWritableWithResponse) {
            yield call([characteristic, characteristic.writeWithResponse], c.value);
          }
        }
      }
    }
  } catch (err) {
    yield put(actions.logError(err));
    return false;
  }
  return true;
}

function* readTemperature() {
  yield put(actions.log('Read temperature'));
  return false;
}

export const SensorTagTests: { [key: string]: SensorTagTestMetadata } = {
  READ_ALL_CHARACTERISTICS: {
    id: 'READ_ALL_CHARACTERISTICS',
    title: 'Read all characteristics',
    execute: readAllCharacteristics,
  },
  READ_TEMPERATURE: {
    id: 'READ_TEMPERATURE',
    title: 'Read temperature',
    execute: readTemperature,
  },
};

function* executeTest(device: Device, test: ReturnType<typeof actions.executeTest>) {
  yield put(actions.log(`Executing test: ${test.payload.id}`));
  const start = Date.now();
  const result = yield call(SensorTagTests[test.payload.id].execute, device);
  if (result) {
    yield put(actions.log(`Test finished successfully! ( ${Date.now() - start}  ms)`));
  } else {
    yield put(actions.log(`Test failed! ( ${Date.now() - start}  ms)`));
  }
  yield put(actions.testFinished());
}

const DeviceScanChanel = (config: IDeviceScanChanelOptions) => {
  const { manager, ...scanOptions } = config;

  const { UUIDs, options, localDeviceName }: IScanOptions = {
    UUIDs: null,
    options: { allowDuplicates: true },
    // localDeviceName: 'SensorTag',
    ...scanOptions,
  };

  return eventChannel(emit => {
    manager.startDeviceScan(UUIDs, options, (error, scannedDevice) => {
      if (error) {
        emit([error, scannedDevice]);
        return;
      }
      if (scannedDevice != null && scannedDevice.localName === localDeviceName) {
        emit([error, scannedDevice]);
      }
    });
    return () => {
      manager.stopDeviceScan();
    };
  }, buffers.expanding(1));
};

const StateChannel = (manager: BleManager) => {
  return eventChannel(emit => {
    const subscription = manager.onStateChange(state => {
      emit(state);
    }, true);
    return () => {
      subscription.remove();
    };
  }, buffers.expanding(1));
};

const DisconnectChannel = (device: Device) => {
  return eventChannel(emit => {
    const subscription = device.onDisconnected(error => {
      emit({ type: 'DISCONNECTED', error });
    });
    return () => {
      subscription.remove();
    };
  }, buffers.expanding(1));
};

const checkAndroidPermissions = () => {
  return new Promise<true>(async (res, rej) => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const enabled = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
      if (enabled) res(enabled);
      else {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) res(true);
        else rej(new Error(`PermissionStatus: ${granted}`));
      }
    }
  });
};

function* scan(manager: BleManager) {
  let scanningChannel;
  try {
    yield put(actions.log('Scanning: Checking permissions...'));
    yield call(checkAndroidPermissions);
    yield put(actions.log('Scanning started...'));
    scanningChannel = yield call(DeviceScanChanel, { manager });
    while (true) {
      const [error, scannedDevice] = yield take(scanningChannel);
      if (error !== null) {
      }
      if (scannedDevice !== null) {
      }
    }
  } catch (err) {
  } finally {
    yield put(actions.log('Scanning stopped...'));
    if (yield cancelled()) {
      scanningChannel.close();
    }
  }
}

function* handleScanning(manager: BleManager) {
  let scanTask = null;
  let bleState = State.Unknown;
  let connectionState = ConnectionState.DISCONNECTED;

  const channel = yield actionChannel([
    BluetoothActionTypes.BLE_STATE_UPDATED,
    BluetoothActionTypes.UPDATE_CONNECTION_STATE,
  ]);

  while (true) {
    const action = yield take(channel);

    switch (action.type) {
      case BluetoothActionTypes.BLE_STATE_UPDATED:
        bleState = action.state;
        break;
      case BluetoothActionTypes.UPDATE_CONNECTION_STATE:
        connectionState = action.state;
        break;
    }

    const enableScanning =
      bleState === State.PoweredOn &&
      (connectionState === ConnectionState.DISCONNECTING || connectionState === ConnectionState.DISCONNECTED);

    if (enableScanning) {
      if (scanTask != null) {
        yield cancel(scanTask);
      }
      scanTask = yield fork(scan, manager);
    } else {
      if (scanTask != null) {
        yield cancel(scanTask);
        scanTask = null;
      }
    }
  }
}

function* handleBleState(manager: BleManager) {
  const stateChannel = yield call(StateChannel, manager);

  try {
    while (true) {
      const newState = yield take(stateChannel);
      yield put(actions.bleStateUpdated(newState));
    }
  } catch (err) {
  } finally {
    if (yield cancelled()) {
      stateChannel.close();
    }
  }
}

function* handleConnection() {
  let testTask;
  while (true) {
    const { device } = yield take(BluetoothActionTypes.CONNECT);

    const disconnectedChannel = DisconnectChannel(device);

    const deviceActionChannel = yield actionChannel([
      BluetoothActionTypes.DISCONNECT,
      BluetoothActionTypes.EXECUTE_TEST,
    ]);

    try {
      yield put(actions.updateConnectionState(ConnectionState.CONNECTING));
      yield call([device, device.connect]);
      yield put(actions.updateConnectionState(ConnectionState.DISCOVERING));
      yield call([device, device.discoverAllServicesAndCharacteristics]);
      yield put(actions.updateConnectionState(ConnectionState.CONNECTED));

      while (true) {
        const { deviceAction, disconnected } = yield race({
          deviceAction: take(deviceActionChannel),
          disconnected: take(disconnectedChannel),
        });

        if (deviceAction) {
          if (deviceAction.type === BluetoothActionTypes.DISCONNECT) {
            yield put(actions.log('Disconnected by user...'));
            yield put(actions.updateConnectionState(ConnectionState.DISCONNECTING));
            yield call([device, device.cancelConnection]);
            break;
          }
          if (deviceAction.type === BluetoothActionTypes.EXECUTE_TEST) {
            if (testTask != null) {
              yield cancel(testTask);
            }
            testTask = yield fork(executeTest, device, deviceAction);
          }
        } else if (disconnected) {
          yield put(actions.log('Disconnected by device...'));
          if (disconnected.error != null) {
            yield put(actions.logError(disconnected.error));
          }
          break;
        }
      }
    } catch (err) {
      yield put(actions.logError(err));
    } finally {
      disconnectedChannel.close();
      yield put(actions.testFinished());
      yield put(actions.updateConnectionState(ConnectionState.DISCONNECTED));
    }
  }
}

export default function* rootSaga() {
  yield put(actions.log('BLE saga started...'));
  const manager = new BleManager();

  yield fork(handleScanning, manager);
  yield fork(handleBleState, manager);
  yield fork(handleConnection);
}

import { action } from 'typesafe-actions';
import { BleError, Device, State } from 'react-native-ble-plx';

import { BluetoothActionTypes, ConnectionState } from './bluetooth.types';

export const log = (message: string) => action(BluetoothActionTypes.LOG, { message });

export const logError = (error: BleError) => {
  const message = `ERROR: ${error.message}, ATT: ${error.attErrorCode || 'null'}, iOS: ${error.iosErrorCode ||
    'null'}, android: ${error.androidErrorCode || 'null'}`;
  return action(BluetoothActionTypes.LOG, { message });
};

export const clearLogs = () => action(BluetoothActionTypes.CLEAR_LOGS);

export const connect = (device: Device) => action(BluetoothActionTypes.CONNECT, { device });

export const updateConnectionState = (state: ConnectionState) =>
  action(BluetoothActionTypes.UPDATE_CONNECTION_STATE, { state });

export const disconnect = () => action(BluetoothActionTypes.DISCONNECT);

export const bleStateUpdated = (state: State) => action(BluetoothActionTypes.BLE_STATE_UPDATED, { state });

export const sensorTagFound = (device: Device) => action(BluetoothActionTypes.SENSOR_TAG_FOUND, { device });

export const forgetSensorTag = () => action(BluetoothActionTypes.FORGET_SENSOR_TAG);

export const executeTest = (id: string) => action(BluetoothActionTypes.EXECUTE_TEST, { id });

export const testFinished = () => action(BluetoothActionTypes.TEST_FINISHED);

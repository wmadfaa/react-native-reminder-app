import { BleError, Device, State } from 'react-native-ble-plx';

export enum BluetoothActionTypes {
  LOG = '@bluetooth/LOG',
  CLEAR_LOGS = '@bluetooth/CLEAR_LOGS',
  CONNECT = '@bluetooth/CONNECT',
  DISCONNECT = '@bluetooth/DISCONNECT',
  UPDATE_CONNECTION_STATE = '@bluetooth/UPDATE_CONNECTION_STATE',
  BLE_STATE_UPDATED = '@bluetooth/BLE_STATE_UPDATED',
  SENSOR_TAG_FOUND = '@bluetooth/SENSOR_TAG_FOUND',
  FORGET_SENSOR_TAG = '@bluetooth/FORGET_SENSOR_TAG',
  EXECUTE_TEST = '@bluetooth/EXECUTE_TEST',
  TEST_FINISHED = '@bluetooth/TEST_FINISHED',
}

export enum ConnectionState {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  DISCOVERING = 'DISCOVERING',
  CONNECTED = 'CONNECTED',
  DISCONNECTING = 'DISCONNECTING',
}

export interface BluetoothState {
  logs: string[];
  activeError?: BleError;
  activeDevice?: Device;
  connectionState: ConnectionState;
  currentTest?: string;
  bleState: State;
}

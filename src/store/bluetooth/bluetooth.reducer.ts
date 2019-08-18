import { Reducer } from 'redux';
import { State } from 'react-native-ble-plx';
import { BluetoothState, BluetoothActionTypes, ConnectionState } from './bluetooth.types';

export const initialState: BluetoothState = {
  bleState: State.Unknown,
  activeError: undefined,
  activeDevice: undefined,
  connectionState: ConnectionState.DISCONNECTED,
  currentTest: undefined,
  logs: [],
};

const reducer: Reducer<BluetoothState> = (state = initialState, action) => {
  switch (action.type) {
    case BluetoothActionTypes.LOG:
      return { ...state, logs: [action.payload.message, ...state.logs] };
    case BluetoothActionTypes.CLEAR_LOGS:
      return { ...state, logs: [] };
    case BluetoothActionTypes.UPDATE_CONNECTION_STATE:
      return {
        ...state,
        connectionState: action.payload.state,
        logs: ['Connection state changed: ' + action.payload.state, ...state.logs],
      };
    case BluetoothActionTypes.BLE_STATE_UPDATED:
      return {
        ...state,
        bleState: action.payload.state,
        logs: ['BLE state changed: ' + action.payload.state, ...state.logs],
      };
    case BluetoothActionTypes.SENSOR_TAG_FOUND:
      if (state.activeDevice) return state;
      return {
        ...state,
        activeSensorTag: action.payload.device,
        logs: ['SensorTag found: ' + action.payload.device.id, ...state.logs],
      };
    case BluetoothActionTypes.FORGET_SENSOR_TAG:
      return {
        ...state,
        activeSensorTag: null,
      };
    case BluetoothActionTypes.EXECUTE_TEST:
      if (state.connectionState !== ConnectionState.CONNECTED) {
        return state;
      }
      return { ...state, currentTest: action.payload.id };
    case BluetoothActionTypes.TEST_FINISHED:
      return { ...state, currentTest: null };
    default: {
      return state;
    }
  }
};

export { reducer as BleReducer };

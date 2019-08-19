import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { UIState, UIReducer } from './ui';
import { AuthState, AuthReducer, AuthRootSaga } from './auth';
import { BluetoothState, BleReducer, BleRootSaga } from './bluetooth';

const RootReducer = combineReducers({
  ui: UIReducer,
  auth: AuthReducer,
  bluetooth: BleReducer,
});

function* rootSaga() {
  yield all([fork(AuthRootSaga), fork(BleRootSaga)]);
}

export interface ApplicationState {
  ui: UIState;
  auth: AuthState;
  bluetooth: BluetoothState;
}

export { RootReducer, rootSaga };

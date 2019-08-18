import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { UIState, UIReducer } from './ui';
import { AuthState, AuthReducer, AuthRootSaga } from './auth';
import { PushNotificationState, PushNotificationReducer } from './pushNotification';

const RootReducer = combineReducers({
  ui: UIReducer,
  auth: AuthReducer,
  pushNotification: PushNotificationReducer,
});

function* rootSaga() {
  yield all([fork(AuthRootSaga)]);
}

export interface ApplicationState {
  ui: UIState;
  auth: AuthState;
  pushNotification: PushNotificationState;
}

export { RootReducer, rootSaga };

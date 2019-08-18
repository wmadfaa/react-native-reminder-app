import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { UIState, UIReducer } from './ui';
import { AuthState, AuthReducer, AuthRootSaga } from './auth';

const RootReducer = combineReducers({
  ui: UIReducer,
  auth: AuthReducer,
});

function* rootSaga() {
  yield all([fork(AuthRootSaga)]);
}

export interface ApplicationState {
  ui: UIState;
  auth: AuthState;
}

export { RootReducer, rootSaga };

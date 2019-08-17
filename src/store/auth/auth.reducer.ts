import { Reducer } from 'redux';
import { AuthState, AuthActionTypes } from './auth.types';

export const initialState: AuthState = {
  loading: false,
  authenticated: false,
  errors: [],
  user: null,
};

const REQUEST_ACTIONS = new RegExp(/.*.REQUEST$/, 'gmi');
const LOGIN_OR_SIGN_UP_SUCCESS_ACTIONS = new RegExp(/^@auth\/(LOGIN|SIGN_UP).*.SUCCESS$/, 'gmi');
const LOGIN_OR_SIGN_UP_FAILURE_ACTIONS = new RegExp(/^@auth\/(LOGIN|SIGN_UP).*.FAILURE$/, 'gmi');
const SEND_SUCCESS_ACTIONS = new RegExp(/^@auth\/SEND.*.SUCCESS$/, 'gmi');
const SEND_FAILURE_ACTIONS = new RegExp(/^@auth\/SEND.*.FAILURE$/, 'gmi');

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case String(action.type.match(REQUEST_ACTIONS)): {
      return { ...state, loading: true };
    }
    case String(action.type.match(LOGIN_OR_SIGN_UP_SUCCESS_ACTIONS)): {
      return { ...state, loading: false, authenticated: true, user: action.payload.user };
    }
    case String(action.type.match(LOGIN_OR_SIGN_UP_FAILURE_ACTIONS)): {
      return { ...state, loading: false, authenticated: false, user: null, errors: [...state.errors, action.payload] };
    }
    case String(action.type.match(SEND_SUCCESS_ACTIONS)): {
      return { ...state, loading: false };
    }
    case String(action.type.match(SEND_FAILURE_ACTIONS)): {
      return { ...state, loading: false, errors: [...state.errors, action.payload] };
    }
    case AuthActionTypes.SIGN_OUT_SUCCESS:
      return { ...state, loading: false, authenticated: false, user: null };
    case AuthActionTypes.SIGN_OUT_FAILURE:
      return { ...state, loading: false, errors: [...state.errors, action.payload] };
    case AuthActionTypes.CLEAR_ERRORS:
      return { ...state, errors: [] };
    default: {
      return state;
    }
  }
};

export { reducer as AuthReducer };

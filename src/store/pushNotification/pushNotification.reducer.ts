import { Reducer } from 'redux';
import { PushNotificationState, PushNotificationActionTypes } from './pushNotification.types';

export const initialState: PushNotificationState = {
  errors: [],
  scheduleNotifications: [],
  permissions: undefined,
};

const FAILURE_ACTIONS = new RegExp(/^@pushNotification.*.FAILURE$/, 'gmi');

const reducer: Reducer<PushNotificationState> = (state = initialState, action) => {
  switch (action.type) {
    case String(action.type.match(FAILURE_ACTIONS)): {
      return { ...state, errors: [...state.errors, action.payload] };
    }
    case PushNotificationActionTypes.ADD_SCHEDULE_NOTIFICATION_SUCCESS:
      return { ...state, scheduleNotifications: action.payload.notification };
    case PushNotificationActionTypes.CANCEL_NOTIFICATION_SUCCESS:
      return { ...state, scheduleNotifications: state.scheduleNotifications.filter(id => id !== action.payload.id) };
    case PushNotificationActionTypes.CANCEL_ALL_NOTIFICATION_SUCCESS:
      return { ...state, scheduleNotifications: [] };
    case PushNotificationActionTypes.CHECK_PERMISSIONS_SUCCESS:
      return { ...state, permissions: action.payload.permissions };
    case PushNotificationActionTypes.CLEAR_ERRORS:
      return { ...state, errors: [] };
    default: {
      return state;
    }
  }
};

export { reducer as PushNotificationReducer };

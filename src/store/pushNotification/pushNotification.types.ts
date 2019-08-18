import { PushNotificationScheduleObject, PushNotificationPermissions } from 'react-native-push-notification';

export enum PushNotificationActionTypes {
  CONFIGURE_SUCCESS = '@pushNotification/CONFIGURE_SUCCESS',
  CONFIGURE_FAILURE = '@pushNotification/CONFIGURE_FAILURE',

  CHECK_PERMISSIONS_SUCCESS = '@pushNotification/CHECK_PERMISSIONS_SUCCESS',
  CHECK_PERMISSIONS_FAILURE = '@pushNotification/CHECK_PERMISSIONS_FAILURE',

  ADD_NOTIFICATION_SUCCESS = '@pushNotification/ADD_NOTIFICATION_SUCCESS',
  ADD_NOTIFICATION_FAILURE = '@pushNotification/ADD_NOTIFICATION_FAILURE',

  ADD_SCHEDULE_NOTIFICATION_SUCCESS = '@pushNotification/ADD_SCHEDULE_NOTIFICATION_SUCCESS',
  ADD_SCHEDULE_NOTIFICATION_FAILURE = '@pushNotification/ADD_SCHEDULE_NOTIFICATION_FAILURE',

  CANCEL_NOTIFICATION_SUCCESS = '@pushNotification/CANCEL_NOTIFICATION_SUCCESS',
  CANCEL_NOTIFICATION_FAILURE = '@pushNotification/CANCEL_NOTIFICATION_FAILURE',

  CANCEL_ALL_NOTIFICATION_SUCCESS = '@pushNotification/CANCEL_ALL_NOTIFICATION_SUCCESS',
  CANCEL_ALL_NOTIFICATION_FAILURE = '@pushNotification/CANCEL_ALL_NOTIFICATION_FAILURE',

  CLEAR_ERRORS = '@auth/CLEAR_ERRORS',
}

export interface PushNotificationState {
  readonly errors: Error[];
  readonly scheduleNotifications: PushNotificationScheduleObject[];
  readonly permissions?: PushNotificationPermissions;
}

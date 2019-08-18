import { action } from 'typesafe-actions';
import PushNotification, {
  PushNotificationOptions,
  PushNotificationScheduleObject,
  PushNotificationObject,
  PushNotificationPermissions,
} from 'react-native-push-notification';

import { PushNotificationActionTypes } from './pushNotification.types';

export const configurePushNotifications = (options: Partial<PushNotificationOptions>) => {
  const defaultOptions: PushNotificationOptions = {
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: undefined,

    // (required) Called when a remote or local notification is opened or received
    onNotification: notification => console.log(notification),

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: '',

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
  };

  try {
    PushNotification.configure({ ...defaultOptions, ...options });
    return action(PushNotificationActionTypes.CONFIGURE_SUCCESS);
  } catch (error) {
    return action(PushNotificationActionTypes.CONFIGURE_FAILURE, new Error(error));
  }
};

export const checkPushNotificationsPermissions = () => {
  let pushNotificationPermissions!: PushNotificationPermissions;
  try {
    PushNotification.checkPermissions(permissions => {
      pushNotificationPermissions = permissions;
    });
    if (pushNotificationPermissions) {
      return action(PushNotificationActionTypes.CHECK_PERMISSIONS_SUCCESS, {
        permissions: pushNotificationPermissions,
      });
    } else {
      throw new Error('no pushNotificationsPermissions');
    }
  } catch (error) {
    return action(PushNotificationActionTypes.CHECK_PERMISSIONS_FAILURE, new Error(error));
  }
};

export const addNotification = (notification: PushNotificationObject) => {
  try {
    PushNotification.localNotification(notification);
    return action(PushNotificationActionTypes.ADD_NOTIFICATION_SUCCESS);
  } catch (error) {
    return action(PushNotificationActionTypes.ADD_NOTIFICATION_FAILURE, new Error(error));
  }
};

export const addScheduleNotification = (notification: PushNotificationScheduleObject) => {
  try {
    PushNotification.localNotificationSchedule(notification);
    return action(PushNotificationActionTypes.ADD_SCHEDULE_NOTIFICATION_SUCCESS, { notification });
  } catch (error) {
    return action(PushNotificationActionTypes.ADD_SCHEDULE_NOTIFICATION_FAILURE, new Error(error));
  }
};

export const cancelNotification = (id: string) => {
  try {
    PushNotification.cancelLocalNotifications({ id });
    return action(PushNotificationActionTypes.CANCEL_NOTIFICATION_SUCCESS, { id });
  } catch (error) {
    return action(PushNotificationActionTypes.CANCEL_NOTIFICATION_FAILURE, new Error(error));
  }
};

export const cancelAllNotifications = () => {
  try {
    PushNotification.cancelAllLocalNotifications();
    return action(PushNotificationActionTypes.CANCEL_ALL_NOTIFICATION_SUCCESS);
  } catch (error) {
    return action(PushNotificationActionTypes.CANCEL_ALL_NOTIFICATION_FAILURE, new Error(error));
  }
};

export const clearErrors = () => action(PushNotificationActionTypes.CLEAR_ERRORS);

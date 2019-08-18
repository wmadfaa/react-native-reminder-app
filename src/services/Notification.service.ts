import { PushNotificationScheduleObject } from 'react-native-push-notification';
import PushNotification, { PushNotificationOptions, PushNotificationPermissions } from 'react-native-push-notification';

class NotificationService {
  constructor(private config: PushNotificationOptions) {
    this.config = config;
    this.configure();
  }

  configure = () => {
    PushNotification.configure(this.config);
  };

  checkPermissions = () =>
    new Promise<PushNotificationPermissions>((res, rej) => {
      try {
        PushNotification.checkPermissions(permissions => {
          res(permissions);
        });
      } catch (err) {
        rej(err);
      }
    });

  addNotification = (notification: PushNotificationScheduleObject) => {
    const { date, ...localNotificationObject } = notification;
    if (date <= new Date()) {
      PushNotification.localNotification(localNotificationObject);
    } else {
      PushNotification.localNotificationSchedule(notification);
    }
  };

  cancelNotification = (id: string) => {
    PushNotification.cancelLocalNotifications({ id });
  };

  cancelAllNotification = () => {
    PushNotification.cancelAllLocalNotifications();
  };
}

export default NotificationService;

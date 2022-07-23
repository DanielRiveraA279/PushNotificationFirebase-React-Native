import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status', authStatus);
    get5FCMToke();
  } else {
    console.log('not enabled');
  }
};

async function get5FCMToke() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken, 'old token');

  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log(fcmToken, 'new token');
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (err) {
      console.log('Unable to get messaging token.', err);
    }
  }
}

export const NotificationListner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification coused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('notification on froground state.....', remoteMessage);
  });
};

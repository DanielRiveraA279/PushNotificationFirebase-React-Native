/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

import {
  requestUserPermission,
  NotificationListner,
} from './src/utils/pushnotification_helper';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListner();
  }, []);

  return (
    <View style={{alignSelf: 'center', flex: 1, justifyContent: 'center'}}>
      <Text style={{fontWeight: 'bold'}}>Push Notification Tester</Text>
    </View>
  );
};

export default App;

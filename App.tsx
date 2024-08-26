/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Linking, Alert} from 'react-native';

import {InAppBrowser} from 'react-native-inappbrowser-reborn';
// import {LogLevel, OneSignal} from 'react-native-onesignal';
import OneSignal from 'react-native-onesignal';

function App(): React.JSX.Element {
  const sleep = async (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const openLink = async () => {
    try {
      const url = 'https://pflegekammer-rlp.de/';
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: false,
          toolbarColor: '#0d9ddb',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: false,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        await sleep(800);
        Alert.alert(JSON.stringify(result));
      } else Linking.openURL(url);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  // // Remove this method to stop OneSignal Debugging
  // OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // // OneSignal Initialization
  // OneSignal.initialize('23d045d4-d28f-492c-b616-d73148582ad7');

  // // requestPermission will show the native iOS or Android notification permission prompt.
  // // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  // OneSignal.Notifications.requestPermission(true);

  // // Method for listening for notification clicks
  // OneSignal.Notifications.addEventListener('click', event => {
  //   console.log('OneSignal: notification clicked:', event);
  // });

  useEffect(() => {
    // This runs only once, after the component mounts
    openLink();

    // Initialize OneSignal with your App ID
    OneSignal.setAppId('23d045d4-d28f-492c-b616-d73148582ad7');

    // Prompt for push permissions (iOS)
    OneSignal.promptForPushNotificationsWithUserResponse();

    // Handle notification opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('Notification opened:', notification);
    });

    // Handle notification received while the app is running
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        let notification = notificationReceivedEvent.getNotification();
        console.log('Notification received in foreground:', notification);
        notificationReceivedEvent.complete(notification);
      },
    );
  }, []); // The empty array makes sure this effect runs only once (on mount)

  return <></>;
}

export default App;

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
// import {OneSignal} from 'react-native-onesignal';
import {OneSignal} from 'react-native-onesignal';

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

  useEffect(() => {
    // This runs only once, after the component mounts
    openLink();
    // Remove this method to stop OneSignal Debugging
    // OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization

    OneSignal.initialize('8c17c838-c4d6-4856-8879-5439e5f10cb3');

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', event => {
      console.log('OneSignal: notification clicked:', event);
    });
  }, []); // The empty array makes sure this effect runs only once (on mount)

  return <></>;
}

export default App;

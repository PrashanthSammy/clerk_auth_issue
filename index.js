/**
 * @format
 */
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {AppRegistry} from 'react-native';
import App from './App';
// import OrientationLocker from 'react-native-orientation-locker';
import {name as appName} from './app.json';

enableScreens();

// OrientationLocker.lockOrientation('landscape');

AppRegistry.registerComponent(appName, () => App);

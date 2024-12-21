/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ensureAsyncStorageDir} from './src/util/ensureAsyncStorageDir';

ensureAsyncStorageDir();

AppRegistry.registerComponent(appName, () => App);

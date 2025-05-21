/**
 * @format
 */

import {registerRootComponent} from 'expo';
import App from './App';
import {ensureAsyncStorageDir} from './src/util/ensureAsyncStorageDir';

ensureAsyncStorageDir();

registerRootComponent(App);

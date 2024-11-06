import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './src/components/navigation/Tabs';

export default function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Tabs from './src/components/navigation/Tabs';
import WritePage from './src/pages/write/WritePage';

const Stack = createStackNavigator();

export default function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Tabs">
          <Stack.Screen
            name=" "
            component={Tabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WritePage"
            component={WritePage}
            options={{title: '글 작성하기'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Tabs from './src/components/navigation/Tabs';
import WritePage from './src/pages/write/WritePage';
import PostPage from './src/pages/dashboard/post/PostPage';

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
          <Stack.Screen
            name="PostPage"
            component={PostPage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

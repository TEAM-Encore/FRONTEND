import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyScreen from '@/app/my/MyScreen';
import NotificationSettingScreen from '@/app/my/NotificationSettingScreen';

export type MyStackParamList = {
  MyScreen: undefined;
  NotificationSettingScreen: undefined;
};

const Stack = createStackNavigator<MyStackParamList>();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyScreen" component={MyScreen} />
      <Stack.Screen
        name="NotificationSettingScreen"
        component={NotificationSettingScreen}
      />
    </Stack.Navigator>
  );
}

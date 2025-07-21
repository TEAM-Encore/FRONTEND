import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

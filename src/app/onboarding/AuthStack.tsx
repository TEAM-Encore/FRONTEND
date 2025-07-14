import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useTheme} from 'styled-components';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ProfileSettingScreen from './ProfileSettingScreen';
import ProfileCardScreen from './ProfileCardScreen';

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  OnboardingScreen: undefined;
  ProfileCardScreen: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: theme.gray.gray_01},
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="OnboardingScreen" component={ProfileSettingScreen} />
      <Stack.Screen name="ProfileCardScreen" component={ProfileCardScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;

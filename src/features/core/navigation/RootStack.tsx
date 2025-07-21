import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import OnboardingStack from '../../onboarding/navigation/OnboardingStack';
import TabNavigator from '@/features/core/navigation/TabNavigator';
import {useTheme} from 'styled-components';
import {IMusical} from '@/api/musical.api';
import AuthStack from '@/app/auth/AuthStack';
import NotificationSettingScreen from '@/app/my/NotificationSettingScreen';

export type RootStackParamList = {
  AuthStack: undefined;
  OnboardingStack: undefined;
  MainTabs: undefined;
  MusicalDetailScreen: {data: IMusical};
  NotificationSettingScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function RootStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: theme.gray.gray_01},
      }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="NotificationSettingScreen"
        component={NotificationSettingScreen}
      />
    </Stack.Navigator>
  );
}

export default RootStack;

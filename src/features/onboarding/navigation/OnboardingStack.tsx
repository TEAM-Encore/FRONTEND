import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useTheme} from 'styled-components';
import ProfileSettingScreen from '@/app/onboarding/ProfileSettingScreen';
import ProfileCardScreen from '@/app/onboarding/ProfileCardScreen';
import ProfilePreferenceScreen from '@/app/onboarding/ProfilePreferenceScreen';

export type OnboardingStackParamList = {
  ProfileSettingScreen: undefined;
  ProfileCardScreen: undefined;
  ProfilePreferenceScreen: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

function OnboardingStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: theme.gray.gray_01},
      }}>
      <Stack.Screen
        name="ProfilePreferenceScreen"
        component={ProfilePreferenceScreen}
      />
      <Stack.Screen
        name="ProfileSettingScreen"
        component={ProfileSettingScreen}
      />
      <Stack.Screen name="ProfileCardScreen" component={ProfileCardScreen} />
    </Stack.Navigator>
  );
}

export default OnboardingStack;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PremiumScreen from '@/app/premium/PremiumScreen';
import PremiumWriteScreen from '@/app/premium/PremiumWriteScreen';
import PremiumOthersScreen from '@/app/premium/PremiumOthersScreen';

export type PremiumStackParamList = {
  PremiumScreen: undefined;
  PremiumWriteScreen: undefined;
  PremiumMyScreen: undefined;
  PremiumOthersScreen: undefined;
};

const Stack = createStackNavigator<PremiumStackParamList>();

export default function PremiumStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PremiumScreen" component={PremiumScreen} />
      <Stack.Screen name="PremiumWriteScreen" component={PremiumWriteScreen} />
      {/* <Stack.Screen name="PremiumMyScreen" component={PremiumMyScreen} /> */}
      {/* <Stack.Screen
        name="PremiumOthersScreen"
        component={PremiumOthersScreen}
      /> */}
    </Stack.Navigator>
  );
}

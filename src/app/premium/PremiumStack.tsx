import {View, Text} from 'react-native';
import React from 'react';
import Navigator from '../Navigator';
import {createStackNavigator} from '@react-navigation/stack';
import PremiumScreen from './PremiumScreen';
import PremiumMyScreen from './PremiumMyScreen';
import PremiumWriteScreen from './PremiumWriteScreen';
import PremiumOthersScreen from './PremiumOthersScreen';

export type PremiumStackParamList = {
  PremiumScreen: undefined;
  PremiumWriteScreen: undefined;
  PremiumMyScreen: undefined;
  PremiumOthersScreen: undefined;
};

const Stack = createStackNavigator<PremiumStackParamList>();

export default function PremiumStack() {
  return (
    <Stack.Navigator>
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

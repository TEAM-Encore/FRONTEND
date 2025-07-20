import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import HomeSearchScreen from './HomeSearchScreen';
import HomeSearchResultScreen from './HomeSearchResultScreen';
import {useTheme} from 'styled-components/native';
import HomeBannerScreen from './HomeBannerScreen';

export type HomeStackParamList = {
  HomeScreen: undefined;
  HomeBannerScreen: {bannerId: number};
  HomeSearchScreen: undefined;
  HomeSearchResultScreen: {postData: any; text: string};
};

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: theme.gray.gray_01},
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="HomeBannerScreen" component={HomeBannerScreen} />
      <Stack.Screen name="HomeSearchScreen" component={HomeSearchScreen} />
      <Stack.Screen
        name="HomeSearchResultScreen"
        component={HomeSearchResultScreen}
      />
    </Stack.Navigator>
  );
}

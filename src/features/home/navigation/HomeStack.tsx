import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../../app/home/HomeScreen';
import HomeSearchScreen from '../../../app/home/HomeSearchScreen';
import HomeSearchResultScreen from '../../../app/home/HomeSearchResultScreen';
import {useTheme} from 'styled-components/native';
import HomeBannerScreen from '../../../app/home/HomeBannerScreen';
import HomeMusicalScreen from '../../../app/home/HomeMusicalScreen';
import {IMusical} from '@/api/musical.api';

export type HomeStackParamList = {
  HomeScreen: undefined;
  HomeBannerScreen: {bannerId: number};
  HomeSearchScreen: undefined;
  HomeSearchResultScreen: {postData: any; text: string};
  HomeMusicalScreen: {data: IMusical};
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
      <Stack.Screen name="HomeMusicalScreen" component={HomeMusicalScreen} />
    </Stack.Navigator>
  );
}

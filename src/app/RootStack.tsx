import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import AuthStack from './auth/AuthStack';
import MainTabs from './MainTabs';
import {useTheme} from 'styled-components';
import HomeBannerScreen from './home/HomeBannerScreen';
import HomeSearchScreen from './home/HomeSearchScreen';
import MusicalDetailScreen from './musical/MusicalDetailScreen';
import AddTicketScreen from './ticketBook/AddTicketScreen';
import TicketDetailScreen from './ticketBook/TicketDetailScreen';
import PremiumOthersScreen from './premium/PremiumOthersScreen';
import PremiumWriteScreen from './premium/PremiumWriteScreen';
import PremiumMyScreen from './premium/PremiumMyScreen';
import {IMusical} from '@/api/musical.api';
import EditTicketScreen from './ticketBook/EditTicketScreen';

export type RootStackParamList = {
  AuthStack: undefined;

  MainTabs: undefined;

  HomeBannerScreen: {bannerId: number};
  HomeSearchScreen: undefined;
  HomeSearchResultScreen: {postData: any; text: string};

  MusicalDetailScreen: {data: IMusical};

  PremiumWriteScreen: undefined;
  PremiumOthersScreen: undefined;
  PremiumMyScreen: {reviewId: number};

  AddTicketScreen: undefined;
  TicketDetailScreen: {id: number};
  EditTicketScreen: {id: number};

  //   WriteScreen: {
  //     setPostData: React.Dispatch<React.SetStateAction<PostData | null>>;
  //   };
  //   PremiumSearchDefaultScreen: undefined;
  //   PostScreen: {postId: number};
  //   ModifyScreen: {postId: number};
  //   // PostHashtagScreen: {hashTag: string};
  //   SaveScreen: undefined;
  //   DashboardSearchScreenList: {postData: any; text: string};
  //   DashboardSearchDefaultScreen: undefined;
  //   ModifyProfileImg: undefined;
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
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="HomeBannerScreen" component={HomeBannerScreen} />
      <Stack.Screen name="HomeSearchScreen" component={HomeSearchScreen} />
      <Stack.Screen
        name="MusicalDetailScreen"
        component={MusicalDetailScreen}
      />
      <Stack.Screen name="PremiumMyScreen" component={PremiumMyScreen} />
      <Stack.Screen
        name="PremiumOthersScreen"
        component={PremiumOthersScreen}
      />
      <Stack.Screen name="PremiumWriteScreen" component={PremiumWriteScreen} />

      <Stack.Screen name="AddTicketScreen" component={AddTicketScreen} />
      <Stack.Screen name="TicketDetailScreen" component={TicketDetailScreen} />
      <Stack.Screen
        name="EditTicketScreen"
        component={EditTicketScreen}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
    </Stack.Navigator>
  );
}

export default RootStack;

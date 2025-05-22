import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import {TabSvg} from '@/assets/icons/TabSvg';
import Colors from '@/assets/colors/Colors';
import MyScreen from './my/MyScreen';
import HomeScreen from './home/HomeScreen';
import PremiumScreen from './premium/PremiumScreen';
import TicketBookScreen from './ticketBook/TicketBookScreen';

export type MainTabsParamList = {
  HomeScreen: undefined;
  PremiumScreen: undefined;
  TicketBookScreen: undefined;
  MyScreen: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

function MainTabs() {
  const tabList: Array<{
    name: keyof MainTabsParamList;
    label: string;
    component: React.ComponentType;
    icon: string;
    tabIcon: string;
  }> = [
    {
      label: '홈',
      name: 'HomeScreen',
      component: HomeScreen,
      icon: TabSvg.HomeIcon,
      tabIcon: TabSvg.tabHomeIcon,
    },
    {
      label: '프리미엄',
      name: 'PremiumScreen',
      component: PremiumScreen,
      icon: TabSvg.PremiumIcon,
      tabIcon: TabSvg.tabPremiumIcon,
    },

    {
      name: 'TicketBookScreen',
      label: '티켓 북',
      component: TicketBookScreen,
      icon: TabSvg.TicketBookIcon,
      tabIcon: TabSvg.tabTicketBookIcon,
    },
    {
      name: 'MyScreen',
      label: '마이 페이지',
      component: MyScreen,
      icon: TabSvg.MyPageIcon,
      tabIcon: TabSvg.tabMyPageIcon,
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 102,
        },
        tabBarActiveTintColor: Colors.gray_12,
        tabBarInactiveTintColor: Colors.gray_12,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      {tabList.map(item => (
        <Tab.Screen
          name={item.name}
          component={item.component}
          options={{
            tabBarLabel: item.label,
            tabBarIcon: ({focused}) => (
              <SvgXml xml={focused ? item.tabIcon : item.icon} />
            ),
          }}
          key={item.name}
        />
      ))}
    </Tab.Navigator>
  );
}

export default MainTabs;

import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import HomePage from '@/pages/home/HomePage';
import PremiumPage from '@/pages/premium/PremiumPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import TicketBookPage from '@/pages/TicketBookPage';
import MyPage from '@/pages/MyPage';

import {SvgXml} from 'react-native-svg';
import {TabSvg} from '@/assets/icons/TabSvg';
import Colors from '@/assets/colors/Colors';

export default function Tabs() {
  const Tab = createBottomTabNavigator();

  const tabList = [
    {
      name: '홈',
      content: HomePage,
      icon: TabSvg.HomeIcon,
      tabIcon: TabSvg.tabHomeIcon,
    },
    {
      name: '프리미엄',
      content: PremiumPage,
      icon: TabSvg.PremiumIcon,
      tabIcon: TabSvg.tabPremiumIcon,
    },
    {
      name: '게시판',
      content: DashboardPage,
      icon: TabSvg.DashboardIcon,
      tabIcon: TabSvg.tabDashboardIcon,
    },
    {
      name: '티켓북',
      content: TicketBookPage,
      icon: TabSvg.TicketBookIcon,
      tabIcon: TabSvg.tabTicketBookIcon,
    },
    {
      name: '마이',
      content: MyPage,
      icon: TabSvg.MyPageIcon,
      tabIcon: TabSvg.tabMyPageIcon,
    },
  ];

  const {top} = useSafeAreaInsets();

  return (
    <>
      <Tab.Navigator
        initialRouteName="HomePage"
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
        {tabList.map((item, index) => (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.content}
            options={{
              title: item.name,
              tabBarIcon: ({focused}) => (
                <SvgXml xml={focused ? item.tabIcon : item.icon} />
              ),
              headerShown: true,
              headerTitle: '',
              headerStyle: {
                backgroundColor: Colors.gray_01,
                height: top,
                shadowColor: 'transparent',
              },
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
}

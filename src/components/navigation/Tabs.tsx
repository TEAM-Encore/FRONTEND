import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomePage from '@/pages/HomePage';
import PremiumPage from '@/pages/PremiumPage';
import DashboardPage from '@/pages/DashboardPage';
import TicketBookPage from '@/pages/TicketBookPage';
import MyPage from '@/pages/MyPage';

import {SvgXml} from 'react-native-svg';
import {TabSvg} from '@/assets/icons/TabSvg';
import Colors from '@/assets/colors/Colors';

export default function Tabs() {
  const Tab = createBottomTabNavigator();

  const tabList = [
    {name: '홈', content: HomePage, icon: TabSvg.HomeIcon},
    {name: '프리미엄', content: PremiumPage, icon: TabSvg.PremiumIcon},
    {name: '게시판', content: DashboardPage, icon: TabSvg.DashboardIcon},
    {name: '티켓북', content: TicketBookPage, icon: TabSvg.TicketBookIcon},
    {name: '마이', content: MyPage, icon: TabSvg.MyPageIcon},
  ];

  return (
    <>
      <Tab.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 102,
          },
          tabBarActiveTintColor: Colors.primary_02,
          tabBarInactiveTintColor: Colors.gray_07,
          tabBarLabelStyle: {
            marginTop: 2,
            fontSize: 12,
          },
        }}>
        {tabList.map(item => (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.content}
            options={{
              title: item.name,
              tabBarIcon: ({color}) => <SvgXml xml={item.icon} fill={color} />,
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
}

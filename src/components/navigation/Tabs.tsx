import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {TabSvg} from '@/assets/icons/TabSvg';
import Colors from '@/assets/colors/Colors';

import HomePage from '@/pages/home/HomePage';
import PremiumPage from '@/pages/PremiumPage';
import DashboardPage from '@/pages/DashboardPage';
import TicketBookPage from '@/pages/TicketBookPage';
import MyPage from '@/pages/MyPage';

export default function Tabs() {
  const Tab = createBottomTabNavigator();

  const tabList = [
    {name: '홈', content: HomePage, icon: TabSvg.HomeIcon},
    {name: '프리미엄', content: PremiumPage, icon: TabSvg.PremiumIcon},
    {name: '게시판', content: DashboardPage, icon: TabSvg.DashboardIcon},
    {name: '티켓북', content: TicketBookPage, icon: TabSvg.TicketBookIcon},
    {name: '마이', content: MyPage, icon: TabSvg.MyPageIcon},
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
              headerShown: true,
              headerTitle: '',
              headerStyle:
                item.name === '홈'
                  ? {
                      backgroundColor: Colors.primary_01,
                      height: top,
                      shadowColor: 'transparent',
                    }
                  : {
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

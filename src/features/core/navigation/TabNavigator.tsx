import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import {TabSvg} from '@/assets/icons/TabSvg';
import Colors from '@/assets/colors/Colors';
import HomeStack from '../../home/navigation/HomeStack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import PremiumStack from '../../premium/navigation/PremiumStack';
import TicketBookStack from '../../ticket_book/navigation/TicketBookStack';
import MyStack from '../../my/navigation/MyStack';

export type MainTabsParamList = {
  HomeStack: undefined;
  PremiumStack: undefined;
  TicketBookStack: undefined;
  MyStack: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

function TabNavigator() {
  const tabList: Array<{
    name: keyof MainTabsParamList;
    label: string;
    component: React.ComponentType;
    icon: string;
    tabIcon: string;
  }> = [
    {
      label: '홈',
      name: 'HomeStack',
      component: HomeStack,
      icon: TabSvg.HomeIcon,
      tabIcon: TabSvg.tabHomeIcon,
    },
    {
      label: '프리미엄',
      name: 'PremiumStack',
      component: PremiumStack,
      icon: TabSvg.PremiumIcon,
      tabIcon: TabSvg.tabPremiumIcon,
    },

    {
      name: 'TicketBookStack',
      label: '티켓북',
      component: TicketBookStack,
      icon: TabSvg.TicketBookIcon,
      tabIcon: TabSvg.tabTicketBookIcon,
    },
    {
      name: 'MyStack',
      label: '마이',
      component: MyStack,
      icon: TabSvg.MyPageIcon,
      tabIcon: TabSvg.tabMyPageIcon,
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({route}) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        const hideOnScreens = ['HomeSearchScreen'];

        return {
          headerShown: false,
          tabBarStyle: {
            height: 102,
            display: hideOnScreens.includes(routeName ?? '') ? 'none' : 'flex',
          },
          tabBarActiveTintColor: Colors.gray_12,
          tabBarInactiveTintColor: Colors.gray_12,
          tabBarLabelStyle: {
            fontSize: 12,
          },
        };
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

export default TabNavigator;

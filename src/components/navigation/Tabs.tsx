import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import HomeScreen from '@/screens/home/HomeScreen';
import PremiumScreen from '@/screens/premium/PremiumScreen';
import DashboardScreen from '@/screens/dashboard/DashboardScreen';
import TicketBookScreen from '@/screens/ticketBook/TicketBookScreen';
import MyScreen from '@/screens/myScreen/MyScreen';

import {SvgXml} from 'react-native-svg';
import {TabSvg} from '@/assets/icons/TabSvg';
import Colors from '@/assets/colors/Colors';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from 'types';

type TabsRouteProp = RouteProp<RootStackParamList, 'Tabs'>;

export default function Tabs({route}: {route: TabsRouteProp}) {
  const Tab = createBottomTabNavigator();

  // MyPage에서 전달받은 props (임시로 설정해놓은 값으로 추후 수정 필요)
  const {frequency, checkedOptions} = route.params ?? {
    frequency: '연 8회 이상',
    checkedOptions: ['감동적인', '넘버 퀄리티가 높은'],
  };

  const tabList = [
    {
      name: '홈',
      content: HomeScreen,
      icon: TabSvg.HomeIcon,
      tabIcon: TabSvg.tabHomeIcon,
    },
    {
      name: '프리미엄',
      content: PremiumScreen,
      icon: TabSvg.PremiumIcon,
      tabIcon: TabSvg.tabPremiumIcon,
    },
    // {
    //   name: '게시판',
    //   content: DashboardScreen,
    //   icon: TabSvg.DashboardIcon,
    //   tabIcon: TabSvg.tabDashboardIcon,
    // },
    {
      name: '티켓북',
      content: TicketBookScreen,
      icon: TabSvg.TicketBookIcon,
      tabIcon: TabSvg.tabTicketBookIcon,
    },
    {
      name: '마이',
      content: props => (
        <MyScreen
          {...props}
          frequency={frequency}
          checkedOptions={checkedOptions}
        />
      ),
      icon: TabSvg.MyPageIcon,
      tabIcon: TabSvg.tabMyPageIcon,
    },
  ];

  const {top} = useSafeAreaInsets();

  return (
    <>
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

import React from 'react';
import {View} from 'react-native';
import EntireScreen from '@/screens/dashboard/entire/EntireScreen';
import InformationScreen from '@/screens/dashboard/info/InformationScreen';
import ActorScreen from '@/screens/dashboard/actor/ActorScreen';
import ReviewScreen from '@/screens/dashboard/review/ReviewScreen';
import FreeScreen from '@/screens/dashboard/free/FreeScreen';
import DashboardStyles from '@/screens/dashboard/DashboardStyles';

type DashboardProps = {
  selectedTab: string;
};

// 게시판 페이지에서 상위 탭에 따라 다른 화면을 렌더링하는 컴포넌트 (전체, 정보, 리뷰, 배우, 자유)
const DashboardTabs: React.FC<DashboardProps> = ({selectedTab}) => {
  const renderScreen = () => {
    switch (selectedTab) {
      case 'Entire':
        return <EntireScreen />;
      case 'Information':
        return <InformationScreen />;
      case 'Review':
        return <ReviewScreen />;
      case 'Actor':
        return <ActorScreen />;
      case 'Free':
        return <FreeScreen />;
      default:
        return <EntireScreen />;
    }
  };

  return (
    <View style={DashboardStyles.container}>
      <View>{renderScreen()}</View>
    </View>
  );
};

export default DashboardTabs;

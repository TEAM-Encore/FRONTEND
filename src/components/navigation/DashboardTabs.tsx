import React from 'react';
import {View} from 'react-native';
import EntireScreen from '@/pages/dashboard/entire/EntireScreen';
import InformationScreen from '@/pages/dashboard/info/InformationScreen';
import ActorScreen from '@/pages/dashboard/actor/ActorScreen';
import ReviewScreen from '@/pages/dashboard/review/ReviewScreen';
import FreeScreen from '@/pages/dashboard/free/FreeScreen';
import DashboardStyles from '@/pages/dashboard/DashboardStyles';

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

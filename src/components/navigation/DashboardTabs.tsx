import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import EntireScreen from '@/pages/dashboard/entire/EntireScreen';
import InformationScreen from '@/pages/dashboard/info/InfomationScreen';
import ActorScreen from '@/pages/dashboard/actor/ActorScreen';
import ReviewScreen from '@/pages/dashboard/review/ReviewScreen';
import FreeScreen from '@/pages/dashboard/free/FreeScreen';
import DashboardStyles from '@/pages/dashboard/DashboardStyles';

type DashboardProps = {
  selectedTab: string;
};

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

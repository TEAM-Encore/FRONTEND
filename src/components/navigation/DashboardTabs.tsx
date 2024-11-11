import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import EntireScreen from '@/pages/dashboard/entire/EntireScreen';
import InformationScreen from '@/pages/dashboard/info/InfomationScreen';
import ActorScreen from '@/pages/dashboard/actor/ActorScreen';
import ReviewScreen from '@/pages/dashboard/review/ReviewScreen';
import FreeScreen from '@/pages/dashboard/free/FreeScreen';
import DashboardStyles from '@/pages/dashboard/DashboardStyles';

function DashboardTabs(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState('Entire');

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
      <View style={DashboardStyles.tabContainer}>
        {['Entire', 'Information', 'Review', 'Actor', 'Free'].map(
          (tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedTab(tab)}
              style={[
                DashboardStyles.tabButton,
                selectedTab === tab && DashboardStyles.activeTabButton,
              ]}>
              <Text
                style={[
                  DashboardStyles.tabText,
                  selectedTab === tab && DashboardStyles.activeTabText,
                ]}>
                {tab === 'Entire'
                  ? '전체'
                  : tab === 'Information'
                  ? '정보'
                  : tab === 'Review'
                  ? '후기'
                  : tab === 'Actor'
                  ? '배우'
                  : '자유'}
              </Text>
              {selectedTab === tab && (
                <View style={DashboardStyles.activeTabUnderline} />
              )}
            </TouchableOpacity>
          ),
        )}
      </View>
      <View>{renderScreen()}</View>
    </View>
  );
}

export default DashboardTabs;

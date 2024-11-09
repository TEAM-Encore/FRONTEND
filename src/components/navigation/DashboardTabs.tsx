import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import EntireScreen from '@/pages/dashboard/entire/EntireScreen';
import InformationScreen from '@/pages/dashboard/info/InfomationScreen';
import ActorScreen from '@/pages/dashboard/actor/ActorScreen';
import ReviewScreen from '@/pages/dashboard/review/ReviewScreen';
import FreeScreen from '@/pages/dashboard/free/FreeScreen';

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
    <View style={styles.container}>
      {/* Custom Tab Bar */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab('Entire')}
          style={styles.tabButton}>
          <Text style={styles.tabText}>전체</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('Information')}
          style={styles.tabButton}>
          <Text style={styles.tabText}>정보</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('Review')}
          style={styles.tabButton}>
          <Text style={styles.tabText}>후기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('Actor')}
          style={styles.tabButton}>
          <Text style={styles.tabText}>배우</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('Free')}
          style={styles.tabButton}>
          <Text style={styles.tabText}>자유</Text>
        </TouchableOpacity>
      </View>

      {/* Selected Screen */}
      <View style={styles.screenContent}>{renderScreen()}</View>
    </View>
  );
}

export default DashboardTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f1f1f1',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  screenContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

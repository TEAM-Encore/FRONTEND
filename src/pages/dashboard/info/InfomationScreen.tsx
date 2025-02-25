import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import PostStyles from '../PostStyles';
import InformationList from './InformationList';

type InformationScreenProps = {};

const InformationScreen: React.FC<InformationScreenProps> = () => {
  return (
    <SafeAreaView style={PostStyles.container}>
      <ScrollView>
        <InformationList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InformationScreen;

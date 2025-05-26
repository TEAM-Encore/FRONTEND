import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import PostStyles from '../PostStyles';
import InformationList from './InformationList';

type InformationScreenProps = {};

// 게시판 정보 페이지
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

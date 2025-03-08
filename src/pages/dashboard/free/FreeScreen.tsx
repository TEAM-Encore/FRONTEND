import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import PostStyles from '../PostStyles';
import FreeList from './FreeList';

type FreeScreenProps = {};

// 게시판 자유 리스트 페이지
const FreeScreen: React.FC<FreeScreenProps> = () => {
  return (
    <SafeAreaView style={PostStyles.container}>
      <ScrollView>
        <FreeList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FreeScreen;

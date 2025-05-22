import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import PostStyles from '../PostStyles';
import ActorList from './ActorList';

type ActorScreenProps = {};

// 게시판 배우 페이지
const ActorScreen: React.FC<ActorScreenProps> = () => {
  return (
    <SafeAreaView style={PostStyles.container}>
      <ScrollView>
        <ActorList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActorScreen;

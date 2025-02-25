import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import PostStyles from '../PostStyles';
import FreeList from './FreeList';

type FreeScreenProps = {};

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

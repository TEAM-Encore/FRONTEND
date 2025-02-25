import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import PostStyles from '../PostStyles';
import ReviewList from './ReviewList';

type ReviewScreenProps = {};

const ReviewScreen: React.FC<ReviewScreenProps> = () => {
  return (
    <SafeAreaView style={PostStyles.container}>
      <ScrollView>
        <ReviewList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewScreen;

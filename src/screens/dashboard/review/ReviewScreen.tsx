import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import PostStyles from '../PostStyles';
import ReviewList from './ReviewList';

type ReviewScreenProps = {};

// 게시판 리뷰 페이지
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

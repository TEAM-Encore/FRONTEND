import React from 'react';
import {View, Text} from 'react-native';
import PremiumStyles from '@/app/premium/PremiumScreen/style';
import PopularReviews from '@/components/premium/PopularReviews';
import useTodayPopularReviews from '../../hooks/useTodayPopularReviews';


const TodayPopularReviews: React.FC = ({
}) => {
  const {todayPopularReviews} = useTodayPopularReviews();

  return (
    <View style={PremiumStyles.containerHeader}>
      <Text style={PremiumStyles.textPopularReviewsTitle}>
        오늘의 인기 리뷰
      </Text>
      <View style={PremiumStyles.containerPopularReviews}>
        <PopularReviews popularReviews={todayPopularReviews} />
      </View>
    </View>
  );
};

export default TodayPopularReviews;

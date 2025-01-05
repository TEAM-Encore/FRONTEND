import React from 'react';
import {View, Text, Image} from 'react-native';
import MusicalDetailStyles from './MusicalDetailStyles';

const MusicalDetailReview: React.FC = () => {
  return (
    <View style={MusicalDetailStyles.infoContainer}>
      <View>
        <Text style={MusicalDetailStyles.infoTitle}>앙코르 평점 4.3</Text>
        <View style={MusicalDetailStyles.reviewsContainer}>
          <View style={MusicalDetailStyles.reviews}>
            <View style={MusicalDetailStyles.review_container}>
              <Text style={MusicalDetailStyles.reviewText}>넘버</Text>
              <Image
                source={require('@/assets/images/home/bar.png')}
                style={MusicalDetailStyles.reviewImage}
              />
            </View>
            <View
              style={{...MusicalDetailStyles.review_container, marginTop: 7}}>
              <Text style={MusicalDetailStyles.reviewText}>스토리</Text>
              <Image
                source={require('@/assets/images/home/bar.png')}
                style={MusicalDetailStyles.reviewImage}
              />
            </View>
            <View
              style={{...MusicalDetailStyles.review_container, marginTop: 7}}>
              <Text style={MusicalDetailStyles.reviewText}>재관람 의사</Text>
              <Image
                source={require('@/assets/images/home/bar.png')}
                style={MusicalDetailStyles.reviewImage}
              />
            </View>
            <View
              style={{...MusicalDetailStyles.review_container, marginTop: 7}}>
              <Text style={MusicalDetailStyles.reviewText}>배우합</Text>
              <Image
                source={require('@/assets/images/home/bar.png')}
                style={MusicalDetailStyles.reviewImage}
              />
            </View>
            <View
              style={{...MusicalDetailStyles.review_container, marginTop: 7}}>
              <Text style={MusicalDetailStyles.reviewText}>퍼포먼스</Text>
              <Image
                source={require('@/assets/images/home/bar.png')}
                style={MusicalDetailStyles.reviewImage}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={MusicalDetailStyles.containerTitle}>
        <Text style={MusicalDetailStyles.infoTitle}>프리미엄 리뷰</Text>
        <Text style={MusicalDetailStyles.textWriteReview}>전체보기 {'>'}</Text>
      </View>
    </View>
  );
};

export default MusicalDetailReview;

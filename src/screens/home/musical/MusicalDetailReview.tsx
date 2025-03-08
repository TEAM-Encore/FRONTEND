import React, {useCallback, useState} from 'react';
import {View, Text, Image, Alert, FlatList} from 'react-native';
import MusicalDetailStyles from './MusicalDetailStyles';
import {getMusicalReviews} from '@/api/musical.api';
import {useFocusEffect} from '@react-navigation/native';
import ItemReview from '@/components/premium/ItemReview';

type MMusicalDetailReviewProps = {
  data: any;
};

const MusicalDetailReview: React.FC<MMusicalDetailReviewProps> = ({data}) => {
  const [reviewInfo, setReviewInfo] = useState();

  const fetchMusicalReviews = async () => {
    try {
      const response = await getMusicalReviews(data.id);
      console.log('프리미엄 리뷰 조회: ', response.data.data);
      setReviewInfo(response.data.data);
    } catch (error) {
      console.log(error);
      Alert.alert('프리미엄 리뷰 조회 중 문제가 발생했습니다.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMusicalReviews();
    }, []),
  );

  return (
    <View style={MusicalDetailStyles.infoContainer}>
      <View>
        <Text style={MusicalDetailStyles.infoTitle}>
          앙코르 평점 {data.average_total_rating}
        </Text>
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

      <FlatList
        data={data.reviews}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ItemReview postList={[item]} />}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

export default MusicalDetailReview;

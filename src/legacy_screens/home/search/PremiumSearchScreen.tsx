import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert, FlatList} from 'react-native';
import HomeStyles from '../HomeStyles';
import {getSearchMusical} from '@/api/musical.api';
import {useFocusEffect} from '@react-navigation/native';
import {getTicketReviewList} from '@/api/review.api';
import ItemSearchReview from '@/components/premium/ItemSearchReview';

type SearchScreenProps = {
  postData: any;
  text: string;
};

const PremiumSearchScreen: React.FC<SearchScreenProps> = ({postData, text}) => {
  console.log('PremiumSearchScreen에 도달한 검색어: ', text);

  const [data, setData] = useState();

  const fetchReviewSearch = async (text: string) => {
    if (text.trim().length === 0) return;
    try {
      const response = await getTicketReviewList(
        100,
        'createdat',
        undefined,
        undefined,
        text,
      );
      const reviewData = response.data.data.content;

      console.log('프리미엄 리뷰 검색 결과: ', reviewData);
      setData(reviewData);
    } catch (error) {
      console.log('error: ', error);
      Alert.alert('프리미엄 리뷰 검색 중에 문제가 발생했습니다.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReviewSearch(text);
    }, [text]),
  );

  const renderItem = ({
    item,
  }: {
    item: {
      elapsed_time: string;
      like_count: number;
      nickname: string;
      title: string;
      series: number;
      rating: number;
      total_rating: number;
      view_count: number;
      user_id: number;
    };
  }) => <ItemSearchReview postList={[item]} />;

  return (
    <View>
      <View style={HomeStyles.resultContainer}>
        <Text style={HomeStyles.resultText}>프리미엄</Text>
      </View>
      <View style={{marginTop: 19}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginVertical: 20}}>
              검색 결과가 없습니다.
            </Text>
          }
        />
      </View>
    </View>
  );
};

export default PremiumSearchScreen;

import React, {useCallback, useState} from 'react';
import {View, Text, Image, Alert, FlatList, StyleSheet} from 'react-native';
import {getMusicalReviews} from '@/api/musical.api';
import {useFocusEffect} from '@react-navigation/native';
import ItemReview from '@/components/premium/ItemReview';
import MusicalDetailStyles from '../MusicalDetailScreen/style';
import Colors from '@/assets/colors/Colors';
import {typography} from '@/styles/typography';

type MusicalDetailReviewProps = {
  data: any;
};

const MusicalDetailReview: React.FC<MusicalDetailReviewProps> = ({data}) => {
  const categories = [
    {label: '넘버', key: 'average_number_rating'},
    {label: '스토리 구성', key: 'average_story_rating'},
    {label: '재관람 의사', key: 'average_revisit_rating'},
    {label: '배우합', key: 'average_actor_rating'},
    {label: '퍼포먼스', key: 'average_performance_rating'},
  ];

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

  console.log('뮤지컬 리뷰 정보: ', reviewInfo);

  useFocusEffect(
    useCallback(() => {
      fetchMusicalReviews();
    }, []),
  );

  return (
    <View style={MusicalDetailStyles.infoContainer}>
      {reviewInfo && (
        <View>
          <Text style={MusicalDetailStyles.infoTitle}>
            앙코르 평점 {reviewInfo.average_total_rating}
          </Text>

          <View style={styles.select_star_category}>
            {categories.map((category, index) => {
              const filled = reviewInfo[category.key];
              const total = 5;
              return (
                <View key={index} style={styles.categoryView}>
                  <View style={styles.indexView}>
                    <Text style={styles.categoryText}>{category.label}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: 174,
                      height: 11,
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}>
                    {[...Array(total)].map((_, i) => (
                      <View
                        key={i}
                        style={[
                          styles.bar,
                          i < filled && styles.filledBar,
                          i !== total - 1 && styles.barWithBorder,
                        ]}
                      />
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}

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

const styles = StyleSheet.create({
  categoryView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  indexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    color: Colors.gray_12,
  },
  select_star_category: {
    backgroundColor: Colors.gray_03,
    width: 335,
    height: 146,
    ...typography.caption,
    color: Colors.gray_12,
    marginTop: 22,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  bar: {
    flex: 1,
    backgroundColor: Colors.gray_06,
  },
  filledBar: {
    backgroundColor: Colors.sub_04,
  },
  barWithBorder: {
    borderRightWidth: 1,
    borderColor: Colors.gray_07,
  },
});

export default MusicalDetailReview;

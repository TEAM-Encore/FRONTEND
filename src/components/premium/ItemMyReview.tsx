import React from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {PremiumIcon} from '@/assets/icons/premium/PremiumIcon';
import {useNavigation} from '@react-navigation/native';
import ItemReviewStyles from './ItemReviewStyles';

type NavigationProp = {
  navigate: (screen: 'PremiumOthersScreen') => void;
};

type PostProps = {
  postList: {
    elapsed_time: string;
    like_count: number;
    review_id: number;
    nickname: string;
    rating: {
      actor_rating: number;
      number_rating: number;
      performance_rating: number;
      rating_review: string;
      revisit_rating: number;
      story_rating: number;
      total_rating: number;
    };
    title: string;
    user_id: number;
    view_count: number;
  }[];
};

// 프리미엄 후기 리스트: 자신의 후기 리스트
const ItemMyReview: React.FC<PostProps> = ({postList}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePremiumPost = () => {
    navigation.navigate('PremiumOthersScreen');
  };

  return (
    <FlatList
      data={postList}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => {
        return (
          <>
            <TouchableOpacity
              style={ItemReviewStyles.container}
              onPress={handlePremiumPost}>
              <View style={ItemReviewStyles.containerRow}>
                <View style={{flex: 1}}>
                  <Text
                    style={ItemReviewStyles.textTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.title}
                  </Text>

                  <View style={ItemReviewStyles.containerRow}>
                    <Text style={ItemReviewStyles.textWriterDate}>
                      {item.nickname} ·
                    </Text>
                    <Text style={ItemReviewStyles.textWriterDate}>
                      {item.elapsed_time}
                    </Text>
                  </View>

                  <View style={ItemReviewStyles.containerInfo}>
                    <View style={ItemReviewStyles.containerRow}>
                      <SvgXml xml={PremiumIcon.star} />
                      <Text style={ItemReviewStyles.textStar}>
                        총평 {item.review_data_res.rating.total_rating}
                      </Text>
                    </View>
                    <View style={ItemReviewStyles.containerRow}>
                      <SvgXml xml={PremiumIcon.view} />
                      <Text style={ItemReviewStyles.textViewAndLike}>
                        {item.view_count}
                      </Text>
                      <SvgXml xml={PremiumIcon.like} />
                      <Text style={ItemReviewStyles.textViewAndLike}>
                        {item.like_res.like_count_res.total_like_count}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* 마지막 아이템이 아닐 경우 구분선 추가 */}
            <View style={ItemReviewStyles.containerRow}></View>
            {index < postList.length - 1 ? (
              <View style={ItemReviewStyles.line} />
            ) : (
              <View style={{marginBottom: 16}} />
            )}
          </>
        );
      }}
    />
  );
};

export default ItemMyReview;

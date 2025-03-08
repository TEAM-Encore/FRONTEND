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
    review_id: any;
    nickname: string;
    title: string;
    like_count: number;
    view_count: number;
    elapsed_time: string;
    star: number;
    rating: string[];
    total_rating: number;
  }[];
  onEndReached: () => void;
  onEndReachedThreshold?: number;
};

// 프리미엄 후기 리스트: 다른 사람의 후기 리스트
const ItemReview: React.FC<PostProps> = ({
  postList,
  onEndReached,
  onEndReachedThreshold = 0.5,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePremiumPost = () => {
    navigation.navigate('PremiumOthersScreen', {postList: postList});
    // console.log('뿅');
  };

  return (
    <FlatList
      data={postList}
      keyExtractor={item => item.review_id}
      renderItem={({item, index}) => {
        return (
          <>
            <TouchableOpacity
              style={ItemReviewStyles.itemContainer}
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
                        총평 {item.rating.total_rating}
                      </Text>
                    </View>
                    <View style={ItemReviewStyles.containerRow}>
                      <SvgXml xml={PremiumIcon.view} />
                      <Text style={ItemReviewStyles.textViewAndLike}>
                        {item.view_count}
                      </Text>
                      <SvgXml xml={PremiumIcon.like} />
                      <Text style={ItemReviewStyles.textViewAndLike}>
                        {item.like_count}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <View style={ItemReviewStyles.containerRow}></View>
            {index < postList.length - 1 ? (
              <View style={ItemReviewStyles.line} />
            ) : (
              <View style={{marginBottom: 16}} />
            )}
          </>
        );
      }}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
    />
  );
};

export default ItemReview;

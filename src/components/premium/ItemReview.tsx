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
  item: {
    review_id: any;
    nickname: string;
    title: string;
    like_count: number;
    view_count: number;
    elapsed_time: string;
    star: number;
    rating: {
      total_rating: number;
    };
  };
};

// 프리미엄 후기 리스트: 다른 사람의 후기 리스트
const ItemReview: React.FC<PostProps> = ({item}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePremiumPost = () => {
    navigation.navigate('PremiumOthersScreen', {postList: [item]});
    // navigation.navigate('PremiumMyScreen', {reviewId: 8});
  };

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
    </>
  );
};

export default ItemReview;

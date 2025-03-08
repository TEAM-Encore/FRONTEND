import React from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {PremiumIcon} from '@/assets/icons/premium/PremiumIcon';
import {useNavigation} from '@react-navigation/native';
import ItemReviewStyles from './ItemReviewStyles';

type NavigationProp = {
  navigate: (screen: 'PremiumOthersPage') => void;
};

type PostProps = {
  postList: {
    id: any;
    elapsed_time: string;
    like_count: number;
    nickname: string;
    title: string;
    series: number;
    rating: number;
    total_rating: number;
    view_count: number;
    user_id: number;
  }[];
};

const ItemSearchReview: React.FC<PostProps> = ({postList}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePremiumPost = () => {
    navigation.navigate('PremiumOthersPage');
    // console.log('뿅');
  };

  console.log('postList: ', postList);

  return (
    <FlatList
      data={postList}
      keyExtractor={item => item.id}
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
                        총평 {parseFloat(item.rating.total_rating)}
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
    />
  );
};

export default ItemSearchReview;

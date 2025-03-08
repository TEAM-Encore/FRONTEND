import React from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {PremiumIcon} from '@/assets/icons/premium/PremiumIcon';
import {timeAgo} from '../../util/timeAgo';
import {useNavigation} from '@react-navigation/native';
import ItemReviewStyles from './ItemReviewStyles';

type NavigationProp = {
  navigate: (screen: 'PremiumOthersPage') => void;
};

type PostProps = {
  postList: {
    id: any;
    nickname: string;
    title: string;
    like_count: number;
    view_count: number;
    created_at: string;
    star: number;
  }[];
};

// 프리미엄 후기 리스트: 다른 사람의 후기 리스트
const ItemOthersReview: React.FC<PostProps> = ({postList}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePremiumPost = () => {
    navigation.navigate('PremiumOthersPage');
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
                      {timeAgo(item.created_at)}
                    </Text>
                  </View>

                  <View style={ItemReviewStyles.containerInfo}>
                    <View style={ItemReviewStyles.containerRow}>
                      <SvgXml xml={PremiumIcon.star} />
                      <Text style={ItemReviewStyles.textStar}>
                        총평 {item.star}
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

export default ItemOthersReview;

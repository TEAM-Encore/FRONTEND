import React, {useState} from 'react';
import {FlatList, View, Image, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import Colors from '@/assets/colors/Colors';
import {timeAgo} from '../../util/timeAgo';
import ItemPostStyles from './ItemPostStyles';

type NavigationProp = {
  navigate: (screen: 'PostPage') => void;
};

type PostProps = {
  postList: {
    id: any;
    nickname: string;
    title: string;
    content: string;
    like_count: number;
    comment_count: number;
    category: string;
    created_at: string;
    thumbnail: string;
  }[];
};

// 게시판에서 정보, 후기 탭에서 게시글 리스트 (카테고리 있는 버전)
const ItemPost: React.FC<PostProps> = ({postList}) => {
  const navigation = useNavigation<NavigationProp>();
  const [isLiked, setIsLiked] = useState(false);

  const categoryMapping: Record<
    string,
    {label: string; color: string; boxColor: string}
  > = {
    OPERA_GLASS_RENTAL: {
      label: '오페라 글라스',
      color: '#FFB200',
      boxColor: Colors.sub_01,
    },
    MUSICAL_TERMS: {
      label: '뮤지컬 용어',
      color: '#FF7163',
      boxColor: '#FFEAE8',
    },
    EVENTS: {label: '이벤트', color: '#FF853E', boxColor: '#FFE9DC'},
    VIEW_REVIEW: {
      label: '시야 후기',
      color: '#FFB200',
      boxColor: Colors.sub_01,
    },
    GOODS_REVIEW: {label: '굿즈 후기', color: '#FF853E', boxColor: '#FFE9DC'},
    PERFORMANCE_REVIEW: {
      label: '공연 감상',
      color: '#FF4FB3',
      boxColor: '#FFE6F4',
    },
  };

  const getMappedCategory = (category: string | undefined) => {
    // console.log('현재 카테고리: ', category);
    if (!category) return null;
    return categoryMapping[category];
  };

  return (
    <>
      <FlatList
        data={postList}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          const category = getMappedCategory(item.category);
          const thumbnail = item.thumbnail;

          return (
            <>
              <TouchableOpacity
                style={ItemPostStyles.container}
                onPress={navigation.navigate('PostPage', {
                  postId: item.id,
                })}>
                {category && (
                  <View
                    style={[
                      ItemPostStyles.containerCategory,
                      {backgroundColor: category?.boxColor},
                    ]}>
                    <Text
                      style={[
                        ItemPostStyles.textCategory,
                        {color: category?.color},
                      ]}>
                      {category?.label}
                    </Text>
                  </View>
                )}
                <View style={ItemPostStyles.containerRow}>
                  <View style={{flex: 1}}>
                    <Text
                      style={ItemPostStyles.textTitle}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.title}
                    </Text>
                    <Text
                      style={ItemPostStyles.textContent}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.content}
                    </Text>

                    <View style={ItemPostStyles.line} />

                    <View style={ItemPostStyles.containerInfo}>
                      <View style={ItemPostStyles.containerRow}>
                        <Text style={ItemPostStyles.textIsWriterDate}>
                          {item.nickname} ·
                        </Text>
                        <Text style={ItemPostStyles.textIsWriterDate}>
                          {timeAgo(item.created_at)}
                        </Text>
                      </View>

                      <View style={ItemPostStyles.containerRow}>
                        <SvgXml
                          xml={
                            isLiked ? PostIcon.fullLike : PostIcon.commentLike
                          }
                        />
                        <Text style={ItemPostStyles.textLikeComment}>
                          {item.like_count}
                        </Text>
                        <SvgXml xml={PostIcon.commentComment} />
                        <Text style={ItemPostStyles.textLikeComment}>
                          {item.comment_count}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {thumbnail && (
                    <Image
                      style={ItemPostStyles.image}
                      source={{uri: thumbnail}}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      />
      <View style={ItemPostStyles.line2} />
    </>
  );
};

export default ItemPost;

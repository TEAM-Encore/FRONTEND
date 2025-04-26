import React, {useState} from 'react';
import {FlatList, View, Image, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import {createAndDeleteLikePost} from '@/api/post.api';
import {timeAgo} from '../../util/timeAgo';
import ItemPostNoCategoryStyles from './ItemPostNoCategoryStyles';

type NavigationProp = {
  navigate: (screen: 'PostScreen', params: {postId: number}) => void;
};

type PostProps = {
  postList: {
    id: number;
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

const ItemPostNoCategory: React.FC<PostProps> = ({postList}) => {
  const navigation = useNavigation<NavigationProp>();
  const [isLiked, setIsLiked] = useState(false);

  const user_id = 1;

  const handleLike = async (user_id: number, post_id: number) => {
    try {
      await createAndDeleteLikePost(user_id, post_id);
      setIsLiked(prev => !prev);
    } catch (error) {
      console.error('좋아요 토글 오류:', error);
    }
  };

  return (
    <FlatList
      data={postList}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => {
        const thumbnail = item.thumbnail;

        return (
          <>
            <TouchableOpacity
              style={ItemPostNoCategoryStyles.container}
              onPress={() =>
                navigation.navigate('PostScreen', {
                  postId: item.id,
                })
              }>
              <View style={ItemPostNoCategoryStyles.containerRow}>
                <View style={{flex: 1}}>
                  <Text
                    style={ItemPostNoCategoryStyles.textTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.title}
                  </Text>
                  <Text
                    style={ItemPostNoCategoryStyles.textContent}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.content}
                  </Text>

                  <View style={ItemPostNoCategoryStyles.line} />

                  <View style={ItemPostNoCategoryStyles.containerInfo}>
                    <View style={ItemPostNoCategoryStyles.containerRow}>
                      <Text style={ItemPostNoCategoryStyles.textIsWriterDate}>
                        {item.nickname} ·
                      </Text>
                      <Text style={ItemPostNoCategoryStyles.textIsWriterDate}>
                        {timeAgo(item.created_at)}
                      </Text>
                    </View>

                    <View style={ItemPostNoCategoryStyles.containerRow}>
                      <TouchableOpacity
                        onPress={() => handleLike(user_id, item.id)}>
                        <SvgXml
                          xml={
                            isLiked ? PostIcon.fullLike : PostIcon.commentLike
                          }
                        />
                      </TouchableOpacity>
                      <Text style={ItemPostNoCategoryStyles.textLikeComment}>
                        {item.like_count}
                      </Text>
                      <SvgXml xml={PostIcon.commentComment} />
                      <Text style={ItemPostNoCategoryStyles.textLikeComment}>
                        {item.comment_count}
                      </Text>
                    </View>
                  </View>
                </View>
                {thumbnail && (
                  <Image
                    style={ItemPostNoCategoryStyles.image}
                    source={{uri: thumbnail}}
                  />
                )}
              </View>
            </TouchableOpacity>

            <View style={ItemPostNoCategoryStyles.containerRow}></View>
            {index < postList.length - 1 ? (
              <View style={ItemPostNoCategoryStyles.line2} />
            ) : (
              <View style={ItemPostNoCategoryStyles.line2} />
            )}
          </>
        );
      }}
      ListEmptyComponent={
        postList.length === 0 ? (
          <View style={ItemPostNoCategoryStyles.container}>
            <Text style={ItemPostNoCategoryStyles.emptyText}>
              검색 결과가 없습니다.
            </Text>
          </View>
        ) : null
      }
    />
  );
};

export default ItemPostNoCategory;

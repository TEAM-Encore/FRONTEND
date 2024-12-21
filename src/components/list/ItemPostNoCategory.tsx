import React, {useState} from 'react';
import {
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';
import {createLikePost, deleteLikePost} from '@/api/post.api';
import {timeAgo} from '../../util/timeAgo';

const {subhead03, body01, caption} = typography;

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

const ItemPostNoCategory: React.FC<PostProps> = ({postList}) => {
  const navigation = useNavigation<NavigationProp>();
  const [isLiked, setIsLiked] = useState(false);

  // 일단 사용자 아이디 1로 고정
  const user_id = 1;

  const handleLike = async (user_id: number, post_id: number) => {
    try {
      await createLikePost(user_id, post_id);
      setIsLiked(prev => !prev);
    } catch (error) {
      console.error('좋아요 토글 오류:', error);
    }
  };

  return (
    <FlatList
      data={postList}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => {
        const thumbnail = item.thumbnail;

        return (
          <>
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigation.navigate('PostPage', {
                  postId: item.id,
                })
              }>
              <View style={styles.containerRow}>
                <View style={{flex: 1}}>
                  <Text
                    style={styles.textTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.title}
                  </Text>
                  <Text
                    style={styles.textContent}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.content}
                  </Text>

                  <View style={styles.line} />

                  <View style={styles.containerInfo}>
                    <View style={styles.containerRow}>
                      <Text style={styles.textIsWriterDate}>
                        {item.nickname} ·
                      </Text>
                      <Text style={styles.textIsWriterDate}>
                        {timeAgo(item.created_at)}
                      </Text>
                    </View>

                    <View style={styles.containerRow}>
                      <TouchableOpacity
                        onPress={() => handleLike(user_id, item.id)}>
                        <SvgXml
                          xml={
                            isLiked ? PostIcon.fullLike : PostIcon.commentLike
                          }
                        />
                      </TouchableOpacity>
                      <Text style={styles.textLikeComment}>
                        {item.like_count}
                      </Text>
                      <SvgXml xml={PostIcon.commentComment} />
                      <Text style={styles.textLikeComment}>
                        {item.comment_count}
                      </Text>
                    </View>
                  </View>
                </View>
                {thumbnail && (
                  <Image style={styles.image} source={{uri: thumbnail}} />
                )}
              </View>
            </TouchableOpacity>

            <View style={styles.containerRow}></View>
            {index < postList.length - 1 ? (
              <View style={styles.line2} />
            ) : (
              <View style={{marginBottom: 16}} />
            )}
          </>
        );
      }}
      ListEmptyComponent={
        postList.length === 0 ? (
          <View style={styles.container}>
            <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerCategory: {
    height: 24,
    borderRadius: 4.27,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFE9DC',
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginBottom: 22,
  },
  textCategory: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.3,
  },
  textTitle: {
    ...subhead03,
    marginBottom: 4,
  },
  textContent: {
    ...body01,
    color: Colors.gray_09,
  },
  containerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textIsWriterDate: {
    ...caption,
    color: Colors.gray_09,
  },
  textLikeComment: {
    ...caption,
    color: '#878787',
    marginLeft: 4,
    marginRight: 4,
  },
  image: {
    width: 84,
    height: 92,
    borderRadius: 9,
    marginLeft: 36,
  },
  line: {
    height: 0.75,
    backgroundColor: Colors.gray_04,
    marginVertical: 14,
  },
  line2: {
    height: 4,
    backgroundColor: Colors.gray_03,
    marginVertical: 16,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.gray_06,
  },
});

export default ItemPostNoCategory;

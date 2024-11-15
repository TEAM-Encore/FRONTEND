import React from 'react';
import {
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';

const {subhead03, body01, caption} = typography;

type NavigationProp = {
  navigate: (screen: 'PostPage') => void;
};

type PostProps = {
  postList: {
    id: string;
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

const ItemPost: React.FC<PostProps> = ({postList}) => {
  const navigation = useNavigation<NavigationProp>();

  const getTimeDifference = (created_at: string): string => {
    const created = moment(created_at, moment.ISO_8601);

    // 날짜 유효성 검증
    if (!created.isValid()) {
      console.error('Invalid date format:', created_at);
      return '알 수 없음';
    }

    const now = moment();
    const duration = moment.duration(now.diff(created));

    const minutes = duration.asMinutes();
    const hours = duration.asHours();
    const days = duration.asDays();

    if (minutes < 60) {
      // 60분 이내라면 분 단위로 표시
      return ` ${Math.floor(minutes)}분 전`;
    } else if (hours < 24) {
      // 24시간 이내라면 시간 단위로 표시
      return ` ${Math.floor(hours)}시간 전`;
    } else {
      // 24시간 이상이라면 일 단위로 표시
      return ` ${Math.floor(days)}일 전`;
    }
  };

  const categoryMapping: Record<string, {color: string; boxColor: string}> = {
    '오페라 글래스': {
      color: '#FFB200',
      boxColor: Colors.sub_01,
    },
    '뮤지컬 용어': {
      color: '#FF7163',
      boxColor: '#FFEAE8',
    },
    이벤트: {color: '#FF853E', boxColor: '#FFE9DC'},
    '시야 후기': {
      color: '#FFB200',
      boxColor: Colors.sub_01,
    },
    '굿즈 후기': {color: '#FF853E', boxColor: '#FFE9DC'},
    '공연 감상 후기': {
      color: '#FF4FB3',
      boxColor: '#FFE6F4',
    },
  };

  const getMappedCategory = (category: string | undefined) => {
    if (!category) return null;
    return categoryMapping[category];
  };

  return (
    <FlatList
      data={postList}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => {
        const category = getMappedCategory(item.category);
        console.log('item.category: ', item);
        return (
          <>
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigation.navigate('PostPage', {postId: item.id})
              }>
              {item.category !== '카테고리 미선택' && (
                <View
                  style={[
                    styles.containerCategory,
                    {backgroundColor: category?.boxColor},
                  ]}>
                  <Text style={[styles.textCategory, {color: category?.color}]}>
                    {item.category}
                  </Text>
                </View>
              )}
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
                        {getTimeDifference(item.created_at)}
                      </Text>
                    </View>

                    <View style={styles.containerRow}>
                      <SvgXml xml={PostIcon.commentLike} />
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
                {item.thumbnail && (
                  <Image style={styles.image} source={{uri: item.thumbnail}} />
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
});

export default ItemPost;

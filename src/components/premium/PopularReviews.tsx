import React, {useRef, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ListRenderItem,
  Image,
  StyleSheet,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import {PremiumIcon} from '@/assets/icons/premium/PremiumIcon';

import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';

const {subhead02, caption} = typography;

const windowWidth = Dimensions.get('window').width;
const cardSize = {width: 225, height: 208};
const offset = cardSize.width + 10;

type CarouselItem = {
  id: string;
  profile: any;
  nickname: string;
  title: string;
  content: string;
  place: string;
  actor: string;
  color: string;
  iconColor: string;
  likeCount: number;
};

const data: CarouselItem[] = [
  {
    id: '1',
    profile: require('@/assets/images/board/commentFace.png'),
    nickname: '뮤사랑',
    title: '위키드 5회차 관람 후기',
    content:
      '이번 위키드는 제 인생 최고였습니다. 같은 넘버를 반복해서 들었지만...',
    place: '샤롯데 시어터 B구역 6열 4번',
    actor: '전동석 카이 정선아',
    color: '#EDDCFF',
    iconColor: '#A765EE',
    likeCount: 40,
  },
  {
    id: '2',
    profile: require('@/assets/images/board/commentFace.png'),
    nickname: '뮤사랑',
    title: '프랑켄 회전문 관람 후기',
    content:
      '이번 위키드는 제 인생 최고였습니다. 같은 넘버를 반복해서 들었지만...',
    place: '샤롯데 시어터 B구역 6열 4번',
    actor: '전동석 카이 정선아',
    color: '#FFF1BB',
    iconColor: '#FFB200',
    likeCount: 40,
  },
  {
    id: '3',
    profile: require('@/assets/images/board/commentFace.png'),
    nickname: '뮤사랑',
    title: '프랑켄 회전문 관람 후기',
    content:
      '이번 위키드는 제 인생 최고였습니다. 같은 넘버를 반복해서 들었지만...',
    place: '샤롯데 시어터 B구역 6열 4번',
    actor: '전동석 카이 정선아',
    color: '#FFDFD6',
    iconColor: '#FF7259',
    likeCount: 40,
  },
  {
    id: '4',
    profile: require('@/assets/images/board/commentFace.png'),
    nickname: '뮤사랑',
    title: '위키드 5회차 관람 후기',
    content:
      '이번 위키드는 제 인생 최고였습니다. 같은 넘버를 반복해서 들었지만...',
    place: '샤롯데 시어터 B구역 6열 4번',
    actor: '전동석 카이 정선아',
    color: '#EDDCFF',
    iconColor: '#A765EE',
    likeCount: 40,
  },
  {
    id: '5',
    profile: require('@/assets/images/board/commentFace.png'),
    nickname: '뮤사랑',
    title: '프랑켄 회전문 관람 후기',
    content:
      '이번 위키드는 제 인생 최고였습니다. 같은 넘버를 반복해서 들었지만...',
    place: '샤롯데 시어터 B구역 6열 4번',
    actor: '전동석 카이 정선아',
    color: '#FFF1BB',
    iconColor: '#FFB200',
    likeCount: 40,
  },
];

const PopularReviews: React.FC = () => {
  const flatListRef = useRef<FlatList<CarouselItem>>(null);

  const snapToOffsets = useMemo(
    () => Array.from(Array(data.length)).map((_, index) => index * offset),
    [data],
  );

  const renderItem: ListRenderItem<CarouselItem> = ({item}) => (
    <View
      style={[styles.containerPopularReview, {backgroundColor: item.color}]}>
      <View style={[styles.containerRow, {marginBottom: 16}]}>
        <Image style={styles.imageWriter} source={item.profile} />
        <Text style={styles.textWriter} numberOfLines={2} ellipsizeMode="tail">
          {item.nickname}
        </Text>
        <SvgXml xml={PostIcon.Badge} />
      </View>
      <Text style={styles.textTitle} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={styles.textContent} numberOfLines={2} ellipsizeMode="tail">
        {item.content}
      </Text>
      <View style={styles.containerRow}>
        <SvgXml xml={PremiumIcon.place(item.iconColor)} />
        <Text
          style={styles.textPlaceAndActor}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.place}
        </Text>
      </View>
      <View style={styles.containerRow}>
        <SvgXml xml={PremiumIcon.actor(item.iconColor)} />
        <Text
          style={styles.textPlaceAndActor}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.actor}
        </Text>
      </View>
      <View style={[styles.containerRow, {marginTop: 9}]}>
        <SvgXml xml={PremiumIcon.like} />
        <Text style={styles.textLikeCount}>{item.likeCount}</Text>
      </View>
    </View>
  );

  return (
    <View style={{width: windowWidth}}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        snapToOffsets={snapToOffsets}
        decelerationRate="fast"
        contentContainerStyle={{paddingHorizontal: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerPopularReview: {
    width: cardSize.width,
    height: cardSize.height,
    borderRadius: 8,
    marginRight: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWriter: {
    width: 24,
    height: 24,
  },
  textWriter: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    lineHeight: 28,
    letterSpacing: -0.3,
    marginLeft: 8,
    marginRight: 4,
  },
  textTitle: {
    ...subhead02,
    color: Colors.gray_12,
    marginBottom: 8,
  },
  textContent: {
    ...caption,
    color: Colors.gray_10,
    marginBottom: 9,
  },
  textPlaceAndActor: {
    fontFamily: 'Pretendard-Regualr',
    fontSize: 10,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: Colors.gray_08,
    marginLeft: 6,
  },
  textLikeCount: {
    ...caption,
    color: Colors.gray_08,
    marginLeft: 4,
  },
});
export default PopularReviews;

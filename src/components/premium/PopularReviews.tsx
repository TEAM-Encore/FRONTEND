import React, {useRef, useMemo, useEffect} from 'react';
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

const PopularReviews: React.FC<{popularReviews: any[]}> = ({
  popularReviews,
}) => {
  const flatListRef = useRef<FlatList<any>>(null);

  const colors = [
    {
      color: '#EDDCFF',
      iconColor: '#A765EE',
      profile: require('@/assets/images/board/writerFacePurple.png'),
    },
    {
      color: '#FFF1BB',
      iconColor: '#FFB200',
      profile: require('@/assets/images/board/commentFace.png'),
    },
    {
      color: '#FFDFD6',
      iconColor: '#FF7259',
      profile: require('@/assets/images/board/writerFaceRed.png'),
    },
  ];

  const dataWithColors = popularReviews.map((item, index) => ({
    ...item,
    ...colors[index % colors.length],
  }));

  const snapToOffsets = useMemo(() => {
    return Array.from(Array(popularReviews.length)).map(
      (_, index) => index * offset,
    );
  }, [popularReviews]);

  const renderItem: ListRenderItem<any> = ({item}) => (
    <View
      style={[styles.containerPopularReview, {backgroundColor: item.color}]}>
      <View style={[styles.containerRow, {marginBottom: 16}]}>
        <Image style={styles.imageWriter} source={item.profile} />
        <Text style={styles.textWriter} numberOfLines={2} ellipsizeMode="tail">
          {item.nickname}
        </Text>
        <SvgXml xml={PostIcon.Badge} />
      </View>
      <Text style={styles.textTitle} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={styles.textContent} numberOfLines={2} ellipsizeMode="tail">
        {item.rating.rating_review}
      </Text>
      <View style={styles.containerRow}>
        <SvgXml xml={PremiumIcon.place(item.iconColor)} />
        <Text
          style={styles.textPlaceAndActor}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.location} {item.seat}
        </Text>
      </View>
      <View style={styles.containerRow}>
        <SvgXml xml={PremiumIcon.actor(item.iconColor)} />
        <Text
          style={styles.textPlaceAndActor}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.actors}
        </Text>
      </View>
      <View style={[styles.containerRow, {marginTop: 9}]}>
        <SvgXml xml={PremiumIcon.like} />
        <Text style={styles.textLikeCount}>
          {item.like_data.like_count_res.total_like_count}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{width: windowWidth}}>
      <FlatList
        ref={flatListRef}
        data={dataWithColors}
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

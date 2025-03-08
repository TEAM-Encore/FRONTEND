import React, {useRef, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ListRenderItem,
  Image,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import {PremiumIcon} from '@/assets/icons/premium/PremiumIcon';
import ItemReviewStyles from './ItemReviewStyles';

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
      style={[
        ItemReviewStyles.containerPopularReview,
        {backgroundColor: item.color},
      ]}>
      <View style={[ItemReviewStyles.containerRow, {marginBottom: 16}]}>
        <Image style={ItemReviewStyles.imageWriter} source={item.profile} />
        <Text
          style={ItemReviewStyles.textWriter}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.nickname}
        </Text>
        <SvgXml xml={PostIcon.Badge} />
      </View>
      <Text
        style={ItemReviewStyles.popularTextTitle}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text
        style={ItemReviewStyles.textContent}
        numberOfLines={2}
        ellipsizeMode="tail">
        {item.rating.rating_review}
      </Text>
      <View style={ItemReviewStyles.containerRow}>
        <SvgXml xml={PremiumIcon.place(item.iconColor)} />
        <Text
          style={ItemReviewStyles.textPlaceAndActor}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.location} {item.seat}
        </Text>
      </View>
      <View style={ItemReviewStyles.containerRow}>
        <SvgXml xml={PremiumIcon.actor(item.iconColor)} />
        <Text
          style={ItemReviewStyles.textPlaceAndActor}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.actors}
        </Text>
      </View>
      <View style={[ItemReviewStyles.containerRow, {marginTop: 9}]}>
        <SvgXml xml={PremiumIcon.like} />
        <Text style={ItemReviewStyles.textLikeCount}>
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

export default PopularReviews;

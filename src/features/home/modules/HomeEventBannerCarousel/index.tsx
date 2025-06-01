import HomeStyles from '@/app/home/HomeScreen/style';
import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import React, {useCallback} from 'react';
import {Text, useWindowDimensions} from 'react-native';
import {View} from 'react-native';
import Carousel, {CarouselRenderItem} from 'react-native-reanimated-carousel';
import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';

const eventBanner = [
  {
    id: 1,
    icon: HomeIcon.bannerHeart,
    color: '#EDDCFF',
    subColor: '#D6AFFF',
    title: '댓글로 마음 전하면 30포인트',
    subTitle: '댓글 3번 작성하기',
  },
  {
    id: 2,
    icon: HomeIcon.bannerGift,
    color: '#FFF8DB',
    subColor: '#FFF1BB',
    title: '오늘의 깜짝 선물 10포인트',
    subTitle: '로그인 후 20분 경과 시',
  },
  {
    id: 3,
    icon: HomeIcon.bannerTrophy,
    color: '#FFDFD6',
    subColor: '#FFB19B',
    title: '댓글로 마음 전하면 30포인트',
    subTitle: '좋아요 10개 이상 누를 시',
  },
];

function HomeEventBannerCarousel() {
  const {width} = useWindowDimensions();

  const renderItem: CarouselRenderItem<(typeof eventBanner)[number]> =
    useCallback(({item}) => {
      return (
        <View
          style={[
            HomeStyles.eventBanner,
            {width, backgroundColor: item.color},
          ]}>
          <SvgXml xml={item.icon} />
          <View style={{marginLeft: 18}}>
            <Text style={HomeStyles.textEventBannerTitle}>{item.title}</Text>
            <Text style={HomeStyles.textEventBannerSubTitle}>
              {item.subTitle}
            </Text>
          </View>
          <View
            style={[
              HomeStyles.eventBannerPagination,
              {backgroundColor: item.subColor},
            ]}>
            <Text style={HomeStyles.textEventBannerPagination}>
              {item.id}/3
            </Text>
          </View>
        </View>
      );
    }, []);

  return (
    <Root>
      <Carousel
        data={eventBanner}
        renderItem={renderItem}
        width={width}
        height={94}
      />
    </Root>
  );
}

export default HomeEventBannerCarousel;

const Root = styled.View`
  padding: 20px 0;
`;

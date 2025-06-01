import HomeStyles from '@/app/home/HomeScreen/style';
import React, {useCallback, useRef} from 'react';
import {useWindowDimensions, View} from 'react-native';
import HomeCarouselItem from '../HomeCarouselItem';
import Carousel, {
  CarouselRenderItem,
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import {useTheme} from 'styled-components';

const carouselTicketList = [
  {
    id: 1,
    image: require('@/assets/images/home/ImageCarouselColor.png'),
  },
  {
    id: 2,
    image: require('@/assets/images/home/ImageCarousel.png'),
  },
  {
    id: 3,
    image: require('@/assets/images/home/ImageCarouselColor2.png'),
  },
];

function HomeCarousel() {
  const theme = useTheme();
  const {width} = useWindowDimensions();
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const renderItem: CarouselRenderItem<(typeof carouselTicketList)[number]> =
    useCallback(
      ({item}) => <HomeCarouselItem id={item.id} image={item.image} />,
      [],
    );

  return (
    <View style={HomeStyles.containerHeader}>
      <Carousel
        defaultIndex={1}
        data={carouselTicketList}
        renderItem={renderItem}
        width={width}
        height={180}
        onProgressChange={progress}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 100,
        }}
      />

      <Pagination.Basic
        progress={progress}
        data={carouselTicketList}
        dotStyle={{
          borderRadius: 50,
          width: 6,
          height: 6,
          backgroundColor: theme.gray.gray_05,
        }}
        activeDotStyle={{
          backgroundColor: theme.system.sub_04,
        }}
        containerStyle={{gap: 7, marginTop: 10}}
        onPress={onPressPagination}
      />
    </View>
  );
}

export default HomeCarousel;

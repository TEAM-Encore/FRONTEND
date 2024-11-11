import React, {useState, useRef, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ListRenderItem,
  Image,
} from 'react-native';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import {SvgXml} from 'react-native-svg';

import Colors from '@/assets/colors/Colors';
import EntireStyles from '@/pages/dashboard/entire/EntireStyles';

const windowWidth = Dimensions.get('window').width;
const margin = 5; // 각 카드들 간격
const cardSize = {width: 335, height: 128};
const offset = cardSize.width + 15; // 넘길 때 간격
type CarouselItem = {
  id: string;
  title: string;
  comments: number;
  likes: number;
  color: string;
};

const data: CarouselItem[] = [
  {
    id: '1',
    title:
      '샤롯데시어터 오페라글라스 대여 현황 어떤가요?샤롯데시어터 오페라글라스 대여 현황 어떤가요?샤롯데시어터 오페라글라스 대여 현황 어떤가요?',
    comments: 5,
    likes: 10,
    color: Colors.sub_02,
  },
  {
    id: '2',
    title: '샤롯데시어터 오페라글라스 대여 현황 어떤가요?',
    comments: 5,
    likes: 10,
    color: '#FFD4C8',
  },
  {
    id: '3',
    title: '샤롯데시어터 오페라글라스 대여 현황 어떤가요?',
    comments: 5,
    likes: 10,
    color: '#FFE4BF',
  },
];

const CarouselHottest: React.FC = () => {
  //   const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<CarouselItem>>(null);

  // 스냅 오프셋 설정
  const snapToOffsets = useMemo(
    () => Array.from(Array(data.length)).map((_, index) => index * offset),
    [data],
  );

  // renderItem 함수 타입 정의
  const renderItem: ListRenderItem<CarouselItem> = ({item}) => (
    <View
      style={{
        width: cardSize.width,
        height: cardSize.height,
        backgroundColor: item.color,
        borderRadius: 5,
        padding: 16,
        marginHorizontal: margin,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flex: 1}}>
        <Text
          style={EntireStyles.hottest_title2}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.title}
        </Text>
        <View style={EntireStyles.footer}>
          <SvgXml xml={DashboardIcon.message} />
          <Text style={EntireStyles.hottest_icon}> {item.comments}</Text>

          <SvgXml xml={DashboardIcon.heart} />
          <Text style={EntireStyles.hottest_icon}> {item.likes}</Text>
        </View>
      </View>
      <Image
        source={require('@/assets/logo/logo3.png')}
        style={{
          width: 131.19,
          height: 73,
          marginTop: 45,
          marginBottom: 10,
        }}
      />
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
export default CarouselHottest;

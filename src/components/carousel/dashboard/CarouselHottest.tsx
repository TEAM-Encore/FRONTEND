import React, {useRef, useMemo} from 'react';
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
import EntireStyles from '@/screens/dashboard/entire/EntireStyles';

const windowWidth = Dimensions.get('window').width;
const cardSize = {width: 335, height: 128};
const offset = cardSize.width + 10; // 넘길 때 간격
type CarouselItem = {
  id: string;
  title: string;
  comments: number;
  likes: number;
  color: string;
  src: any;
};

// 캐러셀 아이템 가라 데이터로 추후에 api 연결 필요
const data: CarouselItem[] = [
  {
    id: '1',
    title: '최고의 넘버, 어떤 곡이신가요?',
    comments: 5,
    likes: 10,
    color: '#EDDCFF',
    src: require('@/assets/logo/logo5.png'),
  },
  {
    id: '2',
    title: '샤롯데시어터 오페라글라스 대여 현황 어떤가요?',
    comments: 5,
    likes: 10,
    color: '#FFF1BB',
    src: require('@/assets/logo/logo6.png'),
  },
  {
    id: '3',
    title: '킹키부츠 2회극 후기',
    comments: 5,
    likes: 10,
    color: '#FFDFD6',
    src: require('@/assets/logo/logo7.png'),
  },
];

// 게시판 내 가장 인기 있는 게시글 캐러셀
const CarouselHottest: React.FC = () => {
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
        marginRight: 10,
        flexDirection: 'row',
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
          <SvgXml xml={DashboardIcon.heart} />
          <Text style={EntireStyles.hottest_icon}> {item.likes}</Text>
          <SvgXml xml={DashboardIcon.message} />
          <Text style={EntireStyles.hottest_icon}> {item.comments}</Text>
        </View>
      </View>
      <Image
        source={item.src}
        style={{
          width: 110,
          height: 75,
          alignSelf: 'flex-end',
          marginRight: 13,
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

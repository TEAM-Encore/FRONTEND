import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
} from 'react-native';

import HomeStyles from '@/pages/home/HomeStyles';
import Colors from '@/assets/colors/Colors';

import IconTitle from '@/components/home/IconTitle';
import IconSearch from '@/components/home/IconSearch';
import IconNotification from '@/components/home/IconNotification';
import CarouselTicket from '@/components/home/CarouselTicket';
import IconLike from '@/components/home/IconLike';
import IconComment from '@/components/home/IconComment';
import IconDate from '@/components/home/IconDate';
import IconActor from '@/components/home/IconActor';

type HomePageProps = {};

const CARD_WIDTH = 290;
const PADDING = 6;

const Ticket = ({title}: {title: string}) => (
  <View style={HomeStyles.containerCarouselTicket}>
    <CarouselTicket />
    <View style={HomeStyles.containerCarouselTicketTitle}>
      <Text style={HomeStyles.textCarouselTicketTitle}>{title}</Text>
    </View>
  </View>
);

const HomePage: React.FC<HomePageProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const flatListRef = useRef<FlatList<any>>(null);

  const carouselTicketList = [
    {id: '1', title: '개봉 예정 1'},
    {id: '2', title: '개봉 예정 2'},
    {id: '3', title: '개봉 예정 3'},
    {id: '4', title: '개봉 예정 4'},
    {id: '5', title: '개봉 예정 5'},
  ];

  const circularCarouselTicketList = [
    {id: '0', title: '개봉 예정 5'},
    ...carouselTicketList,
    {id: '6', title: '개봉 예정 1'},
  ];

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / (CARD_WIDTH + PADDING * 2));
    setCurrentIndex(newIndex);

    if (newIndex === 0) {
      flatListRef.current?.scrollToIndex({
        index: carouselTicketList.length,
        animated: false,
      });
      setCurrentIndex(carouselTicketList.length);
    } else if (newIndex === circularCarouselTicketList.length - 1) {
      flatListRef.current?.scrollToIndex({index: 1, animated: false});
      setCurrentIndex(1);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const premiumReviewRanking = [
    {id: '1', title: '위키드 5회차 관람 후기'},
    {id: '2', title: '위키드 5회차 관람 후기'},
    {id: '3', title: '위키드 5회차 관람 후기'},
  ];

  const bestMusicals = [
    {
      id: '1',
      image: require('@/assets/images/Musical1.jpeg'),
      title: '벤자민 버튼',
      date: '24.06.21~24.07.21',
      location: '샤롯데시어터',
    },
    {
      id: '2',
      image: require('@/assets/images/Musical2.jpeg'),
      title: '카르밀라',
      date: '24.06.21~24.07.21',
      location: '샤롯데시어터',
    },
    {
      id: '3',
      image: require('@/assets/images/Musical3.jpeg'),
      title: '몬테크리스토',
      date: '24.06.21~24.07.21',
      location: '샤롯데시어터',
    },
  ];

  const notReleaseMusicals = [
    {
      id: '1',
      image: require('@/assets/images/Musical4.jpeg'),
      title: '엘리자벳',
      date: '24.06.21~24.07.21',
      location: '샤롯데시어터',
    },
    {
      id: '2',
      image: require('@/assets/images/Musical5.jpeg'),
      title: '미오 프라텔로',
      date: '24.06.21~24.07.21',
      location: '샤롯데시어터',
    },
    {
      id: '3',
      image: require('@/assets/images/Musical6.jpeg'),
      title: '비더슈탄트',
      date: '24.06.21~24.07.21',
      location: '샤롯데시어터',
    },
  ];

  const point = [
    {
      id: '1',
      image: require('@/assets/images/IconPoint.png'),
      title: '+10 포인트',
      content: '댓글 3번 작성하기',
    },
    {
      id: '2',
      image: require('@/assets/images/IconPoint.png'),
      title: '+10 포인트',
      content: '댓글 3번 작성하기',
    },
    {
      id: '3',
      image: require('@/assets/images/IconPoint.png'),
      title: '+10 포인트',
      content: '댓글 3번 작성하기',
    },
  ];

  return (
    <SafeAreaView style={HomeStyles.container}>
      <ScrollView>
        <View style={HomeStyles.containerHeader}>
          <View style={HomeStyles.containerIcons}>
            <IconTitle />
            <View style={HomeStyles.containerRow}>
              <IconSearch style={{marginRight: 20}} />
              <IconNotification />
            </View>
          </View>
          <View style={HomeStyles.containerRow}>
            <FlatList
              ref={flatListRef}
              data={circularCarouselTicketList}
              renderItem={({item}) => <Ticket title={item.title} />}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              snapToInterval={CARD_WIDTH + PADDING * 2}
              decelerationRate="fast"
              onMomentumScrollEnd={handleMomentumScrollEnd}
              scrollEventThrottle={16}
            />
          </View>
          <View style={HomeStyles.containerPagination}>
            {carouselTicketList.map((_, index) => (
              <View
                key={index}
                style={[
                  HomeStyles.paginationDot,
                  index === currentIndex - 1
                    ? HomeStyles.activeDot
                    : HomeStyles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={[HomeStyles.containerTitle, {marginTop: 33}]}>
          <Text style={HomeStyles.textTitle}>최근 관람한 공연</Text>
          <Text style={HomeStyles.textWriteReview}>리뷰쓰기 {'>'}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={HomeStyles.containerTicket}>
            <View style={HomeStyles.ticket1}>
              <Text style={HomeStyles.textTicketTitle}>뮤지컬[위키드]</Text>
              <View style={HomeStyles.containerRow}>
                <IconDate />
                <Text style={HomeStyles.textTicketDate}>2024.06.21</Text>
              </View>
              <View style={HomeStyles.containerRow}>
                <IconActor />
                <Text style={HomeStyles.textTicketActor}>
                  우선영 염지은 하은영 윤혜원
                </Text>
              </View>
            </View>
            <Image
              style={HomeStyles.ticket2}
              source={require('@/assets/images/Musical1.jpeg')}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={[HomeStyles.containerTitle, {marginBottom: 16}]}>
          <Text style={HomeStyles.textTitle}>프리미엄 리뷰</Text>
          <Text style={HomeStyles.textWriteReview}>전체보기 {'>'}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          {premiumReviewRanking.map((review, index) => (
            <View key={review.id} style={HomeStyles.containerPremiumReviews}>
              <View style={HomeStyles.containerRow}>
                <View
                  style={[
                    HomeStyles.containerPremiumReviewRanking,
                    {
                      backgroundColor:
                        index === 0
                          ? Colors.primary_01
                          : index === 1
                          ? Colors.primary_03
                          : Colors.primary_05,
                    },
                  ]}>
                  <Text style={HomeStyles.textPremiumReviewRanking}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={HomeStyles.textPremiumReviewTitle}>
                  {review.title}
                </Text>
              </View>
              <View style={HomeStyles.containerRow}>
                <IconLike />
                <Text style={HomeStyles.textPremiumReviewLike}>40</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={HomeStyles.containerTitle}>
          <Text style={HomeStyles.textTitle}>오늘의 BEST</Text>
          <Text style={HomeStyles.textWriteReview}>전체보기 {'>'}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={HomeStyles.containerBest}>
            <Text style={HomeStyles.textBest}>
              샤롯데시어터 오페라글라스 대여 현황 어떤가요?
            </Text>
            <IconComment />
            <IconLike />
          </View>
        </View>

        <View style={HomeStyles.containerTitle}>
          <Text style={HomeStyles.textTitle}>이달의 인기 뮤지컬</Text>
        </View>
        <FlatList
          style={{marginHorizontal: 12.5}}
          ref={flatListRef}
          data={bestMusicals}
          renderItem={({item}) => (
            <View style={{flexDirection: 'column', marginHorizontal: 7.5}}>
              <Image style={HomeStyles.imageMusical} source={item.image} />
              <Text style={HomeStyles.textMusicalTitle}>{item.title}</Text>
              <Text style={HomeStyles.textMusicalDateLocation}>
                {item.date}
              </Text>
              <Text style={HomeStyles.textMusicalDateLocation}>
                {item.location}
              </Text>
            </View>
          )}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <View style={HomeStyles.containerTitle}>
          <Text style={HomeStyles.textTitle}>개봉 예정 뮤지컬</Text>
        </View>
        <FlatList
          style={{marginHorizontal: 12.5}}
          ref={flatListRef}
          data={notReleaseMusicals}
          renderItem={({item}) => (
            <View style={{flexDirection: 'column', marginHorizontal: 7.5}}>
              <Image style={HomeStyles.imageMusical} source={item.image} />
              <Text style={HomeStyles.textMusicalTitle}>{item.title}</Text>
              <Text style={HomeStyles.textMusicalDateLocation}>
                {item.date}
              </Text>
              <Text style={HomeStyles.textMusicalDateLocation}>
                {item.location}
              </Text>
            </View>
          )}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Image
          style={{width: '100%', marginTop: 39}}
          source={require('@/assets/images/ExampleAd.png')}
        />

        <View style={[HomeStyles.containerTitle, {marginBottom: 12.5}]}>
          <Text style={HomeStyles.textTitle}>놓칠 수 없는 포인트</Text>
          <Text style={HomeStyles.textWriteReview}>전체보기 {'>'}</Text>
        </View>
        <View style={{alignItems: 'center', marginBottom: 16}}>
          {point.map(point => (
            <View key={point.id} style={HomeStyles.containerPoint}>
              <View style={HomeStyles.containerRow}>
                <Image source={point.image} />
                <View>
                  <Text style={HomeStyles.textPointTitle}>{point.title}</Text>
                  <Text style={HomeStyles.textPointContent}>
                    {point.content}
                  </Text>
                </View>
              </View>
              <View style={HomeStyles.containerPointShortcut}>
                <Text style={HomeStyles.textPointShortcut}>바로가기</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

import React, {useState, useRef, useMemo, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import HomeStyles from '@/pages/home/HomeStyles';
import {SvgXml} from 'react-native-svg';
import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import IconSearch from '@/assets/icons/home/IconSearch';
import IconNotification from '@/assets/icons/home/IconNotification';
import IconLike from '@/assets/icons/home/IconLike';
import IconComment from '@/assets/icons/home/IconComment';
import ToolTipModal from '@/components/alertModal/ToolTipModal';
import {getTicketBookList} from '@/api/ticketbook.api';
import {getPopularPremiumReviews} from '@/api/premium.api';

type HomePageProps = {};

type RootStackParamList = {
  WritePage: undefined;
  HomeSearchDefaultPage: undefined;
  HomeBannerPage: {bannerId: number};
  TicketDetailPage: {ticket: TicketItem};
};

type TicketItem = {
  id: number;
  musical_title: string;
  actors: string[];
  location: string;
  seat: string;
  series: string;
  total_rating: number;
  viewed_date: string;
  has_review?: boolean;
  user_id?: number;
};

type PopularReviewItem = {
  review_id: number;
  title: string;
  like_data: {
    like_count_res: {
      total_like_count: number;
    };
  };
};

const CARD_WIDTH = 290;
const PADDING = 6;

const HomePage: React.FC<HomePageProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [eventCurrentIndex, setEventCurrentIndex] = useState(1);
  const bannerRef = useRef<FlatList<any>>(null);
  const eventBannerRef = useRef<FlatList<any>>(null);
  const flatListRef = useRef<FlatList<any>>(null);
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [reviewModalPosition, setReviewModalPosition] = useState({
    top: 0,
    right: 0,
  });
  const [reviewModalVisible, setReviewModalVisible] = useState(true);
  const [ticketList, setTicketList] = useState<TicketItem | null>(null);
  const [popularPremiumReviews, setPopularPremiumReviews] = useState<
    PopularReviewItem[]
  >([]);

  const carouselTicketList = useMemo(
    () => [
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
    ],
    [],
  );

  const circularCarouselTicketList = useMemo(
    () => [
      carouselTicketList[carouselTicketList.length - 1],
      ...carouselTicketList,
      carouselTicketList[0],
    ],
    [carouselTicketList],
  );

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / (CARD_WIDTH + PADDING * 2));

    if (newIndex === 0) {
      setCurrentIndex(carouselTicketList.length - 1);
      bannerRef.current?.scrollToIndex({
        index: circularCarouselTicketList.length - 2,
        animated: false,
      });
    } else if (newIndex === circularCarouselTicketList.length - 1) {
      setCurrentIndex(0);
      bannerRef.current?.scrollToIndex({index: 1, animated: false});
    } else {
      setCurrentIndex(newIndex - 1);
    }
  };

  const Ticket = ({image, bannerId}: {image: any; bannerId: number}) => (
    <TouchableOpacity
      style={HomeStyles.containerCarouselTicket}
      onPress={() =>
        navigation.navigate('HomeBannerPage', {bannerId: bannerId})
      }>
      <Image style={{width: 290, height: 170}} source={image} />
    </TouchableOpacity>
  );

  const bestMusicals = [
    {
      id: 1,
      image: require('@/assets/images/home/Musical1.jpeg'),
      title: '벤자민 버튼',
      date: '24.06.21~24.07.21',
      location: '샤롯데시어터',
    },
    {
      id: 2,
      image: require('@/assets/images/home/Musical2.jpeg'),
      title: '카르밀라',
      date: '24.06.21~24.07.21',
      location: '샤롯데시어터',
    },
    {
      id: 3,
      image: require('@/assets/images/home/Musical3.jpeg'),
      title: '몬테크리스토',
      date: '24.06.21~24.07.21',
      location: '샤롯데시어터',
    },
  ];

  const notReleaseMusicals = [
    {
      id: 1,
      image: require('@/assets/images/home/Musical4.jpeg'),
      title: '엘리자벳',
      date: '24.06.21~24.07.21',
      location: '샤롯데시어터',
    },
    {
      id: 2,
      image: require('@/assets/images/home/Musical5.jpeg'),
      title: '미오 프라텔로',
      date: '24.06.21~24.07.21',
      location: '샤롯데시어터',
    },
    {
      id: 3,
      image: require('@/assets/images/home/Musical6.jpeg'),
      title: '비더슈탄트',
      date: '24.06.21~24.07.21',
      location: '샤롯데시어터',
    },
  ];

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

  const circularEventBannerList = useMemo(() => {
    return [
      eventBanner[eventBanner.length - 1],
      ...eventBanner,
      eventBanner[0],
    ];
  }, [eventBanner]);

  const handleEventMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);

    if (newIndex === 0) {
      setEventCurrentIndex(circularEventBannerList.length - 1);
      eventBannerRef.current?.scrollToIndex({
        index: circularEventBannerList.length - 2,
        animated: false,
      });
    } else if (newIndex === circularEventBannerList.length - 1) {
      setEventCurrentIndex(0);
      eventBannerRef.current?.scrollToIndex({index: 1, animated: false});
    } else {
      setEventCurrentIndex(newIndex - 1);
    }
  };

  const handleLayout = (event: any) => {
    const {y, height} = event.nativeEvent.layout;
    setReviewModalPosition({top: y + height, right: 0});
  };

  const handleModalCancel = () => {
    setReviewModalVisible(false);
  };

  const fetchTicketList = async () => {
    try {
      const response = await getTicketBookList('NULL');

      const sortedData = response.data.data.sort(
        (a: {viewed_date: string}, b: {viewed_date: string}) =>
          new Date(b.viewed_date).getTime() - new Date(a.viewed_date).getTime(),
      );

      setTicketList(sortedData[0]);
    } catch (error) {
      console.error('최근 관람한 공연 조회 오류: ', error);
    }
  };

  useEffect(() => {
    fetchTicketList();
  }, []);

  useEffect(() => {
    const fetchPopularPremiumReviewList = async () => {
      try {
        const response = await getPopularPremiumReviews();
        setPopularPremiumReviews(response.data.data);
      } catch (error) {
        console.error('인기 프리미엄 리뷰 조회(홈) 오류: ', error);
      }
    };

    fetchPopularPremiumReviewList();
  }, []);

  return (
    <SafeAreaView style={HomeStyles.container}>
      <ScrollView>
        <View style={HomeStyles.containerHeader}>
          <View style={HomeStyles.containerIcons}>
            <SvgXml xml={HomeIcon.iconTitle} />
            <View style={HomeStyles.containerRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeSearchDefaultPage')}>
                <IconSearch style={{marginRight: 20}} />
              </TouchableOpacity>
              <IconNotification />
            </View>
          </View>
          <FlatList
            ref={bannerRef}
            data={circularCarouselTicketList}
            renderItem={({item}) => (
              <Ticket image={item.image || null} bannerId={item.id} />
            )}
            keyExtractor={item => item.id.toString()}
            initialScrollIndex={2}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            snapToInterval={CARD_WIDTH + PADDING * 2}
            decelerationRate="fast"
            onMomentumScrollEnd={handleMomentumScrollEnd}
            scrollEventThrottle={64}
            getItemLayout={(data, index) => ({
              length: CARD_WIDTH + PADDING * 2,
              offset:
                (CARD_WIDTH + PADDING * 2) * index -
                (screenWidth - (CARD_WIDTH + PADDING * 2)) / 2,
              index,
            })}
          />
        </View>
        <View style={HomeStyles.containerPagination}>
          {carouselTicketList.map((_, index) => (
            <View
              key={index}
              style={[
                HomeStyles.paginationDot,
                index === currentIndex
                  ? HomeStyles.activeDot
                  : HomeStyles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <View
          style={[HomeStyles.containerTitle, {marginTop: 36}]}
          onLayout={handleLayout}>
          <Text style={HomeStyles.textTitle}>최근 관람한 공연</Text>
          <Text style={HomeStyles.textWriteReview}>리뷰쓰기 {'>'}</Text>
        </View>

        {reviewModalVisible && ticketList?.has_review == false && (
          <ToolTipModal
            visible={reviewModalVisible}
            position={reviewModalPosition}
            text={[
              {text: '리뷰 작성하고', isBold: false},
              {text: '20포인트', isBold: true},
              {text: '받아가세요!', isBold: false},
            ]}
            onCancel={handleModalCancel}
          />
        )}

        <View style={{alignItems: 'center'}}>
          <View style={HomeStyles.containerTicket}>
            <View style={HomeStyles.ticket1}>
              <Image
                style={HomeStyles.imageTicket1}
                source={require('@/assets/images/home/TicketBackground.png')}
                resizeMode="cover"
              />
              <View style={HomeStyles.containerTicketText}>
                <Text style={HomeStyles.textTicketTitle}>
                  {ticketList?.musical_title}
                </Text>
                <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                  <SvgXml xml={HomeIcon.season} />
                  <Text style={HomeStyles.textTicketDateActor}>
                    {ticketList?.series}
                  </Text>
                </View>
                <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                  <SvgXml xml={HomeIcon.date} />
                  <Text style={HomeStyles.textTicketDateActor}>
                    {ticketList?.viewed_date}
                  </Text>
                </View>
                <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                  <SvgXml xml={HomeIcon.place} />
                  <Text style={HomeStyles.textTicketDateActor}>
                    {ticketList?.location} {ticketList?.seat}
                  </Text>
                </View>
                <View style={HomeStyles.containerRow}>
                  <SvgXml xml={HomeIcon.actor} />
                  <Text style={HomeStyles.textTicketDateActor}>
                    {ticketList?.actors}
                  </Text>
                </View>
              </View>
            </View>
            <SvgXml style={HomeStyles.ticketLine} xml={HomeIcon.line} />
            <View style={HomeStyles.ticket2}>
              {ticketList?.has_review ? (
                <>
                  <View style={{flexDirection: 'row'}}>
                    {Array.from({length: 5}).map((_, index) => (
                      <SvgXml
                        key={index}
                        xml={
                          index < ticketList.total_rating
                            ? HomeIcon.fullStar
                            : HomeIcon.star
                        }
                      />
                    ))}
                  </View>
                  <Text style={HomeStyles.textReview}>
                    총평 {ticketList.total_rating}
                  </Text>
                </>
              ) : (
                <>
                  <View style={{flexDirection: 'row'}}>
                    {Array.from({length: 5}).map((_, index) => (
                      <SvgXml key={index} xml={HomeIcon.star} />
                    ))}
                  </View>
                  <Text style={HomeStyles.textReview}>
                    아직 남겨주신{'\n'}리뷰가 없어요
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={[HomeStyles.containerTitle, {marginBottom: 16}]}>
          <Text style={HomeStyles.textTitle}>프리미엄 리뷰</Text>
          <Text style={HomeStyles.textWriteReview}>전체보기 {'>'}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          {popularPremiumReviews.map((review, index) => (
            <View
              key={review.review_id}
              style={HomeStyles.containerPremiumReviews}>
              <View style={HomeStyles.containerRow}>
                <View
                  style={[
                    HomeStyles.containerPremiumReviewRanking,
                    {
                      backgroundColor: '#F2F2F2',
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
                <Text style={HomeStyles.textPremiumReviewLike}>
                  {review.like_data.like_count_res.total_like_count}
                </Text>
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
            <View style={HomeStyles.containerBestLikeComment}>
              <IconComment />
              <Text style={HomeStyles.textBestLikeComment}>5</Text>
              <IconLike color="#4F4F4F" />
              <Text style={HomeStyles.textBestLikeComment}>10</Text>
            </View>
            <Image
              style={HomeStyles.iconTodayBest}
              source={require('@/assets/logo/logo5.png')}
            />
          </View>
        </View>

        <View style={{marginTop: 48}}>
          <FlatList
            ref={eventBannerRef}
            data={circularEventBannerList}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View
                style={[
                  HomeStyles.eventBanner,
                  {width: screenWidth, backgroundColor: item.color},
                ]}>
                <SvgXml xml={item.icon} />
                <View style={{marginLeft: 18}}>
                  <Text style={HomeStyles.textEventBannerTitle}>
                    {item.title}
                  </Text>
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
            )}
            keyExtractor={item => item.id.toString()}
            decelerationRate="fast"
            initialScrollIndex={1}
            getItemLayout={(data, index) => ({
              length: screenWidth,
              offset: screenWidth * index,
              index,
            })}
            onMomentumScrollEnd={handleEventMomentumScrollEnd}
          />
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
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
        />

        <View style={HomeStyles.containerTitle}>
          <Text style={HomeStyles.textTitle}>개봉 예정 뮤지컬</Text>
        </View>
        <FlatList
          style={{marginHorizontal: 12.5, marginBottom: 37}}
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
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

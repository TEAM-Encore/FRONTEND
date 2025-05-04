import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import PremiumStyles from './PremiumStyles';

import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import IconSearch from '@/assets/icons/dashboard/IconSearch';
import IconNotification from '@/assets/icons/dashboard/IconNotification';
import PopularReviews from '@/components/premium/PopularReviews';
import Tags from '@/components/premium/Tags';
import ItemReview from '@/components/premium/ItemReview';
import ToolTipModal from '@/components/alertModal/ToolTipModal';
import {getPopularPremiumReviews} from '@/api/premium.api';
import {getTicketReviewList} from '@/api/review.api';

type RootStackParamList = {
  HomeSearchDefaultScreen: undefined;
  PremiumWriteScreen: undefined;
  PremiumSearchDefaultScreen: undefined;
};

export default function PremiumScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [reviewModalPosition, setReviewModalPosition] = useState({
    top: 0,
    right: 0,
  });
  const [reviewModalVisible, setReviewModalVisible] = useState(true);
  const [popularPremiumReviews, setPopularPremiumReviews] = useState([]);
  const [reviewData, setReviewData] = useState<any[]>([]); // 전체 리뷰 리스트
  const [cursor, setCursor] = useState<number | undefined>(undefined); // 마지막 id
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 확인
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩
  const [isFetching, setIsFetching] = useState(false); // 중복 요청 방지
  const [tag, setTag] = useState<string | undefined>(undefined);

  const handleLayout = (event: any) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setReviewModalPosition({top: height * 2.5, right: width});
  };

  const handleModalCancel = () => {
    setReviewModalVisible(false);
  };

  // 무한 스크롤 적용 필요
  const fetchReviewList = async () => {
    try {
      const response = await getTicketReviewList(
        100,
        'createdat',
        undefined,
        tag,
        undefined,
      );
      const reviewData = response.data.data.content;

      console.log('프리미엄 리뷰 조회 결과: ', reviewData);

      if (reviewData.length === 0) {
        setReviewData([]);
      } else {
        setReviewData(reviewData);
      }
    } catch (error: any) {
      console.log('error: ', error);
      if (error.response?.status === 404) {
        setReviewData([]); // 데이터 없다고 간주
      } else {
        Alert.alert('프리미엄 리뷰 조회 중에 문제가 발생했습니다.');
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReviewList();
    }, [tag]),
  );

  useEffect(() => {
    const fetchPopularPremiumReviewList = async () => {
      try {
        const response = await getPopularPremiumReviews();
        setPopularPremiumReviews(response.data.data);
      } catch (error) {
        console.error('인기 프리미엄 리뷰 조회 오류: ', error);
      }
    };

    fetchPopularPremiumReviewList();
  }, []);

  const tagLabelToKey: {[key: string]: string} = {
    총평만점: 'PERFECT_REVIEW',
    음향최고: 'BEST_SOUND',
    시설최고: 'BEST_FACILITIES',
    시야최고: 'BEST_VIEW',
    회전문: 'REVOLVING_DOOR',
    뮤덕n년차: 'MUSEUM_EXPERT',
  };

  const handleTagSelect = (tag: string) => {
    setTag(tag);
    if (tag === '전체보기') {
      setTag(undefined);
    } else {
      const mappedTag = tagLabelToKey[tag];
      setTag(mappedTag);
    }
    fetchReviewList(true); // 태그 바뀌면 새로 불러오기
  };

  return (
    <SafeAreaView style={PremiumStyles.container}>
      <View style={PremiumStyles.containerHeader}>
        <View style={PremiumStyles.containerIcons}>
          <Text style={PremiumStyles.textTitle}>프리미엄</Text>
          <View style={PremiumStyles.containerRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeSearchDefaultScreen')}
              onLayout={handleLayout}>
              <IconSearch style={{marginRight: 20}} />
            </TouchableOpacity>
            <IconNotification />
          </View>
          {reviewModalVisible && (
            <ToolTipModal
              visible={reviewModalVisible}
              position={reviewModalPosition}
              text={[
                {text: '원하는 후기를', isBold: false},
                {text: '빠르게', isBold: true},
                {text: '찾아보세요!', isBold: false},
              ]}
              onCancel={handleModalCancel}
            />
          )}
        </View>
      </View>
      <FlatList
        data={reviewData}
        keyExtractor={(item, index) => item.id || index.toString()}
        onEndReached={() => {
          if (!isFetching && hasMore) {
            setCursor(reviewData[reviewData.length - 1]?.id || null);
          }
        }}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <>
            <View style={PremiumStyles.containerHeader}>
              <Text style={PremiumStyles.textPopularReviewsTilte}>
                오늘의 인기 리뷰
              </Text>
              <View style={PremiumStyles.containerPopularReviews}>
                <PopularReviews popularReviews={popularPremiumReviews} />
              </View>
              <View style={PremiumStyles.containerTags}>
                <Tags onTagSelect={handleTagSelect} />
              </View>
              {reviewData.length === 0 && (
                <View>
                  <Text style={PremiumStyles.noReviewText}>
                    등록된 리뷰가 없습니다.
                  </Text>
                </View>
              )}
            </View>
          </>
        }
        renderItem={({item}) => <ItemReview item={item} />}
        ListFooterComponent={
          isFetching && hasMore ? <ActivityIndicator size="small" /> : null
        }
      />

      {/* 글쓰기 버튼 */}
      <TouchableOpacity
        style={PremiumStyles.writeButton}
        onPress={() => navigation.navigate('PremiumWriteScreen')}>
        <SvgXml xml={DashboardIcon.writeIcon} style={PremiumStyles.writeIcon} />
        <Text style={PremiumStyles.buttonText}>후기 작성</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

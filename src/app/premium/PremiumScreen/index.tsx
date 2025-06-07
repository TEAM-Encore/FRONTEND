import React, {useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import IconSearch from '@/assets/icons/dashboard/IconSearch';
import IconNotification from '@/assets/icons/dashboard/IconNotification';
import ReviewLists from '@/features/premium/modules/ReviewLists';
import TodayPopularReviews from '@/features/premium/modules/TodayPopularReviews';
import ToolTipModal from '@/components/alertModal/ToolTipModal';
import PremiumStyles from './style';

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
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 확인
  const [isFetching, setIsFetching] = useState(false); // 중복 요청 방지
  const [tag, setTag] = useState<string | undefined>(undefined);

  const handleLayout = (event: any) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setReviewModalPosition({top: height * 2.5, right: width});
  };

  const handleModalCancel = () => {
    setReviewModalVisible(false);
  };

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
      {/* 오늘의 인기 리뷰 */}
      <TodayPopularReviews />
      {/* 후기 리스트 */}
      <ReviewLists
        tag={tag}
        onTagSelect={handleTagSelect}
        isFetching={isFetching}
        hasMore={hasMore}
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

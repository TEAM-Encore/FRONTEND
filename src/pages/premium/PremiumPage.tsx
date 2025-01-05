import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
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

type RootStackParamList = {
  PremiumWritePage: undefined;
  PremiumSearchDefaultPage: undefined;
};

const data = [
  {
    id: 1,
    nickname: '뮤지컬럽',
    title: '뮤지컬 고인물의 시카고 후기4',
    like_count: 7,
    view_count: 9,
    created_at: '2024-12-23',
    star: 4.7,
  },
  {
    id: 2,
    nickname: '뮤지컬럽',
    title: '뮤지컬 고인물의 시카고 후기3',
    like_count: 14,
    view_count: 20,
    created_at: '2024-11-01',
    star: 4.2,
  },
  {
    id: 3,
    nickname: '뮤지컬럽',
    title: '뮤지컬 고인물의 시카고 후기2',
    like_count: 9,
    view_count: 31,
    created_at: '2024-03-01',
    star: 3.9,
  },
  {
    id: 4,
    nickname: '뮤지컬럽',
    title: '뮤지컬 고인물의 시카고 후기1',
    like_count: 22,
    view_count: 40,
    created_at: '2022-03-01',
    star: 4.2,
  },
];

export default function PremiumPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [reviewModalPosition, setReviewModalPosition] = useState({
    top: 0,
    right: 0,
  });
  const [reviewModalVisible, setReviewModalVisible] = useState(true);

  const handleLayout = (event: any) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setReviewModalPosition({top: height * 2.3, right: width});
  };

  const handleModalCancel = () => {
    setReviewModalVisible(false);
  };

  const renderHeader = () => (
    <View style={PremiumStyles.containerHeader}>
      <View style={PremiumStyles.containerIcons}>
        <Text style={PremiumStyles.textTitle}>프리미엄</Text>
        <View style={PremiumStyles.containerRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PremiumSearchDefaultPage')}
            onLayout={handleLayout}>
            <IconSearch style={{marginRight: 20}} />
          </TouchableOpacity>
          <IconNotification />
        </View>
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

      <Text style={PremiumStyles.textPopularReviewsTilte}>
        오늘의 인기 리뷰
      </Text>
      <View style={PremiumStyles.containerPopularReviews}>
        <PopularReviews />
      </View>

      <View style={PremiumStyles.containerTages}>
        <Tags />
      </View>

      <ItemReview postList={data} />
    </View>
  );

  return (
    <SafeAreaView style={PremiumStyles.container}>
      <FlatList
        data={[]}
        ListHeaderComponent={renderHeader}
        renderItem={null}
      />

      {/* 글쓰기 버튼 */}
      <TouchableOpacity
        style={PremiumStyles.writeButton}
        onPress={() => navigation.navigate('PremiumWritePage')}>
        <SvgXml xml={DashboardIcon.writeIcon} style={PremiumStyles.writeIcon} />
        <Text style={PremiumStyles.buttonText}>후기 작성</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

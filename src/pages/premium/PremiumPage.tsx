import React from 'react';
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

export default function PremiumPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderHeader = () => (
    <View style={PremiumStyles.containerHeader}>
      <View style={PremiumStyles.containerIcons}>
        <Text style={PremiumStyles.textTitle}>프리미엄</Text>
        <View style={PremiumStyles.containerRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PremiumSearchDefaultPage')}>
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

      {/* <ItemReview postList={data} /> */}
    </View>
  );

  return (
    <SafeAreaView style={PremiumStyles.container}>
      <FlatList
        data={data}
        ListHeaderComponent={renderHeader}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ItemReview postList={[item]} />}
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

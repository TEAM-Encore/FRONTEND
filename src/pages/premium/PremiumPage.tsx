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

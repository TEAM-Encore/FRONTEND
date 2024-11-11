import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';

import DashboardTabs from '@/components/navigation/DashboardTabs';
import DashboardStyles from './DashboardStyles';

// App.js에서 정의한 네비게이션 스택의 타입 설정
import {NavigationProp, useNavigation} from '@react-navigation/native';

import IconSearch from '@/assets/icons/dashboard/IconSearch';
import IconNotification from '@/assets/icons/dashboard/IconNotification';

type RootStackParamList = {
  WritePage: undefined;
};

const DashboardPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={DashboardStyles.container}>
      <ScrollView>
        {/* 헤더 */}
        <View style={DashboardStyles.containerHeader}>
          <View style={DashboardStyles.containerIcons}>
            <Text style={DashboardStyles.textTitle}>게시판</Text>
            <View style={DashboardStyles.containerRow}>
              <IconSearch style={{marginRight: 20}} />
              <IconNotification />
            </View>
          </View>
        </View>

        {/* 탭 */}
        <DashboardTabs />
      </ScrollView>

      {/* 글쓰기 버튼 */}
      <TouchableOpacity
        style={DashboardStyles.writeButton}
        onPress={() => navigation.navigate('WritePage')}>
        <SvgXml
          xml={DashboardIcon.writeIcon}
          style={DashboardStyles.writeIcon}
        />
        <Text style={DashboardStyles.buttonText}>글쓰기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DashboardPage;

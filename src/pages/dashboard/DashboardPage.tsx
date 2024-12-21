import React from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import DashboardTabs from '@/components/navigation/DashboardTabs';
import DashboardStyles from './DashboardStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import IconSearch from '@/assets/icons/dashboard/IconSearch';
import IconNotification from '@/assets/icons/dashboard/IconNotification';
import {GetPostList} from '@/api/post.api';

type RootStackParamList = {
  WritePage: undefined;
  DashboardSearchDefaultPage: undefined;
};

const DashboardPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderHeader = () => (
    <View style={DashboardStyles.containerHeader}>
      <View style={DashboardStyles.containerIcons}>
        <Text style={DashboardStyles.textTitle}>게시판</Text>
        <View style={DashboardStyles.containerRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DashboardSearchDefaultPage')}>
            <IconSearch style={{marginRight: 20}} />
          </TouchableOpacity>
          <IconNotification />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={DashboardStyles.container}>
      <FlatList
        data={[]}
        ListHeaderComponent={renderHeader}
        renderItem={null}
        ListFooterComponent={<DashboardTabs />}
      />

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

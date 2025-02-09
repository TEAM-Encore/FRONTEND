import React, {useState} from 'react';
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
  const [selectedTab, setSelectedTab] = useState('Entire');

  return (
    <SafeAreaView style={DashboardStyles.container}>
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

      <View style={DashboardStyles.tabContainer}>
        {['Entire', 'Information', 'Review', 'Actor', 'Free'].map(
          (tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedTab(tab)}
              style={[
                DashboardStyles.tabButton,
                selectedTab === tab && DashboardStyles.activeTabButton,
              ]}>
              <Text
                style={[
                  DashboardStyles.tabText,
                  selectedTab === tab && DashboardStyles.activeTabText,
                ]}>
                {tab === 'Entire'
                  ? '전체'
                  : tab === 'Information'
                  ? '정보'
                  : tab === 'Review'
                  ? '후기'
                  : tab === 'Actor'
                  ? '배우'
                  : '자유'}
              </Text>
              {selectedTab === tab && (
                <View style={DashboardStyles.activeTabUnderline} />
              )}
            </TouchableOpacity>
          ),
        )}
      </View>

      <FlatList
        // keyExtractor={item => String(item.id)}
        data={[]}
        renderItem={null}
        ListFooterComponent={<DashboardTabs selectedTab={selectedTab} />}
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

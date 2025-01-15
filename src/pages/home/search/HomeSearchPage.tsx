import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import SearchStyles from '@/pages/dashboard/search/SearchStyles';
import DashboardStyles from '@/pages/dashboard/DashboardStyles';
import {SearchIcon} from '@/assets/icons/search/SearchIcon';
import {useFocusEffect} from '@react-navigation/native';
import DashboardSearchScreen from '@/pages/dashboard/search/DashboardSearchScreen';
import MusicalSearchScreen from './MusicalSearchScreen';
import PremiumSearchScreen from './PremiumSearchScreen';
import {SearchPageProps} from 'types';

const HomeSearchPage: React.FC<SearchPageProps> = ({route, navigation}) => {
  const [selectedTab, setSelectedTab] = useState('통합');
  const {postData, text} = route.params;
  const [searchText, setSearchText] = useState<string>(text || '');

  useFocusEffect(
    React.useCallback(() => {
      if (text) {
        setSearchText(text);
      }
      console.log('검색어: ', text);
    }, [text]),
  );

  const renderScreen = () => {
    switch (selectedTab) {
      case '통합':
        return <DashboardSearchScreen postData={postData} />;
      case '공연 정보':
        return <MusicalSearchScreen postData={postData} text={text} />;
      case '게시판':
        return <DashboardSearchScreen postData={postData} />;
      case '프리미엄':
        return <PremiumSearchScreen postData={postData} text={text} />;
      default:
        return <DashboardSearchScreen postData={postData} />;
    }
  };

  const renderItem = ({item}: {item: {id: string; title: string}}) => (
    <View style={SearchStyles.itemContainer}>
      <Text style={SearchStyles.itemText}>{item.title}</Text>
    </View>
  );

  const handleGoBack = () => {
    navigation.goBack();
    navigation.goBack();
  };

  // console.log('전달 받은 검색 데이터: ', text);

  return (
    <SafeAreaView style={SearchStyles.container}>
      {/* 검색바 */}
      <View style={SearchStyles.searchBarContainer}>
        <View style={SearchStyles.searchBar}>
          <SvgXml xml={SearchIcon.searchIcon} style={SearchStyles.icon} />
          <TextInput
            style={SearchStyles.textInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="게시판 검색"
          />
        </View>
        <TouchableOpacity onPress={handleGoBack}>
          <Text>취소</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[]}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={SearchStyles.listContainer}
        ListEmptyComponent={() => (
          <View>
            <View style={DashboardStyles.tabContainer}>
              {['통합', '공연 정보', '게시판', '프리미엄'].map((tab, index) => (
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
                    {tab === '통합'
                      ? '통합'
                      : tab === '공연 정보'
                      ? '공연 정보'
                      : tab === '게시판'
                      ? '게시판'
                      : tab === '프리미엄'
                      ? '프리미엄'
                      : null}
                  </Text>
                  {selectedTab === tab && (
                    <View style={DashboardStyles.activeTabUnderline} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View>{renderScreen()}</View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeSearchPage;

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
import SearchStyles from './SearchStyles';
import DashboardStyles from '../DashboardStyles';
import {SearchIcon} from '@/assets/icons/search/SearchIcon';
import {useFocusEffect} from '@react-navigation/native';
import SearchScreen from './SearchScreen';
import {SearchPageProps} from 'types';

const SearchPage: React.FC<SearchPageProps> = ({route, navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Entire');
  const {postData, text} = route.params;
  const [searchText, setSearchText] = useState<string>(text || '');

  useFocusEffect(
    React.useCallback(() => {
      if (text) {
        setSearchText(text);
      }
    }, [text]),
  );

  const renderScreen = () => {
    switch (selectedTab) {
      case 'Entire':
        return <SearchScreen postData={postData} />;
      case 'Information':
        return (
          <SearchScreen
            postData={postData.filter(item => item.type === 'INFORMATION')}
          />
        );
      case 'Review':
        return (
          <SearchScreen
            postData={postData.filter(item => item.type === 'REVIEW')}
          />
        );
      case 'Actor':
        return (
          <SearchScreen
            postData={postData.filter(item => item.type === 'ACTOR')}
          />
        );
      case 'Free':
        return (
          <SearchScreen
            postData={postData.filter(item => item.type === 'FREE')}
          />
        );
      default:
        return <SearchScreen postData={postData} />;
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
            <View>{renderScreen()}</View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchPage;

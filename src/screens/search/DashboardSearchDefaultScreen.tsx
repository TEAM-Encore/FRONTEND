import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import SearchStyles from '@/screens/dashboard/search/SearchStyles';
import {SearchIcon} from '@/assets/icons/search/SearchIcon';
import {useNavigation} from '@react-navigation/native';
import {GetPostList} from '@/api/post.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardSearchingScreen from './DashboardSearchingScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'types';

const MAX_HISTORY = 10;

type SearchDefaultPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DashboardSearchDefaultScreen'
>;

const DashboardSearchDefaultScreen: React.FC<RootStackParamList> = () => {
  const navigation = useNavigation<SearchDefaultPageNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // AsyncStorage에서 검색 기록 불러오기
  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('recentSearches');
      if (history) {
        console.log('[DEBUG] AsyncStorage: History loaded:', history);
        setRecentSearches(JSON.parse(history));
      } else {
        console.log('[DEBUG] AsyncStorage: No history found.');
      }
    } catch (error) {
      console.error(
        '[ERROR] AsyncStorage: Error loading search history:',
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  const saveSearchHistory = async (searchTerm: string) => {
    try {
      console.log('[DEBUG] AsyncStorage: Saving search term:', searchTerm);
      let updatedSearches = [
        searchTerm,
        ...recentSearches.filter(term => term !== searchTerm),
      ];

      // 최대 기록 개수를 초과하면 오래된 항목 제거
      if (updatedSearches.length > MAX_HISTORY) {
        updatedSearches = updatedSearches.slice(0, MAX_HISTORY);
      }

      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem(
        'recentSearches',
        JSON.stringify(updatedSearches),
      );

      console.log(
        '[DEBUG] AsyncStorage: Search history saved:',
        updatedSearches,
      );
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const fetchSearchList = async (searchText: string) => {
    if (searchText.trim().length === 0) return;
    try {
      // 일단 100으로 고정
      const response = await GetPostList(
        100,
        'createdat',
        undefined,
        undefined,
        undefined,
        searchText,
      );
      const postData = response.data.data.content;

      // 검색 기록 저장
      await saveSearchHistory(searchText);

      navigation.navigate('DashboardSearchScreenList', {
        postData,
        text: searchText,
      });
    } catch (error) {
      console.error('Error fetching post list:', error);
    } finally {
      setText('');
    }
  };

  const logAsyncStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('recentSearches');
      console.log(
        'AsyncStorage 상태:',
        storedData ? JSON.parse(storedData) : '없음',
      );
    } catch (error) {
      console.error('Error logging AsyncStorage:', error);
    }
  };

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem('recentSearches');
      setRecentSearches([]);
      console.log('AsyncStorage에서 recentSearches가 삭제되었습니다.');
      logAsyncStorage();
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  const handleDelete = async (itemToDelete: string) => {
    try {
      const updatedSearches = recentSearches.filter(
        item => item !== itemToDelete,
      );
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem(
        'recentSearches',
        JSON.stringify(updatedSearches),
      );
      console.log(`${itemToDelete}가 삭제되었습니다.`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    loadSearchHistory();
  }, []);

  // 기본 화면
  const DefaultView = () => (
    <>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : recentSearches.length === 0 ? (
        // 데이터가 없을 때 표시할 UI
        <View style={SearchStyles.noHistoryContainer} />
      ) : (
        // 데이터가 있을 때 표시할 UI
        <View style={SearchStyles.recentSearchContainer}>
          <View style={SearchStyles.recentSearchHeader}>
            <Text style={SearchStyles.recentSearchTitle}>최근 검색어</Text>
          </View>
          <FlatList
            data={recentSearches}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({item}) => (
              <View style={SearchStyles.recentSearchItem}>
                <TouchableOpacity
                  onPress={async () => {
                    setText(item);
                    await fetchSearchList(item);
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <SvgXml
                      xml={SearchIcon.timeIcon}
                      style={SearchStyles.icon}
                    />
                    <Text style={SearchStyles.recentSearchText}>{item}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <SvgXml
                    xml={SearchIcon.searchCloseIcon}
                    style={SearchStyles.closeIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity onPress={clearSearchHistory}>
            <Text style={SearchStyles.clearHistoryText}>전체 삭제</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );

  const renderComponent = () => {
    if (text.trim() === '') {
      return <DefaultView />;
    }
    // 검색 중 화면
    return <DashboardSearchingScreen text={text} setText={setText} />;
  };

  return (
    <SafeAreaView style={SearchStyles.container}>
      {/* 검색바 */}
      <View style={SearchStyles.searchBarContainer}>
        <View style={SearchStyles.searchBar}>
          <TouchableOpacity onPress={() => fetchSearchList(text)}>
            <SvgXml xml={SearchIcon.searchIcon} style={SearchStyles.icon} />
          </TouchableOpacity>
          <TextInput
            style={SearchStyles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="게시판 검색"
            onSubmitEditing={() => fetchSearchList(text)}
          />
          {text.length > 0 && (
            <TouchableOpacity
              style={SearchStyles.clearButton}
              onPress={() => {
                setText('');
              }}>
              <SvgXml xml={SearchIcon.closeIcon} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>취소</Text>
        </TouchableOpacity>
      </View>

      {/* 검색 바 하단 화면 */}
      {renderComponent()}
    </SafeAreaView>
  );
};

export default DashboardSearchDefaultScreen;

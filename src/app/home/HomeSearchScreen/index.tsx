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
import {SearchIcon} from '@/assets/icons/search/SearchIcon';
import {GetPostList} from '@/api/post.api';
import {getReviewSearchSuggestions} from '@/api/review.api'; // ⭐️ 추가
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAppNavigation from '@/app/useAppNavigation';
import SearchStyles from './style';

const MAX_HISTORY = 10;

const HomeSearchScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]); // ⭐️ 연관 검색어 상태 추가

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('recentSearches');
      if (history) {
        setRecentSearches(JSON.parse(history));
      }
    } catch (error) {
      console.error('AsyncStorage 에러:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSearchHistory = async (searchTerm: string) => {
    try {
      let updatedSearches = [
        searchTerm,
        ...recentSearches.filter(term => term !== searchTerm),
      ];
      if (updatedSearches.length > MAX_HISTORY) {
        updatedSearches = updatedSearches.slice(0, MAX_HISTORY);
      }
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem(
        'recentSearches',
        JSON.stringify(updatedSearches),
      );
    } catch (error) {
      console.error('검색 기록 저장 실패:', error);
    }
  };

  const fetchSearchList = async (searchText: string) => {
    if (searchText.trim().length === 0) return;
    try {
      setText(searchText); // ✅ 선택한 자동완성 검색어로 text 상태 업데이트

      const response = await GetPostList(
        100,
        'createdat',
        undefined,
        undefined,
        undefined,
        searchText,
      );
      const postData = response.data.data.content;
      await saveSearchHistory(searchText);
      navigation.navigate('HomeSearchScreen', {postData, text: searchText});
    } catch (error) {
      console.error('게시글 검색 실패:', error);
    } finally {
      setSuggestions([]); // ⭐️ 검색 후 연관 검색어 초기화
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
    } catch (error) {
      console.error('검색어 삭제 실패:', error);
    }
  };

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem('recentSearches');
      setRecentSearches([]);
    } catch (error) {
      console.error('검색 기록 초기화 실패:', error);
    }
  };

  // ⭐️ 연관 검색어 API 호출
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (text.trim().length === 0) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await getReviewSearchSuggestions(text);
        setSuggestions(response.data.data);
      } catch (error) {
        console.error('연관 검색어 불러오기 실패:', error);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 200); // debounce 효과

    return () => clearTimeout(debounceTimer);
  }, [text]);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const DefaultView = () => (
    <>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : recentSearches.length === 0 ? (
        <View style={SearchStyles.noHistoryContainer} />
      ) : (
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

  // ⭐️ 자동 완성 리스트 화면
  const SuggestionView = () => (
    <FlatList
      data={suggestions}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({item}) => (
        <TouchableOpacity
          style={SearchStyles.recentSearchItem}
          onPress={() => fetchSearchList(item)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SvgXml xml={SearchIcon.searchIcon} style={SearchStyles.icon} />
            <Text style={SearchStyles.recentSearchText}>{item}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );

  const renderComponent = () => {
    if (text.trim() === '') {
      return <DefaultView />;
    }
    if (suggestions.length > 0) {
      return <SuggestionView />; // ⭐️ 연관 검색어 있을 때 자동 완성 뷰 렌더링
    }
    return <DashboardSearchingScreen text={text} setText={setText} />;
  };

  return (
    <SafeAreaView style={SearchStyles.container}>
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
                setSuggestions([]); // ⭐️ 입력 초기화 시 자동 완성도 초기화
              }}>
              <SvgXml xml={SearchIcon.closeIcon} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>취소</Text>
        </TouchableOpacity>
      </View>

      {/* 하단 화면 */}
      {renderComponent()}
    </SafeAreaView>
  );
};

export default HomeSearchScreen;

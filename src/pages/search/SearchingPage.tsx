import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {GetPostList} from '@/api/post.api';
import SearchStyles from '../dashboard/search/SearchStyles';
import {debounce} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SearchingPageProp = {
  text: string;
  setText: (value: string) => void;
};

type SearchingPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SearchDefaultPage'
>;

const MAX_HISTORY = 10;

const SearchingPage: React.FC<SearchingPageProp> = ({text, setText}) => {
  const navigation = useNavigation<SearchingPageNavigationProp>();
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const fetchSuggestions = debounce(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const response = await GetPostList(
        10,
        'createdat',
        undefined,
        undefined,
        undefined,
        query,
      );

      const postData = response.data.data.content;

      // 입력된 텍스트와 일치하는 단어 추출
      const targetWord = query.toLowerCase(); // 검색어를 소문자로 변환
      const filteredSuggestions = postData.flatMap(
        (item: {title: string; content: string}) => {
          // title과 content를 단어로 나누고 검색어가 포함된 단어만 반환
          const titleWords = item.title.split(/\s+/); // 공백으로 나누기
          const contentWords = item.content.split(/\s+/); // 공백으로 나누기

          const matchingTitleWords = titleWords.filter(word =>
            word.toLowerCase().includes(targetWord),
          );
          const matchingContentWords = contentWords.filter(word =>
            word.toLowerCase().includes(targetWord),
          );

          return [...matchingTitleWords, ...matchingContentWords];
        },
      );
      //   console.log('연관검색어:', filteredSuggestions);

      // 중복된 단어 제거
      const uniqueSuggestions = Array.from(new Set(filteredSuggestions));
      setSuggestions(uniqueSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  }, 300);

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

      navigation.navigate('SearchPage', {postData, text: searchText});
    } catch (error) {
      console.error('Error fetching post list:', error);
    } finally {
      setText('');
    }
  };

  useEffect(() => {
    loadSearchHistory();
    fetchSuggestions(text);
    return () => fetchSuggestions.cancel();
  }, [text]);

  return (
    <View style={SearchStyles.componentContainer}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({item}) => (
            <>
              <TouchableOpacity
                style={SearchStyles.searchList}
                onPress={async () => {
                  setText(item);
                  await saveSearchHistory(item);
                  await fetchSearchList(item);
                }}>
                <Text style={SearchStyles.searchText}>{item}</Text>
              </TouchableOpacity>
              <View style={SearchStyles.line} />
            </>
          )}
          ListEmptyComponent={
            text.trim() !== '' && suggestions.length === 0 ? (
              <Text style={SearchStyles.emptyText}>검색 결과가 없습니다.</Text>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default SearchingPage;

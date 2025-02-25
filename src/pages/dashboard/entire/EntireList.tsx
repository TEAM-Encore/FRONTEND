import React, {useState, useCallback, useEffect} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import ItemPost from '@/components/homeList/ItemPost';
import {GetPostList} from '@/api/post.api';

import EntireStyles from './EntireStyles';

const EntireList: React.FC = () => {
  const [postList, setPostList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 초기 로딩 상태
  const [isFetching, setIsFetching] = useState<boolean>(false); // 추가 데이터 로딩 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 마지막 데이터인지 확인
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [selectedFilter, setSelectedFilter] = useState<'최신순' | '인기순'>(
    '최신순',
  );

  const handlePress = (filter: '최신순' | '인기순') => {
    if (selectedFilter !== filter) {
      setSelectedFilter(filter);
    }
  };
  // console.log('선택된 필터링: ', selectedFilter);

  const filterMapping: Record<string, string> = {
    최신순: 'createdat',
    인기순: 'likecount',
  };

  // 필터가 변경될 때 cursor 초기화 및 새로운 데이터를 불러오도록 수정
  const fetchPostList = async (reset = false) => {
    const sortFilter = filterMapping[selectedFilter] || 'createdat';
    try {
      if (reset) {
        setIsLoading(true);
        setCursor(undefined);
        setPostList([]);
      } else {
        setIsFetching(true);
      }
      const requestCursor = reset ? undefined : cursor;

      const response = await GetPostList(3, sortFilter, requestCursor);
      const postData = response.data.data.content;

      if (postData.length > 0) {
        // 마지막 데이터의 ID를 cursor로 저장
        const newCursor = postData[postData.length - 1].id;
        if (typeof newCursor === 'number') {
          setCursor(newCursor); // cursor 업데이트
        }
        // console.log('cursor: ', newCursor);

        // 기존 리스트에 추가하거나 새로고침으로 초기화
        setPostList(prevList => {
          const newList = [...prevList, ...postData];
          const uniqueList = Array.from(
            new Map(newList.map(item => [item.id, item])).values(),
          );
          return uniqueList;
        });
      } else {
        setHasMore(false); // 더 이상 데이터가 없음을 표시
      }
    } catch (error) {
      console.error('Error fetching post list:', error);
    } finally {
      if (reset) {
        setIsLoading(false);
      } else {
        setIsFetching(false);
      }
    }
  };

  // console.log('postList: ', postList);

  useFocusEffect(
    useCallback(() => {
      setCursor(undefined); // 필터 변경 시 cursor 초기화
      setHasMore(true); // 필터 변경 시 hasMore 초기화
      setTimeout(() => fetchPostList(true), 0); // cursor 상태가 반영된 후 실행
    }, [selectedFilter]),
  );

  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      fetchPostList(false);
    }
  };

  return (
    <>
      <View style={EntireStyles.fiter_container}>
        <Text style={EntireStyles.more_title}>더 찾아보기</Text>

        <TouchableOpacity
          style={{paddingLeft: 162}}
          onPress={() => handlePress('최신순')}>
          <Text
            style={
              selectedFilter === '최신순'
                ? EntireStyles.filter
                : EntireStyles.tab_filter
            }>
            최신순
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{paddingLeft: 11}}
          onPress={() => handlePress('인기순')}>
          <Text
            style={
              selectedFilter === '인기순'
                ? EntireStyles.filter
                : EntireStyles.tab_filter
            }>
            인기순
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={postList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <ItemPost postList={[item]} />}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5} // 스크롤이 50% 남았을 때 호출
            ListFooterComponent={
              isFetching && hasMore ? <ActivityIndicator size="small" /> : null
            }
          />
        )}
      </View>
    </>
  );
};

export default EntireList;

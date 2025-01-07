import React, {useState, useCallback} from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import ItemPost from '@/components/homeList/ItemPost';
import {GetPostList} from '@/api/post.api';

type EntireListProps = {
  selectedFilter: string;
};

const EntireList: React.FC<EntireListProps> = ({selectedFilter}) => {
  const [postList, setPostList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 초기 로딩 상태
  const [isFetching, setIsFetching] = useState<boolean>(false); // 추가 데이터 로딩 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 마지막 데이터인지 확인
  const [cursor, setCursor] = useState<number | undefined>(undefined);

  const filterMapping: Record<string, string> = {
    최신순: 'createdat',
    인기순: 'likecount',
  };

  const fetchPostList = async (reset = false) => {
    const sortFilter = filterMapping[selectedFilter] || 'createdat';
    try {
      if (reset) {
        setIsLoading(true);
      } else {
        setIsFetching(true);
      }
      const response = await GetPostList(3, sortFilter, cursor);
      const postData = response.data.data.content;

      if (postData.length > 0) {
        // 마지막 데이터의 ID를 cursor로 저장
        setCursor(postData[postData.length - 1].id);
        // console.log('cursor: ', cursor);

        // 기존 리스트에 추가하거나 새로고침으로 초기화
        setPostList(reset ? postData : [...postList, ...postData]);
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

  useFocusEffect(
    useCallback(() => {
      fetchPostList(true);
    }, [selectedFilter]),
  );

  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      fetchPostList(false);
    }
  };

  return (
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
  );
};

export default EntireList;

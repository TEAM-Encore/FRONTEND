import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {FlatList, View, ActivityIndicator} from 'react-native';
import {GetPostList} from '../../../api/post.api';
import ItemPost from '@/components/comment/ItemPost';

type ReviewListProps = {
  selectedFilter: string;
  category: string;
};

const ReviewList: React.FC<ReviewListProps> = ({selectedFilter, category}) => {
  const [postList, setPostList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 초기 로딩 상태
  const [isFetching, setIsFetching] = useState<boolean>(false); // 추가 데이터 로딩 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 마지막 데이터인지 확인
  const [cursor, setCursor] = useState<number | undefined>(undefined);

  const filterMapping: Record<string, string> = {
    최신순: 'createdat',
    인기순: 'likecount',
  };

  const categoryMapping: Record<string, string> = {
    전체보기: '',
    '시야 후기': 'VIEW_REVIEW',
    '굿즈 후기': 'GOODS_REVIEW',
    '공연 감상': 'PERFORMANCE_REVIEW',
  };

  const fetchPostList = async (reset = false) => {
    const sortFilter = filterMapping[selectedFilter] || 'createdat';
    const sortCategory = categoryMapping[category] || '';

    try {
      if (reset) {
        setIsLoading(true);
      } else {
        setIsFetching(true);
      }
      const response = await GetPostList(
        3,
        sortFilter,
        cursor,
        sortCategory,
        'REVIEW',
        undefined,
      );
      const postData = response.data.data.content;

      if (postData.length > 0) {
        // 마지막 데이터의 ID를 cursor로 저장
        setCursor(postData[postData.length - 1].id);
        console.log('cursor: ', cursor);

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
      setCursor(undefined); // 카테고리가 변경될 때 초기화
      setPostList([]); // 기존 데이터 초기화
      setHasMore(true); // 새 요청 가능하도록 초기화
      fetchPostList(true);
    }, [selectedFilter, category]),
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
export default ReviewList;

import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  FlatList,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import ModalCategory from '@/components/categoryModal/ModalCategory';
import {GetPostList} from '../../../api/post.api';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import {SvgXml} from 'react-native-svg';
import ItemPost from '@/components/homeList/ItemPost';
import PostStyles from '../PostStyles';

const InformationList: React.FC = () => {
  const [postList, setPostList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 초기 로딩 상태
  const [isFetching, setIsFetching] = useState<boolean>(false); // 추가 데이터 로딩 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 마지막 데이터인지 확인
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [selectedFilter, setSelectedFilter] = useState<'최신순' | '인기순'>(
    '최신순',
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState('카테고리 선택');
  const categoryList = ['전체보기', '오페라 글라스', '뮤지컬 용어', '이벤트'];
  const [modalTitle, setModalTitle] = useState('');

  const pressCategory = () => {
    setModalVisible(true);
    setModalTitle('카테고리');
  };

  const handlePress = (filter: '최신순' | '인기순') => {
    if (selectedFilter !== filter) {
      setSelectedFilter(filter);
    }
  };

  const filterMapping: Record<string, string> = {
    최신순: 'createdat',
    인기순: 'likecount',
  };

  const categoryMapping: Record<string, string> = {
    전체보기: '',
    '오페라 글라스': 'OPERA_GLASS_RENTAL',
    '뮤지컬 용어': 'MUSICAL_TERMS',
    이벤트: 'EVENTS',
  };

  const fetchPostList = async (reset = false) => {
    const sortFilter = filterMapping[selectedFilter] || 'createdat';
    const sortCategory = categoryMapping[category] || '';

    try {
      if (reset) {
        setIsLoading(true);
        setCursor(undefined);
        setPostList([]);
      } else {
        setIsFetching(true);
      }

      const requestCursor = reset ? undefined : cursor;

      const response = await GetPostList(
        3,
        sortFilter,
        requestCursor,
        sortCategory,
        'INFORMATION',
        undefined,
      );
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

  useFocusEffect(
    useCallback(() => {
      setPostList([]); // 기존 데이터 초기화
      setCursor(undefined); // 필터 변경 시 cursor 초기화
      setHasMore(true); // 필터 변경 시 새 요청 가능하도록 hasMore 초기화
      setTimeout(() => fetchPostList(true), 0); // cursor 상태가 반영된 후 실행
    }, [selectedFilter, category]),
  );

  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      fetchPostList(false);
    }
  };

  return (
    <View>
      <View style={PostStyles.containerCommentTitle}>
        <TouchableOpacity
          style={PostStyles.containerRow}
          onPress={() => pressCategory()}>
          <Text style={PostStyles.textCategory}>{category}</Text>
          <SvgXml xml={DashboardIcon.arrowDown} />
        </TouchableOpacity>
        <ModalCategory
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          categoryList={categoryList}
          modalTitle={modalTitle}
          onSelect={(item: string) => {
            setCategory(item);
          }}
        />
        <View style={PostStyles.containerRow}>
          <TouchableOpacity onPress={() => handlePress('최신순')}>
            <Text
              style={[
                selectedFilter === '최신순'
                  ? PostStyles.filter
                  : PostStyles.tab_filter,
                {marginRight: 12},
              ]}>
              최신순
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('인기순')}>
            <Text
              style={[
                selectedFilter === '최신순'
                  ? PostStyles.tab_filter
                  : PostStyles.filter,
              ]}>
              인기순
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
export default InformationList;

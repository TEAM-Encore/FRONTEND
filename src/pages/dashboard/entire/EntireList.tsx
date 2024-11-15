import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import ItemPost from '@/components/comment/ItemPost';
import {GetPostList} from '../../../api/post.api'; // @ 경로 사용하면 오류 발생하는데 원인을 모르겠음

type EntireListProps = {
  selectedFilter: string;
};

const EntireList: React.FC<EntireListProps> = ({selectedFilter}) => {
  const [postList, setPostList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filterMapping: Record<string, string> = {
    최신순: 'createdat',
    인기순: 'likecount',
  };

  useEffect(() => {
    const fetchPostList = async () => {
      const sortFilter = filterMapping[selectedFilter] || 'createdat';
      console.log('선택된 필터: ', selectedFilter);
      try {
        setLoading(true);
        // 일단 페이지네이션 구현 X
        const response = await GetPostList(0, 100, sortFilter);
        console.log('API RESPONSE:', response.data);

        const postData = response.data.data.content;
        setPostList(postData);
        console.log('postList:', postData);
      } catch (error) {
        console.error('Error fetching post list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostList();
  }, [selectedFilter]);

  return (
    <>
      <View>
        {/* 추후 로딩 페이지 추가 필요 */}
        {loading ? <></> : <ItemPost postList={postList} />}
      </View>
    </>
  );
};
export default EntireList;

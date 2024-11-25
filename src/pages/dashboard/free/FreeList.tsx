import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {GetPostList} from '../../../api/post.api';

import ItemPost from '@/components/comment/ItemPost';

type FreeListProps = {
  selectedFilter: string;
};

const FreeList: React.FC<FreeListProps> = ({selectedFilter}) => {
  const [postList, setPostList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filterMapping: Record<string, string> = {
    최신순: 'createdat',
    인기순: 'likecount',
  };

  useFocusEffect(
    useCallback(() => {
      const fetchPostList = async () => {
        const sortFilter = filterMapping[selectedFilter] || 'createdat';
        console.log('선택된 필터: ', selectedFilter);

        try {
          setLoading(true);
          const response = await GetPostList(
            0,
            100,
            sortFilter,
            undefined,
            undefined,
            'FREE',
            undefined,
          );

          const postData = response.data.data.content;
          setPostList(postData);
        } catch (error) {
          console.error('Error fetching post list:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPostList();
    }, [selectedFilter]),
  );

  return <>{loading ? <></> : <ItemPost postList={postList} />}</>;
};
export default FreeList;

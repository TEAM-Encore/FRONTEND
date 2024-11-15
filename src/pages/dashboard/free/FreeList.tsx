import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
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

  useEffect(() => {
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
    <>{loading ? <Text>Loading...</Text> : <ItemPost postList={postList} />}</>
  );
};
export default FreeList;

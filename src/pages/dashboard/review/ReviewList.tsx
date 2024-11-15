import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {GetPostList} from '../../../api/post.api';
import ItemPost from '@/components/comment/ItemPost';

type ReviewListProps = {
  selectedFilter: string;
  category: string;
};

const ReviewList: React.FC<ReviewListProps> = ({selectedFilter, category}) => {
  const [postList, setPostList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const fetchPostList = async () => {
      const sortFilter = filterMapping[selectedFilter] || 'createdat';
      const sortCategory = categoryMapping[category] || '';
      console.log('선택된 필터: ', selectedFilter);
      console.log('선택된 카테고리:', category);

      try {
        setLoading(true);
        const response = await GetPostList(
          0,
          100,
          sortFilter,
          undefined,
          sortCategory,
          'REVIEW',
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
  }, [selectedFilter, category]);

  return (
    <>{loading ? <Text>Loading...</Text> : <ItemPost postList={postList} />}</>
  );
};
export default ReviewList;

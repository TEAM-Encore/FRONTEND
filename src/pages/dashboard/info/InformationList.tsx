import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {GetPostList} from '../../../api/post.api';

import ItemPost from '@/components/comment/ItemPost';

type InformationListProps = {
  selectedFilter: string;
  category: string;
};

const InformationList: React.FC<InformationListProps> = ({
  selectedFilter,
  category,
}) => {
  const [postList, setPostList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  useFocusEffect(
    useCallback(() => {
      const fetchPostList = async () => {
        const sortFilter = filterMapping[selectedFilter] || 'createdat';
        const sortCategory = categoryMapping[category] || '';
        // console.log('선택된 필터: ', selectedFilter);
        // console.log('선택된 카테고리:', category);

        try {
          setLoading(true);
          const response = await GetPostList(
            0,
            100,
            sortFilter,
            undefined,
            sortCategory,
            'INFORMATION',
          );
          // console.log('API RESPONSE:', response.data);

          const postData = response.data.data.content;
          setPostList(postData);
          // console.log('postList:', postData);
        } catch (error) {
          console.error('Error fetching post list:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPostList();
    }, [selectedFilter, category]),
  );

  return <>{loading ? <></> : <ItemPost postList={postList} />}</>;
};
export default InformationList;

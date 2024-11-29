import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {GetPostList} from '../../../api/post.api';
import ItemPostNoCategory from '@/components/comment/ItemPostNoCategory';

type ActorListProps = {
  selectedFilter: string;
};

const ActorList: React.FC<ActorListProps> = ({selectedFilter}) => {
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
        // console.log('선택된 필터: ', selectedFilter);

        try {
          setLoading(true);
          const response = await GetPostList(
            0,
            100,
            sortFilter,
            undefined,
            undefined,
            'ACTOR',
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

  return <>{loading ? <></> : <ItemPostNoCategory postList={postList} />}</>;
};
export default ActorList;

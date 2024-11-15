import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
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
    오페라글라스: 'OPERA_GLASS_RENTAL',
    '뮤지컬 용어': 'MUSICAL_TERMS',
    이벤트: 'EVENTS',
  };

  useEffect(() => {
    const fetchPostList = async () => {
      const sortFilter = filterMapping[selectedFilter] || 'createdat';
      const sortCategory = categoryMapping[category] || '';
      const pageable = {size: 3, sort: {sortFilter}};
      console.log('선택된 필터: ', selectedFilter);
      console.log('선택된 카테고리:', category);

      try {
        setLoading(true);
        const response = await GetPostList(
          pageable,
          undefined,
          sortCategory,
          'INFORMATION',
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
export default InformationList;

// const postList = [
//     {
//       id: '1',
//       nickname: '뮤사랑',
//       date: '11분전',
//       title: '샤롯데시어터 오페라글라스 대여',
//       content:
//         '방금 가보니 5개 정도 남아있다고 하네요. 빨리 가셔야 할 거 같아요.',
//       image: require('@/assets/images/home/Musical1.jpeg'),
//       like_count: 3,
//       comment_count: 1,
//     },
//     {
//       id: '2',
//       nickname: '뮤뮤',
//       date: '방금전',
//       title: '회전문이 어떤 뜻인가요?',
//       content: '다들 공연 회전문 돈다 이런 말씀들을 하시던데, 무슨 뜻인가요?',
//       like_count: 10,
//       comment_count: 0,
//     },
//     {
//       id: '2',
//       nickname: '뮤덕',
//       date: '방금전',
//       title: '소극장 뮤지컬 빨래 티켓권 이벤트',
//       content: '저번에 엄청 좋게 봤던 뮤지컬 이벤트를 열고자 합니다!',
//       image: require('@/assets/images/home/Musical2.jpeg'),
//       like_count: 10,
//       comment_count: 0,
//     },
//   ];

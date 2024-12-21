import React from 'react';
import ItemPostNoCategory from '@/components/list/ItemPostNoCategory';

type SearchListProps = {
  postData: any[];
  selectedFilter: '최신순' | '인기순';
};

const DashboardSearchList: React.FC<SearchListProps> = ({
  postData,
  selectedFilter,
}) => {
  const sortedPostData =
    selectedFilter === '최신순'
      ? [...postData].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
      : [...postData].sort((a, b) => b.like_count - a.like_count);

  return <ItemPostNoCategory postList={sortedPostData} />;
};

export default DashboardSearchList;

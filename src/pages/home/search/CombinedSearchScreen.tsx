import React from 'react';
import {Text} from 'react-native';
import MusicalSearchScreen from './MusicalSearchScreen';
import DashboardSearchScreen from '@/pages/dashboard/search/DashboardSearchScreen';
import PremiumSearchScreen from './PremiumSearchScreen';

type SearchScreenProps = {
  postData: any;
  text: string;
};

const CombinedSearchScreen: React.FC<SearchScreenProps> = ({
  postData,
  text,
}) => {
  return (
    <>
      <MusicalSearchScreen postData={postData} text={text} />
      <DashboardSearchScreen postData={postData} />
      <PremiumSearchScreen postData={postData} text={text} />
    </>
  );
};

export default CombinedSearchScreen;

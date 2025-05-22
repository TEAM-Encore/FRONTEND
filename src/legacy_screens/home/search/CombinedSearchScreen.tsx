import React from 'react';
import {View} from 'react-native';
import MusicalSearchScreen from './MusicalSearchScreen';
import DashboardSearchScreen from '@/screens/dashboard/search/DashboardSearchScreen';
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
      <View style={{marginTop: 32}} />
      {/* <DashboardSearchScreen postData={postData} /> */}
      <PremiumSearchScreen postData={postData} text={text} />
    </>
  );
};

export default CombinedSearchScreen;

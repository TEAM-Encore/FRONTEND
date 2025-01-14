import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {RootStackParamList} from 'types';
import {RouteProp} from '@react-navigation/native';
import PremiumStyles from '../PremiumStyles';

import ModalModifyDelete from '@/components/modifyDeleteModal/ModalModifyDelete';

type PremiumOthersPageRouteProp = RouteProp<
  RootStackParamList,
  'PremiumOthersPage'
>;

interface PremiumOthersPageProps {
  route: PremiumOthersPageRouteProp;
}

const PremiumOthersPage: React.FC<PremiumOthersPageProps> = () => {
  return (
    <SafeAreaView style={PremiumStyles.container}>
      <Text>PremiumOthersPage입니다.</Text>
    </SafeAreaView>
  );
};

export default PremiumOthersPage;

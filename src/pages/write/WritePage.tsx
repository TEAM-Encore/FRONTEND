import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import WriteStyles from './WriteStyles';

import {SvgXml} from 'react-native-svg';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';

const WritePage: React.FC = () => {
  return (
    <View style={WriteStyles.container}>
      <View style={WriteStyles.selectField}>
        <Text style={WriteStyles.fieldText}>게시판 선택</Text>
        <TouchableOpacity onPress={() => Alert.alert('Action triggered')}>
          <SvgXml xml={DashboardIcon.downArrow} />
        </TouchableOpacity>
      </View>

      <View style={WriteStyles.selectField}>
        <Text style={WriteStyles.fieldText}>카테고리 선택</Text>
        <TouchableOpacity onPress={() => Alert.alert('Action triggered')}>
          <SvgXml xml={DashboardIcon.downArrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WritePage;

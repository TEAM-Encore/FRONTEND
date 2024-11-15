import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import PostStyles from '../PostStyles';
import FreeList from './FreeList';

type FreeScreenProps = {};

const FreeScreen: React.FC<FreeScreenProps> = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'최신순' | '인기순'>(
    '최신순',
  );

  const handlePress = (filter: '최신순' | '인기순') => {
    if (selectedFilter !== filter) {
      setSelectedFilter(filter);
    }
  };

  return (
    <SafeAreaView style={PostStyles.container}>
      <ScrollView>
        <View style={PostStyles.containerCommentTitle}>
          <Text style={PostStyles.textCategory}>전체글</Text>

          <View style={PostStyles.containerRow}>
            <TouchableOpacity onPress={() => handlePress('최신순')}>
              <Text
                style={[
                  selectedFilter === '최신순'
                    ? PostStyles.filter
                    : PostStyles.tab_filter,
                  {marginRight: 12},
                ]}>
                최신순
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('인기순')}>
              <Text
                style={[
                  selectedFilter === '최신순'
                    ? PostStyles.tab_filter
                    : PostStyles.filter,
                ]}>
                인기순
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FreeList selectedFilter={selectedFilter} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FreeScreen;

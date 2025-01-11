import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import PostStyles from '../PostStyles';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';

import ModalCategory from '@/components/categoryModal/ModalCategory';
import ReviewList from './ReviewList';

type ReviewScreenProps = {};

const ReviewScreen: React.FC<ReviewScreenProps> = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState('카테고리 선택');
  const categoryList = ['전체보기', '시야 후기', '굿즈 후기', '공연 감상'];
  const [selectedFilter, setSelectedFilter] = useState<'최신순' | '인기순'>(
    '최신순',
  );

  const handlePress = (filter: '최신순' | '인기순') => {
    if (selectedFilter !== filter) {
      setSelectedFilter(filter);
    }
  };
  const [modalTitle, setModalTitle] = useState('');

  const pressCategory = () => {
    setModalVisible(true);
    setModalTitle('카테고리');
  };

  return (
    <SafeAreaView style={PostStyles.container}>
      <ScrollView>
        <View style={PostStyles.containerCommentTitle}>
          <TouchableOpacity
            style={PostStyles.containerRow}
            onPress={() => pressCategory()}>
            <Text style={PostStyles.textCategory}>{category}</Text>
            <SvgXml xml={DashboardIcon.arrowDown} />
          </TouchableOpacity>
          <ModalCategory
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            categoryList={categoryList}
            modalTitle={modalTitle}
            onSelect={(item: string) => {
              setCategory(item);
            }}
          />
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

        <ReviewList selectedFilter={selectedFilter} category={category} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewScreen;

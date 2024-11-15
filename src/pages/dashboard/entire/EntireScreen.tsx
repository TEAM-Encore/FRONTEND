import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import EntireStyles from './EntireStyles';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import CarouselHottest from '@/components/carousel/dashboard/CarouselHottest';
import EntireList from './EntireList';

const EntireScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'최신순' | '인기순'>(
    '최신순',
  );

  const handlePress = (filter: '최신순' | '인기순') => {
    if (selectedFilter !== filter) {
      setSelectedFilter(filter);
    }
  };

  return (
    <View style={EntireStyles.container}>
      <View style={EntireStyles.notice}>
        <View style={EntireStyles.notice_container_title}>
          <Text style={EntireStyles.notice_title}>공지</Text>
        </View>
        <Text style={EntireStyles.notice_title}>
          게시판 이용 규칙 변경 안내
        </Text>
        <TouchableOpacity>
          <SvgXml
            style={EntireStyles.notice_icon}
            xml={DashboardIcon.chevronRight}
          />
        </TouchableOpacity>
      </View>

      <Text style={EntireStyles.hottest_title}>가장 핫한 게시물</Text>
      <View style={EntireStyles.hottest_container}>
        <CarouselHottest />
      </View>

      <View style={EntireStyles.fiter_container}>
        <Text style={EntireStyles.more_title}>더 찾아보기</Text>

        <TouchableOpacity
          style={{paddingLeft: 162}}
          onPress={() => handlePress('최신순')}>
          <Text
            style={
              selectedFilter === '최신순'
                ? EntireStyles.filter
                : EntireStyles.tab_filter
            }>
            최신순
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{paddingLeft: 11}}
          onPress={() => handlePress('인기순')}>
          <Text
            style={
              selectedFilter === '인기순'
                ? EntireStyles.filter
                : EntireStyles.tab_filter
            }>
            인기순
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <EntireList selectedFilter={selectedFilter} />
      </View>
    </View>
  );
};

export default EntireScreen;

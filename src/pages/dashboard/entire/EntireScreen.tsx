import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import EntireStyles from './EntireStyles';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import CarouselHottest from '@/components/carousel/dashboard/CarouselHottest';
import EntireList from './EntireList';

// 게시판 전체 페이지
const EntireScreen: React.FC = () => {
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

      <View>
        <EntireList />
      </View>
    </View>
  );
};

export default EntireScreen;

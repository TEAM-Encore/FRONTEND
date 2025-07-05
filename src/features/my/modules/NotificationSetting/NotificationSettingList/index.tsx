import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import NotificationSettingListItem, {
  Props,
} from '../NotificationSettingListItem';
import Typo from '@/components/Typo';
import theme from '@/common/theme';

export default function NotificationSettingList() {
  const listItems: Props[] = [
    {
      title: '푸시 알림',
    },
    {
      title: '게시판 활동',
      description: '좋아요, 댓글, 인기 게시글 등',
      isGrayBackground: true,
    },
    {
      title: '프리미엄 리뷰',
      description: '추천, 인기 리뷰 등',
      isGrayBackground: true,
    },
    {
      title: '해시태그 알림',
      description: '해시태그가 포함된 게시글/리뷰',
      isGrayBackground: true,
    },
    {
      title: '마케팅 정보 수신',
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {listItems.map((item, index) => (
        <NotificationSettingListItem key={index} {...item} />
      ))}
      <TouchableOpacity style={{paddingVertical: 4, paddingHorizontal: 20}}>
        <Typo.Caption style={{color: theme.gray.gray_06}}>
          마케팅 정보 수신 동의 약관
        </Typo.Caption>
      </TouchableOpacity>
    </ScrollView>
  );
}

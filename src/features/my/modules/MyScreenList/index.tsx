import React, {useMemo} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import MyScreenListItem from '../MyScreenListItem';
import useAppNavigation from '@/app/useAppNavigation';
import MyScreenListHeader from '../MyScreenListHeader';

export interface MyScreenListData {
  id: string;
  type: 'header' | 'info' | 'action' | 'separator' | 'logout';
  title?: string;
  subtitle?: string;
  value?: string;
  onPress?: () => void;
}

interface UserData {
  point: number;
  nickname: string;
  num_of_subscriber: number;
  num_of_write_post: number;
  preferred_keywords: [];
  viewing_frequency: string;
  email: string;
}

interface Props {
  userData: UserData;
}

export default function MyScreenList({userData}: Props) {
  const getListData = useMemo((): MyScreenListData[] => {
    return [
      {
        id: 'info-header',
        type: 'header',
        title: '정보 관리',
      },
      {
        id: 'account-info',
        type: 'info',
        title: '계정 정보',
        value: userData.email,
      },
      {
        id: 'modify-profile',
        type: 'action',
        title: '프로필 수정',
      },
      {
        id: 'notification-settings',
        type: 'action',
        title: '수신 설정',
      },
      {
        id: 'separator-1',
        type: 'separator',
      },
      {
        id: 'usage-header',
        type: 'header',
        title: '이용 안내',
      },
      {
        id: 'app-version',
        type: 'info',
        title: '앱 버전',
        value: '8.0.23',
      },
      {
        id: 'terms',
        type: 'action',
        title: '이용 약관',
      },
      {
        id: 'privacy',
        type: 'action',
        title: '개인정보 처리방침',
      },
      {
        id: 'ad-proposal',
        type: 'action',
        title: '광고 제안',
      },
      {
        id: 'inquiry',
        type: 'action',
        title: '문의하기',
      },
      {
        id: 'category-request',
        type: 'action',
        title: '카테고리 추가 요청',
      },
      {
        id: 'separator-2',
        type: 'separator',
      },
      {
        id: 'logout',
        type: 'logout',
        title: '로그아웃',
      },
      {
        id: 'withdraw',
        type: 'logout',
        title: '회원탈퇴',
      },
    ];
  }, [userData]);

  return (
    <Container>
      <FlatList
        keyExtractor={item => item.id}
        data={getListData}
        contentContainerStyle={{paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<MyScreenListHeader userData={userData} />}
        renderItem={({item}) => <MyScreenListItem item={item} />}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

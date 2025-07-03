import React, {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getMyInfo} from '@/api/users.api';
import styled from 'styled-components/native';
import MyScreenHeader from '@/features/my/modules/MyScreenHeader';
import MyScreenList from '@/features/my/modules/MyScreenList';

export default function MyScreen() {
  const [userData, setUserData] = useState<{
    point: number;
    nickname: string;
    num_of_subscriber: number;
    num_of_write_post: number;
    preferred_keywords: [];
    viewing_frequency: string;
    email: string;
  }>({
    point: 0,
    nickname: '',
    num_of_subscriber: 0,
    num_of_write_post: 0,
    preferred_keywords: [],
    viewing_frequency: '',
    email: '',
  });

  // TODO: React Query 적용
  const fetchMyInfo = async () => {
    try {
      const response = await getMyInfo();
      console.log('내 정보 조회: ', response.data.data);
      setUserData(response.data.data);
    } catch (error) {
      Alert.alert('내 정보 조회 중 오류가 발생했습니다.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMyInfo();
    }, []),
  );

  return (
    <Container>
      <MyScreenHeader point={userData.point} />
      <MyScreenList userData={userData} />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${p => p.theme.gray.gray_01};
`;

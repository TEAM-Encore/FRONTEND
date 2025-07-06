import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Typo from '@/components/Typo';
import styled from 'styled-components/native';
import {SvgXml} from 'react-native-svg';
import {MyPageIcon} from '@/assets/icons/myPage/MyPageIcon';
import useAppNavigation from '@/app/useAppNavigation';

export default function NotificationSettingHeader() {
  const navigation = useAppNavigation();

  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <SvgXml xml={MyPageIcon.arrowLeft} />
      </TouchableOpacity>
      <Typo.Headline>수신 설정</Typo.Headline>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <SvgXml xml={MyPageIcon.closeButton} />
      </TouchableOpacity>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom-width: 1.5px;
  border-bottom-color: ${({theme}) => theme.gray.gray_03};
`;

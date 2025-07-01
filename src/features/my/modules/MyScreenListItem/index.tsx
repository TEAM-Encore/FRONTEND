import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import MyScreenStyles from '@/app/my/MyScreen/style';
import {MyScreenListData} from '../MyScreenList';

interface MyScreenListItemProps {
  item: MyScreenListData;
}

export default function MyScreenListItem({item}: MyScreenListItemProps) {
  const renderContent = () => {
    switch (item.type) {
      case 'header':
        return (
          <HeaderContainer>
            <Text style={{...MyScreenStyles.infoTitle, marginTop: 40}}>
              {item.title}
            </Text>
          </HeaderContainer>
        );

      case 'info':
        return (
          <InfoRow>
            <Text style={{...MyScreenStyles.infoSubTitle, marginTop: 17}}>
              {item.title}
            </Text>
            <Text style={{...MyScreenStyles.emailText, marginTop: 17}}>
              {item.value}
            </Text>
          </InfoRow>
        );

      case 'action':
        return (
          <TouchableOpacity onPress={item.onPress}>
            <Text style={{...MyScreenStyles.infoSubTitle, marginTop: 8}}>
              {item.title}
            </Text>
          </TouchableOpacity>
        );

      case 'separator':
        return <View style={MyScreenStyles.line} />;

      case 'logout':
        return (
          <LogoutContainer>
            <TouchableOpacity onPress={item.onPress}>
              <Text
                style={{
                  ...MyScreenStyles.userAccountText,
                  marginTop: item.title === '로그아웃' ? 35 : 9,
                  marginBottom: item.title === '회원탈퇴' ? 25 : 0,
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          </LogoutContainer>
        );

      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
}

const HeaderContainer = styled.View``;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LogoutContainer = styled.View``;

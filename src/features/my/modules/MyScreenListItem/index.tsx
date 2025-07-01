import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {MyScreenListData} from '../MyScreenList';
import Colors from '@/assets/colors/Colors';
import Typo from '@/components/Typo';

interface MyScreenListItemProps {
  item: MyScreenListData;
}

export default function MyScreenListItem({item}: MyScreenListItemProps) {
  const renderContent = () => {
    switch (item.type) {
      case 'header':
        return (
          <HeaderContainer>
            <InfoTitle marginTop={40}>{item.title}</InfoTitle>
          </HeaderContainer>
        );

      case 'info':
        return (
          <InfoRow>
            <InfoSubTitle marginTop={17}>{item.title}</InfoSubTitle>
            <EmailText marginTop={17}>{item.value}</EmailText>
          </InfoRow>
        );

      case 'action':
        return (
          <TouchableOpacity onPress={item.onPress}>
            <InfoSubTitle marginTop={item.title === '포인트 내역' ? 17 : 8}>
              {item.title}
            </InfoSubTitle>
          </TouchableOpacity>
        );

      case 'separator':
        return <Line />;

      case 'logout':
        return (
          <LogoutContainer>
            <TouchableOpacity onPress={item.onPress}>
              <UserAccountText
                marginTop={item.title === '로그아웃' ? 35 : 9}
                marginBottom={item.title === '회원탈퇴' ? 25 : 0}>
                {item.title}
              </UserAccountText>
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

const InfoTitle = styled(Typo.Subhead04)<{marginTop?: number}>`
  color: ${Colors.gray_12};
  margin-top: ${props => props.marginTop || 0}px;
`;

const InfoSubTitle = styled(Typo.SubheadLong03)<{marginTop?: number}>`
  color: ${Colors.gray_08};
  margin-top: ${props => props.marginTop || 0}px;
`;

const EmailText = styled(Typo.Caption)<{marginTop?: number}>`
  color: ${Colors.gray_06};
  margin-top: ${props => props.marginTop || 0}px;
`;

const Line = styled.View`
  background-color: ${Colors.gray_04};
  width: 100%;
  height: 0.75px;
  margin-top: 30px;
`;

const UserAccountText = styled(Typo.Caption)<{
  marginTop?: number;
  marginBottom?: number;
}>`
  color: ${Colors.gray_07};
  margin-top: ${props => props.marginTop || 0}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
`;

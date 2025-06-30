import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Typo from '@/components/Typo';
import {SvgXml} from 'react-native-svg';
import {MyPageIcon} from '@/assets/icons/myPage/MyPageIcon';

type Props = {
  point: number;
};

export default function MyScreenHeader({point}: Props) {
  return (
    <Header>
      <Title>마이페이지</Title>
      <ButtonContainer>
        <TouchableOpacity>
          <CoinContainer>
            <SvgXml xml={MyPageIcon.coinIcon} />
            <CoinText>{`${point}P`}</CoinText>
          </CoinContainer>
        </TouchableOpacity>
        <ShareButton>
          <SvgXml xml={MyPageIcon.shareIcon} />
        </ShareButton>
      </ButtonContainer>
    </Header>
  );
}

const Header = styled.View`
  justify-content: space-between;
  flex-direction: row;
  margin: 18px 20px;
`;

const Title = styled(Typo.Display01)`
  color: ${p => p.theme.gray.gray_12};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CoinContainer = styled.View`
  background-color: ${p => p.theme.system.sub_04};
  border-radius: 4px;
  padding: 6px 8px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const CoinText = styled.Text`
  color: ${p => p.theme.gray.gray_12};
  padding-left: 4px;
  font-size: 12px;
`;

const ShareButton = styled.TouchableOpacity`
  margin-left: 20px;
`;

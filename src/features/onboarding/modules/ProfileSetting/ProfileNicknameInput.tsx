import {Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import Typo from '@/components/Typo';

export default function ProfileNicknameInput() {
  const theme = useTheme();

  return (
    <Container>
      <Typo.Body01>닉네임</Typo.Body01>
      <InputContainer>
        <StyledTextInput
          placeholder="닉네임을 입력해주세요."
          placeholderTextColor={theme.gray.gray_07}
        />
        <DuplicateCheckButton>
          <Typo.Caption>중복 확인</Typo.Caption>
        </DuplicateCheckButton>
      </InputContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  padding: 12px 20px 0 20px;
  gap: 8px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${p => p.theme.gray.gray_04};
  border-radius: 8px;
  padding: 12px;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  color: ${p => p.theme.gray.gray_12};
`;

const DuplicateCheckButton = styled.TouchableOpacity`
  background-color: ${p => p.theme.system.sub_04};
  padding: 5px 10px;
  border-radius: 4px;
`;

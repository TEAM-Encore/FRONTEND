import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import styled, {useTheme} from 'styled-components/native';
import Typo from '@/components/Typo';
import {OnboardingIcon} from '@/assets/icons/onboarding/OnboardingIcon';
import {SvgXml} from 'react-native-svg';
import {getNicknameValidation} from '@/api/users.api';

interface Props {
  setNextButtonDisabled: (disabled: boolean) => void;
}

export default function ProfileNicknameInput({setNextButtonDisabled}: Props) {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [isLengthError, setIsLengthError] = useState(true);
  const [isDuplicated, setIsDuplicated] = useState<boolean | null>(null);

  const errorMessage = useMemo(() => {
    if (isLengthError) {
      return '8글자 이내로 입력해주세요';
    }
    if (isDuplicated) {
      return '중복되는 닉네임이에요';
    }
  }, [isLengthError, isDuplicated]);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    setIsDuplicated(null);
    setNextButtonDisabled(true);

    if (text.length < 1 || text.length > 8) {
      setIsLengthError(true);
    } else {
      setIsLengthError(false);
    }
  };

  const handleValidate = async () => {
    const isValid = await getNicknameValidation(inputValue);
    const isDuplicated = !isValid;
    setIsDuplicated(isDuplicated);
    setNextButtonDisabled(isDuplicated);
  };

  return (
    <View>
      <Container>
        <Typo.Body01>닉네임</Typo.Body01>
        <InputContainer $isError={isLengthError}>
          <StyledTextInput
            placeholder="닉네임을 입력해주세요."
            placeholderTextColor={theme.gray.gray_07}
            value={inputValue}
            onChangeText={handleInputChange}
          />
          {isDuplicated === false ? (
            <SvgXml
              style={{paddingVertical: 14}}
              xml={OnboardingIcon.isValidate}
            />
          ) : (
            <DuplicateCheckButton
              onPress={handleValidate}
              $disabled={isLengthError}>
              <Typo.Caption>중복 확인</Typo.Caption>
            </DuplicateCheckButton>
          )}
        </InputContainer>
      </Container>
      {errorMessage && (
        <ErrorMessage>
          <Typo.Caption style={{color: '#FF692D'}}>{errorMessage}</Typo.Caption>
        </ErrorMessage>
      )}
    </View>
  );
}

const Container = styled.View`
  flex-direction: column;
  padding: 12px 20px 0 20px;
  gap: 8px;
`;

const InputContainer = styled.View<{$isError: boolean}>`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${p => (p.$isError ? '#FF692D' : p.theme.gray.gray_04)};
  border-radius: 8px;
  padding: 12px;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  color: ${p => p.theme.gray.gray_12};
`;

const DuplicateCheckButton = styled.TouchableOpacity<{$disabled: boolean}>`
  background-color: ${p => p.theme.system.sub_04};
  padding: 5px 10px;
  border-radius: 4px;
  opacity: ${p => (p.$disabled ? 0.5 : 1)};
`;

const ErrorMessage = styled.View`
  margin-top: 6px;
  padding: 0 32px;
`;

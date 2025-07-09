import {
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import {typography} from '@/styles/typography';
import Colors from '@/assets/colors/Colors';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import Typo from '@/components/Typo';

interface OnboardingNextButtonProps {
  onPress?: () => void;
  disabled?: boolean;
}

export default function OnboardingNextButton({
  onPress,
  disabled = false,
}: OnboardingNextButtonProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      style={{
        position: 'absolute',
        bottom: insets.bottom,
        left: 0,
        right: 0,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ButtonContainer>
        <StyledButton onPress={onPress} disabled={disabled}>
          <Typo.Subhead04
            style={{color: disabled ? theme.system.white : theme.gray.gray_12}}>
            다음
          </Typo.Subhead04>
        </StyledButton>
      </ButtonContainer>
    </KeyboardAvoidingView>
  );
}

const ButtonContainer = styled.View`
  bottom: 20px;
  left: 0;
  right: 0;
  padding: 0 20px;
`;

const StyledButton = styled(TouchableOpacity)<{disabled?: boolean}>`
  width: 100%;
  height: 52px;
  background-color: ${props =>
    props.disabled ? Colors.gray_06 : Colors.sub_04};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

import React from 'react';
import {SvgXml} from 'react-native-svg';
import styled, {useTheme} from 'styled-components/native';
import Typo from '@/components/Typo';
import useAppNavigation from '@/app/useAppNavigation';
import {MyPageIcon} from '@/assets/icons/myPage/MyPageIcon';
import {Text, TouchableOpacity, View} from 'react-native';

interface Props {
  title: string;
  description: string;
  step: number;
}

export default function OnboardingHeader({title, description, step}: Props) {
  const navigation = useAppNavigation();
  const theme = useTheme();

  return (
    <View>
      <Container>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgXml xml={MyPageIcon.arrowLeft} />
        </TouchableOpacity>
        <Typo.Headline>{title}</Typo.Headline>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgXml xml={MyPageIcon.closeButton} />
        </TouchableOpacity>
      </Container>

      <View style={{height: 2, backgroundColor: theme.gray.gray_03}}>
        <View
          style={{
            width: `${(step / 3) * 100}%`,
            height: 2,
            backgroundColor: theme.system.sub_04,
          }}
        />
      </View>

      <TextContainer>
        <Typo.Body01 style={{color: theme.gray.gray_07}}>{step}/3</Typo.Body01>
        <Typo.Subhead05>{description}</Typo.Subhead05>
      </TextContainer>
    </View>
  );
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  padding: 0 20px;
`;

const TextContainer = styled.View`
  padding: 30px 20px 0 20px;
  flex-direction: column;
  gap: 8px;
`;

import {View, Text, Switch} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import Typo from '@/components/Typo';
import theme from '@/common/theme';

export interface Props {
  title: string;
  description?: string;
  isGrayBackground?: boolean;
}

export default function NotificationSettingListItem({
  title,
  description,
  isGrayBackground,
}: Props) {
  const [isSwitch, setIsSwitch] = useState(false);

  return (
    <>
      <Container isGrayBackground={isGrayBackground}>
        <TextContainer>
          <Typo.Subhead03>{title}</Typo.Subhead03>
          {description && (
            <Typo.Body01 style={{color: theme.gray.gray_08}}>
              {description}
            </Typo.Body01>
          )}
        </TextContainer>
        <Switch
          trackColor={{false: theme.gray.gray_05, true: theme.system.sub_02}}
          value={isSwitch}
          onValueChange={() => setIsSwitch(!isSwitch)}
        />
      </Container>
      {title === '해시태그 알림' && (
        <View style={{height: 5, backgroundColor: theme.gray.gray_03}} />
      )}
    </>
  );
}

const Container = styled.View<{isGrayBackground?: boolean}>`
  height: 70px;
  justify-content: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: ${({theme, isGrayBackground}) =>
    isGrayBackground ? theme.gray.gray_02 : theme.gray.gray_01};
`;

const TextContainer = styled.View`
  flex-direction: column;
`;

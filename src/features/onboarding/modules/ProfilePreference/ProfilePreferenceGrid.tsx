import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import Typo from '@/components/Typo';
import styled, {useTheme} from 'styled-components/native';

const images = [
  require('@/assets/images/onboarding/acting.png'),
  require('@/assets/images/onboarding/actor.png'),
  require('@/assets/images/onboarding/casting.png'),
  require('@/assets/images/onboarding/emotional.png'),
  require('@/assets/images/onboarding/entertaining.png'),
  require('@/assets/images/onboarding/light.png'),
  require('@/assets/images/onboarding/quality.png'),
  require('@/assets/images/onboarding/stage-design.png'),
  require('@/assets/images/onboarding/story.png'),
];

const {width} = Dimensions.get('window');
const itemWidth = (width - 40 - 32) / 3;

export default function ProfilePreferenceGrid() {
  const theme = useTheme();

  return (
    <View style={{paddingHorizontal: 20, marginTop: 30}}>
      <Typo.Body01 style={{color: theme.gray.gray_08}}>
        최대 3개 선택 가능
      </Typo.Body01>

      <Container>
        {images.map((image, index) => (
          <GridItem key={index}>
            <Image
              source={image}
              resizeMode="contain"
              style={{
                width: '100%',
                height: '100%',
              }}
              tintColor={'indigo'}
            />
          </GridItem>
        ))}
      </Container>
    </View>
  );
}

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
`;

const GridItem = styled.View`
  width: ${itemWidth}px;
  aspect-ratio: 1;
  border-radius: 8px;
`;

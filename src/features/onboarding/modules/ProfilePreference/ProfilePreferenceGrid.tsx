import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import Typo from '@/components/Typo';
import styled, {useTheme} from 'styled-components/native';

const {width} = Dimensions.get('window');
const itemWidth = (width - 40 - 32) / 3;

export interface Props {
  setSelectedKeywords: (keywords: string[]) => void;
  selectedKeywords: string[];
}

export default function ProfilePreferenceGrid({
  setSelectedKeywords,
  selectedKeywords,
}: Props) {
  const theme = useTheme();
  const gridItems = [
    {
      id: 'EMOTIONAL',
      image: require('@/assets/images/onboarding/emotional.png'),
      selectedImage: require('@/assets/images/onboarding/emotional-selected.png'),
    },
    {
      id: 'ENTERTAINING',
      image: require('@/assets/images/onboarding/entertaining.png'),
      selectedImage: require('@/assets/images/onboarding/entertaining-selected.png'),
    },
    {
      id: 'QUALITY',
      image: require('@/assets/images/onboarding/quality.png'),
      selectedImage: require('@/assets/images/onboarding/quality-selected.png'),
    },
    {
      id: 'STAGE_DESIGN',
      image: require('@/assets/images/onboarding/stage-design.png'),
      selectedImage: require('@/assets/images/onboarding/stage-design-selected.png'),
    },
    {
      id: 'CASTING',
      image: require('@/assets/images/onboarding/casting.png'),
      selectedImage: require('@/assets/images/onboarding/casting-selected.png'),
    },
    {
      id: 'ACTING',
      image: require('@/assets/images/onboarding/acting.png'),
      selectedImage: require('@/assets/images/onboarding/acting-selected.png'),
    },
    {
      id: 'ACTOR',
      image: require('@/assets/images/onboarding/actor.png'),
      selectedImage: require('@/assets/images/onboarding/actor-selected.png'),
    },
    {
      id: 'LIGHT',
      image: require('@/assets/images/onboarding/light.png'),
      selectedImage: require('@/assets/images/onboarding/light-selected.png'),
    },
    {
      id: 'STORY',
      image: require('@/assets/images/onboarding/story.png'),
      selectedImage: require('@/assets/images/onboarding/story-selected.png'),
    },
  ];

  return (
    <View style={{paddingHorizontal: 20, marginTop: 30}}>
      <Typo.Body01 style={{color: theme.gray.gray_08}}>
        최대 3개 선택 가능
      </Typo.Body01>

      <Container>
        {gridItems.map((item, index) => (
          <GridItem
            key={index}
            onPress={() => {
              if (selectedKeywords.includes(item.id)) {
                setSelectedKeywords(
                  selectedKeywords.filter(keyword => keyword !== item.id),
                );
              } else {
                if (selectedKeywords.length < 3) {
                  setSelectedKeywords([...selectedKeywords, item.id]);
                }
              }
            }}>
            {selectedKeywords.includes(item.id) ? (
              <Image
                source={item.selectedImage}
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
              />
            ) : (
              <Image
                source={item.image}
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
              />
            )}
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

const GridItem = styled.TouchableOpacity`
  width: ${itemWidth}px;
  aspect-ratio: 1;
  border-radius: 8px;
`;

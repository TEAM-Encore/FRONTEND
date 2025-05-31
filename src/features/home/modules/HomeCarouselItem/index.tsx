import useAppNavigation from '@/app/useAppNavigation';
import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';

type Props = {
  id: number;
  image: any;
};

function HomeCarouselItem({id, image}: Props) {
  const {navigate} = useAppNavigation();

  const handlePress = () => {
    navigate('HomeBannerScreen', {bannerId: id});
  };

  return (
    <Root onPress={handlePress}>
      <Image style={{width: 290, height: 170}} source={image} />
    </Root>
  );
}

export default HomeCarouselItem;

const Root = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

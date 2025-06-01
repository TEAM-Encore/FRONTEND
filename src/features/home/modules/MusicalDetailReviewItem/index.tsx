import {PremiumIcon} from '@/assets/icons/premium/PremiumIcon';
import Typo from '@/components/Typo';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';

type Props = {
  title: string;
  nickname: string;
  date: string;
  rating: number;
  views: number;
  likes: number;
};

function MusicalDetailReviewItem({
  title,
  nickname,
  date,
  rating,
  views,
  likes,
}: Props) {
  const handlePress = () => {};

  return (
    <Root onPress={handlePress}>
      <Body>
        <Title>{title}</Title>
        <Desc>
          {nickname} ・ {date}
        </Desc>
      </Body>

      <Footer>
        <RatingSection>
          <SvgXml xml={PremiumIcon.star} />
          <Stat>총평 {rating}</Stat>
        </RatingSection>

        <StatSection>
          <StatItem>
            <SvgXml xml={PremiumIcon.view} />
            <Stat>{views}</Stat>
          </StatItem>

          <StatItem>
            <SvgXml xml={PremiumIcon.like} />
            <Stat>{likes}</Stat>
          </StatItem>
        </StatSection>
      </Footer>
    </Root>
  );
}

export default MusicalDetailReviewItem;

const Root = styled.TouchableOpacity`
  gap: 8px;
  padding: 10px 20px;
  border-bottom-width: 0.75px;
  border-color: ${p => p.theme.gray.gray_04};
`;

const Body = styled.View`
  gap: 4px;
`;

const Title = styled(Typo.Subhead03)``;

const Desc = styled(Typo.Caption)`
  color: ${p => p.theme.gray.gray_07};
`;

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RatingSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const Stat = styled(Typo.Caption)`
  color: ${p => p.theme.gray.gray_08};
`;

const StatSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const StatItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

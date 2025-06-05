import {ITicketBook} from '@/api/ticketBookList.api';
import HomeStyles from '@/app/home/HomeScreen/style';
import useAppNavigation from '@/app/useAppNavigation';
import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import Typo from '@/components/Typo';
import React from 'react';
import {Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import styled, {useTheme} from 'styled-components/native';

type Props = {
  ticket: ITicketBook;
};

function TicketBookItem({ticket}: Props) {
  const {
    id,
    musical_title,
    series,
    viewed_date,
    location,
    seat,
    actors,
    has_review,
    rating,
  } = ticket;
  const theme = useTheme();
  const {navigate} = useAppNavigation();

  const handlePress = () => {
    navigate('TicketDetailScreen', {id});
  };

  return (
    <Root onPress={handlePress}>
      <Body>
        <Text style={HomeStyles.textTicketTitle} numberOfLines={1}>
          {musical_title}
        </Text>

        <View style={[HomeStyles.containerRow]}>
          <SvgXml xml={HomeIcon.season} />
          <Text style={HomeStyles.textTicketDateActor}>{series}</Text>
        </View>

        <View style={[HomeStyles.containerRow]}>
          <SvgXml xml={HomeIcon.date} />
          <Text style={HomeStyles.textTicketDateActor}>{viewed_date}</Text>
        </View>

        <View style={[HomeStyles.containerRow]}>
          <SvgXml xml={HomeIcon.place} />
          <Text style={HomeStyles.textTicketDateActor}>
            {location} {seat}
          </Text>
        </View>

        <View style={HomeStyles.containerRow}>
          <SvgXml xml={HomeIcon.actor} />
          <Text style={HomeStyles.textTicketDateActor}>{actors.join(' ')}</Text>
        </View>
      </Body>

      <SvgXml style={{alignSelf: 'center'}} xml={HomeIcon.line} />

      <Tail>
        {has_review && rating ? (
          <>
            <ScoresContainer>
              {Array.from({length: 5}).map((_, index) => (
                <SvgXml
                  key={index}
                  color={theme.gray.gray_12}
                  xml={
                    rating.total_rating >= index
                      ? HomeIcon.fullStar
                      : HomeIcon.star
                  }
                />
              ))}
            </ScoresContainer>

            <Review>총평 {rating.total_rating}</Review>
          </>
        ) : (
          <>
            <ScoresContainer>
              {Array.from({length: 5}).map((_, index) => (
                <SvgXml key={index} xml={HomeIcon.star} />
              ))}
            </ScoresContainer>

            <Review>아직 남겨주신{'\n'}리뷰가 없어요</Review>
          </>
        )}
      </Tail>
    </Root>
  );
}

export default TicketBookItem;

const Root = styled.TouchableOpacity`
  flex-direction: row;
`;

const Body = styled.View`
  flex: 1;
  gap: 4px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${p => p.theme.gray.gray_03};
`;

const Tail = styled.View`
  width: 84px;
  height: 150px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 8px;
  background-color: ${p => p.theme.system.sub_03};
`;

const ScoresContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Review = styled(Typo.Caption)`
  text-align: center;
  color: ${p => p.theme.gray.gray_09};
  font-size: 10px;
`;

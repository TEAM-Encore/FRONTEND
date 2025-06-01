import HomeStyles from '@/app/home/HomeScreen/style';
import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import React from 'react';
import {Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';

type Props = {
  title: string;
  date: string;
  place: string;
  season: string;
  actor: string;
  star: number;
  hasReview?: boolean;
  color: string;
};

function TicketBookItem({
  title,
  date,
  place,
  season,
  actor,
  star,
  hasReview,
  color,
}: Props) {
  const handlePress = () => {};

  return (
    <Root onPress={handlePress}>
      <Body>
        <Text style={HomeStyles.textTicketTitle}>{title}</Text>

        <View style={[HomeStyles.containerRow]}>
          <SvgXml xml={HomeIcon.season} />
          <Text style={HomeStyles.textTicketDateActor}>{season}</Text>
        </View>

        <View style={[HomeStyles.containerRow]}>
          <SvgXml xml={HomeIcon.date} />
          <Text style={HomeStyles.textTicketDateActor}>{date}</Text>
        </View>

        <View style={[HomeStyles.containerRow]}>
          <SvgXml xml={HomeIcon.place} />
          <Text style={HomeStyles.textTicketDateActor}>{place}</Text>
        </View>

        <View style={HomeStyles.containerRow}>
          <SvgXml xml={HomeIcon.actor} />
          <Text style={HomeStyles.textTicketDateActor}>{actor}</Text>
        </View>
      </Body>

      <SvgXml style={{alignSelf: 'center'}} xml={HomeIcon.line} />

      <Tail></Tail>
    </Root>
  );
}

export default TicketBookItem;

const Root = styled.TouchableOpacity`
  flex-direction: row;
`;

const Body = styled.View`
  flex: 1;
  gap: 6px;
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

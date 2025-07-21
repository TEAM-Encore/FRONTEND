import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import {SvgXml} from 'react-native-svg';
import MusicalDetailStyles from '@/app/home/HomeMusicalScreen/style';
import useMusicalDetail from '../../hooks/useMusicalDetail';
import DateUtil from '@/util/DateUtil';
import styled from 'styled-components/native';
import Typo from '@/components/Typo';
import {IActor} from '@/api/musical.api';

type Props = {
  id: number;
};

const MusicalDetailInfo = ({id}: Props) => {
  const {musicalDetail} = useMusicalDetail(id);
  const {start_date, end_date, location, age, running_time, actors} =
    musicalDetail;

  const roleActorsMap = actors.reduce((acc, cur) => {
    const {role_name} = cur;

    if (acc[role_name]) {
      acc[role_name] = [...acc[role_name], cur];
    } else {
      acc[role_name] = [cur];
    }

    return acc;
  }, {} as Record<string, IActor[]>);

  return (
    <Root>
      <Section>
        <Title>공연 요약</Title>

        <SummarySection>
          <View style={MusicalDetailStyles.icon_container}>
            <SvgXml
              xml={HomeIcon.periodIcon}
              style={MusicalDetailStyles.icon}
            />
            <Text style={MusicalDetailStyles.iconTitle}>기간</Text>
            <Text style={MusicalDetailStyles.iconContent_1}>
              {DateUtil.formatDot(start_date)} ~ {DateUtil.formatDot(end_date)}
            </Text>
          </View>
          <View style={{...MusicalDetailStyles.icon_container, marginTop: 16}}>
            <SvgXml xml={HomeIcon.placeIcon} style={MusicalDetailStyles.icon} />
            <Text style={MusicalDetailStyles.iconTitle}>공연장</Text>
            <Text style={MusicalDetailStyles.iconContent_2}>{location}</Text>
          </View>
          <View style={{...MusicalDetailStyles.icon_container, marginTop: 16}}>
            <SvgXml xml={HomeIcon.ageIcon} style={MusicalDetailStyles.icon} />
            <Text style={MusicalDetailStyles.iconTitle}>관람연령</Text>
            <Text style={MusicalDetailStyles.iconContent_3}>{age}세 이상</Text>
          </View>
          <View style={{...MusicalDetailStyles.icon_container, marginTop: 16}}>
            <SvgXml xml={HomeIcon.timeIcon} style={MusicalDetailStyles.icon} />
            <Text style={MusicalDetailStyles.iconTitle}>러닝타임</Text>
            <Text style={MusicalDetailStyles.iconContent_4}>
              {running_time}분
            </Text>
          </View>
        </SummarySection>
      </Section>

      <Section>
        <Title>주요 출연진</Title>

        {Object.entries(roleActorsMap).map(([role, actors]) => (
          <View key={role}>
            <Text style={MusicalDetailStyles.subTitle}>{role} 역</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {actors.map(actor => (
                <View
                  key={`k_${role}_${actor.actor_name}`}
                  style={MusicalDetailStyles.actorTextContainer}>
                  <Image
                    source={{uri: actor.actor_image_url}}
                    style={MusicalDetailStyles.actorContainer}
                  />
                  <Text style={MusicalDetailStyles.actorText}>
                    {actor.actor_name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </Section>

      <Section>
        <Title>예매 바로가기</Title>

        <ScrollView horizontal>
          <LinkItem>
            <Image
              source={require('@/assets/images/home/interpark.png')}
              style={MusicalDetailStyles.actorContainer}
            />
            <Caption>인터파크</Caption>
          </LinkItem>
        </ScrollView>
      </Section>
    </Root>
  );
};

export default MusicalDetailInfo;

const Root = styled.View`
  gap: 40px;
  padding: 40px 20px;
`;

const SummarySection = styled.View`
  background-color: ${p => p.theme.gray.gray_03};
  border-radius: 12px;
  padding: 16px;
`;

const Title = styled(Typo.Subhead04)``;

const Section = styled.View`
  gap: 20px;
`;

const LinkItem = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const Caption = styled(Typo.Caption)`
  color: ${p => p.theme.gray.gray_12};
`;

import React from 'react';
import styled from 'styled-components/native';
import useTicket from '../../hooks/useTicket';
import Typo from '@/components/Typo';
import {SvgXml} from 'react-native-svg';
import {TicketBookIcon} from '@/assets/icons/ticketBook/TicketBookIcon';
import useAppNavigation from '@/app/useAppNavigation';

type Props = {
  ticketId: number;
};

function TicketBookWriteReviewBanner({ticketId}: Props) {
  const {navigate} = useAppNavigation();

  const ticket = useTicket(ticketId);

  const handleWritePress = () => {
    navigate('PremiumWriteScreen');
  };

  const handleViewPress = () => {};

  if (!ticket || !ticket.ticket_image_url) return <></>;

  if (ticket.has_review)
    return (
      <Root onPress={handleViewPress}>
        <SvgXml xml={TicketBookIcon.pencil} />

        <Body>
          <Title>작성한 리뷰 확인하기</Title>
        </Body>

        <SvgXml xml={TicketBookIcon.arrowRight} />
      </Root>
    );

  return (
    <Root onPress={handleWritePress}>
      <SvgXml xml={TicketBookIcon.pencil} />

      <Body>
        <Desc>공연 감상을 기록하고 싶다면?</Desc>
        <Title>리뷰 작성 바로가기</Title>
      </Body>

      <SvgXml xml={TicketBookIcon.arrowRight} />
    </Root>
  );
}

export default TicketBookWriteReviewBanner;

const Root = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  padding: 14px 10px 14px 16px;
  background-color: ${p => p.theme.system.sub_02};
`;

const Body = styled.View`
  flex: 1;
`;

const Desc = styled(Typo.Caption)``;

const Title = styled(Typo.Subhead03)``;

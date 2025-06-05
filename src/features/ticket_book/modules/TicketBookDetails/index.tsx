import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import Typo from '@/components/Typo';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import styled, {useTheme} from 'styled-components/native';
import useTicket from '../../hooks/useTicket';
import DateUtil from '@/util/DateUtil';
import {TicketBookIcon} from '@/assets/icons/ticketBook/TicketBookIcon';
import useAppNavigation from '@/app/useAppNavigation';
import {Image} from 'react-native';

type Props = {
  ticketId: number;
};

function TicketBookDetails({ticketId}: Props) {
  const theme = useTheme();
  const {navigate} = useAppNavigation();

  const ticket = useTicket(ticketId);

  const handleUploadImagePress = () => {
    navigate('EditTicketScreen', {id: ticketId});
  };

  if (!ticket) return <></>;

  return (
    <Root>
      <MusicalSection>
        <CoverImageContainer></CoverImageContainer>

        <MusicalBodySection>
          <Title>{ticket.musical_title}</Title>

          <MusicalInfoSection>
            <Row>
              <SvgXml xml={HomeIcon.season} />
              <Info>{ticket.series}</Info>
            </Row>

            <Row>
              <SvgXml xml={HomeIcon.date} />
              <Info>{DateUtil.formatDot(ticket.viewed_date)}</Info>
            </Row>

            <Row>
              <SvgXml xml={HomeIcon.place} />
              <Info>
                {ticket.location} {ticket.seat}
              </Info>
            </Row>

            <Row>
              <SvgXml xml={HomeIcon.actor} />
              <Info>{ticket.actors.join(' ')}</Info>
            </Row>
          </MusicalInfoSection>
        </MusicalBodySection>
      </MusicalSection>

      {ticket.ticket_image_url ? (
        <TicketImageSection>
          <Image
            source={{uri: ticket.ticket_image_url}}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 8,
            }}
          />
        </TicketImageSection>
      ) : (
        <UploadTicketSection>
          <UploadTicketBtn onPress={handleUploadImagePress}>
            <SvgXml xml={TicketBookIcon.addImage} color={theme.gray.gray_05} />
            <Upload>사진 추가</Upload>
          </UploadTicketBtn>

          <PleaseUpload>
            관람 인증을 완료하고 후기를 작성해보세요!{'\n'}
            실물 티켓, 예매 내역 캡쳐 모두 가능해요
          </PleaseUpload>
        </UploadTicketSection>
      )}
    </Root>
  );
}

export default TicketBookDetails;

const Root = styled.View`
  gap: 12px;
`;

const MusicalSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${p => p.theme.gray.gray_03};
`;

const CoverImageContainer = styled.View`
  aspect-ratio: 82/108;
  width: 82px;
  border-radius: 7px;
  background-color: ${p => p.theme.gray.gray_05};
`;

const MusicalBodySection = styled.View`
  flex: 1;
  gap: 8px;
`;

const Title = styled(Typo.Subhead03)``;

const MusicalInfoSection = styled.View`
  gap: 4px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const Info = styled(Typo.Caption)`
  color: ${p => p.theme.gray.gray_09};
`;

const TicketImageSection = styled.View`
  aspect-ratio: 335/270;
  border-radius: 8px;
  background-color: ${p => p.theme.gray.gray_05};
`;

const UploadTicketSection = styled.View`
  gap: 20px;
`;

const UploadTicketBtn = styled.TouchableOpacity`
  aspect-ratio: 335/194;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
  border-width: 1px;
  border-style: dashed;
  border-color: ${p => p.theme.gray.gray_05};
`;

const Upload = styled(Typo.Subhead02)`
  color: ${p => p.theme.gray.gray_05};
`;

const PleaseUpload = styled(Typo.Caption)`
  color: ${p => p.theme.gray.gray_07};
`;

import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import HomeBannerStyles from '@/app/home/HomeBannerScreen/styles';
import usePhase from '@/hooks/usePhase';
import AddTicketMusicalPhase from '@/features/ticket_book/modules/AddTicketMusicalPhase';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddTicketDatePhase from '@/features/ticket_book/modules/AddTicketDatePhase';
import AddTicketInfoPhase from '@/features/ticket_book/modules/AddTicketInfoPhase';
import AddTicketActorsPhase from '@/features/ticket_book/modules/AddTicketActorsPhase';
import AddTicketImagePhase from '@/features/ticket_book/modules/AddTicketImagePhase';
import useAppNavigation from '@/app/useAppNavigation';
import useCreateTicket from '@/features/ticket_book/hooks/useCreateTicket';
import useAddTicketStore from '@/features/ticket_book/stores/useAddTicketStore';
import {useShallow} from 'zustand/react/shallow';
import uploadImageByPresignedUrl from '@/util/uploadImageByPresignedUrl';
import {formatSeats} from '@/features/ticket_book/utils/seats';

import {TicketBookIcon} from '@/assets/icons/ticketBook/TicketBookIcon';
import useDialog from '@/features/core/hooks/useDialog';

export default function AddTicketScreen() {
  const {goBack, replace} = useAppNavigation();
  const {showDialog} = useDialog();

  const [musical, viewedDate, showTime, seats, actors, ticketImageUrl] =
    useAddTicketStore(
      useShallow(s => [
        s.musical,
        s.viewedDate,
        s.showTime,
        s.seats,
        s.actors,
        s.ticketImageUrl,
      ]),
    );
  const clear = useAddTicketStore(s => s.clear);
  const {Show, currentPhase, nextPhase, prevPhase} = usePhase([
    'musical',
    'date',
    'info',
    'actors',
    'image',
  ]);
  const createTicket = useCreateTicket();

  useEffect(() => {
    return () => clear();
  }, []);

  const handleBack = () => {
    if (currentPhase !== 'musical') return prevPhase();

    goBack();
  };

  const handleClose = () => {
    showDialog({
      title: '내역 추가를 그만할까요?',
      desc: '중간에 나갈 시 작성한 내용은 삭제됩니다.',
      confirmLabel: '그만하기',
      onConfirm: goBack,
    });
  };

  const handleConfirm = async () => {
    if (currentPhase !== 'image') return nextPhase();

    let ticketUrl = '';

    if (ticketImageUrl) {
      const uploadedUrl = await uploadImageByPresignedUrl({
        uri: ticketImageUrl,
      });
      if (uploadedUrl) ticketUrl = uploadedUrl;
    }

    if (!musical) return;

    createTicket(
      {
        user_id: 1,
        musical_id: musical.id,
        viewed_date: viewedDate,
        show_time: showTime,
        seat: formatSeats(seats),
        actor_ids: actors.map(a => a.id),
        ticket_image_url: ticketUrl,
      },
      {
        onSuccess: ticket => {
          replace('TicketDetailScreen', {id: ticket.id});
        },
      },
    );
  };

  return (
    <Screen>
      <Header>
        <MenuBtn onPress={handleBack}>
          <SvgXml xml={PostIcon.arrowLeft} />
        </MenuBtn>

        <TitleContainer>
          <Text style={HomeBannerStyles.textTitle}>내역 추가하기</Text>
        </TitleContainer>

        <MenuBtn onPress={handleClose}>
          <SvgXml xml={TicketBookIcon.close} />
        </MenuBtn>
      </Header>

      <Show name="musical">
        <AddTicketMusicalPhase onSelect={handleConfirm} />
      </Show>

      <Show name="date">
        <AddTicketDatePhase onConfirm={handleConfirm} />
      </Show>

      <Show name="info">
        <AddTicketInfoPhase onConfirm={handleConfirm} />
      </Show>

      <Show name="actors">
        <AddTicketActorsPhase onConfirm={handleConfirm} />
      </Show>

      <Show name="image">
        <AddTicketImagePhase onConfirm={handleConfirm} />
      </Show>
    </Screen>
  );
}

const Screen = styled(SafeAreaView)`
  flex: 1;
`;

const Header = styled.View`
  height: 62px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
`;

const TitleContainer = styled.View`
  z-index: -10;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

const MenuBtn = styled.TouchableOpacity.attrs({hitSlop: 12})``;

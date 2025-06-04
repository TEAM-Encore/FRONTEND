import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import TicketDetailStyles from './style';
import useAppRoute from '@/app/useAppRoute';
import TicketBookDetails from '@/features/ticket_book/modules/TicketBookDetails';
import TicketBookDetailsHeader from '@/features/ticket_book/modules/TicketBookDetailsHeader';
import TicketBookWriteReviewBanner from '@/features/ticket_book/modules/TicketBookWriteReviewBanner';
import styled from 'styled-components/native';

export default function TicketDetailScreen() {
  const {id} = useAppRoute('TicketDetailScreen').params;

  return (
    <SafeAreaView style={TicketDetailStyles.container}>
      <TicketBookDetailsHeader ticketId={id} />

      <ScrollView contentContainerStyle={{padding: 20}}>
        <Main>
          <TicketBookDetails ticketId={id} />

          <TicketBookWriteReviewBanner ticketId={id} />
        </Main>
      </ScrollView>
    </SafeAreaView>
  );
}

const Main = styled.View`
  gap: 32px;
`;

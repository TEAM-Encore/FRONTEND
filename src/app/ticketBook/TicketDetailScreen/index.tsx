import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import TicketDetailStyles from './style';
import useAppRoute from '@/app/useAppRoute';
import TicketBookDetails from '@/features/ticket_book/modules/TicketBookDetails';
import TicketBookDetailsHeader from '@/features/ticket_book/modules/TicketBookDetailsHeader';

export default function TicketDetailScreen() {
  const {id} = useAppRoute('TicketDetailScreen').params;

  return (
    <SafeAreaView style={TicketDetailStyles.container}>
      <TicketBookDetailsHeader ticketId={id} />

      <ScrollView contentContainerStyle={{padding: 20}}>
        <TicketBookDetails ticketId={id} />
      </ScrollView>

      {/* <View style={TicketDetailStyles.containerTicketDetail}>
          <View style={TicketDetailStyles.containerTicket}>
            <Image style={TicketDetailStyles.containerTicketImage} />
            <View style={HomeStyles.containerTicketText}>
              <Text style={HomeStyles.textTicketTitle}>
                {ticket.musical_title}
              </Text>
              <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                <SvgXml xml={HomeIcon.season} />
                <Text style={HomeStyles.textTicketDateActor}>
                  {ticket.series}
                </Text>
              </View>
              <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                <SvgXml xml={HomeIcon.date} />
                <Text style={HomeStyles.textTicketDateActor}>
                  {ticket.viewed_date}
                </Text>
              </View>
              <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                <SvgXml xml={HomeIcon.place} />
                <Text style={HomeStyles.textTicketDateActor}>
                  {ticket.location} {ticket.seat}
                </Text>
              </View>
              <View style={HomeStyles.containerRow}>
                <SvgXml xml={HomeIcon.actor} />
                <Text style={HomeStyles.textTicketDateActor}>
                  {ticket.actors}
                </Text>
              </View>
            </View>
          </View>

          {ticket.ticket_image_url == null ? (
            <View style={TicketDetailStyles.containerDashed}>
              <View style={TicketDetailStyles.containerAddImage}>
                <SvgXml xml={TicketBookIcon.addImage} />
                <Text style={TicketDetailStyles.textAddImage}>사진 추가</Text>
              </View>
            </View>
          ) : (
            <Image
              source={{uri: ticket.ticket_image_url}}
              style={TicketDetailStyles.ticketAuthImage}
            />
          )}

          <View style={TicketDetailStyles.containerReview}>
            <SvgXml
              xml={TicketBookIcon.pencil}
              style={TicketDetailStyles.iconPencil}
            />
            {ticket.has_review == false ? (
              <View>
                <Text style={TicketDetailStyles.textReviewTitle}>
                  공연 감상을 기록하고 싶다면?
                </Text>
                <Text style={TicketDetailStyles.textReviewSubTitle}>
                  리뷰 작성 바로가기
                </Text>
              </View>
            ) : (
              <Text style={TicketDetailStyles.textReviewSubTitle}>
                작성한 리뷰 확인하기
              </Text>
            )}

            <SvgXml
              xml={TicketBookIcon.arrowRight}
              style={TicketDetailStyles.iconArrowRight}
            />
          </View>
        </View> */}
    </SafeAreaView>
  );
}

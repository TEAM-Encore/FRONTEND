import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

import HomeStyles from '@/pages/home/HomeStyles';
import TicketDetailStyles from '@/pages/ticketbook/TicketDetailStyles';

import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import {TicketBookIcon} from '@/assets/icons/ticketbook/TicketBookIcon';

export default function TicketDetailPage() {
  const navigation = useNavigation();
  const [ticketAuth, setTicketAuth] = useState(null);
  const [review, setReview] = useState(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const data = {
    id: 1,
    image: require('@/assets/images/home/TicketBackground.png'),
    title: '지킬 앤 하이드',
    season: '3연',
    date: '24.10.16',
    place: '세종문화회관 A구역 6열 4번',
    actor: '전동석 김성철 선민 최수진',
    star: 0,
  };

  return (
    <SafeAreaView style={TicketDetailStyles.container}>
      <ScrollView>
        <View style={TicketDetailStyles.containerHeader}>
          <TouchableOpacity
            style={TicketDetailStyles.iconGoBack}
            onPress={() => handleGoBack()}>
            <SvgXml style={{margin: 7.75}} xml={PostIcon.arrowLeft} />
          </TouchableOpacity>
          <Text style={TicketDetailStyles.textTitle}>티켓 내역</Text>
          <TouchableOpacity style={{position: 'absolute', right: 65}}>
            <SvgXml xml={TicketBookIcon.edit} />
          </TouchableOpacity>
          <TouchableOpacity style={{position: 'absolute', right: 25}}>
            <SvgXml xml={TicketBookIcon.delete} />
          </TouchableOpacity>
        </View>

        <View style={TicketDetailStyles.containerTicketDetail}>
          <View style={TicketDetailStyles.containerTicket}>
            <Image style={TicketDetailStyles.containerTicketImage} />
            <View style={HomeStyles.containerTicketText}>
              <Text style={HomeStyles.textTicketTitle}>{data.title}</Text>
              <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                <SvgXml xml={HomeIcon.season} />
                <Text style={HomeStyles.textTicketDateActor}>
                  {data.season}
                </Text>
              </View>
              <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                <SvgXml xml={HomeIcon.date} />
                <Text style={HomeStyles.textTicketDateActor}>{data.date}</Text>
              </View>
              <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                <SvgXml xml={HomeIcon.place} />
                <Text style={HomeStyles.textTicketDateActor}>{data.place}</Text>
              </View>
              <View style={HomeStyles.containerRow}>
                <SvgXml xml={HomeIcon.actor} />
                <Text style={HomeStyles.textTicketDateActor}>{data.actor}</Text>
              </View>
            </View>
          </View>

          {ticketAuth == null ? (
            <View style={TicketDetailStyles.containerDashed}>
              <View style={TicketDetailStyles.containerAddImage}>
                <SvgXml xml={TicketBookIcon.addImage} />
                <Text style={TicketDetailStyles.textAddImage}>사진 추가</Text>
              </View>
            </View>
          ) : (
            <Image style={TicketDetailStyles.ticketAuthImage} />
          )}

          <View style={TicketDetailStyles.containerReview}>
            <SvgXml
              xml={TicketBookIcon.pencil}
              style={TicketDetailStyles.iconPencil}
            />
            {review == null ? (
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

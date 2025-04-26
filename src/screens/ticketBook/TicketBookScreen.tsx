import React, {useState, useMemo, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';

import HomeStyles from '@/screens/home/HomeStyles';
import TicketBookStyles from '@/screens/ticketBook/TicketBookStyles';
import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import {TicketBookIcon} from '@/assets/icons/ticketBook/TicketBookIcon';

import IconSearch from '@/assets/icons/dashboard/IconSearch';
import IconNotification from '@/assets/icons/dashboard/IconNotification';
import ModalCategory from '@/components/categoryModal/ModalCategory';
import {getTicketBookList} from '@/api/ticketBookList.api';
import Colors from '@/assets/colors/Colors';

type RootStackParamList = {
  HomeSearchDefaultScreen: undefined;
  AddTicketScreen: undefined;
  TicketDetailScreen: {ticket: TicketItem};
};

type TicketItem = {
  id: number;
  musical_title: string;
  actors: string[];
  location: string;
  seat: string;
  series: string;
  total_rating: number;
  viewed_date: string;
  has_review?: boolean;
  user_id?: number;
};

export default function TicketBookScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [category, setCategory] = useState('기간 설정');
  const categoryList = ['전체보기', '최근 1주', '최근 1달', '최근 1년'];
  const [ticketList, setTicketList] = useState<TicketItem[]>([]);

  const fetchTicketList = async () => {
    try {
      let period = 'NULL';
      if (category == '최근 1주') {
        period = 'WEEK';
      } else if (category == '최근 1달') {
        period = 'MONTH';
      } else if (category == '최근 1년') {
        period = 'YEAR';
      }
      const response = await getTicketBookList(period); // API 호출 시 필터링된 기간 값을 전달
      setTicketList(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error('티켓북 리스트 조회 오류: ', error);
    }
  };

  useEffect(() => {
    fetchTicketList();
  }, [category]);

  const Ticket = ({
    item,
    image,
    title,
    date,
    place,
    season,
    actor,
    star,
    hasReview,
    color,
  }: {
    item: TicketItem;
    image: any;
    title: string;
    date: string;
    place: string;
    season: string;
    actor: string;
    star: number;
    hasReview?: boolean;
    color: string;
  }) => {
    return (
      <TouchableOpacity
        style={{alignItems: 'center', marginBottom: 21}}
        onPress={() =>
          navigation.navigate('TicketDetailScreen', {ticket: item})
        }>
        <View style={HomeStyles.containerTicket}>
          <View style={HomeStyles.ticket1}>
            <Image
              style={HomeStyles.imageTicket1}
              source={image}
              resizeMode="cover"
            />
            <View style={HomeStyles.containerTicketText}>
              <Text style={HomeStyles.textTicketTitle}>{title}</Text>
              <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                <SvgXml xml={HomeIcon.season} />
                <Text style={HomeStyles.textTicketDateActor}>{season}</Text>
              </View>
              <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                <SvgXml xml={HomeIcon.date} />
                <Text style={HomeStyles.textTicketDateActor}>{date}</Text>
              </View>
              <View style={[HomeStyles.containerRow, {marginBottom: 4}]}>
                <SvgXml xml={HomeIcon.place} />
                <Text style={HomeStyles.textTicketDateActor}>{place}</Text>
              </View>
              <View style={HomeStyles.containerRow}>
                <SvgXml xml={HomeIcon.actor} />
                <Text style={HomeStyles.textTicketDateActor}>{actor}</Text>
              </View>
            </View>
          </View>
          <SvgXml style={HomeStyles.ticketLine} xml={HomeIcon.line} />
          <View style={[HomeStyles.ticket2, {backgroundColor: color}]}>
            {hasReview ? (
              <>
                <View style={{flexDirection: 'row'}}>
                  {Array.from({length: 5}).map((_, index) => (
                    <SvgXml
                      key={index}
                      xml={index < star ? HomeIcon.fullStar : HomeIcon.star}
                    />
                  ))}
                </View>
                <Text style={HomeStyles.textReview}>총평 {star}</Text>
              </>
            ) : (
              <>
                <View style={{flexDirection: 'row'}}>
                  {Array.from({length: 5}).map((_, index) => (
                    <SvgXml key={index} xml={HomeIcon.star} />
                  ))}
                </View>
                <Text style={HomeStyles.textReview}>
                  아직 남겨주신{'\n'}리뷰가 없어요
                </Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const pressCategory = () => {
    setModalVisible(true);
    setModalTitle('기간 설정');
  };

  const renderHeader = () => (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 6,
          marginBottom: 23,
          marginLeft: 30,
        }}
        onPress={() => pressCategory()}>
        <Text style={TicketBookStyles.textCategory}>{category}</Text>
        <SvgXml xml={DashboardIcon.arrowDown} />
      </TouchableOpacity>
      <ModalCategory
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        categoryList={categoryList}
        modalTitle={modalTitle}
        onSelect={(item: string) => {
          setCategory(item);
        }}
      />

      <FlatList
        contentContainerStyle={{justifyContent: 'center'}}
        keyExtractor={item => item.id.toString()}
        data={ticketList}
        renderItem={({item}) => {
          let ticketBackground;
          let backgroundColor;
          if (item.series == '초연') {
            ticketBackground = require('@/assets/images/home/TicketBackgroundRed.png');
            backgroundColor = '#FFB19B';
          } else if (item.series == '재연') {
            ticketBackground = require('@/assets/images/home/TicketBackgroundPurple.png');
            backgroundColor = '#D6AFFF';
          } else {
            ticketBackground = require('@/assets/images/home/TicketBackground.png');
            backgroundColor = Colors.sub_03;
          }

          return (
            <Ticket
              item={item}
              image={ticketBackground}
              title={item.musical_title}
              season={item.series}
              date={item.viewed_date}
              place={`${item.location} ${item.seat}`}
              actor={item.actors?.join(', ')}
              star={item.total_rating}
              hasReview={item.has_review}
              color={backgroundColor}
            />
          );
        }}
      />
    </>
  );

  return (
    <SafeAreaView style={TicketBookStyles.container}>
      <View style={TicketBookStyles.containerHeader}>
        <View style={TicketBookStyles.containerIcons}>
          <Text style={TicketBookStyles.textTitle}>티켓북</Text>
          <View style={TicketBookStyles.containerRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeSearchDefaultScreen')}>
              <IconSearch style={{marginRight: 20}} />
            </TouchableOpacity>
            <IconNotification />
          </View>
        </View>
      </View>
      <FlatList
        data={[]}
        ListHeaderComponent={renderHeader}
        renderItem={null}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity
        style={TicketBookStyles.containerPlusButton}
        onPress={() => navigation.navigate('AddTicketScreen')}>
        <SvgXml xml={TicketBookIcon.plus} style={TicketBookStyles.iconPlus} />
        <Text style={TicketBookStyles.textPlusButton}>추가</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

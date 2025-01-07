import React, {useState, useMemo} from 'react';
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

import HomeStyles from '@/pages/home/HomeStyles';
import TicketBookStyles from '@/pages/ticketbook/TicketBookStyles';

import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import {TicketBookIcon} from '@/assets/icons/ticketbook/TicketBookIcon';
import IconSearch from '@/assets/icons/dashboard/IconSearch';
import IconNotification from '@/assets/icons/dashboard/IconNotification';
import ModalCategory from '@/components/categoryModal/ModalCategory';

type RootStackParamList = {
  AddTicketPage: undefined;
  TicketDetailPage: undefined;
};

export default function TicketBookPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [category, setCategory] = useState('기간 설정');
  const categoryList = ['전체보기', '최근 1주', '최근 1달', '최근 1년'];

  const data = useMemo(
    () => [
      {
        id: 1,
        image: require('@/assets/images/home/TicketBackground.png'),
        title: '위키드',
        season: '3연',
        date: '24.06.21',
        place: '세종문화회관 A구역 6열 4번',
        actor: '우선영 염지은 하은영 윤혜원',
        star: 0,
      },
      {
        id: 2,
        image: require('@/assets/images/home/TicketBackground.png'),
        title: '지킬앤하이드',
        season: '2연',
        date: '24.07.21',
        place: '세종문화회관 A구역 6열 4번',
        actor: '우선영 염지은 하은영 윤혜원',
        star: 4.0,
      },
      {
        id: 3,
        image: require('@/assets/images/home/TicketBackground.png'),
        title: '위키드',
        season: '5연',
        date: '25.01.16',
        place: '세종문화회관 A구역 6열 4번',
        actor: '우선영 염지은 하은영 윤혜원',
        star: 2.0,
      },
    ],
    [],
  );

  const Ticket = ({
    image,
    title,
    date,
    place,
    season,
    actor,
    star,
  }: {
    image: any;
    title: string;
    date: string;
    place: string;
    season: string;
    actor: string;
    star: number;
  }) => {
    return (
      <TouchableOpacity
        style={{alignItems: 'center', marginBottom: 21}}
        onPress={() => navigation.navigate('TicketDetailPage')}>
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
          <View style={HomeStyles.ticket2}>
            {star === 0 ? (
              <>
                <View style={{flexDirection: 'row'}}>
                  <SvgXml xml={HomeIcon.star} />
                  <SvgXml xml={HomeIcon.star} />
                  <SvgXml xml={HomeIcon.star} />
                  <SvgXml xml={HomeIcon.star} />
                  <SvgXml xml={HomeIcon.star} />
                </View>
                <Text style={HomeStyles.textReview}>
                  아직 남겨주신{'\n'}리뷰가 없어요
                </Text>
              </>
            ) : (
              <>
                <View style={{flexDirection: 'row'}}>
                  <SvgXml xml={HomeIcon.star} />
                  <SvgXml xml={HomeIcon.star} />
                  <SvgXml xml={HomeIcon.star} />
                  <SvgXml xml={HomeIcon.star} />
                  <SvgXml xml={HomeIcon.star} />
                </View>
                <Text style={HomeStyles.textReview}>
                  총평 {star.toFixed(1)}
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
      <View style={TicketBookStyles.containerHeader}>
        <View style={TicketBookStyles.containerIcons}>
          <Text style={TicketBookStyles.textTitle}>티켓북</Text>
          <View style={TicketBookStyles.containerRow}>
            <TouchableOpacity>
              <IconSearch style={{marginRight: 20}} />
            </TouchableOpacity>
            <IconNotification />
          </View>
        </View>
      </View>

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
        data={data}
        renderItem={({item}) => (
          <Ticket
            image={item.image}
            title={item.title}
            season={item.season}
            date={item.date}
            place={item.place}
            actor={item.actor}
            star={item.star}
          />
        )}
      />
    </>
  );

  return (
    <SafeAreaView style={TicketBookStyles.container}>
      <FlatList
        data={[]}
        ListHeaderComponent={renderHeader}
        renderItem={null}
      />

      <TouchableOpacity
        style={TicketBookStyles.containerPlusButton}
        onPress={() => navigation.navigate('AddTicketPage')}>
        <SvgXml xml={TicketBookIcon.plus} style={TicketBookStyles.iconPlus} />
        <Text style={TicketBookStyles.textPlusButton}>추가</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

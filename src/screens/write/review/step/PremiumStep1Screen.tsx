import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ListRenderItem,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import PremiumWriteStyles from '../PremiumWriteStyles';
import {SvgXml} from 'react-native-svg';
import {ReviewWriteIcon} from '@/assets/icons/premium/ReviewWriteIcon';
import Colors from '@/assets/colors/Colors';
import {getTicketBookList} from '@/api/ticketBookList.api';
import {useFocusEffect} from '@react-navigation/native';

type ReviewItems = {
  id: string;
  musical_title: string;
  location: string;
  seat: string;
  actors: string;
  ticket_image_url: string;
};

type PremiumProp = {
  goToNext: any;
  saveData: any;
};

const PremiumStep1Screen: React.FC<PremiumProp> = ({goToNext, saveData}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState();
  const [input, setInput] = useState([]);

  const fetchreviewData = async () => {
    try {
      const response = await getTicketBookList('NULL');
      // console.log('API 요청 결과값: ', response.data.data);
      setReviewData(response.data.data);
    } catch (error) {
      console.log(error);
      Alert.alert('내역 조회 중 오류가 발생했습니다.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchreviewData();
    }, []),
  );

  const renderItem: ListRenderItem<ReviewItems> = ({item}) => {
    const isSelected = selectedId === item.id;
    const backgroundColor = isSelected ? Colors.gray_11 : Colors.gray_03;
    const titleColor = isSelected ? '#FBFBFB' : Colors.gray_12;
    const textColor = isSelected ? Colors.gray_06 : Colors.gray_09;
    const time_icon = isSelected
      ? ReviewWriteIcon.select_time
      : ReviewWriteIcon.time;
    const seat_icon = isSelected
      ? ReviewWriteIcon.select_seat
      : ReviewWriteIcon.seat;
    const person_icon = isSelected
      ? ReviewWriteIcon.select_person
      : ReviewWriteIcon.person;
    const icon = isSelected
      ? ReviewWriteIcon.list_black
      : ReviewWriteIcon.list_yellow;

    const handlePress = () => {
      if (isSelected) {
        setSelectedId(null);
      } else {
        setSelectedId(item.id);
        setSelectedTitle(item.musical_title);
        // console.log('선택된 카드:', item.id);
      }
    };

    return (
      <View style={PremiumWriteStyles.list_container}>
        <TouchableOpacity onPress={handlePress}>
          <View
            style={[
              PremiumWriteStyles.list_yellow,
              {backgroundColor: backgroundColor},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{uri: item.ticket_image_url}}
                style={{
                  ...PremiumWriteStyles.list_image,
                  width: 66,
                  height: 92,
                }}
              />
              <View style={PremiumWriteStyles.icons}>
                <Text
                  style={[PremiumWriteStyles.list_title, {color: titleColor}]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.musical_title}
                </Text>
                <View style={PremiumWriteStyles.icon_container}>
                  <SvgXml xml={time_icon} style={PremiumWriteStyles.icon} />
                  <Text
                    style={[PremiumWriteStyles.list_text, {color: textColor}]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.location}
                  </Text>
                </View>
                <View style={PremiumWriteStyles.icon_container}>
                  <SvgXml xml={seat_icon} style={PremiumWriteStyles.icon} />
                  <Text
                    style={[PremiumWriteStyles.list_text, {color: textColor}]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.seat}
                  </Text>
                </View>
                <View style={PremiumWriteStyles.icon_container}>
                  <SvgXml xml={person_icon} style={PremiumWriteStyles.icon} />
                  <Text
                    style={[PremiumWriteStyles.list_text, {color: textColor}]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.actors}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={PremiumWriteStyles.container}>
        <SvgXml xml={ReviewWriteIcon.progress_1} />

        <ScrollView>
          <View style={PremiumWriteStyles.field_container}>
            <Text style={PremiumWriteStyles.progressText}>1/6</Text>
            <Text style={PremiumWriteStyles.title}>
              후기를 작성할 내역을 선택해주세요.
            </Text>
            <FlatList
              data={reviewData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
        <SvgXml
          xml={ReviewWriteIcon.fade}
          style={PremiumWriteStyles.fadeLayer}
        />
      </SafeAreaView>

      <View style={PremiumWriteStyles.white} />
      <KeyboardAvoidingView
        style={PremiumWriteStyles.containerCommentInput}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={[
            PremiumWriteStyles.next_button,
            {
              backgroundColor: selectedId ? Colors.sub_04 : Colors.gray_06,
            },
          ]}
          onPress={() => {
            saveData(1, {id: selectedId, title: selectedTitle});
            goToNext(2);
          }}
          disabled={!selectedId}>
          <Text
            style={[
              PremiumWriteStyles.next_button_text,
              {
                color: selectedId ? Colors.gray_12 : Colors.gray_01,
              },
            ]}>
            다음
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default PremiumStep1Screen;

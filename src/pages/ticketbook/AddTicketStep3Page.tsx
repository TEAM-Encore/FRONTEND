import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import AddTicketStyles from './AddTicketStyles';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import Colors from '@/assets/colors/Colors';
import {useAddTicket} from '@/state/AddTicketContext';

import ModalCategory from '@/components/categoryModal/ModalCategory';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
};

export default function AddTicketStep3Page({
  goToNext,
  saveData,
  stepData,
}: PremiumProp) {
  const screenWidth = Dimensions.get('window').width;

  const {addTicketData, updateAddTicketData} = useAddTicket();

  const [valueSeat1, onChangeSeatText1] = useState('');
  const [valueSeat2, onChangeSeatText2] = useState('');
  const [valueSeat3, onChangeSeatText3] = useState('');
  const [valueSeat4, onChangeSeatText4] = useState('');
  const [place, setPlace] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [category, setCategory] = useState('공연 회차 선택');
  const categoryList = addTicketData.timeList;

  useEffect(() => {
    if (stepData[3]) {
      const {place, category, seat} = stepData[3];
      setCategory(category);
      setPlace(place);
      if (seat) {
        const seatParts = seat.split(' ');
        if (seatParts.length === 4) {
          onChangeSeatText1(seatParts[0].replace('층', ''));
          onChangeSeatText2(seatParts[1].replace('구역', ''));
          onChangeSeatText3(seatParts[2].replace('열', ''));
          onChangeSeatText4(seatParts[3].replace('번', ''));
        }
      }
    }
  }, [stepData]);

  const pressCategory = () => {
    setModalVisible(true);
    setModalTitle('공연 회차 선택');
  };

  const handleCategorySelect = (time: string) => {
    setCategory(time);
    if (time !== '공연 회차 선택') {
      updateAddTicketData({time: time});
    }
  };

  const isFormComplete =
    category !== '공연 회차 선택' &&
    valueSeat1 !== '' &&
    valueSeat2 !== '' &&
    valueSeat3 !== '' &&
    valueSeat4 !== '';

  const handleSeatChange = (
    seat1: string,
    seat2: string,
    seat3: string,
    seat4: string,
  ) => {
    const seat = `${seat1}층 ${seat2}구역 ${seat3}열 ${seat4}번`;
    updateAddTicketData({seat: seat});
  };

  const handleSaveData = () => {
    const updatedData = {
      place: place,
      category: category,
      seat: `${valueSeat1}층 ${valueSeat2}구역 ${valueSeat3}열 ${valueSeat4}번`,
    };
    saveData(3, updatedData);
    goToNext(4);
  };

  return (
    <>
      <SafeAreaView style={AddTicketStyles.container}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              AddTicketStyles.line,
              {width: screenWidth * (3 / 5), backgroundColor: Colors.sub_04},
            ]}
          />
          <View
            style={[AddTicketStyles.line, {width: screenWidth * (2 / 5)}]}
          />
        </View>

        <ScrollView style={{marginHorizontal: 20}}>
          <Text style={AddTicketStyles.textProgress}>3/5</Text>
          <Text style={[AddTicketStyles.textTitle, {marginBottom: 23}]}>
            공연에 대한 정보를 입력해주세요.
          </Text>
          <Text style={AddTicketStyles.textSubTitle}>공연 회차</Text>
          <TouchableOpacity
            style={AddTicketStyles.containerTime}
            onPress={() => pressCategory()}>
            <Text style={AddTicketStyles.textCategory}>{category}</Text>
            <SvgXml xml={DashboardIcon.arrowDown} />
          </TouchableOpacity>
          <ModalCategory
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            categoryList={categoryList}
            modalTitle={modalTitle}
            onSelect={handleCategorySelect}
          />
          <Text style={AddTicketStyles.textSubTitle}>공연장</Text>
          <Text style={AddTicketStyles.textInputPlace}>
            {addTicketData.place}
          </Text>
          <Text style={AddTicketStyles.textSubTitle}>관람 좌석</Text>
          <View style={AddTicketStyles.containerRow}>
            <TextInput
              style={AddTicketStyles.textInputSeat}
              onChangeText={text => {
                onChangeSeatText1(text);
                handleSeatChange(text, valueSeat2, valueSeat3, valueSeat4);
              }}
              value={valueSeat1}
            />
            <Text style={AddTicketStyles.textSeat}>층</Text>
            <TextInput
              style={AddTicketStyles.textInputSeat}
              onChangeText={text => {
                onChangeSeatText2(text);
                handleSeatChange(valueSeat1, text, valueSeat3, valueSeat4);
              }}
              value={valueSeat2}
            />
            <Text style={AddTicketStyles.textSeat}>구역</Text>
            <TextInput
              style={AddTicketStyles.textInputSeat}
              onChangeText={text => {
                onChangeSeatText3(text);
                handleSeatChange(valueSeat1, valueSeat2, text, valueSeat4);
              }}
              value={valueSeat3}
            />
            <Text style={AddTicketStyles.textSeat}>열</Text>
            <TextInput
              style={AddTicketStyles.textInputSeat}
              onChangeText={text => {
                onChangeSeatText4(text);
                handleSeatChange(valueSeat1, valueSeat2, valueSeat3, text);
              }}
              value={valueSeat4}
            />
            <Text style={AddTicketStyles.textSeat}>번</Text>
          </View>
        </ScrollView>
        <View style={AddTicketStyles.containerButton}>
          <TouchableOpacity
            style={[
              AddTicketStyles.containerNextButton,
              isFormComplete && {backgroundColor: Colors.sub_04},
            ]}
            onPress={handleSaveData}
            disabled={!isFormComplete}>
            <Text
              style={[
                AddTicketStyles.textNextButton,
                isFormComplete && {color: Colors.gray_12},
              ]}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

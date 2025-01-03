import React, {useState} from 'react';
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
  const [value, onChangeText] = useState('');
  const [valueSeat1, onChangeSeatText1] = useState('');
  const [valueSeat2, onChangeSeatText2] = useState('');
  const [valueSeat3, onChangeSeatText3] = useState('');
  const [valueSeat4, onChangeSeatText4] = useState('');
  const screenWidth = Dimensions.get('window').width;
  const [input, setInput] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [category, setCategory] = useState('공연 회차 선택');
  const categoryList = [
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
  ];

  const pressCategory = () => {
    setModalVisible(true);
    setModalTitle('공연 회차 선택');
  };

  const isFormComplete =
    category !== '공연 회차 선택' &&
    value !== '' &&
    valueSeat1 !== '' &&
    valueSeat2 !== '' &&
    valueSeat3 !== '' &&
    valueSeat4 !== '';

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
            onSelect={(item: string) => {
              setCategory(item);
            }}
          />
          <Text style={AddTicketStyles.textSubTitle}>공연장</Text>
          <TextInput
            style={AddTicketStyles.textInputPlace}
            placeholder="공연장 입력"
            onChangeText={text => onChangeText(text)}
            value={value}
          />
          <Text style={AddTicketStyles.textSubTitle}>관람 좌석</Text>
          <View style={AddTicketStyles.containerRow}>
            <TextInput
              style={AddTicketStyles.textInputSeat}
              onChangeText={text => onChangeSeatText1(text)}
              value={valueSeat1}
            />
            <Text style={AddTicketStyles.textSeat}>층</Text>
            <TextInput
              style={AddTicketStyles.textInputSeat}
              onChangeText={text => onChangeSeatText2(text)}
              value={valueSeat2}
            />
            <Text style={AddTicketStyles.textSeat}>구역</Text>
            <TextInput
              style={AddTicketStyles.textInputSeat}
              onChangeText={text => onChangeSeatText3(text)}
              value={valueSeat3}
            />
            <Text style={AddTicketStyles.textSeat}>열</Text>
            <TextInput
              style={AddTicketStyles.textInputSeat}
              onChangeText={text => onChangeSeatText4(text)}
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
            onPress={() => {
              saveData(3, input);
              goToNext(4);
            }}
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

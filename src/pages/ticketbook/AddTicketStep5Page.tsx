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

import AddTicketStyles from './AddTicketStyles';
import Colors from '@/assets/colors/Colors';
import {SvgXml} from 'react-native-svg';
import {TicketBookIcon} from '@/assets/icons/ticketbook/TicketBookIcon';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
};

export default function AddTicketStep5Page({
  goToNext,
  saveData,
  stepData,
}: PremiumProp) {
  const [value, onChangeText] = useState('');
  const screenWidth = Dimensions.get('window').width;
  const [input, setInput] = useState([]);

  return (
    <>
      <SafeAreaView style={AddTicketStyles.container}>
        <View
          style={[
            AddTicketStyles.line,
            {width: screenWidth, backgroundColor: Colors.sub_04},
          ]}
        />

        <ScrollView style={{marginHorizontal: 20}}>
          <Text style={AddTicketStyles.textProgress}>5/5</Text>
          <Text style={[AddTicketStyles.textTitle, {marginBottom: 0}]}>
            관람 인증을 위한 티켓을 업로드 해주세요.
          </Text>
          <Text style={AddTicketStyles.textDiscription}>
            실물 티켓, 예매 내역 모두 가능해요.
          </Text>
          <View style={AddTicketStyles.containerDashed}>
            <View style={AddTicketStyles.containerAddImage}>
              <SvgXml xml={TicketBookIcon.addImage} />
              <Text style={AddTicketStyles.textAddImage}>사진 추가</Text>
            </View>
          </View>
          <View style={AddTicketStyles.containerRow}>
            <SvgXml xml={TicketBookIcon.checkBox} />
            <Text style={AddTicketStyles.textCheckBox}>티켓 업로드 안함</Text>
          </View>
        </ScrollView>
        <View style={AddTicketStyles.containerButton}>
          <TouchableOpacity
            style={[
              AddTicketStyles.containerNextButton,
              value !== '' && {backgroundColor: Colors.sub_04},
            ]}
            onPress={() => {
              saveData(5, input);
              goToNext(6);
            }}
            disabled={value === ''}>
            <Text
              style={[
                AddTicketStyles.textNextButton,
                value !== '' && {color: Colors.gray_12},
              ]}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

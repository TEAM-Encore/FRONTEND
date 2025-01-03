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
};

export default function AddTicketStep1Page({goToNext, saveData}: PremiumProp) {
  const [value, onChangeText] = useState('');
  const screenWidth = Dimensions.get('window').width;
  const [input, setInput] = useState([]);

  return (
    <>
      <SafeAreaView style={AddTicketStyles.container}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              AddTicketStyles.line,
              {width: screenWidth / 5, backgroundColor: Colors.sub_04},
            ]}
          />
          <View
            style={[AddTicketStyles.line, {width: screenWidth * (4 / 5)}]}
          />
        </View>

        <ScrollView style={{marginHorizontal: 20}}>
          <Text style={AddTicketStyles.textProgress}>1/5</Text>
          <Text style={AddTicketStyles.textTitle}>
            공연과 관람 일정을 선택해주세요.
          </Text>
          <View style={AddTicketStyles.containerTextInputIcon}>
            <TextInput
              style={AddTicketStyles.textInputSearch}
              placeholder="공연명 검색"
              onChangeText={text => onChangeText(text)}
              value={value}
            />
            <SvgXml
              style={AddTicketStyles.iconSearch}
              xml={TicketBookIcon.search}
            />
            {value !== '' && (
              <TouchableOpacity
                style={AddTicketStyles.iconSearchCancel}
                onPress={() => onChangeText('')}>
                <SvgXml xml={TicketBookIcon.searchCancel} />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        <View style={AddTicketStyles.containerButton}>
          <TouchableOpacity
            style={[
              AddTicketStyles.containerNextButton,
              value !== '' && {backgroundColor: Colors.sub_04},
            ]}
            onPress={() => {
              saveData(1, input);
              goToNext(2);
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

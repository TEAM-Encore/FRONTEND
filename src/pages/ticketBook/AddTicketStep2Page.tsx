import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';

import AddTicketStyles from './AddTicketStyles';
import Colors from '@/assets/colors/Colors';
import {useAddTicket} from '@/state/AddTicketContext';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
};

export default function AddTicketStep2Page({
  goToNext,
  saveData,
  stepData,
}: PremiumProp) {
  const screenWidth = Dimensions.get('window').width;

  const {updateAddTicketData} = useAddTicket();

  const [selectedDate, setSelectedDate] = useState<string>(stepData[2] || '');

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    updateAddTicketData({date: day.dateString});
  };

  const renderHeader = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return (
      <Text>
        {year}년 {month}월
      </Text>
    );
  };

  return (
    <>
      <SafeAreaView style={AddTicketStyles.container}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              AddTicketStyles.line,
              {width: screenWidth * (2 / 5), backgroundColor: Colors.sub_04},
            ]}
          />
          <View
            style={[AddTicketStyles.line, {width: screenWidth * (3 / 5)}]}
          />
        </View>

        <ScrollView style={{marginHorizontal: 20}}>
          <Text style={AddTicketStyles.textProgress}>2/5</Text>
          <Text style={AddTicketStyles.textTitle}>
            관람한 일정을 선택해주세요.
          </Text>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: '#A765EE',
              },
            }}
            theme={{
              calendarBackground: Colors.gray_01,
              todayTextColor: Colors.gray_12,
              arrowColor: Colors.gray_12,
            }}
            renderHeader={(date: Date) => renderHeader(date)}
          />
        </ScrollView>
        <View style={AddTicketStyles.containerButton}>
          <TouchableOpacity
            style={[
              AddTicketStyles.containerNextButton,
              selectedDate !== '' && {backgroundColor: Colors.sub_04},
            ]}
            onPress={() => {
              saveData(2, selectedDate);
              goToNext(3);
            }}
            disabled={selectedDate === ''}>
            <Text
              style={[
                AddTicketStyles.textNextButton,
                selectedDate !== '' && {color: Colors.gray_12},
              ]}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

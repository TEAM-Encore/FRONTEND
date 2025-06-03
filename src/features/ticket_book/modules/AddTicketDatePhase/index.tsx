import React from 'react';
import {Text, ScrollView} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import Colors from '@/assets/colors/Colors';
import AddTicketStyles from '@/app/ticketBook/AddTicketScreen/style';
import styled from 'styled-components/native';
import Typo from '@/components/Typo';
import useAddTicketStore from '../../stores/useAddTicketStore';

type Props = {
  onConfirm: () => void;
};

export default function AddTicketDatePhase({onConfirm}: Props) {
  const date = useAddTicketStore(s => s.viewedDate);
  const setDate = useAddTicketStore(s => s.setViewedDate);

  const disabled = !date;

  const onDayPress = (day: DateData) => {
    setDate(day.dateString);
  };

  const renderHeader = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return (
      <Label>
        {year}년 {month}월
      </Label>
    );
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Root>
      <ScrollView>
        <Main>
          <Head>
            <Text style={AddTicketStyles.textProgress}>2/5</Text>

            <Text style={AddTicketStyles.textTitle}>
              관람한 일정을 선택해주세요.
            </Text>
          </Head>

          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [date]: {
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
        </Main>
      </ScrollView>

      <Footer>
        <Btn onPress={handleConfirm} disabled={disabled}>
          <Confirm disabled={disabled}>확인</Confirm>
        </Btn>
      </Footer>
    </Root>
  );
}

const Root = styled.View`
  flex: 1;
`;

const Main = styled.View`
  gap: 20px;
  padding: 20px;
`;

const Head = styled.View``;

const Label = styled(Typo.SubheadLong03)``;

const Footer = styled.View`
  padding: 20px;
`;

const Btn = styled.TouchableOpacity`
  height: 52px;
  align-items: center;
  justify-content: center;
  padding: 15px 10px;
  border-radius: 10px;
  background-color: ${p =>
    p.disabled ? p.theme.gray.gray_06 : p.theme.system.sub_04};
`;

const Confirm = styled(Typo.Subhead04)<{disabled?: boolean}>`
  text-align: center;
  color: ${p => (p.disabled ? p.theme.system.white : p.theme.gray.gray_12)};
`;

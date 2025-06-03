import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import AddTicketStyles from '@/app/ticketBook/AddTicketScreen/style';
import styled from 'styled-components/native';
import Typo from '@/components/Typo';
import {overlay} from 'overlay-kit';
import AddTicketTimeSelectBottomSheet from '../AddTicketTimeSelectBottomSheet';
import TimeUtil from '@/util/TimeUtil';
import useAddTicketStore from '../../stores/useAddTicketStore';
import {useShallow} from 'zustand/react/shallow';

type Props = {
  onConfirm: () => void;
};

export default function AddTicketInfoPhase({onConfirm}: Props) {
  const [musical, time, setTime, seats, setSeats] = useAddTicketStore(
    useShallow(s => [
      s.musical,
      s.showTime,
      s.setShowTime,
      s.seats,
      s.setSeats,
    ]),
  );
  const disabled = !musical || !time || !seats.length;

  const handlePressTime = () => {
    overlay.open(props => (
      <AddTicketTimeSelectBottomSheet
        {...props}
        initial={TimeUtil.toDay(time).toDate()}
        onConfirm={date => setTime(TimeUtil.format(date))}
      />
    ));
  };

  const handleSeatChange = (index: number, value: string) => {
    setSeats(seats.map((v, i) => (i === index ? value : v)));
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Root>
      <ScrollView>
        <Main>
          <Head>
            <Text style={AddTicketStyles.textProgress}>3/5</Text>
            <Text style={[AddTicketStyles.textTitle]}>
              공연에 대한 정보를 입력해주세요.
            </Text>
          </Head>

          <Section>
            <Text style={AddTicketStyles.textSubTitle}>공연 회차</Text>

            <TouchableOpacity
              style={AddTicketStyles.containerTime}
              onPress={handlePressTime}>
              <Text style={AddTicketStyles.textCategory}>
                {time || '공연 회차 선택'}
              </Text>

              <SvgXml xml={DashboardIcon.arrowDown} />
            </TouchableOpacity>
          </Section>

          <Section>
            <Text style={AddTicketStyles.textSubTitle}>공연장</Text>

            <Text style={AddTicketStyles.textInputPlace}>
              {musical?.location ?? ''}
            </Text>
          </Section>

          <Section>
            <Text style={AddTicketStyles.textSubTitle}>관람 좌석</Text>

            <View style={AddTicketStyles.containerRow}>
              <TextInput
                style={AddTicketStyles.textInputSeat}
                onChangeText={text => {
                  handleSeatChange(0, text);
                }}
                value={seats[0]}
              />
              <Text style={AddTicketStyles.textSeat}>층</Text>
              <TextInput
                style={AddTicketStyles.textInputSeat}
                onChangeText={text => {
                  handleSeatChange(1, text);
                }}
                value={seats[1]}
              />
              <Text style={AddTicketStyles.textSeat}>구역</Text>
              <TextInput
                style={AddTicketStyles.textInputSeat}
                onChangeText={text => {
                  handleSeatChange(2, text);
                }}
                value={seats[2]}
              />
              <Text style={AddTicketStyles.textSeat}>열</Text>
              <TextInput
                style={AddTicketStyles.textInputSeat}
                onChangeText={text => {
                  handleSeatChange(3, text);
                }}
                value={seats[3]}
              />
              <Text style={AddTicketStyles.textSeat}>번</Text>
            </View>
          </Section>
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
  gap: 32px;
  padding: 20px;
`;

const Section = styled.View`
  gap: 12px;
`;

const Head = styled.View``;

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

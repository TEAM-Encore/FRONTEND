import Colors from '@/assets/colors/Colors';
import BottomSheetModal from '@/components/BottomSheetModal';
import Typo from '@/components/Typo';
import DateUtil from '@/util/DateUtil';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled, {useTheme} from 'styled-components/native';

type Props = {
  isOpen: boolean;
  close: () => void;
  unmount: () => void;
  initial: Date | null;
  onConfirm: (date: Date) => void;
};

function TicketDateSelectBottomSheet({
  isOpen,
  close,
  unmount,
  initial,
  onConfirm,
}: Props) {
  const theme = useTheme();
  const {bottom} = useSafeAreaInsets();

  const [date, setDate] = useState(initial ?? new Date());

  const onDayPress = (day: DateData) => {
    setDate(new Date(day.dateString));
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
    close();
    onConfirm(date);
  };

  return (
    <BottomSheetModal isOpen={isOpen} close={close} unmount={unmount}>
      <Root>
        <Body>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [DateUtil.format(date)]: {
                selected: true,
                selectedColor: '#A765EE',
              },
            }}
            theme={{
              calendarBackground: theme.system.white,
              todayTextColor: Colors.gray_12,
              arrowColor: Colors.gray_12,
            }}
            renderHeader={(date: Date) => renderHeader(date)}
          />
        </Body>

        <Footer>
          <Btn onPress={handleConfirm}>
            <Confirm>확인</Confirm>
          </Btn>
        </Footer>

        <View style={{height: bottom}} />
      </Root>
    </BottomSheetModal>
  );
}

export default TicketDateSelectBottomSheet;

const Root = styled.View`
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: ${p => p.theme.system.white};
`;

const Body = styled.View`
  padding: 20px;
`;

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
  background-color: ${p => p.theme.system.sub_04};
`;

const Confirm = styled(Typo.Subhead04)`
  text-align: center;
`;

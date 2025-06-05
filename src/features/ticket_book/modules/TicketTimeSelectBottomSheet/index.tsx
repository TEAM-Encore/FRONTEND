import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import BottomSheetModal from '@/components/BottomSheetModal';
import Typo from '@/components/Typo';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';
import DatePicker from 'react-native-date-picker';

type Props = {
  isOpen: boolean;
  close: () => void;
  unmount: () => void;
  initial: Date | null;
  onConfirm: (date: Date) => void;
};

function TicketTimeSelectBottomSheet({
  isOpen,
  close,
  unmount,
  initial,
  onConfirm,
}: Props) {
  const {bottom} = useSafeAreaInsets();

  const [date, setDate] = useState(initial ?? new Date());

  const handleConfirm = () => {
    close();
    onConfirm(date);
  };

  return (
    <BottomSheetModal isOpen={isOpen} close={close} unmount={unmount}>
      <Root>
        <Header>
          <TitleSection>
            <Title>공연 회차 선택</Title>
          </TitleSection>

          <CloseBtn onPress={close}>
            <SvgXml xml={DashboardIcon.cancel} />
          </CloseBtn>
        </Header>

        <Body>
          <DatePicker date={date} onDateChange={setDate} mode="time" />
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

export default TicketTimeSelectBottomSheet;

const Root = styled.View`
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: ${p => p.theme.system.white};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
`;

const CloseBtn = styled.TouchableOpacity.attrs({hitSlop: 12})``;

const TitleSection = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Typo.Headline)`
  color: ${p => p.theme.system.wireframe_800};
`;

const Body = styled.View`
  justify-content: center;
  align-items: center;
`;

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

import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import BottomSheetModal from '@/components/BottomSheetModal';
import Typo from '@/components/Typo';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';

type Props = {
  isOpen: boolean;
  close: () => void;
  unmount: () => void;
  value: string;
  onConfirm: (value: string) => void;
};

const seriesList = ['3연', '재연', '초연'];

function MusicalSeriesSelectBottomSheet({
  isOpen,
  close,
  unmount,
  value,
  onConfirm,
}: Props) {
  const {bottom} = useSafeAreaInsets();

  const [selected, setSelected] = useState(value);

  const handleConfirm = () => {
    close();
    onConfirm(selected);
  };

  return (
    <BottomSheetModal isOpen={isOpen} close={close} unmount={unmount}>
      <Root>
        <Header>
          <TitleSection>
            <Title>공연 시즌 선택</Title>
          </TitleSection>

          <CloseBtn onPress={close}>
            <SvgXml xml={DashboardIcon.cancel} />
          </CloseBtn>
        </Header>

        <Body>
          {seriesList.map(series => {
            const isSelected = series === selected;

            const handlePress = () => setSelected(series);

            return (
              <OptionItem
                onPress={handlePress}
                isSelected={isSelected}
                key={series}>
                <OptionLabel isSelected={isSelected}>{series}</OptionLabel>
              </OptionItem>
            );
          })}
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

export default MusicalSeriesSelectBottomSheet;

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

const Body = styled.View``;

const OptionItem = styled.TouchableOpacity<{isSelected: boolean}>`
  align-items: center;
  justify-content: center;
  padding: 16px 10px;
  background-color: ${p =>
    p.isSelected ? p.theme.gray.gray_03 : p.theme.system.white};
`;

const OptionLabel = styled(Typo.Body02)<{isSelected: boolean}>`
  text-align: center;
  color: ${p => (p.isSelected ? p.theme.gray.gray_12 : p.theme.gray.gray_07)};
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

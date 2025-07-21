import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled, {useTheme} from 'styled-components/native';
import TicketDetailStyles from '../TicketDetailScreen/style';
import {Text} from 'react-native';
import useAppNavigation from '@/features/core/hooks/useAppNavigation';
import Typo from '@/components/Typo';
import {SvgXml} from 'react-native-svg';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import {HomeIcon} from '@/assets/icons/home/HomeIcon';
import {overlay} from 'overlay-kit';
import TimeUtil from '@/util/TimeUtil';
import TicketTimeSelectBottomSheet from '@/features/ticket_book/modules/TicketTimeSelectBottomSheet';
import TicketDateSelectBottomSheet from '@/features/ticket_book/modules/TicketDateSelectBottomSheet';
import DateUtil from '@/util/DateUtil';
import AddTicketStyles from '../AddTicketScreen/style';
import {TicketBookIcon} from '@/assets/icons/ticketBook/TicketBookIcon';
import useImagePicker from '@/features/core/hooks/useImagePicker';
import useEditTicket from '@/features/ticket_book/hooks/useEditTicket';
import useAppRoute from '@/features/core/hooks/useAppRoute';
import useTicket from '@/features/ticket_book/hooks/useTicket';
import {formatSeats, parseSeats} from '@/features/ticket_book/utils/seats';
import uploadImageByPresignedUrl from '@/util/uploadImageByPresignedUrl';

function EditTicketScreen() {
  const {id} = useAppRoute('EditTicketScreen').params;
  const theme = useTheme();
  const {goBack, navigate} = useAppNavigation();

  const ticket = useTicket(id);
  const {launchLibrary} = useImagePicker();
  const editTicket = useEditTicket();

  const [form, setForm] = useState<{
    series: string;
    date: string;
    seats: string[];
    imageUrl: string;
  }>({
    series: ticket?.series ?? '',
    date: ticket?.viewed_date ?? DateUtil.nowFormat(),
    seats: parseSeats(ticket?.seat ?? ''),
    imageUrl: ticket?.ticket_image_url ?? '',
  });
  const updateForm = <T extends keyof typeof form>(
    key: T,
    value: (typeof form)[T],
  ) => {
    setForm(prev => ({...prev, [key]: value}));
  };
  const hasImage = !!form.imageUrl;
  const disabled = !form.series || !form.date || form.seats.some(v => !v);

  const handleSeriesPress = () => {
    overlay.open(props => (
      <TicketTimeSelectBottomSheet
        {...props}
        initial={TimeUtil.toDay(form.series).toDate()}
        onConfirm={date => updateForm('series', TimeUtil.format(date))}
      />
    ));
  };

  const handleDatePress = () => {
    overlay.open(props => (
      <TicketDateSelectBottomSheet
        {...props}
        initial={new Date(form.date)}
        onConfirm={date => updateForm('date', DateUtil.format(date))}
      />
    ));
  };

  const handleSeatChange = (index: number, value: string) => {
    updateForm(
      'seats',
      form.seats.map((v, i) => (i === index ? value : v)),
    );
  };

  const handleImagePress = async () => {
    const asset = await launchLibrary();
    if (!asset?.uri) return;

    updateForm('imageUrl', asset.uri);
  };

  const handleConfirm = async () => {
    if (disabled) return;
    const {series, date, seats, imageUrl} = form;

    let ticketImageUrl = '';

    if (imageUrl) {
      const uploadedUrl = await uploadImageByPresignedUrl({
        uri: imageUrl,
      });
      if (uploadedUrl) ticketImageUrl = uploadedUrl;
    }

    editTicket(
      {
        ticketId: id,
        viewed_date: date,
        show_time: series,
        seat: formatSeats(seats),
        ticket_image_url: ticketImageUrl,
      },
      {onSuccess: updated => navigate('TicketDetailScreen', {id: updated.id})},
    );
  };

  return (
    <Screen>
      <Header>
        <TouchableOpacity onPress={goBack}>
          <MenuLabel>취소</MenuLabel>
        </TouchableOpacity>

        <Text style={TicketDetailStyles.textTitle}>티켓 내역</Text>

        <ConfirmBtn onPress={handleConfirm} disabled={disabled}>
          <MenuLabel>확인</MenuLabel>
        </ConfirmBtn>
      </Header>

      <ScrollView>
        <Main>
          <Section>
            <Label>공연 회차</Label>

            <OptionBtn onPress={handleSeriesPress}>
              <OptionValue>{form.series || '회차 선택'}</OptionValue>
              <SvgXml xml={DashboardIcon.arrowDown} width={10} height={10} />
            </OptionBtn>
          </Section>

          <Section>
            <Label>공연 일정</Label>

            <OptionBtn onPress={handleDatePress}>
              <SvgXml xml={HomeIcon.date} width={18} height={18} />
              <OptionValue>{DateUtil.formatDot(form.date)}</OptionValue>
              <SvgXml xml={DashboardIcon.arrowDown} width={10} height={10} />
            </OptionBtn>
          </Section>

          <Section>
            <Label>공연장</Label>
            <LocationContainer>
              <OptionValue>세종문화회관</OptionValue>
            </LocationContainer>
          </Section>

          <Section>
            <Label>관람 좌석</Label>

            <View style={AddTicketStyles.containerRow}>
              <TextInput
                style={AddTicketStyles.textInputSeat}
                onChangeText={text => {
                  handleSeatChange(0, text);
                }}
                value={form.seats[0]}
              />
              <Text style={AddTicketStyles.textSeat}>구역</Text>
              <TextInput
                style={AddTicketStyles.textInputSeat}
                onChangeText={text => {
                  handleSeatChange(1, text);
                }}
                value={form.seats[1]}
              />
              <Text style={AddTicketStyles.textSeat}>열</Text>
              <TextInput
                style={AddTicketStyles.textInputSeat}
                onChangeText={text => {
                  handleSeatChange(2, text);
                }}
                value={form.seats[2]}
              />
              <Text style={AddTicketStyles.textSeat}>번</Text>
            </View>
          </Section>

          <UploadImageBtn onPress={handleImagePress}>
            {form.imageUrl && (
              <Image
                source={{uri: form.imageUrl}}
                style={{width: '100%', height: '100%', borderRadius: 8}}
              />
            )}

            <ImagePlaceholder hasImage={hasImage}>
              <SvgXml
                xml={TicketBookIcon.addImage}
                color={hasImage ? theme.system.white : theme.gray.gray_05}
              />
              <Placeholder hasImage={hasImage}>
                {hasImage ? '사진 변경' : '사진 추가'}
              </Placeholder>
            </ImagePlaceholder>
          </UploadImageBtn>
        </Main>
      </ScrollView>
    </Screen>
  );
}

export default EditTicketScreen;

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${p => p.theme.system.white};
`;

const Header = styled.View`
  height: 62px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
`;

const ConfirmBtn = styled.TouchableOpacity`
  opacity: ${p => (p.disabled ? 0.4 : 1)};
`;

const MenuLabel = styled(Typo.Body02)``;

const Main = styled.View`
  gap: 32px;
  padding: 20px;
`;

const Section = styled.View`
  gap: 12px;
`;

const Label = styled(Typo.Subhead02)`
  color: ${p => p.theme.gray.gray_10};
`;

const OptionBtn = styled.TouchableOpacity`
  height: 37px;
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 0px 12px;
  border-radius: 4px;
  background-color: ${p => p.theme.gray.gray_02};
`;

const OptionValue = styled(Typo.Body01)``;

const LocationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 37px;
  padding: 0px 10px;
  border-radius: 4px;
  background-color: ${p => p.theme.gray.gray_02};
`;

const UploadImageBtn = styled.TouchableOpacity`
  aspect-ratio: 335/194;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border-width: 1px;
  border-style: dashed;
  border-color: ${p => p.theme.gray.gray_05};
`;

const ImagePlaceholder = styled.View<{hasImage: boolean}>`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
  background-color: ${p =>
    p.hasImage ? 'rgba(0,0,0,0.6)' : p.theme.system.white};
`;

const Placeholder = styled(Typo.Subhead02)<{hasImage: boolean}>`
  color: ${p => (p.hasImage ? p.theme.system.white : p.theme.gray.gray_05)};
`;

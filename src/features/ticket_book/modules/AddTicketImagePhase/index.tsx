import React, {useState} from 'react';
import {Text, ScrollView, Image} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {TicketBookIcon} from '@/assets/icons/ticketBook/TicketBookIcon';
import AddTicketStyles from '@/app/ticketBook/AddTicketScreen/style';
import styled, {useTheme} from 'styled-components/native';
import Typo from '@/components/Typo';
import useDialog from '@/features/core/hooks/useDialog';
import useAddTicketStore from '../../stores/useAddTicketStore';
import useImagePicker from '@/features/core/hooks/useImagePicker';

type Props = {
  onConfirm: () => void;
};

export default function AddTicketImagePhase({onConfirm}: Props) {
  const theme = useTheme();
  const {showDialog} = useDialog();

  const {launchLibrary} = useImagePicker();
  const [isNull, setNull] = useState(false);
  const imageUrl = useAddTicketStore(s => s.ticketImageUrl);
  const setImageUrl = useAddTicketStore(s => s.setTicketImageUrl);
  const clearImageUrl = useAddTicketStore(s => s.clearTicketImageUrl);
  const disabled = !isNull && !imageUrl;

  const handleUploadImage = async () => {
    try {
      const asset = await launchLibrary();
      if (!asset?.uri) return;

      setImageUrl(asset.uri);
      setNull(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotUploadPress = () => {
    showDialog({
      title: '업로드를 그만할까요?',
      desc: '인증을 하지 않는다면\n프리미엄 리뷰 작성이 어렵습니다.',
      cancelLabel: '계속 작성',
      onConfirm: () => {
        setNull(true);
        clearImageUrl();
      },
    });
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Root>
      <ScrollView>
        <Main>
          <Head>
            <Text style={AddTicketStyles.textProgress}>5/5</Text>
            <Text style={[AddTicketStyles.textTitle, {marginBottom: 0}]}>
              관람 인증을 위한 티켓을 업로드 해주세요.
            </Text>
            <Text style={AddTicketStyles.textDiscription}>
              실물 티켓, 예매 내역 모두 가능해요.
            </Text>
          </Head>

          <Section>
            <ImageUploadBtn onPress={handleUploadImage}>
              {imageUrl ? (
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 8,
                  }}
                  source={{uri: imageUrl}}
                />
              ) : (
                <AddImageView>
                  <SvgXml
                    xml={TicketBookIcon.addImage}
                    color={theme.gray.gray_05}
                  />
                  <Text style={AddTicketStyles.textAddImage}>사진 추가</Text>
                </AddImageView>
              )}
            </ImageUploadBtn>

            <NotUploadBtn onPress={handleNotUploadPress}>
              <SvgXml
                xml={isNull ? TicketBookIcon.check : TicketBookIcon.checkBox}
              />
              <Text style={AddTicketStyles.textCheckBox}>티켓 업로드 안함</Text>
            </NotUploadBtn>
          </Section>
        </Main>
      </ScrollView>

      <Footer>
        <Btn onPress={handleConfirm} disabled={disabled}>
          <Confirm disabled={disabled}>등록 하기</Confirm>
        </Btn>
      </Footer>
    </Root>
  );
}

const Root = styled.View`
  flex: 1;
`;

const Main = styled.View`
  gap: 40px;
  padding: 20px;
`;

const Head = styled.View``;

const Section = styled.View`
  gap: 20px;
`;

const ImageUploadBtn = styled.TouchableOpacity`
  aspect-ratio: 335/194;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${p => p.theme.gray.gray_05};
  border-style: dashed;
  border-radius: 8px;
`;

const AddImageView = styled.View`
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const NotUploadBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 6px;
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
  background-color: ${p =>
    p.disabled ? p.theme.gray.gray_06 : p.theme.system.sub_04};
`;

const Confirm = styled(Typo.Subhead04)<{disabled?: boolean}>`
  text-align: center;
  color: ${p => (p.disabled ? p.theme.system.white : p.theme.gray.gray_12)};
`;

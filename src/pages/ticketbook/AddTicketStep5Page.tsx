import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {launchImageLibrary} from 'react-native-image-picker';

import AddTicketStyles from './AddTicketStyles';
import Colors from '@/assets/colors/Colors';
import {useAddTicket} from '@/state/AddTicketContext';
import {PostPresignedUrl} from '@/api/image.api';
import {createTicket} from '@/api/ticketbook.api';

import {TicketBookIcon} from '@/assets/icons/ticketbook/TicketBookIcon';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
};

export default function AddTicketStep5Page({}: PremiumProp) {
  const screenWidth = Dimensions.get('window').width;
  const [imageUrl, setImageUrl] = useState('');
  const {addTicketData} = useAddTicket();

  const handleSelectImage = async () => {
    return new Promise<string | null>(async resolve => {
      launchImageLibrary(
        {
          mediaType: 'photo',
        },
        async res => {
          if (res.assets && res.assets.length > 0) {
            const imageFileName = res.assets[0].fileName || '';

            try {
              const response = await PostPresignedUrl(imageFileName);
              const urlWithoutQuery = response.data.split('?')[0];
              setImageUrl(urlWithoutQuery);
              resolve(null);
            } catch (error) {
              console.error('Presigned URL 생성 실패: ', error);
              resolve(null);
            }
          } else {
            resolve(null);
          }
        },
      );
    });
  };

  const handleRegister = async () => {
    if (imageUrl) {
      const {musicalId, date, time, seat, actors} = addTicketData;
      try {
        const response = await createTicket(
          musicalId,
          1,
          date,
          time,
          seat,
          actors,
          imageUrl,
        );
        // console.log(response.data);
      } catch (error) {
        console.error('티켓 생성 실패:', error);
      }
    }
  };

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

          {imageUrl === '' ? (
            <>
              <TouchableOpacity
                style={AddTicketStyles.containerDashed}
                onPress={handleSelectImage}>
                <View style={AddTicketStyles.containerAddImage}>
                  <SvgXml xml={TicketBookIcon.addImage} />
                  <Text style={AddTicketStyles.textAddImage}>사진 추가</Text>
                </View>
              </TouchableOpacity>
              <View style={AddTicketStyles.containerRow}>
                <SvgXml xml={TicketBookIcon.checkBox} />
                <Text style={AddTicketStyles.textCheckBox}>
                  티켓 업로드 안함
                </Text>
              </View>
            </>
          ) : (
            <Image
              style={AddTicketStyles.imageTicket}
              source={{uri: imageUrl}}
            />
          )}
        </ScrollView>
        <View style={AddTicketStyles.containerButton}>
          <TouchableOpacity
            style={[
              AddTicketStyles.containerNextButton,
              imageUrl !== '' && {backgroundColor: Colors.sub_04},
            ]}
            onPress={handleRegister}
            disabled={imageUrl === ''}>
            <Text
              style={[
                AddTicketStyles.textNextButton,
                imageUrl !== '' && {color: Colors.gray_12},
              ]}>
              등록하기
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

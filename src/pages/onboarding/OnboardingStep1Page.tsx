import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import OnboardingStyles from './OnboardingStyles';
import Colors from '@/assets/colors/Colors';
import {SvgXml} from 'react-native-svg';
import {OnboardingIcon} from '@/assets/icons/onboarding/OnboardingIcon';
import {getNicknameValidation} from '@/api/users.api';
import {PostPresignedUrl} from '@/api/image.api';
import {useOnboarding} from '@/state/OnboardingContext';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
};

export default function OnboardingStep1Page({
  goToNext,
  saveData,
  stepData,
}: PremiumProp) {
  const screenWidth = Dimensions.get('window').width;

  const {updateOnboardingData} = useOnboarding();

  const [imageUrl, setImageUrl] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameValidation, setNicknameValidation] = useState<boolean | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const fetchNicknameValidation = async () => {
    try {
      const response = await getNicknameValidation(nickname);
      if (response.data.data == true) {
        setNicknameValidation(true);
        setErrorMessage(null);
      }
    } catch (error) {
      console.error('닉네임 중복확인 오류:', error);
      setNicknameValidation(false);
      setErrorMessage(error.message);
    }
  };

  const handleNicknameChange = (text: string) => {
    setNickname(text);
    setNicknameValidation(true);
    setErrorMessage(null);
  };

  const handleNextButton = () => {
    updateOnboardingData({
      profileUrl: imageUrl,
      nickname: nickname,
    });
    saveData(1, nickname);
    goToNext(2);
  };

  return (
    <>
      <SafeAreaView style={OnboardingStyles.container}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              OnboardingStyles.line,
              {width: screenWidth / 3, backgroundColor: Colors.sub_04},
            ]}
          />
          <View
            style={[OnboardingStyles.line, {width: screenWidth * (2 / 3)}]}
          />
        </View>

        <ScrollView style={{marginHorizontal: 20}}>
          <Text style={OnboardingStyles.textProgress}>1/3</Text>
          <Text style={OnboardingStyles.textTitle}>
            프로필 사진과 닉네임을 추가해주세요.
          </Text>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={OnboardingStyles.profile}
              onPress={handleSelectImage}>
              {imageUrl === '' ? (
                <>
                  <SvgXml
                    xml={OnboardingIcon.profile}
                    style={OnboardingStyles.iconProfile}
                  />
                  <View style={OnboardingStyles.profileTranslucent} />
                  <SvgXml
                    xml={OnboardingIcon.profileCamera}
                    style={OnboardingStyles.iconProfileCamera}
                  />
                </>
              ) : (
                <Image source={{uri: imageUrl}} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={OnboardingStyles.textNickname}>닉네임</Text>
          <View style={OnboardingStyles.containerTextInput}>
            <TextInput
              style={[
                OnboardingStyles.textInputNickname,
                nicknameValidation === false &&
                  errorMessage !== null && {
                    borderColor: '#FF692D',
                  },
              ]}
              onChangeText={handleNicknameChange}
              value={nickname}
            />
            {nicknameValidation === false && errorMessage !== null ? (
              <SvgXml
                xml={OnboardingIcon.errorIcon}
                style={[
                  OnboardingStyles.containerDuplicateCheck,
                  {backgroundColor: '#fff'},
                ]}
              />
            ) : nicknameValidation === false && errorMessage === null ? (
              <SvgXml
                xml={OnboardingIcon.successIcon}
                style={[
                  OnboardingStyles.containerDuplicateCheck,
                  {backgroundColor: '#fff'},
                ]}
              />
            ) : (
              <TouchableOpacity
                style={OnboardingStyles.containerDuplicateCheck}
                onPress={fetchNicknameValidation}>
                <Text style={OnboardingStyles.textDuplicateCheck}>
                  중복확인
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        <View style={OnboardingStyles.containerButton}>
          <TouchableOpacity
            style={[
              OnboardingStyles.containerNextButton,
              errorMessage === null &&
                nicknameValidation === false && {
                  backgroundColor: Colors.sub_04,
                },
            ]}
            onPress={handleNextButton}
            // disabled={errorMessage === null || nicknameValidation !== true}
          >
            <Text
              style={[
                OnboardingStyles.textNextButton,
                errorMessage === null &&
                  nicknameValidation === false && {color: Colors.gray_12},
              ]}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

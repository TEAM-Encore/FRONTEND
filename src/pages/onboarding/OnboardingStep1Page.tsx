import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import OnboardingStyles from './OnboardingStyles';
import Colors from '@/assets/colors/Colors';
import {Image, SvgXml} from 'react-native-svg';
import {OnboardingIcon} from '@/assets/icons/onboarding/OnboardingIcon';

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

  const [nickname, setNickname] = useState('');
  const [profileImage, setprofileImage] = useState(null);

  const isNextButtonActive = nickname === '';

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
            <View style={OnboardingStyles.profile}>
              {profileImage == null ? (
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
                <Image />
              )}
            </View>
          </View>
          <Text style={OnboardingStyles.textNickname}>닉네임</Text>
          <View style={OnboardingStyles.containerTextInput}>
            <TextInput
              style={OnboardingStyles.textInputNickname}
              onChangeText={text => setNickname(text)}
              value={nickname}
            />
            <TouchableOpacity style={OnboardingStyles.containerDuplicateCheck}>
              <Text style={OnboardingStyles.textDuplicateCheck}>중복확인</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={OnboardingStyles.containerButton}>
          <TouchableOpacity
            style={[
              OnboardingStyles.containerNextButton,
              isNextButtonActive && {backgroundColor: Colors.sub_04},
            ]}
            onPress={() => {
              saveData(1, nickname);
              goToNext(2);
            }}
            // disabled={!isNextButtonActive}>
          >
            <Text
              style={[
                OnboardingStyles.textNextButton,
                isNextButtonActive && {color: Colors.gray_12},
              ]}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

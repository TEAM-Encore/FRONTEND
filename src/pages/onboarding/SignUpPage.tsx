import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import SignUpStyles from './SignUpStyles';
import HomeBannerStyles from '@/pages/home/HomeBannerStyles';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import Colors from '@/assets/colors/Colors';
import {OnboardingIcon} from '@/assets/icons/onboarding/OnboardingIcon';
import {TicketBookIcon} from '@/assets/icons/ticketbook/TicketBookIcon';

type RootStackParamList = {
  OnboardingPage: undefined;
};

export default function SignUpPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [musicalTitle, setMusicalTitle] = useState('');

  const isNextButtonActive = musicalTitle !== '';

  return (
    <>
      <SafeAreaView>
        <View style={HomeBannerStyles.containerHeader}>
          <TouchableOpacity
            style={HomeBannerStyles.iconGoBack}
            onPress={() => navigation.goBack()}>
            <SvgXml style={{margin: 7.75}} xml={PostIcon.arrowLeft} />
          </TouchableOpacity>
          <Text style={HomeBannerStyles.textTitle}>회원가입</Text>
        </View>

        <Text style={SignUpStyles.textTitle}>
          서비스 이용 약관에 동의해주세요.
        </Text>
        <View style={{paddingHorizontal: 20}}>
          <View
            style={[
              SignUpStyles.containerAgree,
              {backgroundColor: Colors.gray_03},
            ]}>
            <SvgXml xml={OnboardingIcon.check('')} style={{marginRight: 10}} />
            <Text style={SignUpStyles.textAgreeTitle}>전체 동의</Text>
          </View>
          <View style={SignUpStyles.containerAgree}>
            <SvgXml xml={OnboardingIcon.check('')} style={{marginRight: 10}} />
            <Text style={SignUpStyles.textAgree}>(필수) 서비스 이용약관</Text>
            <SvgXml
              xml={OnboardingIcon.arrowRight}
              style={SignUpStyles.iconArrowRight}
            />
          </View>
          <View style={SignUpStyles.containerAgree}>
            <SvgXml xml={OnboardingIcon.check('')} style={{marginRight: 10}} />
            <Text style={SignUpStyles.textAgree}>
              (필수) 개인정보 수집/이용 동의
            </Text>
            <SvgXml
              xml={OnboardingIcon.arrowRight}
              style={SignUpStyles.iconArrowRight}
            />
          </View>
          <View style={SignUpStyles.containerAgree}>
            <SvgXml xml={OnboardingIcon.check('')} style={{marginRight: 10}} />
            <Text style={SignUpStyles.textAgree}>
              (선택) 마케팅 정보 수신 동의
            </Text>
            <SvgXml
              xml={OnboardingIcon.arrowRight}
              style={SignUpStyles.iconArrowRight}
            />
          </View>
        </View>

        <View style={SignUpStyles.containerButton}>
          <TouchableOpacity
            style={[
              SignUpStyles.containerNextButton,
              isNextButtonActive && {backgroundColor: Colors.sub_04},
            ]}
            onPress={() => navigation.navigate('OnboardingPage')}
            // disabled={!isNextButtonActive}>
          >
            <Text
              style={[
                SignUpStyles.textNextButton,
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

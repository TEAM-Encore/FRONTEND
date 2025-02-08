import React, {useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoginIcon} from '@/assets/icons/login/LoginIcon';
import LoginStyles from './LoginStyles';
import Colors from '@/assets/colors/Colors';
import {createUser} from '@/api/users.api';
import {useOnboarding} from '@/state/OnboardingContext';

type RootStackParamList = {
  Tabs: undefined;
  PremiumWritePage: undefined;
  PremiumSearchDefaultPage: undefined;
  SignUpPage: undefined;
};

export default function LoginPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {onboardingData, updateOnboardingData} = useOnboarding();

  // const [emailCounter, setEmailCounter] = useState(onboardingData.emailNumber);

  const fetchSignUp = async () => {
    try {
      const email = `encore${onboardingData.emailNumber}@gmail.com`;
      console.log(onboardingData.emailNumber);
      updateOnboardingData({
        emailNumber: (onboardingData.emailNumber += 1),
      });
      await createUser(email, 'password', '앙코르', 'GOOGLE', 'BASIC');

      // setEmailCounter((prev: number) => prev + 1);
      navigation.navigate('SignUpPage');
    } catch (error) {
      // console.error('회원가입 오류:', error.response.data);
    }
  };

  return (
    <SafeAreaView style={LoginStyles.container}>
      <View style={LoginStyles.containerLogoTitle}>
        <SvgXml xml={LoginIcon.logo} />
        <SvgXml
          xml={LoginIcon.title}
          style={{marginTop: 39.82, marginBottom: 16}}
        />
        <Text style={LoginStyles.textTitle}>
          생생한 공연 후기는 모두 여기에
        </Text>
      </View>

      <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={fetchSignUp}
          style={[
            LoginStyles.containerLogin,
            {backgroundColor: '#fff', borderColor: Colors.gray_04},
          ]}>
          <SvgXml xml={LoginIcon.google} style={LoginStyles.iconLogin} />
          <Text style={LoginStyles.textLogin}>Google 로그인</Text>
        </TouchableOpacity>
        <View
          style={[
            LoginStyles.containerLogin,
            {backgroundColor: '#FEE500', borderColor: '#FEE500'},
          ]}>
          <SvgXml xml={LoginIcon.kakao} style={LoginStyles.iconLogin} />
          <Text style={LoginStyles.textLogin}>Kakao 로그인</Text>
        </View>
        <View
          style={[
            LoginStyles.containerLogin,
            {backgroundColor: '#000', borderColor: '#000'},
          ]}>
          <SvgXml xml={LoginIcon.apple} style={LoginStyles.iconLogin} />
          <Text style={[LoginStyles.textLogin, {color: '#fff'}]}>
            Apple 로그인
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
          <Text style={LoginStyles.textGuestLogin}>게스트 로그인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

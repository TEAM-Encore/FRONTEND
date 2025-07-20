import React, {useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {LoginIcon} from '@/assets/icons/login/LoginIcon';
import LoginStyles from './style';
import Colors from '@/assets/colors/Colors';
import {useOnboarding} from '@/state/OnboardingContext';
import useAppNavigation from '@/app/useAppNavigation';
import {WebView, WebViewNavigation} from 'react-native-webview';

function LoginScreen() {
  const {navigate} = useAppNavigation();
  const {onboardingData, updateOnboardingData} = useOnboarding();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  // const [emailCounter, setEmailCounter] = useState(onboardingData.emailNumber);

  const fetchSignUp = async () => {
    console.log('fetchSignUp');
    setIsLoggingIn(true);
    // const result = await InAppBrowser.openAuth(
    //   'http://210.107.205.122:20040/oauth2/authorization/google',
    //   'encore-app://oauth2/callback',
    //   {
    //     ephemeralWebSession: true,
    //   },
    // );
    // console.log(result);

    // try {
    //   const email = `encore${onboardingData.emailNumber}@gmail.com`;
    //   console.log(onboardingData.emailNumber);
    //   updateOnboardingData({
    //     emailNumber: (onboardingData.emailNumber += 1),
    //   });

    //   // await createUser(email, 'password', '앙코르', 'GOOGLE', 'BASIC');

    //   // setEmailCounter((prev: number) => prev + 1);
    //   navigate('SignUpScreen');
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    const {url} = navState;

    // URL에서 쿼리 파라미터 확인
    const urlObj = new URL(url);
    const state = urlObj.searchParams.get('state');
    const code = urlObj.searchParams.get('code');

    // state와 code가 모두 존재하면 로그인 상태 변경
    if (state && code) {
      console.log(state, code);
      setIsLoggingIn(false);
    }
  };

  return (
    <SafeAreaView style={LoginStyles.container}>
      {isLoggingIn ? (
        <WebView
          source={{
            uri: 'http://210.107.205.122:20040/oauth2/authorization/google',
          }}
          startInLoadingState={true}
          onNavigationStateChange={handleNavigationStateChange}
          userAgent="Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36"
        />
      ) : (
        <>
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
            <TouchableOpacity onPress={() => navigate('MainTabs')}>
              <Text style={LoginStyles.textGuestLogin}>게스트 로그인</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

export default LoginScreen;

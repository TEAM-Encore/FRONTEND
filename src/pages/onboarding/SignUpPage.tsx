import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import SignUpStyles from './SignUpStyles';
import HomeBannerStyles from '@/pages/home/HomeBannerStyles';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import Colors from '@/assets/colors/Colors';
import {OnboardingIcon} from '@/assets/icons/onboarding/OnboardingIcon';
import {useOnboarding} from '@/state/OnboardingContext';

type RootStackParamList = {
  OnboardingPage: undefined;
};

export default function SignUpPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {updateOnboardingData} = useOnboarding();

  const [agreeStates, setAgreeStates] = useState<string[]>([]);

  const AGREEMENT_TYPES = {
    SERVICE_TERMS: '서비스 이용약관',
    PRIVACY_POLICY: '개인정보 수집 및 이용 동의',
    MARKETING_CONSENT: '마케팅 정보 수신 동의',
  };

  const isServiceAgree = agreeStates.includes(AGREEMENT_TYPES.SERVICE_TERMS);
  const isPrivacyAgree = agreeStates.includes(AGREEMENT_TYPES.PRIVACY_POLICY);
  const isMarketingAgree = agreeStates.includes(
    AGREEMENT_TYPES.MARKETING_CONSENT,
  );

  const getCheckIcon = (isChecked: boolean) => {
    return isChecked ? OnboardingIcon.check : OnboardingIcon.nonCheck;
  };

  const isNextButtonActive = isServiceAgree && isPrivacyAgree;

  const toggleAgreement = (type: string) => {
    setAgreeStates(prev =>
      prev.includes(type)
        ? prev.filter(item => item !== type)
        : [...prev, type],
    );
  };

  const toggleAllAgreements = () => {
    if (isServiceAgree && isPrivacyAgree && isMarketingAgree) {
      setAgreeStates([]);
    } else {
      setAgreeStates(Object.values(AGREEMENT_TYPES));
    }
  };

  const handleNextButton = () => {
    updateOnboardingData({
      agreements: agreeStates,
    });
    navigation.navigate('OnboardingPage');
  };

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

        <View style={{paddingHorizontal: 20}}>
          <Text style={SignUpStyles.textTitle}>
            서비스 이용 약관에 동의해주세요.
          </Text>
          <TouchableOpacity
            style={[
              SignUpStyles.containerAgree,
              {backgroundColor: Colors.gray_03},
            ]}
            onPress={toggleAllAgreements}>
            <SvgXml
              xml={getCheckIcon(
                isServiceAgree && isPrivacyAgree && isMarketingAgree,
              )}
              style={{marginRight: 10}}
            />
            <Text style={SignUpStyles.textAgreeTitle}>전체 동의</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={SignUpStyles.containerAgree}
            onPress={() => toggleAgreement(AGREEMENT_TYPES.SERVICE_TERMS)}>
            <SvgXml
              xml={getCheckIcon(isServiceAgree)}
              style={{marginRight: 10}}
            />
            <Text style={SignUpStyles.textAgree}>(필수) 서비스 이용약관</Text>
            <SvgXml
              xml={OnboardingIcon.arrowRight}
              style={SignUpStyles.iconArrowRight}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={SignUpStyles.containerAgree}
            onPress={() => toggleAgreement(AGREEMENT_TYPES.PRIVACY_POLICY)}>
            <SvgXml
              xml={getCheckIcon(isPrivacyAgree)}
              style={{marginRight: 10}}
            />
            <Text style={SignUpStyles.textAgree}>
              (필수) 개인정보 수집/이용 동의
            </Text>
            <SvgXml
              xml={OnboardingIcon.arrowRight}
              style={SignUpStyles.iconArrowRight}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={SignUpStyles.containerAgree}
            onPress={() => toggleAgreement(AGREEMENT_TYPES.MARKETING_CONSENT)}>
            <SvgXml
              xml={getCheckIcon(isMarketingAgree)}
              style={{marginRight: 10}}
            />
            <Text style={SignUpStyles.textAgree}>
              (선택) 마케팅 정보 수신 동의
            </Text>
            <SvgXml
              xml={OnboardingIcon.arrowRight}
              style={SignUpStyles.iconArrowRight}
            />
          </TouchableOpacity>
        </View>

        <View style={SignUpStyles.containerButton}>
          <TouchableOpacity
            style={[
              SignUpStyles.containerNextButton,
              isNextButtonActive && {backgroundColor: Colors.sub_04},
            ]}
            onPress={handleNextButton}
            disabled={!isNextButtonActive}>
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

import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import HomeBannerStyles from '@/pages/home/HomeBannerStyles';
import OnboardingStyles from '@/pages/onboarding/OnboardingStyles';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import Colors from '@/assets/colors/Colors';

type RootStackParamList = {
  ProfileCardPage: undefined;
};

export default function ProfileCardPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
      <SafeAreaView>
        <View style={HomeBannerStyles.containerHeader}>
          <TouchableOpacity
            style={HomeBannerStyles.iconGoBack}
            onPress={() => navigation.goBack()}>
            <SvgXml style={{margin: 7.75}} xml={PostIcon.arrowLeft} />
          </TouchableOpacity>
          <Text style={HomeBannerStyles.textTitle}>프로필 설정</Text>
        </View>

        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <Text style={OnboardingStyles.textProfileCard}>
            나만의 프로필 카드가 만들어졌어요.
          </Text>
        </ScrollView>

        <View style={OnboardingStyles.containerButton}>
          <TouchableOpacity
            style={[
              OnboardingStyles.containerNextButton,
              {backgroundColor: Colors.sub_04},
            ]}>
            <Text
              style={[
                OnboardingStyles.textNextButton,
                {color: Colors.gray_12},
              ]}>
              시작하기
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {MyPageIcon} from '@/assets/icons/myPage/MyPageIcon';
import MyPageStyles from '@/pages/myPage/MyPageStyles';
import HomeBannerStyles from '@/pages/home/HomeBannerStyles';
import OnboardingStyles from '@/pages/onboarding/OnboardingStyles';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import Colors from '@/assets/colors/Colors';
import {patchMyInfo} from '@/api/users.api';
import {useOnboarding} from '@/state/OnboardingContext';

type RootStackParamList = {
  Tabs: undefined;
};

export default function ProfileCardPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {onboardingData} = useOnboarding();

  const keywordsMapping: {[key: string]: string} = {
    EMOTIONAL: '깊은 감동을 받게되는',
    ENTERTAINING: '흥미롭고 재미있는',
    QUALITY: '넘버 퀄리티가 뛰어난',
    STAGE_DESIGN: '무대 연출력이 뛰어난',
    CASTING: '캐스팅 페어합이 좋은',
    ACTING: '배우의 연기력이 좋은',
    ACTOR: '최애 배우가 출연하는',
    LIGHT: '가볍게 보기 좋은',
    STORY: '스토리 라인이 탄탄한',
  };

  const updatedKeywords = onboardingData.keywords.map(keyword =>
    keyword.replace(/\n/g, ' '),
  );

  const mappedKeywords = updatedKeywords.map(
    keyword => keywordsMapping[keyword] || 'undefined',
  );

  const frequencyMapping: {[key: string]: string} = {
    LEVEL1: '연 1~3회',
    LEVEL2: '연 4~7회',
    LEVEL3: '연 8회 이상',
  };

  const mappedFrequency =
    frequencyMapping[onboardingData.frequency] || 'undefined';

  const [userData, setUserData] = useState<{
    point: number;
    nickname: string;
    num_of_subscriber: number;
    num_of_write_post: number;
    preferred_keywords: string[];
    viewing_frequency: string;
    email: string;
  }>({
    point: 0,
    nickname: onboardingData.nickname,
    num_of_subscriber: 0,
    num_of_write_post: 0,
    preferred_keywords: mappedKeywords,
    viewing_frequency: mappedFrequency,
    email: '',
  });

  const fetchPatchInfo = async () => {
    try {
      const response = await patchMyInfo({
        nickname: onboardingData.nickname,
        viewing_frequency: mappedFrequency,
        preferred_keywords: mappedKeywords,
      });
      console.log(response.data);
    } catch (error) {
      console.error('온보딩 오류: ', error);
    }
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
          <Text style={HomeBannerStyles.textTitle}>프로필 설정</Text>
        </View>

        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <Text style={OnboardingStyles.textProfileCard}>
            나만의 프로필 카드가 만들어졌어요.
          </Text>

          <View style={MyPageStyles.containerHeader}>
            <View style={MyPageStyles.rectContainer}>
              <SvgXml xml={MyPageIcon.rectangle1} />
              <Image
                source={require('@/assets/images/myPage/profile.png')}
                style={MyPageStyles.profileImg}
              />
              <View style={MyPageStyles.overlayText}>
                <Text style={MyPageStyles.nickname}>{userData.nickname}</Text>
                <SvgXml
                  xml={MyPageIcon.profileCheck}
                  style={{top: 5, left: 5.67}}
                />
              </View>
              <View style={MyPageStyles.overlaySubText}>
                <Text style={MyPageStyles.infoText}>
                  구독자 {userData.num_of_subscriber}명 •
                </Text>
                <Text style={MyPageStyles.infoText}>
                  작성글 {userData.num_of_write_post}개
                </Text>
              </View>
            </View>
            <View style={MyPageStyles.userInfoContainer}>
              <View style={MyPageStyles.containerRow}>
                <SvgXml xml={MyPageIcon.heartIcon} />
                <Text style={MyPageStyles.userInfoText}>선호하는 공연</Text>
              </View>
              <View
                style={{
                  ...MyPageStyles.containerRow,
                  marginHorizontal: 20,
                  marginTop: 8,
                }}>
                {userData.preferred_keywords.length > 0 ? (
                  userData.preferred_keywords.map(option => (
                    <View
                      key={option}
                      style={{...MyPageStyles.chipContainer, marginRight: 4}}>
                      <Text>{option}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={{marginTop: 10, color: 'gray'}}>
                    아직 선택된 키워드가 없습니다
                  </Text>
                )}
              </View>

              <View style={{...MyPageStyles.containerRow, marginTop: 24}}>
                <SvgXml xml={MyPageIcon.calenderIcon} />
                <Text style={MyPageStyles.userInfoText}>뮤지컬 관람 빈도</Text>
              </View>
              <View
                style={{
                  ...MyPageStyles.containerRow,
                  marginHorizontal: 20,
                  marginTop: 8,
                }}>
                <View style={MyPageStyles.chipContainer}>
                  <Text>{userData.viewing_frequency}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={[OnboardingStyles.containerButton, {marginTop: 235}]}>
          <TouchableOpacity
            style={[
              OnboardingStyles.containerNextButton,
              {backgroundColor: Colors.sub_04},
            ]}
            onPress={async () => {
              await fetchPatchInfo();
              navigation.navigate('Tabs');
            }}>
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

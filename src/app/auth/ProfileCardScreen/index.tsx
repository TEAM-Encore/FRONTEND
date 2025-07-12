import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {MyPageIcon} from '@/assets/icons/myPage/MyPageIcon';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import Colors from '@/assets/colors/Colors';
import {patchMyInfo} from '@/api/users.api';
import {useOnboarding} from '@/state/OnboardingContext';
import {StackNavigationProp} from '@react-navigation/stack';
import OnboardingStyles from '../ProfileSettingScreen/style';
import MyScreenStyles from '@/app/my/MyScreen/style';
import HomeBannerStyles from '@/app/home/HomeBannerScreen/styles';

type RootStackParamList = {
  Tabs: undefined;
};

export default function ProfileCardScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {onboardingData} = useOnboarding();

  const keywordsMapping: {[key: string]: string} = {
    '깊은 감동을 받게되는': 'EMOTIONAL',
    '흥미롭고 재미있는': 'ENTERTAINING',
    '넘버 퀄리티가 뛰어난': 'QUALITY',
    '무대 연출력이 뛰어난': 'STAGE_DESIGN',
    '캐스팅 페어합이 좋은': 'CASTING',
    '배우의 연기력이 좋은': 'ACTING',
    '최애 배우가 출연하는': 'ACTOR',
    '가볍게 보기 좋은': 'LIGHT',
    '스토리 라인이 탄탄한': 'STORY',
  };

  const updatedKeywords = onboardingData.keywords.map(keyword =>
    keyword.replace(/\n/g, ' '),
  );

  const mappedKeywords = updatedKeywords.map(
    keyword => keywordsMapping[keyword] || 'undefined',
  );

  const frequencyMapping: {[key: string]: string} = {
    '연 1~3회': 'LEVEL1',
    '연 4~7회': 'LEVEL2',
    '연 8회 이상': 'LEVEL3',
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
    preferred_keywords: updatedKeywords,
    viewing_frequency: onboardingData.frequency,
    email: '',
  });

  useEffect(() => {
    console.log(onboardingData.nickname);
    console.log(mappedFrequency);
    console.log(updatedKeywords);
  }, []);

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

          <View style={MyScreenStyles.containerHeader}>
            <View style={MyScreenStyles.rectContainer}>
              <SvgXml xml={MyPageIcon.rectangle1} />
              <Image
                source={require('@/assets/images/myPage/profile.png')}
                style={MyScreenStyles.profileImg}
              />
              <View style={MyScreenStyles.overlayText}>
                <Text style={MyScreenStyles.nickname}>{userData.nickname}</Text>
                <SvgXml
                  xml={MyPageIcon.profileCheck}
                  style={{top: 5, left: 5.67}}
                />
              </View>
              <View style={MyScreenStyles.overlaySubText}>
                <Text style={MyScreenStyles.infoText}>
                  구독자 {userData.num_of_subscriber}명 •
                </Text>
                <Text style={MyScreenStyles.infoText}>
                  작성글 {userData.num_of_write_post}개
                </Text>
              </View>
            </View>
            <View style={MyScreenStyles.userInfoContainer}>
              <View style={MyScreenStyles.containerRow}>
                <SvgXml xml={MyPageIcon.heartIcon} />
                <Text style={MyScreenStyles.userInfoText}>선호하는 공연</Text>
              </View>
              <View
                style={{
                  ...MyScreenStyles.containerRow,
                  marginHorizontal: 20,
                  marginTop: 8,
                }}>
                {userData.preferred_keywords.length > 0 ? (
                  userData.preferred_keywords.map(option => (
                    <View
                      key={option}
                      style={{...MyScreenStyles.chipContainer, marginRight: 4}}>
                      <Text>{option}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={{marginTop: 10, color: 'gray'}}>
                    아직 선택된 키워드가 없습니다
                  </Text>
                )}
              </View>

              <View style={{...MyScreenStyles.containerRow, marginTop: 24}}>
                <SvgXml xml={MyPageIcon.calenderIcon} />
                <Text style={MyScreenStyles.userInfoText}>
                  뮤지컬 관람 빈도
                </Text>
              </View>
              <View
                style={{
                  ...MyScreenStyles.containerRow,
                  marginHorizontal: 20,
                  marginTop: 8,
                }}>
                <View style={MyScreenStyles.chipContainer}>
                  <Text>{userData.viewing_frequency}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={[OnboardingStyles.containerButton, {marginTop: 205}]}>
          <TouchableOpacity
            style={[
              OnboardingStyles.containerNextButton,
              {backgroundColor: Colors.sub_04},
            ]}
            onPress={async () => {
              await fetchPatchInfo();
              navigation.replace('Tabs');
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

import React, {useCallback, useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import MyScreenStyles from './MyScreenStyles';
import {MyPageIcon} from '@/assets/icons/myPage/MyPageIcon';
import {SvgXml} from 'react-native-svg';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getMyInfo} from '@/api/users.api';

type NavigationProp = {
  navigate: (screen: 'ModifyProfileImg' | 'NotificationSettings') => void;
};

export default function MyScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [userData, setUserData] = useState<{
    point: number;
    nickname: string;
    num_of_subscriber: number;
    num_of_write_post: number;
    preferred_keywords: [];
    viewing_frequency: string;
    email: string;
  }>({
    point: 0,
    nickname: '',
    num_of_subscriber: 0,
    num_of_write_post: 0,
    preferred_keywords: [],
    viewing_frequency: '',
    email: '',
  });

  const fetchMyInfo = async () => {
    try {
      const response = await getMyInfo();
      console.log('내 정보 조회: ', response.data.data);
      setUserData(response.data.data);
    } catch (error) {
      Alert.alert('내 정보 조회 중 오류가 발생했습니다.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMyInfo();
    }, []),
  );

  useEffect(() => {
    console.log('Updated userData:', userData);
  }, [userData]);

  return (
    <SafeAreaView style={MyScreenStyles.container}>
      <View style={MyScreenStyles.containerHeader}>
        <View style={MyScreenStyles.containerIcons}>
          <Text style={MyScreenStyles.textTitle}>마이페이지</Text>
          <View style={MyScreenStyles.containerRow}>
            <TouchableOpacity>
              <View style={MyScreenStyles.coinContainer}>
                <SvgXml xml={MyPageIcon.coinIcon} />
                <Text style={MyScreenStyles.coinText}>{userData.point}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{marginLeft: 32}}>
              <SvgXml xml={MyPageIcon.shareIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={[]}
        ListHeaderComponent={
          <>
            <View style={MyScreenStyles.containerHeader}>
              <View style={MyScreenStyles.rectContainer}>
                <SvgXml xml={MyPageIcon.rectangle1} />
                <Image
                  source={require('@/assets/images/myPage/profile.png')}
                  style={MyScreenStyles.profileImg}
                />
                <View style={MyScreenStyles.overlayText}>
                  <Text style={MyScreenStyles.nickname}>
                    {userData.nickname}
                  </Text>
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
                        style={{
                          ...MyScreenStyles.chipContainer,
                          marginRight: 4,
                        }}>
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

              <Text style={{...MyScreenStyles.infoTitle, marginTop: 40}}>
                정보 관리
              </Text>
              <View style={MyScreenStyles.containerRow}>
                <Text style={{...MyScreenStyles.infoSubTitle, marginTop: 17}}>
                  계정 정보
                </Text>
                <Text
                  style={{
                    ...MyScreenStyles.emailText,
                    marginTop: 17,
                    paddingLeft: 157,
                  }}>
                  {userData.email}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ModifyProfileImg')}>
                <Text style={{...MyScreenStyles.infoSubTitle, marginTop: 8}}>
                  프로필 수정
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('NotificationSettings')}>
               <Text style={{...MyScreenStyles.infoSubTitle, marginTop: 8}}>
                수신 설정
              </Text>
              </TouchableOpacity>

              <View style={MyScreenStyles.line} />

              <Text style={{...MyScreenStyles.infoTitle, marginTop: 40}}>
                이용 안내
              </Text>
              <View style={MyScreenStyles.containerRow}>
                <Text style={{...MyScreenStyles.infoSubTitle, marginTop: 17}}>
                  앱 버전
                </Text>
                <Text
                  style={{
                    ...MyScreenStyles.emailText,
                    marginTop: 17,
                    marginLeft: 240,
                  }}>
                  8.0.23
                </Text>
              </View>
              <Text style={{...MyScreenStyles.infoSubTitle, marginTop: 8}}>
                이용 약관
              </Text>
              <Text style={{...MyScreenStyles.infoSubTitle, marginTop: 8}}>
                개인정보 처리방침
              </Text>
              <Text style={{...MyScreenStyles.infoSubTitle, marginTop: 8}}>
                광고 제안
              </Text>
              <Text style={{...MyScreenStyles.infoSubTitle, marginTop: 8}}>
                문의하기
              </Text>
              <Text style={{...MyScreenStyles.infoSubTitle, marginTop: 8}}>
                카테고리 추가 요청
              </Text>

              <View style={MyScreenStyles.line} />

              <Text style={{...MyScreenStyles.userAccountText, marginTop: 35}}>
                로그아웃
              </Text>
              <Text
                style={{
                  ...MyScreenStyles.userAccountText,
                  marginTop: 9,
                  marginBottom: 25,
                }}>
                회원탈퇴
              </Text>
            </View>
          </>
        }
        renderItem={null}
      />
    </SafeAreaView>
  );
}

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
import MyPageStyles from './MyPageStyles';
import {MyPageIcon} from '@/assets/icons/myPage/MyPageIcon';
import {SvgXml} from 'react-native-svg';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getMyInfo} from '@/api/users.api';

type NavigationProp = {
  navigate: (screen: 'ModifyProfileImg') => void;
};

export default function MyPage() {
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

  const renderHeader = () => (
    <>
      <View style={MyPageStyles.containerHeader}>
        <View style={MyPageStyles.containerIcons}>
          <Text style={MyPageStyles.textTitle}>마이페이지</Text>
          <View style={MyPageStyles.containerRow}>
            <TouchableOpacity>
              <View style={MyPageStyles.coinContainer}>
                <SvgXml xml={MyPageIcon.coinIcon} />
                <Text style={MyPageStyles.coinText}>{userData.point}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{marginLeft: 32}}>
              <SvgXml xml={MyPageIcon.shareIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={MyPageStyles.container}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={[]}
        ListHeaderComponent={
          <>
            {renderHeader()}
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
                  <Text style={MyPageStyles.userInfoText}>
                    뮤지컬 관람 빈도
                  </Text>
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

              <Text style={{...MyPageStyles.infoTitle, marginTop: 40}}>
                정보 관리
              </Text>
              <View style={MyPageStyles.containerRow}>
                <Text style={{...MyPageStyles.infoSubTitle, marginTop: 17}}>
                  계정 정보
                </Text>
                <Text
                  style={{
                    ...MyPageStyles.emailText,
                    marginTop: 17,
                    paddingLeft: 157,
                  }}>
                  {userData.email}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ModifyProfileImg')}>
                <Text style={{...MyPageStyles.infoSubTitle, marginTop: 8}}>
                  프로필 수정
                </Text>
              </TouchableOpacity>

              <Text style={{...MyPageStyles.infoSubTitle, marginTop: 8}}>
                수신 설정
              </Text>

              <View style={MyPageStyles.line} />

              <Text style={{...MyPageStyles.infoTitle, marginTop: 40}}>
                이용 안내
              </Text>
              <View style={MyPageStyles.containerRow}>
                <Text style={{...MyPageStyles.infoSubTitle, marginTop: 17}}>
                  앱 버전
                </Text>
                <Text
                  style={{
                    ...MyPageStyles.emailText,
                    marginTop: 17,
                    marginLeft: 240,
                  }}>
                  8.0.23
                </Text>
              </View>
              <Text style={{...MyPageStyles.infoSubTitle, marginTop: 8}}>
                이용 약관
              </Text>
              <Text style={{...MyPageStyles.infoSubTitle, marginTop: 8}}>
                개인정보 처리방침
              </Text>
              <Text style={{...MyPageStyles.infoSubTitle, marginTop: 8}}>
                광고 제안
              </Text>
              <Text style={{...MyPageStyles.infoSubTitle, marginTop: 8}}>
                문의하기
              </Text>
              <Text style={{...MyPageStyles.infoSubTitle, marginTop: 8}}>
                카테고리 추가 요청
              </Text>

              <View style={MyPageStyles.line} />

              <Text style={{...MyPageStyles.userAccountText, marginTop: 35}}>
                로그아웃
              </Text>
              <Text
                style={{
                  ...MyPageStyles.userAccountText,
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

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
import {MyPageIcon} from '@/assets/icons/myPage/MyPageIcon';
import {SvgXml} from 'react-native-svg';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getMyInfo} from '@/api/users.api';
import MyScreenStyles from './style';
import styled from 'styled-components/native';
import MyScreenHeader from '@/features/my/modules/MyScreenHeader';
import MyScreenProfileCard from '@/features/my/modules/MyScreenProfileCard.tsx';

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

  return (
    <Container>
      <MyScreenHeader point={userData.point} />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={[]}
        contentContainerStyle={{paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <MyScreenProfileCard userData={userData} />

            <View style={MyScreenStyles.containerHeader}>
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
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${p => p.theme.gray.gray_01};
`;

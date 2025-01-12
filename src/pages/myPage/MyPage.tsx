import React from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import MyPageStyles from './MyPageStyles';
import {MyPageIcon} from '@/assets/icons/myPage/MyPageIcon';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

type NavigationProp = {
  navigate: (screen: 'ModifyProfileImg') => void;
};

export default function MyPage() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const {
    frequency = '연 8회 이상',
    checkedOptions = ['감동적인', '넘버 퀄리티가 높은'],
  } = route.params || {};

  const renderHeader = () => (
    <>
      <View style={MyPageStyles.containerHeader}>
        <View style={MyPageStyles.containerIcons}>
          <Text style={MyPageStyles.textTitle}>마이페이지</Text>
          <View style={MyPageStyles.containerRow}>
            <TouchableOpacity>
              <View style={MyPageStyles.coinContainer}>
                <SvgXml xml={MyPageIcon.coinIcon} />
                <Text style={MyPageStyles.coinText}>50</Text>
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
        data={[]}
        ListHeaderComponent={
          <>
            {renderHeader()}
            <View style={MyPageStyles.containerHeader}>
              <View style={MyPageStyles.rectContainer}>
                <SvgXml xml={MyPageIcon.rectangle1} />
                <SvgXml
                  xml={MyPageIcon.profile}
                  style={MyPageStyles.overlayContainer}
                />
                <View style={MyPageStyles.overlayText}>
                  <Text style={MyPageStyles.nickname}>뮤사랑</Text>
                  <SvgXml
                    xml={MyPageIcon.profileCheck}
                    style={{top: 5, left: 5.67}}
                  />
                </View>
                <View style={MyPageStyles.overlaySubText}>
                  <Text style={MyPageStyles.infoText}>구독자 140명 •</Text>
                  <Text style={MyPageStyles.infoText}>작성글 98개</Text>
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
                  {checkedOptions.map(option => (
                    <View
                      key={option}
                      style={{...MyPageStyles.chipContainer, marginRight: 4}}>
                      <Text>{option}</Text>
                    </View>
                  ))}
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
                    <Text>{frequency}</Text>
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
                  musiclove@gmail.com
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

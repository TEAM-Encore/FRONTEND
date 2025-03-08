import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';

import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import HomeBannerStyles from '@/screens/home/HomeBannerStyles';

type RootStackParamList = {
  HomeBannerScreen: {bannerId: number};
};

type HomeBannerScreenProps = {
  route: RouteProp<RootStackParamList, 'HomeBannerScreen'>;
};

const HomeBannerScreen: React.FC<HomeBannerScreenProps> = ({route}) => {
  const {bannerId} = route.params;
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const data = [
    {
      id: 1,
      category: '입문자 추천',
      backgroundColor: '#EDDCFF',
      textColor: '#A765EE',
    },
    {
      id: 2,
      category: '뮤덕 추천',
      backgroundColor: '#FFF8DB',
      textColor: '#FFB200',
    },
    {
      id: 3,
      category: '뮤덕 추천',
      backgroundColor: '#FFDFD6',
      textColor: '#FF7259',
    },
  ];

  const renderUI = (id: number) => {
    if (id === 1) {
      return (
        <>
          <View style={HomeBannerStyles.containerHeader}>
            <TouchableOpacity
              style={HomeBannerStyles.iconGoBack}
              onPress={() => handleGoBack()}>
              <SvgXml style={{margin: 7.75}} xml={PostIcon.arrowLeft} />
            </TouchableOpacity>
            <Text style={HomeBannerStyles.textTitle}>뮤지컬 용어</Text>
          </View>
          <Image
            style={{
              width: windowWidth,
              height: windowWidth * 0.5866,
              marginBottom: 30,
            }}
            source={require('@/assets/images/home/banner/HomeBanner1.png')}
            resizeMode="contain"
          />
          <View
            style={[
              HomeBannerStyles.containerCategory,
              {width: data[0].category.length * 13},
            ]}>
            <Text style={HomeBannerStyles.textCategory}>
              {data[0].category}
            </Text>
          </View>
          <Text style={HomeBannerStyles.textSubTitle}>
            뮤지컬 용어가 궁금하다면?
          </Text>
          <Text style={HomeBannerStyles.textContent}>
            회전문? 킷콜?{`\n`}오늘의 주제는 정보를 서치할 때 생소한 용어로
            이해가 어려웠던 뮤랑이들을 위해 준비한 자주 사용되는 용어 TOP
            3입니다!
          </Text>
          <View style={HomeBannerStyles.boldLine} />
          <Text style={HomeBannerStyles.textContentBold}>TOP 1: 회전문</Text>
          <Text style={HomeBannerStyles.textContent}>
            뮤지컬에 관심 있다 하시는 분들은 한번씩 들어보셨을 텐데요, 여러분은
            “회전문”을 들으면 어떤 이미지가 떠오르시나요?
          </Text>
          <View style={{alignItems: 'center'}}>
            <Image
              style={HomeBannerStyles.image}
              source={require('@/assets/images/home/banner/Image1-1.png')}
            />
          </View>
          <Text style={HomeBannerStyles.textContent}>
            회전문은 바로 “하나의 공연을 여러 번 관람하는 것”을 의미하며
            재관람과 비슷한 맥락으로 사용되어요. 5번, 10번, 심지어 장기 공연의
            경우 무려 100번까지 관람한다는 이야기까지!
          </Text>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Image
              style={HomeBannerStyles.image}
              source={require('@/assets/images/home/banner/Image1-2.png')}
            />
          </View>
          <Text style={HomeBannerStyles.textContent}>
            앙코르의 캐릭터 또한 입문 뮤랑이들이 회전 뮤랑이가 되어 서로더 많은
            정보를 주고받는 훈훈한 모습을 담아 탄생했답니다~
          </Text>
          <View style={HomeBannerStyles.line} />
          <Text style={HomeBannerStyles.textContentBold}>TOP 2: 킷콜</Text>
          <Text style={HomeBannerStyles.textContent}>
            여러분은 “커튼콜”이라는 말을 들어보셨나요?{`\n`}맞습니다! 킷콜은
            바로 커튼콜과 같은 의미를 가지고 있어요.
          </Text>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Image
              style={HomeBannerStyles.image}
              source={require('@/assets/images/home/banner/Image1-3.png')}
            />
          </View>
          <Text style={HomeBannerStyles.textContent}>
            커튼콜에서는 배우들이 주로 나와 뮤지컬 넘버를 부르는데요, 본
            공연에서의 벅차올랐던, 혹은 가장 감명깊었던 순간을 다시 볼 수 있는
            뜻깊은 시간이랍니다!
          </Text>
          <View style={HomeBannerStyles.line} />
          <Text style={HomeBannerStyles.textContentBold}>TOP 3: 넘버</Text>
          <Text style={HomeBannerStyles.textContent}>
            뮤지컬 하면 유명한 넘버들이 있죠!{`\n`}
            지킬 앤 하이드의 ‘지금 이 순간’, 위키드의 ‘popular’ 등의 노래 다들
            한번씩 들어보시지 않으셨나요?
          </Text>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Image
              style={HomeBannerStyles.image}
              source={require('@/assets/images/home/banner/Image1-4.png')}
            />
          </View>
          <Text style={HomeBannerStyles.textContent}>
            이렇게 뮤지컬에 등장하는 노래들을 “넘버”라고 한답니다.{`\n`}
            뮤지컬은 각 장면마다 노래가 있으며, 숫자가 붙여진 곡을 의미
            한답니다.
          </Text>
          <View style={HomeBannerStyles.line} />
          <Text style={[HomeBannerStyles.textContent, {marginBottom: 40}]}>
            오늘은 이렇게 앙코르 선정 뮤지컬 용어 TOP3를 알아봤는데요, 입문
            뮤랑이들에게 유익한 시간이었기를 바래요! 다음에도 재밌고 유익한
            소식으로 돌아올게요~
          </Text>
        </>
      );
    } else if (id === 2) {
      return (
        <>
          <View style={HomeBannerStyles.containerHeader}>
            <TouchableOpacity
              style={HomeBannerStyles.iconGoBack}
              onPress={() => handleGoBack()}>
              <SvgXml style={{margin: 7.75}} xml={PostIcon.arrowLeft} />
            </TouchableOpacity>
            <Text style={HomeBannerStyles.textTitle}>이달의 회전문</Text>
          </View>
          <Image
            style={{
              width: windowWidth,
              height: windowWidth * 0.5866,
              marginBottom: 30,
            }}
            source={require('@/assets/images/home/banner/HomeBanner2.png')}
            resizeMode="contain"
          />
          <View
            style={[
              HomeBannerStyles.containerCategory,
              {
                width: data[1].category.length * 13,
                backgroundColor: data[1].backgroundColor,
              },
            ]}>
            <Text
              style={[
                HomeBannerStyles.textCategory,
                {color: data[1].textColor},
              ]}>
              {data[1].category}
            </Text>
          </View>
          <Text style={HomeBannerStyles.textSubTitle}>
            이달의 회전문 뮤지컬이 궁금하다면?
          </Text>
          <Text style={HomeBannerStyles.textContent}>
            한번 보면 빠져나올 수 없다고?!{`\n`}
            오늘의 주제는 회전 뮤랑이들을 위한 10월 앙코르 선정 회전문 TOP3
            입니다!
          </Text>
          <View style={HomeBannerStyles.boldLine} />
          <Text style={HomeBannerStyles.textContentBold}>TOP 1: 회전문</Text>
          <Text style={HomeBannerStyles.textContent}>
            이달에 가장 지킬 앤 하이드 뮤지컬은 역시 “지킬 앤 하이드”입니다.
            역시 오랜 기간 인기있는 공연인 만큼 열기가 뛰어난데요, 앙코르에서
            가장 많은 회전문을 기록하신 분은 심지어 25번이라고 합니다!
          </Text>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Image
              style={HomeBannerStyles.image2}
              source={require('@/assets/images/home/banner/Image2-1.png')}
            />
          </View>
          <Text style={HomeBannerStyles.textContent}>
            그 중에서도 유독 사랑받은 페어는 바로 전동석과 윤공주 페어, 전동석과
            선민 페어입니다. 전동석은 지킬 앤 하이드에서 빠질 수 없는 인기
            배우이기도 한데요, 아직 관람하지 못한 회전 뮤랑이들이 있다면 꼭
            보기를 추천해요!
          </Text>
          <View style={HomeBannerStyles.line} />
          <Text style={HomeBannerStyles.textContentBold}>TOP 2: 알라딘</Text>
          <Text style={HomeBannerStyles.textContent}>
            대망의 TOP2는 바로 뮤지컬 “알라딘”입니다! 알라딘은 개봉 전부터
            악마의 티켓팅으로 유명할 정도로 뜨거운 관심을 받았답니다. 그만큼
            유명한 배우와 흥미진진한 스토리로 관객의 사랑을 차지했어요!
          </Text>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Image
              style={HomeBannerStyles.image2}
              source={require('@/assets/images/home/banner/Image2-2.png')}
            />
          </View>
          <Text style={HomeBannerStyles.textContent}>
            앙코르 데이터에 따르면 회전 뮤랑이들 중 20회나 본 기록이 있다고
            해요! 아직 끝나지도 않은 공연인데 뮤랑이들의 뜨거운 사랑을 받고
            있어요. 다음달에는 알라딘의 회전문 기록이 얼마나 갱신될지 기대가
            됩니다!
          </Text>
          <View style={HomeBannerStyles.line} />
          <Text style={HomeBannerStyles.textContentBold}>
            TOP 3 : 쿠로이 저택엔 누가 살고 있을까
          </Text>
          <Text style={HomeBannerStyles.textContent}>
            마지막으로, TOP3는 바로 “쿠로이 저택엔 누가 살고 있을까”라는
            공연입니다! 회전문 TOP3안에 처음 든 작품인데요, 이번 4연에 드디어
            순위권에 오르게 되었어요. 참신한 소재와 유쾌한 분위기로 서서히
            관심을 받고 있는 공연이에요.
          </Text>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Image
              style={HomeBannerStyles.image2}
              source={require('@/assets/images/home/banner/Image2-3.png')}
            />
          </View>
          <Text style={HomeBannerStyles.textContent}>
            앙코르 데이터에 따르면 회전 뮤랑이들 중 10회나 본 기록이 있다고
            해요! 특히나 앙코르 리뷰 중 “재관람 의사”에서 거의 만접을 받은
            뮤지컬인 만큼, 아직 관람하지 못한 뮤랑이들에게 강력 추천해요.
          </Text>
          <View style={HomeBannerStyles.line} />
          <Text style={[HomeBannerStyles.textContent, {marginBottom: 40}]}>
            오늘은 이렇게 앙코르 선정 뮤지컬 용어 TOP3를 알아봤는데요, 입문
            뮤랑이들에게 유익한 시간이었기를 바래요! 다음에도 재밌고 유익한
            소식으로 돌아올게요~
          </Text>
        </>
      );
    } else if (id === 3) {
      return (
        <>
          <View style={HomeBannerStyles.containerHeader}>
            <TouchableOpacity
              style={HomeBannerStyles.iconGoBack}
              onPress={() => handleGoBack()}>
              <SvgXml style={{margin: 7.75}} xml={PostIcon.arrowLeft} />
            </TouchableOpacity>
            <Text style={HomeBannerStyles.textTitle}>뮤지컬 정보 얻기</Text>
          </View>
          <Image
            style={{
              width: windowWidth,
              height: windowWidth * 0.5866,
              marginBottom: 30,
            }}
            source={require('@/assets/images/home/banner/HomeBanner3.png')}
            resizeMode="contain"
          />
          <View
            style={[
              HomeBannerStyles.containerCategory,
              {
                width: data[2].category.length * 13,
                backgroundColor: data[2].backgroundColor,
              },
            ]}>
            <Text
              style={[
                HomeBannerStyles.textCategory,
                {color: data[2].textColor},
              ]}>
              {data[2].category}
            </Text>
          </View>
          <Text style={HomeBannerStyles.textSubTitle}>
            뮤지컬 정보 서치를 시작했다면?
          </Text>
          <Text style={HomeBannerStyles.textContent}>
            뮤지컬 정보는 어떻게 얻을까?{`\n`}뮤지컬에 관심이 많아진 뮤랑이라면
            정보를 열심히 찾아보았을 텐데요, 오늘은 바로 빠르고 손쉽게 찾는
            앙코르 100% 활용법을 알려드리려고 합니다!
          </Text>
          <View style={HomeBannerStyles.boldLine} />
          <Text style={HomeBannerStyles.textContentBold}>
            1번 : 게시판 활용하기
          </Text>
          <Text style={HomeBannerStyles.textContent}>
            앙코르만의 세부적인 게시판으로 원하는 정보를 빠르게 얻어보세요! 각
            게시판별로 카테고리가 있다는 사실 알고 있었나요? 후기 게시판에는
            시야, 굿즈, 공연 감상으로! 정보 게시판은 오페라 글라스, 뮤지컬 용어,
            이벤트로 나뉘어져 있어요.
          </Text>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Image
              style={HomeBannerStyles.image}
              source={require('@/assets/images/home/banner/Image1-4.png')}
            />
          </View>
          <Text style={HomeBannerStyles.textContent}>
            추가적으로 카테고리를 추가하고 싶다면, 마이페이지의 “카테고리 추가
            요청”이 있다는거 아셨나요? 많은 분들이 요청하면 새로운 카테고리가
            생기니 많이 활용해주시길 바래요!
          </Text>
          <View style={HomeBannerStyles.line} />
          <Text style={HomeBannerStyles.textContentBold}>
            2번 : 프리미엄 리뷰 활용하기
          </Text>
          <Text style={HomeBannerStyles.textContent}>
            프리미엄 리뷰는 무엇인지 궁금한 뮤랑이들 있었나요? 프리미엄 리뷰란
            앙코르에서 제공하는 후기 작성 가이드를 통해 작성된 후기를 말해요!
            일반 후기에 비해 훨씬 풍부한 이야기를 들어볼 수 있답니다.
          </Text>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Image
              style={HomeBannerStyles.image}
              source={require('@/assets/images/home/banner/Image1-4.png')}
            />
          </View>
          <Text style={HomeBannerStyles.textContent}>
            프리미엄 리뷰를 열람할 수 있는 포인트는 게시글, 댓글을 작성하거나
            하루에 3번 이상 접속만 해도 받을 수 있답니다! 처음 작성한 뮤랑이는
            무려 두개의 후기를 열람할 수 있는 120포인트를 받을 수 있으니 한번
            작성해보세요!
          </Text>
          <View style={HomeBannerStyles.line} />
          <Text style={HomeBannerStyles.textContentBold}>
            3번 : 검색 활용하기
          </Text>
          <Text style={HomeBannerStyles.textContent}>
            마지막으로, 앙코르의 검색 기능을 활용하는 것인데요, 홈 화면에서
            검색을 하면 앙코르의 전체 내용에 대한 검색이! 게시판이나 프리미엄
            리뷰에서 한다면 해당 기능에서만 검색이 된답니다.
          </Text>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Image
              style={HomeBannerStyles.image}
              source={require('@/assets/images/home/banner/Image1-4.png')}
            />
          </View>
          <Text style={HomeBannerStyles.textContent}>
            게시글 내에 해시테그를 통해서 간편하게 키워드 검색도 가능하고, 관심
            있는 키워드는 알림까지 등록이 가능해요! 원하는 정보만 쏙쏙 모아서
            확인해보세요.
          </Text>
          <View style={HomeBannerStyles.line} />
          <Text style={[HomeBannerStyles.textContent, {marginBottom: 40}]}>
            오늘은 이렇게 앙코르 100프로 활용해 정보 얻는 방법을 알아봤는데요,
            뮤랑이들에게 유익한 시간이었기를 바래요! 다음에도 유익한 소식으로
            돌아올게요~
          </Text>
        </>
      );
    } else {
      return <Text>알 수 없는 아이디입니다!</Text>;
    }
  };

  return (
    <SafeAreaView style={HomeBannerStyles.container}>
      <ScrollView>
        <View>{renderUI(bannerId)}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeBannerScreen;

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RootStackParamList} from 'types';
import {RouteProp, useNavigation} from '@react-navigation/native';
import PremiumStyles from '../PremiumStyles';
import PremiumWriteStyles from '@/pages/write/review/PremiumWriteStyles';
import Colors from '@/assets/colors/Colors';
import {SvgXml} from 'react-native-svg';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import {ReviewWriteIcon} from '@/assets/icons/premium/ReviewWriteIcon';
import {PremiumIcon} from '@/assets/icons/premium/PremiumIcon';
import ModalUserDelete from '@/components/modifyDeleteModal/ModalUserDelete';
import ItemOthersReview from '@/components/premium/ItemOthersReview';
import CheckTempModal from '@/components/alertModal/CheckTempModal';

type PremiumOthersPageRouteProp = RouteProp<
  RootStackParamList,
  'PremiumOthersPage'
>;

interface PremiumOthersPageProps {
  route: PremiumOthersPageRouteProp;
}

type ModalPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const reviewData = [
  {
    id: 1,
    nickname: '뮤지컬럽',
    title: '뮤지컬 고인물의 시카고 후기4',
    like_count: 7,
    view_count: 9,
    created_at: '2024-12-23',
    star: 4.7,
  },
  {
    id: 2,
    nickname: '뮤지컬럽',
    title: '뮤지컬 고인물의 시카고 후기3',
    like_count: 14,
    view_count: 20,
    created_at: '2024-11-01',
    star: 4.2,
  },
  {
    id: 3,
    nickname: '뮤지컬럽',
    title: '뮤지컬 고인물의 시카고 후기2',
    like_count: 9,
    view_count: 31,
    created_at: '2024-03-01',
    star: 3.9,
  },
  {
    id: 4,
    nickname: '뮤지컬럽',
    title: '뮤지컬 고인물의 시카고 후기1',
    like_count: 22,
    view_count: 40,
    created_at: '2022-03-01',
    star: 4.2,
  },
];

const PremiumOthersPage: React.FC<PremiumOthersPageProps> = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState<ModalPosition | null>(
    null,
  );
  const iconRef = useRef<View>(null);

  const handleGoBack = () => {
    const previousState = navigation.getState();
    const previousRouteName =
      previousState?.routes[previousState.routes.length - 2]?.name;

    if (previousRouteName === 'WritePage') {
      // 이전 화면이 WritePage일 경우 goBack() 두 번 호출
      navigation.goBack();
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  const handleIconPress = () => {
    if (iconRef.current) {
      iconRef.current.measureInWindow((x, y, width, height) => {
        console.log('Measured Position:', {x, y, width, height}); // 위치 디버깅
        setModalPosition({x, y, width, height});
        setModalVisible(true); // 모달 상태 변경
      });
    } else {
      console.warn('iconRef is null'); // Ref가 null인 경우 확인
    }
  };

  console.log('Modal Position:', modalPosition); // 위치값 디버깅

  const [fadeVisible, setFadeVisible] = useState(true); // fade 레이어 상태 관리

  const handleUsePoints = () => {
    setFadeVisible(false); // fade 효과 제거
  };

  return (
    <SafeAreaView style={PremiumStyles.container}>
      <View style={PremiumStyles.field_container}>
        {/* Fade 효과 */}
        {fadeVisible && (
          <View style={PremiumStyles.fadeLayer}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={PremiumStyles.fadeText}>
                이 후기를 열람하기 위해서는 40포인트가 사용되며,{'\n'}
                영구적으로 열람 할 수 있어요.
              </Text>
            </View>
            <TouchableOpacity
              style={PremiumStyles.usePointsButton}
              onPress={() => setModalVisible(true)}>
              <Text style={PremiumStyles.usePointsButtonText}>포인트 사용</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={reviewData}
          ListHeaderComponent={
            <>
              {/* 헤더 컴포넌트 */}
              <View style={PremiumStyles.containerOtherHeader}>
                <TouchableOpacity onPress={() => handleGoBack()}>
                  <SvgXml xml={PostIcon.arrowLeft} />
                </TouchableOpacity>
                <View style={PremiumStyles.containerRow}>
                  <TouchableOpacity>
                    <SvgXml style={{marginRight: 11}} xml={PostIcon.upload} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleIconPress}>
                    <View ref={iconRef}>
                      <SvgXml xml={PostIcon.moreVertical} />
                    </View>
                  </TouchableOpacity>
                  {modalPosition && (
                    <ModalUserDelete
                      modalVisible={modalVisible}
                      setModalVisible={setModalVisible}
                      position={modalPosition}
                    />
                  )}
                </View>
              </View>

              {/* 작성자 정보 */}
              <View style={PremiumStyles.containerWriter}>
                <View style={PremiumStyles.containerRow}>
                  <SvgXml xml={PostIcon.writerBackground} />
                  <Image
                    style={PremiumStyles.imageWriter}
                    source={require('@/assets/images/board/commentFace.png')}
                  />
                  <View style={PremiumStyles.containerWriterText}>
                    <View style={PremiumStyles.containerRow}>
                      <Text style={PremiumStyles.textWriter}>뮤사랑</Text>
                      <SvgXml xml={PostIcon.Badge} />
                    </View>
                    <Text style={PremiumStyles.textDate}>
                      3주 전 ・ 7명 확인
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={PremiumStyles.reviewTitle}>
                뮤지컬 고인물의 시카고 후기 4
              </Text>

              {/* 티켓 */}
              <View style={PremiumWriteStyles.list_container}>
                <View
                  style={[
                    PremiumWriteStyles.list_yellow,
                    {backgroundColor: Colors.sub_02},
                  ]}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{
                        ...PremiumWriteStyles.list_image,
                        width: 66,
                        height: 92,
                      }}
                      source={require('@/assets/images/premium/ticket.png')}
                      resizeMode="cover"
                    />
                    <View style={PremiumWriteStyles.icons}>
                      <Text
                        style={[
                          PremiumWriteStyles.list_title,
                          {color: Colors.gray_12},
                        ]}>
                        시카고
                      </Text>
                      <View style={PremiumWriteStyles.icon_container}>
                        <SvgXml
                          xml={ReviewWriteIcon.time}
                          style={PremiumWriteStyles.icon}
                        />
                        <Text
                          style={[
                            PremiumWriteStyles.list_text,
                            {color: Colors.gray_09},
                          ]}>
                          2024.06.21
                        </Text>
                      </View>
                      <View style={PremiumWriteStyles.icon_container}>
                        <SvgXml
                          xml={ReviewWriteIcon.seat}
                          style={PremiumWriteStyles.icon}
                        />
                        <Text
                          style={[
                            PremiumWriteStyles.list_text,
                            {color: Colors.gray_09},
                          ]}>
                          샤롯데 시어터 B구역 6열 4번
                        </Text>
                      </View>
                      <View style={PremiumWriteStyles.icon_container}>
                        <SvgXml
                          xml={ReviewWriteIcon.person}
                          style={PremiumWriteStyles.icon}
                        />
                        <Text
                          style={[
                            PremiumWriteStyles.list_text,
                            {color: Colors.gray_09},
                          ]}>
                          우선영 염지은 하은영 윤혜원
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <SvgXml
                  xml={ReviewWriteIcon.list_yellow}
                  style={PremiumWriteStyles.list_yellow_icon}
                />
              </View>

              {/* 별점 */}
              <View
                style={{...PremiumWriteStyles.total_container, marginTop: 22}}>
                <SvgXml xml={ReviewWriteIcon.star} />
                <Text style={PremiumWriteStyles.total_score}>총점 4.3</Text>
              </View>

              <View style={PremiumStyles.containerPopularReviews}>
                <SvgXml xml={PremiumIcon.star2} />
              </View>

              {/* 시야 후기 */}
              <Text style={{...PremiumStyles.reviewSubTitle, marginTop: 55}}>
                시야 후기
              </Text>
              <Text style={PremiumStyles.reviewText}>
                2층이기에 큰 기대를 하지 않았음에도 탁 트인 시야로 공연의
                분위기가 온전히 전달됨. 3회차인 1층 마지막열과 비교했을 때
                오히려 탁 트여 더 만족스러웠음.
              </Text>
              <View style={PremiumStyles.seatReviewContainer}>
                <View
                  style={{
                    ...PremiumStyles.containerRow,
                    justifyContent: 'center',
                    paddingHorizontal: 12.5,
                    paddingVertical: 11,
                  }}>
                  <Image
                    source={require('@/assets/images/premium/seat_review.png')}
                    resizeMode="cover"
                    style={{width: 94, height: 72}}
                  />
                  <View style={{position: 'absolute', top: 68, left: 96.5}}>
                    <View style={PremiumStyles.circleContainer}>
                      <SvgXml xml={PremiumIcon.zoomIcon} />
                    </View>
                  </View>

                  <View
                    style={{flex: 1, flexDirection: 'column', marginLeft: 18}}>
                    <Text style={PremiumStyles.seatTitle}>관람 정보</Text>
                    <View style={PremiumStyles.containerRow}>
                      <SvgXml xml={PremiumIcon.sofaIcon} />
                      <Text style={PremiumStyles.seatInfoText}>
                        세종문화회관 A구역 6열 4번
                      </Text>
                    </View>

                    <Text style={PremiumStyles.helpText}>
                      * 이는 이해를 돕기 위한 예시 사진입니다
                    </Text>
                  </View>
                </View>
              </View>

              {/* 음향 후기 */}
              <Text style={{...PremiumStyles.reviewSubTitle, marginTop: 44}}>
                음향 후기
              </Text>
              <View style={PremiumStyles.yellowContainer}>
                <SvgXml xml={PremiumIcon.goodIcon} />
                <Text style={PremiumStyles.yellowContainerText}>
                  매우 쾌적해요
                </Text>
              </View>
              <Text style={PremiumStyles.reviewText}>
                음향이 매우 좋은편은 아니나, 큰 거슬림 없이 잘 관람할 수 있을
                정도였음. 타 공연의 음향에 비해서 음질이 좋고 크기도 적당했기에
                좋음을 선택함.
              </Text>
              {/* 시설 후기 */}
              <Text style={{...PremiumStyles.reviewSubTitle, marginTop: 44}}>
                시설 후기
              </Text>
              <View style={PremiumStyles.yellowContainer}>
                <SvgXml xml={PremiumIcon.goodIcon} />
                <Text style={PremiumStyles.yellowContainerText}>
                  매우 쾌적해요
                </Text>
              </View>
              <Text style={PremiumStyles.reviewText}>
                세종문화회관은 다른 공연장에 비해 매우 쾌적한 편이기에 좋다고
                선택함. 우선 좌석 간의 간격으로 인해 불쾌감도 전혀 없었고 시설이
                매우 쾌적했음.
              </Text>

              {/* 총평 */}
              <Text style={{...PremiumStyles.reviewSubTitle, marginTop: 44}}>
                총평
              </Text>
              <Text style={PremiumStyles.reviewText}>
                전반적으로 시설에 만족하며 배우들의 합과 넘버의 퀄리티도 매우
                만족스러워 재관람 할 의사가 있음.
              </Text>
              <View style={PremiumStyles.containerRow}>
                <View style={PremiumStyles.chipContainer}>
                  <Text style={PremiumStyles.chipText}>#회전문</Text>
                </View>
                <View style={{...PremiumStyles.chipContainer, marginLeft: 8}}>
                  <Text style={PremiumStyles.chipText}>#시야최고</Text>
                </View>
              </View>

              <View style={PremiumStyles.line2} />

              {/* 다른 리뷰 */}
              <Text style={{...PremiumStyles.reviewSubTitle, marginBottom: 29}}>
                뮤사랑님의 또 다른 리뷰
              </Text>
            </>
          }
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ItemOthersReview postList={[item]} />}
          ListFooterComponent={
            <>
              <View
                style={{
                  ...PremiumStyles.containerRow,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 42.5,
                }}>
                <View style={PremiumStyles.responseContainer}>
                  <SvgXml xml={PremiumIcon.thumbUpIcon} />
                  <Text style={PremiumStyles.responseText}>후속추천</Text>
                  <Text style={PremiumStyles.responseNumber}>8</Text>
                </View>
                <View
                  style={{...PremiumStyles.responseContainer, marginLeft: 40}}>
                  <SvgXml xml={PremiumIcon.tipIcon} />
                  <Text style={PremiumStyles.responseText}>꿀팁가득</Text>
                  <Text style={PremiumStyles.responseNumber}>10</Text>
                </View>
                <View
                  style={{...PremiumStyles.responseContainer, marginLeft: 40}}>
                  <SvgXml xml={PremiumIcon.analyzeIcon} />
                  <Text style={PremiumStyles.responseText}>꼼꼼분석</Text>
                  <Text style={PremiumStyles.responseNumber}>5</Text>
                </View>
              </View>

              <View style={PremiumStyles.warningContainer}>
                <Text style={PremiumStyles.warningText}>
                  리뷰에 대한 권리는 작성자에게 있으며 무단 사용을 금지합니다.
                </Text>
                <Text style={PremiumStyles.warningText}>
                  개인적인 후기는 하나의 감상평으로 참고해주세요.
                </Text>
              </View>
            </>
          }
        />
      </View>

      {/* 모달 */}
      <CheckTempModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="10 포인트를 사용할까요?"
        topButton="사용하기"
        bottomButton="취소하기"
        topButtonAction={handleUsePoints}
      />
    </SafeAreaView>
  );
};

export default PremiumOthersPage;

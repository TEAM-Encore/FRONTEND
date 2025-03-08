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
  postList: {
    review_id: any;
    nickname: string;
    title: string;
    like_count: number;
    view_count: number;
    elapsed_time: string;
    star: number;
    rating: string[];
    total_rating: number;
  }[];
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

const PremiumOthersPage: React.FC<PremiumOthersPageProps> = ({postList}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState<ModalPosition | null>(
    null,
  );
  const iconRef = useRef<View>(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleIconPress = () => {
    if (iconRef.current) {
      iconRef.current.measureInWindow((x, y, width, height) => {
        console.log('Measured Position:', {x, y, width, height});
        setModalPosition({x, y, width, height});
        setModalVisible(true);
      });
    } else {
      console.warn('iconRef is null');
    }
  };

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
          data={postList}
          // keyExtractor={item => item.id.toString()}
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
                지저스 크라이스트 수퍼스타 리뷰
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
                        지저스 크라이스트 수퍼스타
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
                          광림아트센터 BBCH홀 B구역 6열 4번
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
                중앙 앞줄에서 관람했는데, 배우들 표정 하나하나가 너무 잘 보여서
                감정 몰입이 제대로 됐어요. 🥹
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
                        광림아트센터 BBCH홀 B구역 6열 4번
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
                오케스트라와 배우들의 목소리가 진짜 환상적이었어요! 특히
                감미로운 넘버들이 귀를 완전 사로잡았답니다. 🎼💕
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
                좌석 간격도 넓고 대기 공간도 충분해서 정말 쾌적했어요! 디테일이
                살아있는 무대 디자인도 대박! 😍
              </Text>

              {/* 총평 */}
              <Text style={{...PremiumStyles.reviewSubTitle, marginTop: 44}}>
                총평
              </Text>
              <Text style={PremiumStyles.reviewText}>
                마타하리의 슬픈 이야기와 강렬한 연기가 너무 와닿았어요. 무대
                연출과 의상이 진짜 압권이라 눈이 호강했어요. 또 보고 싶어요! 🌹
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
              <ItemOthersReview postList={reviewData} />
            </>
          }
          // keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={null}
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

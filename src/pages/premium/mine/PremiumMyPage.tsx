import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PremiumMyStyles from './PremiumMyStyles';
import PremiumStyles from '../PremiumStyles';
import PremiumWriteStyles from '@/pages/write/review/PremiumWriteStyles';
import Colors from '@/assets/colors/Colors';
import {getTicketReview} from '@/api/review.api';
import {useFocusEffect} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import {ReviewWriteIcon} from '@/assets/icons/premium/ReviewWriteIcon';
import {PremiumIcon} from '@/assets/icons/premium/PremiumIcon';
import ModalUserDelete from '@/components/modifyDeleteModal/ModalUserDelete';
import ItemMyReview from '@/components/premium/ItemMyReview';

type ModalPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const PremiumMyPage: React.FC<{route: any}> = ({route}) => {
  const {reviewId} = route.params;

  console.log('전달 받은 리뷰 아이디:', reviewId);

  const [reviewData, setReviewData] = useState<string[]>();

  const fetchReviewData = async (reviewId: number) => {
    try {
      const response = await getTicketReview(reviewId);
      console.log('상세 리뷰 조회: ', response.data.data);
      setReviewData([response.data.data]);
    } catch (error) {
      Alert.alert('리뷰 작성 중에 문제가 발생했습니다.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReviewData(reviewId);
    }, [reviewId]),
  );

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState<ModalPosition | null>(
    null,
  );
  const iconRef = useRef<View>(null);

  const handleGoBack = () => {
    navigation.goBack();
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

  const tagMap: {[key: string]: string} = {
    PERFECT_REVIEW: '#총평만점',
    BEST_SOUND: '#음향최고',
    BEST_FACILITIES: '#시설최고',
    BEST_VIEW: '#시야최고',
    REVOLVING_DOOR: '#회전문',
    MUSEUM_EXPERT: '#뮤덕n년차',
  };

  return (
    <SafeAreaView style={PremiumStyles.container}>
      <View style={PremiumStyles.field_container}>
        <FlatList
          data={reviewData}
          keyExtractor={item => item.review_id.toString()}
          ListHeaderComponent={
            <>
              {/* 헤더 */}
              <View style={PremiumStyles.containerOtherHeader}>
                <TouchableOpacity onPress={handleGoBack}>
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
            </>
          }
          renderItem={({item}) => (
            <>
              {/* 작성자 정보 */}
              <View style={PremiumStyles.containerWriter}>
                <View style={PremiumStyles.containerRow}>
                  <SvgXml xml={PostIcon.writerBackground} />
                  <Image
                    style={PremiumStyles.imageWriter}
                    source={require('@/assets/images/board/commentFace.png')}
                  />
                  <View style={PremiumStyles.containerWriterText}>
                    <Text style={PremiumStyles.textWriter}>뮤사랑</Text>
                    <Text style={PremiumStyles.textDate}>
                      {item.elapsed_time} ・ {item.view_count}명 확인
                    </Text>
                  </View>
                </View>
              </View>

              {/* 리뷰 제목 */}
              <Text style={PremiumStyles.reviewTitle}>{item.title}</Text>

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
                      source={{uri: item.ticket.image_url}}
                      resizeMode="cover"
                    />
                    <View style={PremiumWriteStyles.icons}>
                      <Text
                        style={[
                          PremiumWriteStyles.list_title,
                          {color: Colors.gray_12},
                        ]}>
                        {item.ticket.ticket_id}
                        {/* {item.ticket.actors.join(', ')}  */}
                        {/* 배우 리스트 */}
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
                          {item.ticket.viewed_date}
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
                          {item.ticket.seat}
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
                          {item.ticket.actors.join(', ')}
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
                <Text style={PremiumWriteStyles.total_score}>
                  총점 {item.review_data_res.rating.total_rating}
                </Text>
              </View>

              <View style={PremiumStyles.containerPopularReviews}>
                <SvgXml xml={PremiumIcon.star2} />
              </View>

              {/* 시야 후기 */}
              <Text style={{...PremiumStyles.reviewSubTitle, marginTop: 55}}>
                시야 후기
              </Text>
              <Text style={PremiumStyles.reviewText}>
                {item.review_data_res.view.view_review}
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
                        {item.ticket.seat}
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
                {item.review_data_res.sound.sound_review}
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
                {item.review_data_res.facility.facility_review}
              </Text>

              {/* 총평 */}
              <Text style={{...PremiumStyles.reviewSubTitle, marginTop: 44}}>
                총평
              </Text>
              <Text style={PremiumStyles.reviewText}>
                {item.review_data_res.rating.rating_review}
              </Text>
              {/* <View style={PremiumStyles.containerRow}>
                <View style={PremiumStyles.chipContainer}>
                  <Text style={PremiumStyles.chipText}>#{item.tags[0]}</Text>
                </View>
                <View style={{...PremiumStyles.chipContainer, marginLeft: 8}}>
                  <Text style={PremiumStyles.chipText}>#{item.tags[1]}</Text>
                </View>
              </View> */}

              <View style={PremiumStyles.line2} />

              {/* 다른 리뷰 */}
              <Text style={{...PremiumStyles.reviewSubTitle, marginBottom: 29}}>
                뮤사랑님의 또 다른 리뷰
              </Text>
              <ItemMyReview postList={reviewData} />
            </>
          )}
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
    </SafeAreaView>
  );
};

export default PremiumMyPage;

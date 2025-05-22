import React, {useCallback, useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '@/assets/colors/Colors';
import {getTicketReview} from '@/api/review.api';
import {useFocusEffect} from '@react-navigation/native';
import Svg, {
  Polygon,
  Circle,
  Text as SvgText,
  SvgXml,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import {ReviewWriteIcon} from '@/assets/icons/premium/ReviewWriteIcon';
import {PremiumIcon} from '@/assets/icons/premium/PremiumIcon';
import ModalModifyDelete from '@/components/modifyDeleteModal/ModalModifyDelete';
import TagsInReview from '@/components/premium/TagsInReview';

import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from 'types';
import PointToastBar from '@/components/alertModal/PointToastBar';
import PremiumStyles from '../PremiumScreen/style';
import PremiumWriteStyles from '../PremiumWriteScreen/style';

type PremiumMyScreenRouteProp = RouteProp<
  RootStackParamList,
  'PremiumMyScreen'
>;

type PremiumMyScreenProps = {
  route: PremiumMyScreenRouteProp;
};

type ReviewData = {
  user_id: number;
  review_id: number;
  title: string;
  elapsed_time: string;
  view_count: number;
  ticket: {
    ticket_id: string;
    image_url: string;
    viewed_date: string;
    seat: string;
    actors: string[];
    ticket_title: string;
  };
  tags: string[];
  review_data_res: {
    rating: {
      total_rating: number;
      rating_review: string;
      actor_rating: number;
      number_rating: number;
      performance_rating: number;
      revisit_rating: number;
      story_rating: number;
    };
    view: {
      view_review: string;
    };
    sound: {
      sound_review: string;
    };
    facility: {
      facility_review: string;
    };
  };
  like_res: {
    like_count_res: {
      total_like_count: number;
      follow_up_like_count: number;
      full_of_tips_like_count: number;
      thorough_analysis_like_count: number;
    };
  };
};

type ModalPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const PremiumMyScreen: React.FC<PremiumMyScreenProps> = ({route}) => {
  const {reviewId} = route.params;

  // console.log('전달 받은 리뷰 아이디:', reviewId);

  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  // const userId = useState();
  const [otherReivewData, setOtherReviewData] = useState<ReviewData[]>([]);

  const fetchReviewData = async (reviewId: number) => {
    try {
      const response = await getTicketReview(reviewId);
      console.log('상세 리뷰 조회: ', response.data.data);
      setReviewData([response.data.data]);

      // response에서 받아온 유저 아이디
      const userId = response.data.data.user_id;
    } catch (error) {
      Alert.alert('리뷰 조회 중에 문제가 발생했습니다.');
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
        // console.log('Measured Position:', {x, y, width, height});
        setModalPosition({x, y, width, height});
        setModalVisible(true);
      });
    } else {
      console.warn('iconRef is null');
    }
  };

  const [selectedTag, setSelectedTag] = useState<string>('');

  // 토스트바 관련 데이터
  const [reviewModalVisible, setReviewModalVisible] = useState(true);
  const [toastMessage, setToastMessage] = useState('포인트가 지급되었어요!');
  const [showIcon, setShowIcon] = useState(true);

  // 포인트 지급 후 확인 버튼 누를 시
  const handleModalCancel = () => {
    setReviewModalVisible(false);
  };

  // 자신 프리미엄 후기 페이지에서 좋아요를 누를 시
  const handleLikeIcon = () => {
    setToastMessage('자신의 프리미엄 후기에는 추천할 수 없습니다.');
    setShowIcon(false);
    setReviewModalVisible(true);

    setTimeout(() => {
      setReviewModalVisible(false);
    }, 2000);
  };

  // 별점 관련 데이터
  const categories = [
    '넘버',
    '퍼포먼스',
    '배우합',
    '재관람 의사',
    '스토리 구성',
  ];
  const breakLineCategories = ['스토리 구성']; // 줄바꿈하고 싶은 카테고리
  const maxScore = 5;
  const chartSize = 330;
  const center = chartSize / 2;
  const radius = center - 40;
  const angle = (2 * Math.PI) / categories.length;

  const [scores, setScores] = useState<number[]>([]);
  const [ratingReview, setRatingReview] = useState<string>('');

  // ★ 점수에 맞춰서 꼭짓점 좌표 계산
  const calculatePoints = (scores: number[]) => {
    return scores.map((score, index) => {
      const x = center + radius * (score / maxScore) * Math.sin(index * angle);
      const y = center - radius * (score / maxScore) * Math.cos(index * angle);
      return {x, y};
    });
  };

  // 리뷰 상세 내용 조회한 결과값 내 별점 데이터 가져오기
  useEffect(() => {
    if (reviewData.length > 0 && reviewData[0].review_data_res?.rating) {
      const rating = reviewData[0].review_data_res.rating;
      setScores([
        rating.number_rating,
        rating.performance_rating,
        rating.actor_rating,
        rating.revisit_rating,
        rating.story_rating,
      ]);
      setRatingReview(rating.rating_review);
    }
  }, [reviewData]);

  return (
    <SafeAreaView style={PremiumStyles.container}>
      {reviewModalVisible && (
        <PointToastBar
          visible={reviewModalVisible}
          message={toastMessage}
          showIcon={showIcon}
          onClose={handleModalCancel}
        />
      )}

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
                    // 프리미엄 후기 수정, 삭제 모달 연결 필요
                    <ModalModifyDelete
                      modalVisible={modalVisible}
                      setModalVisible={setModalVisible}
                      position={modalPosition}
                      postId={reviewId}
                      commentId={null}
                      onNavigation={navigation}
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
                    {/* 작성자 닉네임 상태 관리 필요 => 추후 수정 필요 */}
                    <Text style={PremiumStyles.textWriter}>{item.user_id}</Text>
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
                    {backgroundColor: Colors.gray_03},
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
                        {item.ticket.ticket_title}
                        {item.ticket.actors.join(', ')}
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
                  // style={PremiumWriteStyles.list_yellow_icon}
                />
              </View>

              {/* 별점 UI*/}
              <View
                style={{...PremiumWriteStyles.total_container, marginTop: 22}}>
                <SvgXml xml={ReviewWriteIcon.star} />
                <Text style={PremiumWriteStyles.total_score}>
                  총점 {item.review_data_res.rating.total_rating}
                </Text>
              </View>

              <View style={{alignItems: 'center', marginVertical: 20}}>
                <Svg width={chartSize} height={chartSize}>
                  {/* 배경 오각형 */}
                  {[...Array(maxScore)].map((_, i) => (
                    <Polygon
                      key={i}
                      points={calculatePoints(
                        Array(categories.length).fill(i + 1),
                      )
                        .map(({x, y}) => `${x},${y}`)
                        .join(' ')}
                      fill="transparent"
                      stroke={Colors.sub_03}
                      strokeWidth={1}
                    />
                  ))}

                  {/* 오각형 내부 그라이데이션 색상 부분 */}
                  <Svg width={chartSize} height={chartSize}>
                    <Defs>
                      <LinearGradient
                        id="polygonGradient"
                        x1="50%"
                        y1="0%"
                        x2="50%"
                        y2="100%"
                        gradientUnits="userSpaceOnUse">
                        <Stop
                          offset="0%"
                          stopColor="#FFDD56"
                          stopOpacity={0.2}
                        />
                        <Stop
                          offset="100%"
                          stopColor="#FFD630"
                          stopOpacity={1}
                        />
                      </LinearGradient>
                    </Defs>

                    <Polygon
                      points={calculatePoints(scores)
                        .map(({x, y}) => `${x},${y}`)
                        .join(' ')}
                      fill="url(#polygonGradient)"
                      fillOpacity={0.3}
                      stroke={Colors.sub_05}
                      strokeWidth={0.75}
                      strokeLinejoin="round"
                    />
                  </Svg>

                  {/* 꼭짓점 표시 */}
                  {calculatePoints(scores).map(({x, y}, index) => (
                    <React.Fragment key={index}>
                      {/* 꼭짓점 원 */}
                      <Circle cx={x} cy={y} r={6} fill={Colors.sub_05} />

                      {/* 꼭짓점 점수 숫자 표시 */}
                      <SvgText
                        x={x}
                        y={y + 19}
                        fill={Colors.gray_09}
                        fontSize="14"
                        fontWeight={400}
                        fontFamily="Pretendard"
                        textAnchor="middle">
                        {scores[index]}
                      </SvgText>
                    </React.Fragment>
                  ))}

                  {/* 카테고리 이름 표시 */}
                  {categories.map((category, index) => {
                    const x = center + (radius + 25) * Math.sin(index * angle);
                    const y = center - (radius + 20) * Math.cos(index * angle);

                    const needBreak = breakLineCategories.includes(category); // 줄바꿈 여부

                    return (
                      <React.Fragment key={index}>
                        {needBreak ? (
                          // 줄바꿈 필요하면 split해서 각각 출력하는 카테고리
                          category.split(' ').map((word, lineIndex) => (
                            <SvgText
                              key={`${index}-${lineIndex}`}
                              x={x}
                              y={y + lineIndex * 14}
                              fill={Colors.gray_09}
                              textAnchor="middle"
                              fontFamily="Pretendard"
                              fontSize="12"
                              fontStyle="normal"
                              fontWeight={700}
                              letterSpacing=" -0.3">
                              {word}
                            </SvgText>
                          ))
                        ) : (
                          // 한 줄로 출력하는 카테고리
                          <SvgText
                            key={index}
                            x={x}
                            y={y}
                            fill={Colors.gray_09}
                            textAnchor="middle"
                            fontFamily="Pretendard"
                            fontSize="12"
                            fontStyle="normal"
                            fontWeight={700}
                            letterSpacing=" -0.3">
                            {category}
                          </SvgText>
                        )}
                      </React.Fragment>
                    );
                  })}
                </Svg>
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

              <View style={PremiumStyles.containerTags}>
                <TagsInReview tags={item.tags} />
              </View>

              <View
                style={{
                  ...PremiumStyles.containerRow,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 42.5,
                }}>
                <TouchableOpacity onPress={handleLikeIcon}>
                  <View style={PremiumStyles.responseContainer}>
                    <SvgXml xml={PremiumIcon.thumbUpIcon} />
                    <Text style={PremiumStyles.responseText}>후속추천</Text>
                    <Text style={PremiumStyles.responseNumber}>
                      {item.like_res.like_count_res.follow_up_like_count}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLikeIcon}>
                  <View
                    style={{
                      ...PremiumStyles.responseContainer,
                      marginLeft: 40,
                    }}>
                    <SvgXml xml={PremiumIcon.tipIcon} />
                    <Text style={PremiumStyles.responseText}>꿀팁가득</Text>
                    <Text style={PremiumStyles.responseNumber}>
                      {item.like_res.like_count_res.full_of_tips_like_count}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLikeIcon}>
                  <View
                    style={{
                      ...PremiumStyles.responseContainer,
                      marginLeft: 40,
                    }}>
                    <SvgXml xml={PremiumIcon.analyzeIcon} />
                    <Text style={PremiumStyles.responseText}>꼼꼼분석</Text>
                    <Text style={PremiumStyles.responseNumber}>
                      {
                        item.like_res.like_count_res
                          .thorough_analysis_like_count
                      }
                    </Text>
                  </View>
                </TouchableOpacity>
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
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default PremiumMyScreen;

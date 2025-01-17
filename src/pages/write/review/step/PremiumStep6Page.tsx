import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Svg, {Polygon, Circle, Text as SvgText, SvgXml} from 'react-native-svg';
import {ReviewWriteIcon} from '@/assets/icons/premium/ReviewWriteIcon';
import RegisterReviewModal from '@/components/alertModal/RegisterReviewModal';
import PremiumWriteStyles from '../PremiumWriteStyles';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../../../styles/typography';
import {postTicketReview} from '@/api/review.api';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
  reviewId: number;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PremiumMyPage'
>;

const PremiumStep6Page: React.FC<PremiumProp> = ({
  goToNext,
  saveData,
  stepData,
  reviewId,
}) => {
  const categories = [
    '넘버',
    '퍼포먼스',
    '배우합',
    '재관람 의사',
    '스토리 구성',
  ];
  const [scores, setScores] = useState([3, 3, 3, 3, 3]);
  const maxScore = 5;
  const chartSize = 300; // 차트 크기
  const center = chartSize / 2; // 차트 중심
  const radius = center - 40; // 차트 반지름
  const angle = (2 * Math.PI) / categories.length;

  const [searchText, setSearchText] = useState('');

  const calculatePoints = (customScores: number[]) =>
    customScores.map((score, index) => {
      const x = center + radius * (score / maxScore) * Math.sin(index * angle);
      const y = center - radius * (score / maxScore) * Math.cos(index * angle);
      console.log('index: ', index, 'x: ', x, 'y: ', y);
      return {x, y};
    });

  const calculateAverageScore = () => {
    const total = scores.reduce((acc, score) => acc + score, 0); // 점수의 합계
    return (total / scores.length).toFixed(1); // 평균 계산 및 소수점 1자리 고정
  };

  //터치 이벤트 처리
  const handleTouch = (index: number, touchX: number, touchY: number) => {
    const distance = Math.sqrt(
      Math.pow(touchX - center, 2) + Math.pow(touchY - center, 2),
    );
    const calculatedScore = Math.round((distance / radius) * maxScore);

    setScores(prevScores =>
      prevScores.map((score, i) => {
        if (i === index) {
          return score === calculatedScore
            ? Math.max(1, score - 1) // 최소 점수 1
            : Math.min(maxScore, calculatedScore); // 최대 점수 5
        }
        return score;
      }),
    );
  };

  //   const handleTouch = (index: number, touchX: number, touchY: number) => {
  //     const points = calculatePoints(
  //       Array.from({length: maxScore}, (_, i) => i + 1),
  //     ); // 1~5점의 좌표 계산
  //     const distances = points.map(({x, y}) =>
  //       Math.sqrt(Math.pow(touchX - x, 2) + Math.pow(touchY - y, 2)),
  //     );

  //     const closestScore = distances.findIndex(distance => distance < 15);

  //     if (closestScore !== -1) {
  //       setScores(prevScores =>
  //         prevScores.map((score, i) => (i === index ? closestScore + 1 : score)),
  //       );
  //     }
  //   };

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const isButtonDisabled =
    searchText.trim() === '' || searchText.trim().length < 20;

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const transformStepDataToRequest = (stepData: any) => ({
    title: stepData['2']?.title || '',
    tags: stepData['2']?.tags || [],
    review_data_req: {
      view: {
        view_level: parseInt(stepData['3']?.view_level, 10) || 1,
        view_review: stepData['3']?.view_review || '',
      },
      sound: {
        sound_level: parseInt(stepData['4']?.sound_level, 10) || 1,
        sound_review: stepData['4']?.sound_review || '',
      },
      facility: {
        facility_level: parseInt(stepData['5']?.facility_level, 10) || 1,
        facility_review: stepData['5']?.facility_review || '',
      },
      rating: {
        number_rating: scores[0],
        story_rating: scores[1],
        revisit_rating: scores[2],
        actor_rating: scores[3],
        performance_rating: scores[4],
        total_rating: parseFloat(calculateAverageScore()),
        rating_review: searchText,
      },
    },
  });

  const ticket_id = stepData['1']?.id;
  console.log('티켓 아이디: ', ticket_id);

  const handleRegister = async () => {
    let isMounted = true;

    try {
      setLoading(true);
      setModalVisible(true);

      saveData(6, {scores, title: searchText});

      const ticket_id = stepData['1']?.id;
      console.log('Ticket ID:', ticket_id);

      const requestData = transformStepDataToRequest(stepData);
      console.log('Request Data:', JSON.stringify(requestData, null, 2));

      const response = await postTicketReview(ticket_id, requestData);

      console.log('완료 되었다: ', response.data.data);

      const reviewId = response.data.data.review_id;

      // 이동
      if (isMounted) {
        const reviewId = response.data.data.review_id;
        navigation.navigate('PremiumMyPage', {reviewId});
      }
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      Alert.alert('리뷰 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
    } finally {
      if (isMounted) {
        setModalVisible(false);
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  };

  return (
    <>
      <SafeAreaView style={PremiumWriteStyles.container}>
        <SvgXml xml={ReviewWriteIcon.progress_6} />
        <ScrollView>
          <View style={PremiumWriteStyles.field_container}>
            <Text style={PremiumWriteStyles.progressText}>6/6</Text>
            <Text style={PremiumWriteStyles.seat_title}>
              공연의 총 별점을 선정해주세요.
            </Text>

            <View style={PremiumWriteStyles.total_container}>
              <SvgXml xml={ReviewWriteIcon.star} />
              <Text style={PremiumWriteStyles.total_score}>
                총점 {calculateAverageScore()}
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
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

                {/* 사용자 점수 다각형 */}
                <Polygon
                  points={calculatePoints(scores)
                    .map(({x, y}) => `${x},${y}`)
                    .join(' ')}
                  fill="#FFD630"
                  opacity={0.3}
                  stroke={Colors.sub_05}
                  strokeWidth={1.5}
                />

                {/* 꼭짓점 표시 및 터치 영역 추가 */}
                {calculatePoints(scores).map(({x, y}, index) => (
                  <React.Fragment key={index}>
                    <Circle cx={x} cy={y} r={6} fill={Colors.sub_05} />
                    <Circle
                      cx={x}
                      cy={y}
                      r={20}
                      fill="transparent"
                      onPress={e =>
                        handleTouch(
                          index,
                          e.nativeEvent.locationX,
                          e.nativeEvent.locationY,
                        )
                      }
                    />
                  </React.Fragment>
                ))}

                {/* 카테고리 이름 */}
                {categories.map((category, index) => {
                  const x = center + (radius + 25) * Math.sin(index * angle);
                  const y = center - (radius + 20) * Math.cos(index * angle);

                  const lines = category.split(' ');

                  return (
                    <React.Fragment key={index}>
                      {lines.map((line, lineIndex) => (
                        <SvgText
                          key={`${index}-${lineIndex}`}
                          x={x}
                          y={y + lineIndex * 14}
                          fill={Colors.gray_09}
                          textAnchor="middle"
                          {...typography.subhead01}>
                          {line}
                        </SvgText>
                      ))}
                    </React.Fragment>
                  );
                })}
              </Svg>
            </View>

            <TextInput
              style={PremiumWriteStyles.seat_input}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="선택한 이유를 작성해주세요. (최소 20자)"
              multiline={true}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      <View style={PremiumWriteStyles.white} />
      <KeyboardAvoidingView
        style={PremiumWriteStyles.containerCommentInput}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={[
            PremiumWriteStyles.next_button,
            {
              backgroundColor: isButtonDisabled
                ? Colors.gray_05
                : Colors.sub_04,
            },
          ]}
          onPress={() => {
            if (!isButtonDisabled) {
              saveData(6, {scores, title: searchText});
              openModal();
              handleRegister();
            }
          }}
          disabled={isButtonDisabled || loading}>
          <Text
            style={[
              PremiumWriteStyles.next_button_text,
              {
                color: isButtonDisabled ? Colors.gray_01 : Colors.gray_12,
              },
            ]}>
            {loading ? '등록 중' : '등록'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <RegisterReviewModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        loading={loading}
      />
    </>
  );
};

export default PremiumStep6Page;

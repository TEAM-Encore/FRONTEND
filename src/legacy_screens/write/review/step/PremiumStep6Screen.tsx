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
  StyleSheet,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {ReviewWriteIcon} from '@/assets/icons/premium/ReviewWriteIcon';
import RegisterReviewModal from '@/components/alertModal/RegisterReviewModal';
import PremiumWriteStyles from '@/app/premium/PremiumWriteScreen/style';
import Colors from '@/assets/colors/Colors';
import {postTicketReview, getTicketReview} from '@/api/review.api';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types';
import ProgressBar from '@/components/ProgressBar';
import {typography} from '../../../../styles/typography';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
  reviewId?: number;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PremiumMyScreen'
>;

const PremiumStep6Screen: React.FC<PremiumProp> = ({
  goToNext,
  saveData,
  stepData,
  reviewId,
}) => {
  const categories = [
    '넘버',
    '스토리 구성',
    '재관람 의사',
    '배우합',
    '퍼포먼스',
  ];
  const [scores, setScores] = useState(Array(categories.length).fill(0)); // 각 카테고리의 점수 저장
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleScoreChange = (index: number, score: number) => {
    const updatedScores = [...scores];
    updatedScores[index] = score;
    setScores(updatedScores);
  };

  // 평균 별점 계산
  const calculateAverageScore = () => {
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    return (totalScore / scores.length).toFixed(1); // 평균 계산 및 소수점 1자리 고정
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const isButtonDisabled = searchText.trim() === '';
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
  // console.log('티켓 아이디: ', ticket_id);

  // 리뷰 등록
  const handleRegister = async () => {
    try {
      setLoading(true);
      setModalVisible(true);

      // 데이터 저장
      saveData(6, {scores, title: searchText});

      const ticket_id = stepData['1']?.id;
      console.log('Ticket ID:', ticket_id);

      const requestData = transformStepDataToRequest(stepData);
      console.log('Request Data:', JSON.stringify(requestData, null, 2));

      const postResponse = await postTicketReview(ticket_id, requestData);

      const {review_id} = postResponse.data.data;
      console.log('생성된 Review ID:', review_id);

      // 이 부분이 필요가 없는데, 있어야 에러가 안나고 PremiumMyPage로 넘어갈 수 있어서 일단 추가함
      try {
        const getResponse = await getTicketReview(Number(review_id));
        console.log(
          'Review Detail Data:',
          JSON.stringify(getResponse.data.data, null, 2),
        );
      } catch (error) {
        // console.error('Error:', error);
      }

      navigation.navigate('PremiumMyScreen', {reviewId: review_id});
    } catch (error) {
      console.error('오류 발생:', error);
      Alert.alert('리뷰 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setModalVisible(false);
      setLoading(false);
    }
  };

  // 도움 말풍선 모달
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [isHelpCirclePressed, setHelpCirclePressed] = useState(false);

  const handleHelpCirclePress = () => {
    setHelpCirclePressed(true); 
    setHelpModalVisible(true); 
  };

  const handleModalClose = () => {
    setHelpCirclePressed(false);
    setHelpModalVisible(false); 
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

            <View
              style={styles.select_star_category}>
              {categories.map((category, index) => (
                <View style={styles.categoryView}>
                  <View key={index} style={styles.indexView}>
                    <Text style={styles.categoryText}>{category}</Text>
                    {category === '넘버' && (
                      <TouchableOpacity
                        onPress={handleHelpCirclePress}
                        activeOpacity={0.6}>
                        <SvgXml
                          xml={ReviewWriteIcon.helpCircle}
                          style={{marginLeft: 5}}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  <View>
                    <ProgressBar
                      total={5}
                      onScoreChange={(score: number) => handleScoreChange(index, score)}
                    />
                  </View>
                </View>
              ))}

              <Modal
                visible={helpModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={handleModalClose}>
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity onPress={handleModalClose}>
                        <SvgXml xml={ReviewWriteIcon.closeButton} />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.modalBoldText}>넘버란?</Text>

                    <Text style={styles.modalText}>
                      뮤지컬 넘버는 뮤지컬에서 사용되는 {'\n'}
                      노래나 음악을 의미하며, 극의 전개와 {'\n'}
                      인물의 감정을 전달하는 중요한 역할을 해요.
                    </Text>
                  </View>
                </View>
              </Modal>
            </View>

            <TextInput
              style={PremiumWriteStyles.seat_input}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="선택한 이유를 작성해주세요."
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
                ? Colors.gray_06
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 280,
    height: 160,
    paddingTop: 10,
    paddingLeft: 24,
    paddingRight: 9,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalBoldText: {
    ...typography.subhead02,
    marginBottom: 8,
    alignItems: 'center',
  },
  modalText: {
    ...typography.bodyLong01,
    alignItems: 'center',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
  },
  categoryView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  indexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    color: Colors.gray_12,
  },
  select_star_category: {
    backgroundColor: Colors.gray_03,
    width: 337,
    height: 190,
    ...typography.caption,
    color: Colors.gray_12,
    marginTop: 22,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});

export default PremiumStep6Screen;

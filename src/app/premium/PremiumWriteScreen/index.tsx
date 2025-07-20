import React, {useState, useEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from 'types';
import {SvgXml} from 'react-native-svg';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import {TicketBookIcon} from '@/assets/icons/ticketBook/TicketBookIcon';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import HomeBannerStyles from '@/app/home/HomeBannerScreen/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import PremiumStep1Screen from '@/legacy_screens/write/review/step/PremiumStep1Screen';
import PremiumStep2Screen from '@/legacy_screens/write/review/step/PremiumStep2Screen';
import PremiumStep3Screen from '@/legacy_screens/write/review/step/PremiumStep3Screen';
import PremiumStep4Screen from '@/legacy_screens/write/review/step/PremiumStep4Screen';
import PremiumStep5Screen from '@/legacy_screens/write/review/step/PremiumStep5Screen';
import PremiumStep6Screen from '@/legacy_screens/write/review/step/PremiumStep6Screen';
import useDialog from '@/features/core/hooks/useDialog';

interface PremiumWriteScreenProps {
  navigation: any;
  route: RouteProp<RootStackParamList, 'PremiumWriteScreen'>;
  goToPrevious?: () => void;
}

const PremiumWriteScreen: React.FC<PremiumWriteScreenProps> = ({
  navigation,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState({});

  useEffect(() => {
    // goToPrevious를 navigation params에 등록
    navigation.setParams({goToPrevious});
  }, [navigation, currentStep]);

  const saveData = (step: number, data: string[]) => {
    setStepData(prev => ({...prev, [step]: data}));
  };

  const goToNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 1) {
      navigation.goBack();
    }
  };

  const transformStepDataToRequest = (stepData: any) => {
    return {
      title: stepData['2']?.title || '',
      tags: stepData['2']?.tags || [],
      review_data_req: {
        view: {
          view_level: parseInt(stepData['3']?.view_level, 10) || 1, // 기본값 1
          view_review: stepData['3']?.view_review || '', // 기본값 ""
        },
        sound: {
          sound_level: parseInt(stepData['4']?.sound_level, 10) || 1, // 기본값 1
          sound_review: stepData['4']?.sound_review || '', // 기본값 ""
        },
        facility: {
          facility_level: parseInt(stepData['5']?.facility_level, 10) || 1, // 기본값 1
          facility_review: stepData['5']?.facility_review || '', // 기본값 ""
        },
        rating: {
          number_rating: stepData['6']?.scores?.[0] || 1, // 기본값 1
          story_rating: stepData['6']?.scores?.[1] || 1,
          revisit_rating: stepData['6']?.scores?.[2] || 1,
          actor_rating: stepData['6']?.scores?.[3] || 1,
          performance_rating: stepData['6']?.scores?.[4] || 1,
          total_rating: calculateAverageScore(stepData['6']?.scores) || 1, // 기본값 1
          rating_review: stepData['6']?.title || '',
        },
      },
    };
  };

  // 평균 점수 계산 함수
  const calculateAverageScore = (scores: any) => {
    if (!scores || scores.length === 0) return 1; // 기본값 1
    const total = scores.reduce((acc: any, score: any) => acc + score, 0);
    return parseFloat((total / scores.length).toFixed(1)); // 소수점 1자리
  };

  const requestData = transformStepDataToRequest(stepData);
  console.log(requestData);
  console.log('현재 단계: ', currentStep, '데이터: ', stepData);

  const {showDialog} = useDialog();

  const handleClose = () => {
    showDialog({
      title: '리뷰 작성을 그만할까요?',
      desc: '중간에 나갈 시 작성한 내용은 삭제됩니다.',
      confirmLabel: '그만하기',
      onConfirm: goToPrevious,
    });
  };

  return (
    <Screen>
      <Header>
        <MenuBtn onPress={goToPrevious}>
          <SvgXml xml={PostIcon.arrowLeft} />
        </MenuBtn>

        <TitleContainer>
          <Text style={HomeBannerStyles.textTitle}>프리미엄 리뷰 작성</Text>
        </TitleContainer>

        <MenuBtn onPress={handleClose}>
          <SvgXml xml={TicketBookIcon.close} />
        </MenuBtn>
      </Header>

      {currentStep === 1 && (
        <PremiumStep1Screen goToNext={goToNext} saveData={saveData} />
      )}
      {currentStep === 2 && (
        <PremiumStep2Screen
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 3 && (
        <PremiumStep3Screen
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 4 && (
        <PremiumStep4Screen
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 5 && (
        <PremiumStep5Screen
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 6 && (
        <PremiumStep6Screen
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
    </Screen>
  );
};

export default PremiumWriteScreen;

const Screen = styled(SafeAreaView)`
  flex: 1;
`;

const Header = styled.View`
  height: 62px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
`;

const TitleContainer = styled.View`
  z-index: -10;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

const MenuBtn = styled.TouchableOpacity.attrs({hitSlop: 12})``;

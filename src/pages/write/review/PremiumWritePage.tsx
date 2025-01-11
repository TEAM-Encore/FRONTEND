import React, {useState, useEffect} from 'react';
import PremiumStep1Page from './step/PremiumStep1Page';
import PremiumStep2Page from './step/PremiumStep2Page';
import PremiumStep3Page from './step/PremiumStep3Page';
import PremiumStep4Page from './step/PremiumStep4Page';
import PremiumStep5Page from './step/PremiumStep5Page';
import PremiumStep6Page from './step/PremiumStep6Page';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from 'types';

interface PremiumWritePageProps {
  navigation: any;
  route: RouteProp<RootStackParamList, 'PremiumWritePage'>;
  goToPrevious?: () => void;
}

const PremiumWritePage: React.FC<PremiumWritePageProps> = ({navigation}) => {
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
      reviewDataReq: {
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

  return (
    <>
      {currentStep === 1 && (
        <PremiumStep1Page goToNext={goToNext} saveData={saveData} />
      )}
      {currentStep === 2 && (
        <PremiumStep2Page
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 3 && (
        <PremiumStep3Page
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 4 && (
        <PremiumStep4Page
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 5 && (
        <PremiumStep5Page
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 6 && (
        <PremiumStep6Page
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
    </>
  );
};

export default PremiumWritePage;

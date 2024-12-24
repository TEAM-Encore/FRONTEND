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

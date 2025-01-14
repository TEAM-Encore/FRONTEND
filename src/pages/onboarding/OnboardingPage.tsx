import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

import HomeBannerStyles from '@/pages/home/HomeBannerStyles';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';

import OnboardingStep1Page from '@/pages/onboarding/OnboardingStep1Page';
import OnboardingStep2Page from '@/pages/onboarding/OnboardingStep2Page';
import OnboardingStep3Page from '@/pages/onboarding/OnboardingStep3Page';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState({});
  const navigation = useNavigation();

  const saveData = (step: number, data: any) => {
    if (Array.isArray(stepData)) {
      const updatedStepData = [...stepData];
      updatedStepData[step] = data;
      setStepData(updatedStepData);
    } else if (typeof stepData === 'object') {
      setStepData(prev => ({...prev, [step]: data}));
    }
  };

  const goToNext = (nextStep?: number) => {
    setCurrentStep(nextStep ?? currentStep + 1);
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
      <SafeAreaView>
        <View style={HomeBannerStyles.containerHeader}>
          <TouchableOpacity
            style={HomeBannerStyles.iconGoBack}
            onPress={goToPrevious}>
            <SvgXml style={{margin: 7.75}} xml={PostIcon.arrowLeft} />
          </TouchableOpacity>
          <Text style={HomeBannerStyles.textTitle}>프로필 설정</Text>
        </View>
      </SafeAreaView>
      {currentStep === 1 && (
        <OnboardingStep1Page
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 2 && (
        <OnboardingStep2Page
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 3 && (
        <OnboardingStep3Page
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
    </>
  );
}

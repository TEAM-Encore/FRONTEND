import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

import HomeBannerStyles from '@/screens/home/HomeBannerStyles';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';

import OnboardingStep1Screen from '@/screens/onboarding/OnboardingStep1Screen';
import OnboardingStep2Screen from '@/screens/onboarding/OnboardingStep2Screen';
import OnboardingStep3Screen from '@/screens/onboarding/OnboardingStep3Screen';

export default function OnboardingScreen() {
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
        <OnboardingStep1Screen
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 2 && (
        <OnboardingStep2Screen
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 3 && (
        <OnboardingStep3Screen
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
    </>
  );
}

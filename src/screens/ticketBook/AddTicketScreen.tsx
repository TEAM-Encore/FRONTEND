import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

import HomeBannerStyles from '@/screens/home/HomeBannerStyles';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';

import AddTicketStep1Screen from './AddTicketStep1Screen';
import AddTicketStep2Screen from './AddTicketStep2Screen';
import AddTicketStep3Screen from './AddTicketStep3Screen';
import AddTicketStep4Screen from './AddTicketStep4Screen';
import AddTicketStep5Screen from './AddTicketStep5Screen';

export default function AddTicketScreen() {
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
          <Text style={HomeBannerStyles.textTitle}>내역 추가하기</Text>
        </View>
      </SafeAreaView>
      {currentStep === 1 && (
        <AddTicketStep1Screen
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 2 && (
        <AddTicketStep2Screen
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 3 && (
        <AddTicketStep3Screen
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 4 && (
        <AddTicketStep4Screen
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
      {currentStep === 5 && (
        <AddTicketStep5Screen
          goToNext={goToNext}
          saveData={saveData}
          stepData={stepData}
        />
      )}
    </>
  );
}

import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import HomeBannerStyles from '@/app/home/HomeBannerScreen/styles';
import OnboardingHeader from '@/features/auth/modules/OnboardingHeader';
import ProfilePicture from '@/features/auth/modules/ProfileSetting/ProfilePicture';
import styled from 'styled-components/native';

export default function ProfileSettingScreen() {
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
      <SafeAreaView style={{flex: 1}}>
        <OnboardingHeader
          title="프로필 설정"
          description="프로필 사진과 닉네임을 추가해주세요."
          step={1}
        />
        <View style={{height: 96, alignItems: 'center', marginTop: 24}}>
          <ProfilePicture />
        </View>
      </SafeAreaView>
    </>
  );
}

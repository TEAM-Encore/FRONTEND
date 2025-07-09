import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import OnboardingHeader from '@/features/onboarding/modules/OnboardingHeader';
import ProfilePicture from '@/features/onboarding/modules/ProfileSetting/ProfilePicture';
import ProfileNicknameInput from '@/features/onboarding/modules/ProfileSetting/ProfileNicknameInput';
import OnboardingNextButton from '@/features/onboarding/modules/OnboardingNextButton';

export default function ProfileSettingScreen() {
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  return (
    <SafeAreaView style={{flex: 1}}>
      <OnboardingHeader
        title="프로필 설정"
        description="프로필 사진과 닉네임을 추가해주세요."
        step={1}
      />

      <ProfilePicture />

      <ProfileNicknameInput setNextButtonDisabled={setNextButtonDisabled} />

      <OnboardingNextButton disabled={nextButtonDisabled} />
    </SafeAreaView>
  );
}

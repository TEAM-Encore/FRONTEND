import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import OnboardingHeader from '@/features/onboarding/modules/OnboardingHeader';
import OnboardingNextButton from '@/features/onboarding/modules/OnboardingNextButton';
import ProfilePreferenceGrid from '@/features/onboarding/modules/ProfilePreference/ProfilePreferenceGrid';

export default function ProfilePreferenceScreen() {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <OnboardingHeader
        title="프로필 설정"
        description="선호하는 공연 키워드를 선택해주세요."
        step={2}
      />
      <ProfilePreferenceGrid
        setSelectedKeywords={setSelectedKeywords}
        selectedKeywords={selectedKeywords}
      />
      <OnboardingNextButton disabled={selectedKeywords.length === 0} />
    </SafeAreaView>
  );
}

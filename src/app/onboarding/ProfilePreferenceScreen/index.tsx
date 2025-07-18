import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Header from '@/components/Header';
import OnboardingHeader from '@/features/onboarding/modules/OnboardingHeader';
import Typo from '@/components/Typo';
import OnboardingNextButton from '@/features/onboarding/modules/OnboardingNextButton';
import ProfilePreferenceGrid from '@/features/onboarding/modules/ProfilePreference/ProfilePreferenceGrid';

export default function ProfilePreferenceScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <OnboardingHeader
        title="프로필 설정"
        description="선호하는 공연 키워드를 선택해주세요."
        step={2}
      />
      <ProfilePreferenceGrid />
      <OnboardingNextButton disabled={true} />
    </SafeAreaView>
  );
}

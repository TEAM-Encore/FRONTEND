import {View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {OnboardingIcon} from '@/assets/icons/onboarding/OnboardingIcon';
import {useTheme} from 'styled-components/native';

export default function ProfilePicture() {
  const theme = useTheme();

  return (
    <View
      style={{
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: theme.system.sub_03,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SvgXml xml={OnboardingIcon.profile} />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 48,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
      <SvgXml
        xml={OnboardingIcon.profileCamera}
        style={{position: 'absolute'}}
      />
    </View>
  );
}

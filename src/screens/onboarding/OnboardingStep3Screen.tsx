import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import OnboardingStyles from './OnboardingStyles';
import Colors from '@/assets/colors/Colors';
import {useOnboarding} from '@/state/OnboardingContext';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
};

type RootStackParamList = {
  ProfileCardScreen: undefined;
};

export default function OnboardingStep3Screen({
  goToNext,
  saveData,
  stepData,
}: PremiumProp) {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {updateOnboardingData} = useOnboarding();

  const [selectedFrequency, setSelectedFrequency] = useState('');

  const handleFrequencySelect = (frequency: string) => {
    setSelectedFrequency(frequency);
  };

  const isNextButtonActive = selectedFrequency !== '';

  const handleNextButton = () => {
    updateOnboardingData({
      frequency: selectedFrequency,
    });
    saveData(3, selectedFrequency);
    navigation.navigate('ProfileCardScreen');
  };

  return (
    <>
      <SafeAreaView style={OnboardingStyles.container}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              OnboardingStyles.line,
              {width: screenWidth, backgroundColor: Colors.sub_04},
            ]}
          />
        </View>

        <ScrollView style={{marginHorizontal: 20}}>
          <Text style={OnboardingStyles.textProgress}>3/3</Text>
          <Text style={OnboardingStyles.textTitle}>
            공연 관람 빈도를 선택해주세요.
          </Text>

          <TouchableOpacity
            style={[
              OnboardingStyles.containerFrequency,
              selectedFrequency === '연 1~3회' && {
                backgroundColor: '#FFDD56',
              },
            ]}
            onPress={() => handleFrequencySelect('연 1~3회')}>
            <Text
              style={[
                OnboardingStyles.textFrequency,
                selectedFrequency === '연 1~3회' && {
                  fontFamily: 'Pretendard-SemiBold',
                  color: Colors.gray_12,
                },
              ]}>
              일년에 1~3회 내로 보러가요
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              OnboardingStyles.containerFrequency,
              selectedFrequency === '연 4~7회' && {
                backgroundColor: '#FFDD56',
              },
            ]}
            onPress={() => handleFrequencySelect('연 4~7회')}>
            <Text
              style={[
                OnboardingStyles.textFrequency,
                selectedFrequency === '연 4~7회' && {
                  fontFamily: 'Pretendard-SemiBold',
                  color: Colors.gray_12,
                },
              ]}>
              일년에 4~7회 내로 보러가요
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              OnboardingStyles.containerFrequency,
              selectedFrequency === '연 8회 이상' && {
                backgroundColor: '#FFDD56',
              },
            ]}
            onPress={() => handleFrequencySelect('연 8회 이상')}>
            <Text
              style={[
                OnboardingStyles.textFrequency,
                selectedFrequency === '연 8회 이상' && {
                  fontFamily: 'Pretendard-SemiBold',
                  color: Colors.gray_12,
                },
              ]}>
              일년에 8회 이상 보러가요
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={OnboardingStyles.containerButton}>
          <TouchableOpacity
            style={[
              OnboardingStyles.containerNextButton,
              isNextButtonActive && {backgroundColor: Colors.sub_04},
            ]}
            onPress={handleNextButton}
            // disabled={!isNextButtonActive}>
          >
            <Text
              style={[
                OnboardingStyles.textNextButton,
                isNextButtonActive && {color: Colors.gray_12},
              ]}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

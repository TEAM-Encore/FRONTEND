import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import OnboardingStyles from './OnboardingStyles';
import Colors from '@/assets/colors/Colors';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
};

type SearchResult = {
  title: string;
  musical_id: number;
  show_times: string[];
  location: string;
};

export default function OnboardingStep3Page({
  goToNext,
  saveData,
  stepData,
}: PremiumProp) {
  const screenWidth = Dimensions.get('window').width;

  const [selectedFrequency, setSelectedFrequency] = useState(stepData[1] || '');

  const isNextButtonActive = selectedFrequency !== '';

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

          <TouchableOpacity style={OnboardingStyles.containerFrequency}>
            <Text style={OnboardingStyles.textFrequency}>
              일년에 1~3회 내로 보러가요
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={OnboardingStyles.containerFrequency}>
            <Text style={OnboardingStyles.textFrequency}>
              일년에 4~7회 내로 보러가요
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={OnboardingStyles.containerFrequency}>
            <Text style={OnboardingStyles.textFrequency}>
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
            onPress={() => {
              saveData(3, selectedFrequency);
              // goToNext(2);
            }}
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

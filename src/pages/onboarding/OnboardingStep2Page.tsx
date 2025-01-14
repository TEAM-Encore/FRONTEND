import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import OnboardingStyles from './OnboardingStyles';
import Colors from '@/assets/colors/Colors';
import {OnboardingIcon} from '@/assets/icons/onboarding/OnboardingIcon';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
};

type DataItem = {
  id: number;
  icon: string;
  title: string;
};

export default function OnboardingStep2Page({
  goToNext,
  saveData,
  stepData,
}: PremiumProp) {
  const screenWidth = Dimensions.get('window').width;

  const [selectedKeyword, setSelectedKeyword] = useState('');

  const isNextButtonActive = selectedKeyword === '';

  const data: DataItem[] = [
    {
      id: 1,
      icon: OnboardingIcon.keywordTouched,
      title: '깊은 감동을\n받게 되는',
    },
    {
      id: 2,
      icon: OnboardingIcon.keywordInteresting,
      title: '흥미롭고\n재미있는',
    },
    {
      id: 3,
      icon: OnboardingIcon.keywordNumber,
      title: '넘버 퀄리티가\n뛰어난',
    },
    {
      id: 4,
      icon: OnboardingIcon.keywordDirecting,
      title: '무대 연출력이\n뛰어난',
    },
    {
      id: 5,
      icon: OnboardingIcon.keywordTouched,
      title: '캐스팅\n페어합이 좋은',
    },
    {
      id: 6,
      icon: OnboardingIcon.keywordActor,
      title: '배우의\n연기력이 좋은',
    },
    {
      id: 7,
      icon: OnboardingIcon.keywordLikeActor,
      title: '최애 배우가\n출연하는',
    },
    {
      id: 8,
      icon: OnboardingIcon.keywordLight,
      title: '가볍게\n보기 좋은',
    },
    {
      id: 9,
      icon: OnboardingIcon.keywordStory,
      title: '스토리 라인이\n탄탄한',
    },
  ];

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity style={OnboardingStyles.containerKeyword}>
      <Text style={OnboardingStyles.textKeyword}>{item.title}</Text>
      <SvgXml xml={item.icon} style={OnboardingStyles.iconKeyword} />
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView style={OnboardingStyles.container}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              OnboardingStyles.line,
              {width: screenWidth * (2 / 3), backgroundColor: Colors.sub_04},
            ]}
          />
          <View style={[OnboardingStyles.line, {width: screenWidth / 3}]} />
        </View>

        <ScrollView style={{marginHorizontal: 20}}>
          <Text style={OnboardingStyles.textProgress}>2/3</Text>
          <Text style={OnboardingStyles.textTitle}>
            선호하는 공연 키워드를 선택해주세요.
          </Text>
          <Text style={OnboardingStyles.textSubTitle}>최대 3개 선택 가능</Text>

          <FlatList
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
          />
        </ScrollView>

        <View style={OnboardingStyles.containerButton}>
          <TouchableOpacity
            style={[
              OnboardingStyles.containerNextButton,
              isNextButtonActive && {backgroundColor: Colors.sub_04},
            ]}
            onPress={() => {
              saveData(2, selectedKeyword);
              goToNext(3);
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

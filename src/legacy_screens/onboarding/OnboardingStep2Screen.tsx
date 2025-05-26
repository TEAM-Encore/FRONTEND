import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import OnboardingStyles from './OnboardingStyles';
import Colors from '@/assets/colors/Colors';
import {OnboardingIcon} from '@/assets/icons/onboarding/OnboardingIcon';
import {useOnboarding} from '@/state/OnboardingContext';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
};

type DataItem = {
  id: number;
  icon: string;
  icon2: string;
  title: string;
};

export default function OnboardingStep2Screen({
  goToNext,
  saveData,
  stepData,
}: PremiumProp) {
  const screenWidth = Dimensions.get('window').width;

  const {updateOnboardingData} = useOnboarding();

  const [selectedKeyword, setSelectedKeyword] = useState<string[]>([]);

  const isNextButtonActive = selectedKeyword.length > 0;

  const data: DataItem[] = [
    {
      id: 1,
      icon: OnboardingIcon.keywordTouched,
      icon2: OnboardingIcon.keywordTouched2,
      title: '깊은 감동을\n받게 되는',
    },
    {
      id: 2,
      icon: OnboardingIcon.keywordInteresting,
      icon2: OnboardingIcon.keywordInteresting2,
      title: '흥미롭고\n재미있는',
    },
    {
      id: 3,
      icon: OnboardingIcon.keywordNumber,
      icon2: OnboardingIcon.keywordNumber2,
      title: '넘버 퀄리티가\n뛰어난',
    },
    {
      id: 4,
      icon: OnboardingIcon.keywordDirecting,
      icon2: OnboardingIcon.keywordDirecting2,
      title: '무대 연출력이\n뛰어난',
    },
    {
      id: 5,
      icon: OnboardingIcon.keywordTouched,
      icon2: OnboardingIcon.keywordTouched2,
      title: '캐스팅\n페어합이 좋은',
    },
    {
      id: 6,
      icon: OnboardingIcon.keywordActor,
      icon2: OnboardingIcon.keywordActor2,
      title: '배우의\n연기력이 좋은',
    },
    {
      id: 7,
      icon: OnboardingIcon.keywordLikeActor,
      icon2: OnboardingIcon.keywordLikeActor2,
      title: '최애 배우가\n출연하는',
    },
    {
      id: 8,
      icon: OnboardingIcon.keywordLight,
      icon2: OnboardingIcon.keywordLight2,
      title: '가볍게\n보기 좋은',
    },
    {
      id: 9,
      icon: OnboardingIcon.keywordStory,
      icon2: OnboardingIcon.keywordStory2,
      title: '스토리 라인이\n탄탄한',
    },
  ];

  const handleKeywordSelect = (title: string) => {
    if (selectedKeyword.includes(title)) {
      setSelectedKeyword(selectedKeyword.filter(keyword => keyword !== title));
    } else {
      if (selectedKeyword.length < 3) {
        setSelectedKeyword([...selectedKeyword, title]);
      }
    }
  };

  const handleNextButton = () => {
    updateOnboardingData({
      keywords: selectedKeyword,
    });
    saveData(2, selectedKeyword);
    goToNext(3);
  };

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

        <ScrollView>
          <View style={{marginHorizontal: 20}}>
            <Text style={OnboardingStyles.textProgress}>2/3</Text>
            <Text style={OnboardingStyles.textTitle}>
              선호하는 공연 키워드를 선택해주세요.
            </Text>
            <Text style={OnboardingStyles.textSubTitle}>
              최대 3개 선택 가능
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {data.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[
                  OnboardingStyles.containerKeyword,
                  selectedKeyword.includes(item.title) && {
                    backgroundColor: Colors.sub_04,
                  },
                ]}
                onPress={() => handleKeywordSelect(item.title)}>
                <SvgXml
                  xml={
                    selectedKeyword.includes(item.title)
                      ? item.icon2
                      : item.icon
                  }
                  style={OnboardingStyles.iconKeyword}
                />
                <Text style={OnboardingStyles.textKeyword}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={OnboardingStyles.containerButton}>
          <TouchableOpacity
            style={[
              OnboardingStyles.containerNextButton,
              isNextButtonActive && {backgroundColor: Colors.sub_04},
            ]}
            onPress={handleNextButton}
            disabled={!isNextButtonActive}>
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

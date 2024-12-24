import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ListRenderItem,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import PremiumWriteStyles from '../PremiumWriteStyles';
import {SvgXml} from 'react-native-svg';
import {ReviewWriteIcon} from '@/assets/icons/premium/ReviewWriteIcon';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../../../styles/typography';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
};
const PremiumStep5Page: React.FC<PremiumProp> = ({
  goToNext,
  saveData,
  stepData,
}) => {
  const [input, setInput] = useState(stepData[5] || '');
  const [searchText, setSearchText] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    {
      id: 'good',
      label: '매우 퀘적해요',
      labelColor: Colors.sub_05,
      icon1: ReviewWriteIcon.goodIcon1,
      icon2: ReviewWriteIcon.goodIcon2,
    },
    {
      id: 'normal',
      label: '보통이에요',
      labelColor: '#A765EE',
      icon1: ReviewWriteIcon.sosoIcon1,
      icon2: ReviewWriteIcon.sosoIcon2,
    },
    {
      id: 'bad',
      label: '좋지 않아요',
      labelColor: '#D45D3C',
      icon1: ReviewWriteIcon.badIcon1,
      icon2: ReviewWriteIcon.badIcon2,
    },
  ];

  const handlePress = (selectedId: string) => {
    setSelectedOption(selectedId);
    // console.log(selectedId);
  };

  const isButtonDisabled =
    !selectedOption ||
    searchText.trim() === '' ||
    searchText.trim().length < 20;

  return (
    <>
      <SafeAreaView style={PremiumWriteStyles.container}>
        <SvgXml xml={ReviewWriteIcon.progress_5} />
        <ScrollView>
          <View style={PremiumWriteStyles.field_container}>
            <Text style={PremiumWriteStyles.progressText}>5/6</Text>
            <Text style={PremiumWriteStyles.seat_title}>
              관람한 공연장의 시설은 어떤가요?
            </Text>
            <View
              style={{
                ...PremiumWriteStyles.icon_container,
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginVertical: 50,
              }}>
              {options.map(option => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handlePress(option.id)}
                  style={PremiumWriteStyles.music_container}>
                  <SvgXml
                    xml={
                      selectedOption === option.id ? option.icon2 : option.icon1
                    }
                  />
                  <Text
                    style={[
                      PremiumWriteStyles.music_text,
                      {
                        color:
                          selectedOption === option.id
                            ? option.labelColor
                            : Colors.gray_08,
                        ...(selectedOption === option.id
                          ? typography.subhead01
                          : typography.caption),
                      },
                    ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={PremiumWriteStyles.seat_input}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="선택한 이유를 작성해주세요. (최소 20자)"
              multiline={true}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      <View style={PremiumWriteStyles.white} />
      <KeyboardAvoidingView
        style={PremiumWriteStyles.containerCommentInput}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={[
            PremiumWriteStyles.next_button,
            {
              backgroundColor: isButtonDisabled
                ? Colors.gray_05
                : Colors.sub_04,
            },
          ]}
          onPress={() => {
            if (!isButtonDisabled) {
              saveData(5, {tags: selectedOption, title: searchText});
              goToNext(6);
            }
          }}
          disabled={isButtonDisabled}>
          <Text
            style={[
              PremiumWriteStyles.next_button_text,
              {
                color: isButtonDisabled ? Colors.gray_01 : Colors.gray_12,
              },
            ]}>
            다음
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default PremiumStep5Page;

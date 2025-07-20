import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ListRenderItem,
  KeyboardAvoidingView,
  Platform,
  Alert,
  FlatList,
} from 'react-native';
import PremiumWriteStyles from '@/app/premium/PremiumWriteScreen/style';
import {SvgXml} from 'react-native-svg';
import {ReviewWriteIcon} from '@/assets/icons/premium/ReviewWriteIcon';
import Colors from '@/assets/colors/Colors';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
};

type ReviewItems = {
  id: string;
  tag: string;
};

const data: ReviewItems[] = [
  {
    id: '1',
    tag: '#뮤덕n년차',
  },
  {
    id: '2',
    tag: '#총평만점',
  },
  {
    id: '3',
    tag: '#회전문',
  },
  {
    id: '4',
    tag: '#시야최고',
  },
  {
    id: '5',
    tag: '#음향최고',
  },
  {
    id: '6',
    tag: '#시설최고',
  },
];

const PremiumStep2Screen: React.FC<PremiumProp> = ({
  goToNext,
  saveData,
  stepData,
}) => {
  const [input, setInput] = useState(stepData[2] || '');
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const tagMapping: Record<string, string> = {
    '1': 'MUSEUM_EXPERT',
    '2': 'PERFECT_REVIEW',
    '3': 'REVOLVING_DOOR',
    '4': 'BEST_VIEW',
    '5': 'BEST_SOUND',
    '6': 'BEST_FACILITIES',
    null: 'NO_SELECT',
  };

  const isButtonDisabled =
    searchText.trim() === '' || searchText.trim().length > 30;

  const renderItem: ListRenderItem<ReviewItems> = ({item}) => {
    const isSelected = selectedId.includes(item.id);
    const backgroundColor = isSelected ? Colors.gray_12 : Colors.gray_03;
    const textColor = isSelected ? Colors.gray_03 : Colors.gray_12;

    const handleTagPress = (id: string) => {
      if (selectedId.includes(id)) {
        setSelectedId(selectedId.filter(selectedId => selectedId !== id));
      } else if (selectedId.length < 3) {
        setSelectedId([...selectedId, id]);
      } else {
        Alert.alert('태그는 최대 3개까지만 선택 가능합니다.');
      }
    };

    return (
      <View style={PremiumWriteStyles.tag_external_container}>
        <TouchableOpacity onPress={() => handleTagPress(item.id)}>
          <View
            style={[
              PremiumWriteStyles.tag_container,
              {backgroundColor: backgroundColor},
            ]}>
            <Text style={[PremiumWriteStyles.tag_text, {color: textColor}]}>
              {item.tag}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const mappedTags = selectedId.map(id => tagMapping[id] || id);
  // console.log('매핑된 태그: ', mappedTags);

  return (
    <>
      <SafeAreaView style={PremiumWriteStyles.container}>
        <SvgXml xml={ReviewWriteIcon.progress_2} />

        <ScrollView>
          <View style={PremiumWriteStyles.field_container}>
            <Text style={PremiumWriteStyles.progressText}>2/6</Text>
            <Text style={PremiumWriteStyles.title}>
              후기의 제목과 태그를 입력해주세요.
            </Text>
            <Text style={PremiumWriteStyles.review_title}>후기 제목</Text>
            <TextInput
              style={PremiumWriteStyles.textInput}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="제목을 작성해주세요. (최대 30자 이내)"
            />
            <Text
              style={{
                ...PremiumWriteStyles.review_title,
                marginTop: 25,
                marginBottom: 32,
              }}>
              태그 ({selectedId.length}/3)
            </Text>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              numColumns={3}
              scrollEnabled={false}
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
                ? Colors.gray_06
                : Colors.sub_04,
            },
          ]}
          onPress={() => {
            if (!isButtonDisabled) {
              saveData(2, {tags: mappedTags, title: searchText});
              goToNext(3);
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

export default PremiumStep2Screen;

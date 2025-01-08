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
import {ImageSourcePropType} from 'react-native';

type PremiumProp = {
  goToNext: any;
  saveData: any;
  stepData: any;
};

type ReviewItems = {
  id: string;
  image: ImageSourcePropType;
};

const data: ReviewItems[] = [
  {id: '1', image: require('@/assets/images/premium/seat_1.png')},
  {id: '2', image: require('@/assets/images/premium/seat_2.png')},
  {id: '3', image: require('@/assets/images/premium/seat_3.png')},
  {id: '4', image: require('@/assets/images/premium/seat_4.png')},
];

const PremiumStep3Page: React.FC<PremiumProp> = ({
  goToNext,
  saveData,
  stepData,
}) => {
  const [input, setInput] = useState(stepData[3] || '');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  const isButtonDisabled =
    !selectedId || searchText.trim() === '' || searchText.trim().length < 20;

  const renderItem: ListRenderItem<ReviewItems> = ({item}) => {
    const isSelected = selectedId === item.id;
    const opacity = isSelected ? 1 : 0.54;

    const handlePress = () => {
      if (isSelected) {
        setSelectedId(null);
      } else {
        setSelectedId(item.id);
      }
    };

    return (
      <View>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            flex: 1,
            marginTop: 60,
            marginHorizontal: 37,
          }}>
          <View style={[PremiumWriteStyles.tag_container, {opacity: opacity}]}>
            <Image source={item.image} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const handleReload = () => {
    setSelectedId(null);
    setSearchText('');
  };

  return (
    <>
      <SafeAreaView style={PremiumWriteStyles.container}>
        <SvgXml xml={ReviewWriteIcon.progress_3} />
        <ScrollView>
          <View style={PremiumWriteStyles.field_container}>
            <Text style={PremiumWriteStyles.progressText}>3/6</Text>
            <Text style={PremiumWriteStyles.seat_title}>
              관람한 좌석의 시야는 어떤가요?
            </Text>
            <Text style={PremiumWriteStyles.seat_subTitle}>
              가장 비슷한 시야를 선택해주세요.
            </Text>
            <View
              style={{
                ...PremiumWriteStyles.icon_container,
                alignSelf: 'flex-end',
                marginTop: 18,
              }}>
              <TouchableOpacity onPress={handleReload}>
                <SvgXml xml={ReviewWriteIcon.reload} />
              </TouchableOpacity>
              <Text style={PremiumWriteStyles.reload_text}>새로고침</Text>
            </View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              numColumns={2}
              columnWrapperStyle={{
                marginBottom: 50,
              }}
              scrollEnabled={false}
            />
            <TextInput
              style={PremiumWriteStyles.seat_input}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="시야에 대한 후기를 작성해주세요. (최대 20자)"
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
              saveData(3, {tags: selectedId, title: searchText});
              goToNext(4);
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

export default PremiumStep3Page;

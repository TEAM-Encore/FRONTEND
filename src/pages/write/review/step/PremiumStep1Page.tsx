import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ListRenderItem,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import PremiumWriteStyles from '../PremiumWriteStyles';
import {SvgXml} from 'react-native-svg';
import {ReviewWriteIcon} from '@/assets/icons/premium/ReviewWriteIcon';
import Colors from '@/assets/colors/Colors';

type ReviewItems = {
  id: string;
  title: string;
  time: string;
  seat: string;
  actor: string;
};

const data: ReviewItems[] = [
  {
    id: '1',
    title: '비더슈탄트',
    time: '2024.06.21',
    seat: '샤롯데 시어터 B구역 6열 4번',
    actor: '우선영 염지은 하은영 윤혜원',
  },
  {
    id: '2',
    title: '위키드 (5회차)',
    time: '2024.06.21',
    seat: '샤롯데 시어터 B구역 6열 4번',
    actor: '우선영 염지은 하은영 윤혜원',
  },
  {
    id: '3',
    title: '위키드 (4회차)',
    time: '2024.06.21',
    seat: '샤롯데 시어터 B구역 6열 4번',
    actor: '우선영 염지은 하은영 윤혜원',
  },
  {
    id: '4',
    title: '위키드 (3회차)',
    time: '2024.06.21',
    seat: '샤롯데 시어터 B구역 6열 4번',
    actor: '우선영 염지은 하은영 윤혜원',
  },
];

type PremiumProp = {
  goToNext: any;
  saveData: any;
};

const PremiumStep1Page: React.FC<PremiumProp> = ({goToNext, saveData}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [input, setInput] = useState([]);

  const renderItem: ListRenderItem<ReviewItems> = ({item}) => {
    const isSelected = selectedId === item.id;
    const backgroundColor = isSelected ? Colors.gray_11 : Colors.sub_02;
    const titleColor = isSelected ? '#FBFBFB' : Colors.gray_12;
    const textColor = isSelected ? Colors.gray_06 : Colors.gray_09;
    const time_icon = isSelected
      ? ReviewWriteIcon.select_time
      : ReviewWriteIcon.time;
    const seat_icon = isSelected
      ? ReviewWriteIcon.select_seat
      : ReviewWriteIcon.seat;
    const person_icon = isSelected
      ? ReviewWriteIcon.select_person
      : ReviewWriteIcon.person;
    const icon = isSelected
      ? ReviewWriteIcon.list_black
      : ReviewWriteIcon.list_yellow;

    const handlePress = () => {
      if (isSelected) {
        setSelectedId(null);
      } else {
        setSelectedId(item.id);
        // console.log('선택된 카드:', item.id);
      }
    };

    return (
      <View style={PremiumWriteStyles.list_container}>
        <TouchableOpacity onPress={handlePress}>
          <View
            style={[
              PremiumWriteStyles.list_yellow,
              {backgroundColor: backgroundColor},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('@/assets/images/premium/review_image.png')}
                style={PremiumWriteStyles.list_image}
              />
              <View style={PremiumWriteStyles.icons}>
                <Text
                  style={[PremiumWriteStyles.list_title, {color: titleColor}]}>
                  {item.title}
                </Text>
                <View style={PremiumWriteStyles.icon_container}>
                  <SvgXml xml={time_icon} style={PremiumWriteStyles.icon} />
                  <Text
                    style={[PremiumWriteStyles.list_text, {color: textColor}]}>
                    {item.time}
                  </Text>
                </View>
                <View style={PremiumWriteStyles.icon_container}>
                  <SvgXml xml={seat_icon} style={PremiumWriteStyles.icon} />
                  <Text
                    style={[PremiumWriteStyles.list_text, {color: textColor}]}>
                    {item.seat}
                  </Text>
                </View>
                <View style={PremiumWriteStyles.icon_container}>
                  <SvgXml xml={person_icon} style={PremiumWriteStyles.icon} />
                  <Text
                    style={[PremiumWriteStyles.list_text, {color: textColor}]}>
                    {item.actor}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <SvgXml xml={icon} style={PremiumWriteStyles.list_yellow_icon} />
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={PremiumWriteStyles.container}>
        <SvgXml xml={ReviewWriteIcon.progress_1} />

        <ScrollView>
          <View style={PremiumWriteStyles.field_container}>
            <Text style={PremiumWriteStyles.progressText}>1/6</Text>
            <Text style={PremiumWriteStyles.title}>
              후기를 작성할 내역을 선택해주세요.
            </Text>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
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
              backgroundColor: selectedId ? Colors.sub_04 : Colors.gray_05,
            },
          ]}
          onPress={() => {
            saveData(1, input);
            goToNext(2);
          }}
          disabled={!selectedId}>
          <Text
            style={[
              PremiumWriteStyles.next_button_text,
              {
                color: selectedId ? Colors.gray_12 : Colors.gray_01,
              },
            ]}>
            다음
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default PremiumStep1Page;

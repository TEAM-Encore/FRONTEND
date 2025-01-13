import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MyPageStyles from './MyPageStyles';
import {SvgXml} from 'react-native-svg';
import {MyPageIcon} from '@/assets/icons/myPage/MyPageIcon';
import ModalCategory from '@/components/categoryModal/ModalCategory';
import Colors from '@/assets/colors/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const ModifyProfileImg = () => {
  const navigation = useNavigation();
  const [isToggle, setIsToggle] = useState(false);
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [frequency, setFrequency] = useState('연 8회 이상') || '연 8회 이상';
  const frequencyList = ['연 1~3회', '연 4~7회', '연 8회 이상'];

  const handleToggle = () => {
    setIsToggle(prev => !prev);
  };

  const options = [
    '감동적인',
    '연기력이 좋은',
    '재미있는',
    '최애 배우가 출연하는',
    '넘버 퀄리티가 높은',
    '가볍게 보기 좋은',
    '연출력이 좋은',
    '스토리가 탄탄한',
    '페어합이 좋은',
  ];

  const handleCheckbox = (option: string) => {
    setCheckedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else if (prev.length < 3) {
        return [...prev, option];
      }
      return prev;
    });
  };

  const chunkArray = (array: string[], size: number) => {
    return array.reduce((result, _, index) => {
      if (index % size === 0) {
        result.push(array.slice(index, index + size));
      }
      return result;
    }, [] as string[][]);
  };

  const rows = chunkArray(options, 2);

  const handleFrequency = () => {
    setModalVisible(true);
    setModalTitle('뮤지컬 관람 빈도');
  };

  const handleSave = () => {
    navigation.navigate('Tabs', {
      screen: '마이',
      params: {frequency, checkedOptions},
    });
  };

  return (
    <>
      <SafeAreaView style={MyPageStyles.container}>
        <ScrollView>
          <View style={{...MyPageStyles.containerHeader, alignItems: 'center'}}>
            <SvgXml
              xml={MyPageIcon.profileDefaultIcon}
              style={{marginTop: 37}}
            />
            <View style={{...MyPageStyles.containerRow, marginTop: 16}}>
              <Text style={MyPageStyles.profileEditText}>프로필 꾸미기</Text>
              <TouchableOpacity onPress={handleToggle}>
                <SvgXml
                  xml={
                    isToggle ? MyPageIcon.afterToggle : MyPageIcon.beforeToggle
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={MyPageStyles.containerHeader}>
            <Text style={MyPageStyles.nicknameContainer}>닉네임</Text>
            <View style={MyPageStyles.searchBar}>
              <TextInput
                style={MyPageStyles.textInput}
                value={'뮤사랑'}
                onChangeText={setSearchText}
                placeholder="닉네임"
              />
              <View style={MyPageStyles.checkDuplicate}>
                <TouchableOpacity>
                  <Text style={MyPageStyles.checkDuplicateText}>중복 확인</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={MyPageStyles.nicknameContainer}>뮤지컬 관람 빈도</Text>
            <TouchableOpacity onPress={handleFrequency}>
              <View style={MyPageStyles.frequencyContainer}>
                <Text style={MyPageStyles.frequencyText}>{frequency}</Text>
                <SvgXml xml={MyPageIcon.downArrow} style={{marginLeft: 8}} />
              </View>
            </TouchableOpacity>
            <ModalCategory
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              categoryList={frequencyList}
              modalTitle={modalTitle}
              onSelect={(item: string) => {
                setFrequency(item);
              }}
            />

            <Text style={MyPageStyles.nicknameContainer}>
              선호하는 공연 ({checkedOptions.length}/3)
            </Text>
            {rows.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{
                  ...MyPageStyles.containerRow,
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                {row.map(option => (
                  <View key={option} style={MyPageStyles.optionContainer}>
                    <TouchableOpacity onPress={() => handleCheckbox(option)}>
                      <SvgXml
                        xml={
                          checkedOptions.includes(option)
                            ? MyPageIcon.checkbox
                            : MyPageIcon.emptyCheckbox
                        }
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        ...MyPageStyles.optionText,
                        marginLeft: 7,
                        color: checkedOptions.includes(option)
                          ? Colors.black
                          : Colors.gray_09,
                      }}>
                      {option}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
          {/* </View> */}
        </ScrollView>
      </SafeAreaView>

      <View style={MyPageStyles.white} />
      <KeyboardAvoidingView
        style={MyPageStyles.containerCommentInput}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity style={MyPageStyles.next_button} onPress={handleSave}>
          <Text style={MyPageStyles.next_button_text}>저장하기</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default ModifyProfileImg;

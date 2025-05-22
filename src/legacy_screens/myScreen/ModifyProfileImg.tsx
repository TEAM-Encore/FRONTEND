import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import MyScreenStyles from './MyScreenStyles';
import {SvgXml} from 'react-native-svg';
import {MyPageIcon} from '@/assets/icons/myPage/MyPageIcon';
import ModalCategory from '@/components/categoryModal/ModalCategory';
import Colors from '@/assets/colors/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {getMyInfo, patchMyInfo} from '@/api/users.api';

const frequencyList = ['연 1~3회', '연 4~7회', '연 8회 이상'];
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
const keywordMapping: Record<string, string> = {
  감동적인: 'EMOTIONAL',
  '연기력이 좋은': 'ACTING',
  재미있는: 'ENTERTAINING',
  '최애 배우가 출연하는': 'ACTOR',
  '넘버 퀄리티가 높은': 'QUALITY',
  '가볍게 보기 좋은': 'LIGHT',
  '연출력이 좋은': 'STAGE_DESIGN',
  '스토리가 탄탄한': 'STORY',
  '페어합이 좋은': 'CASTING',
};
const frequencyMapping: Record<string, string> = {
  '연 1~3회': 'LEVEL1',
  '연 4~7회': 'LEVEL2',
  '연 8회 이상': 'LEVEL3',
};

const ModifyProfileImg = () => {
  const [userData, setUserData] = useState<{
    point: number;
    nickname: string;
    num_of_subscriber: number;
    num_of_write_post: number;
    preferred_keywords: [];
    viewing_frequency: string;
    email: string;
  }>({
    point: 0,
    nickname: '',
    num_of_subscriber: 0,
    num_of_write_post: 0,
    preferred_keywords: [],
    viewing_frequency: '',
    email: '',
  });

  const fetchMyInfo = async () => {
    try {
      const response = await getMyInfo();
      console.log('내 정보 조회: ', response.data.data);
      setUserData(response.data.data);
    } catch (error) {
      Alert.alert('내 정보 조회 중 오류가 발생했습니다.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMyInfo();
    }, []),
  );
  const navigation = useNavigation();
  const [isToggle, setIsToggle] = useState(false);
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [frequency, setFrequency] = useState<string>('');

  useEffect(() => {
    if (userData && userData.viewing_frequency) {
      setFrequency(userData.viewing_frequency);
    }
  }, [userData]);

  const handleToggle = () => {
    setIsToggle(prev => !prev);
  };

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

  const mappedOptions = checkedOptions.map(option => keywordMapping[option]);
  const mappedFrequency = frequencyMapping[frequency];

  console.log('선택된 관람 빈도: ', mappedFrequency);
  console.log('선택된 선호도: ', mappedOptions);
  console.log('변경된 닉네임: ', searchText);

  const fetchPatchInfo = async () => {
    try {
      const response = await patchMyInfo({
        nickname: searchText,
        viewing_frequency: mappedFrequency,
        preferred_keywords: mappedOptions,
      });
      console.log('서버 응답: ', response.data);
      // 약간의 대기 후 데이터 재조회
      await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
      await fetchMyInfo();
    } catch (error) {
      console.error('정보 업데이트 실패: ', error);
    }
  };

  useEffect(() => {
    if (userData && userData.viewing_frequency) {
      setFrequency(userData.viewing_frequency);
    }
  }, [userData]);

  const handleSave = async () => {
    try {
      console.log('저장 요청 시작');
      await fetchPatchInfo();
      console.log('저장 요청 완료');
      console.log('최종 userData:', userData);
      navigation.goBack();
    } catch (error) {
      console.error('저장 중 오류 발생: ', error);
      Alert.alert('저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  console.log('저장된 변경 내용: ', userData);

  return (
    <>
      <SafeAreaView style={MyScreenStyles.container}>
        <ScrollView>
          <View
            style={{...MyScreenStyles.containerHeader, alignItems: 'center'}}>
            <SvgXml
              xml={MyPageIcon.profileDefaultIcon}
              style={{marginTop: 37}}
            />
            <View style={{...MyScreenStyles.containerRow, marginTop: 16}}>
              <Text style={MyScreenStyles.profileEditText}>프로필 꾸미기</Text>
              <TouchableOpacity onPress={handleToggle}>
                <SvgXml
                  xml={
                    isToggle ? MyPageIcon.afterToggle : MyPageIcon.beforeToggle
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={MyScreenStyles.containerHeader}>
            <Text style={MyScreenStyles.nicknameContainer}>닉네임</Text>
            <View style={MyScreenStyles.searchBar}>
              <TextInput
                style={MyScreenStyles.textInput}
                value={searchText}
                onChangeText={setSearchText}
                placeholder={userData.nickname}
              />
              <View style={MyScreenStyles.checkDuplicate}>
                <TouchableOpacity>
                  <Text style={MyScreenStyles.checkDuplicateText}>
                    중복 확인
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={MyScreenStyles.nicknameContainer}>
              뮤지컬 관람 빈도
            </Text>
            <TouchableOpacity onPress={handleFrequency}>
              <View style={MyScreenStyles.frequencyContainer}>
                <Text style={MyScreenStyles.frequencyText}>{frequency}</Text>
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

            <Text style={MyScreenStyles.nicknameContainer}>
              선호하는 공연 ({checkedOptions.length}/3)
            </Text>
            {rows.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{
                  ...MyScreenStyles.containerRow,
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                {row.map(option => (
                  <View key={option} style={MyScreenStyles.optionContainer}>
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
                        ...MyScreenStyles.optionText,
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
        </ScrollView>
      </SafeAreaView>

      <View style={MyScreenStyles.white} />
      <KeyboardAvoidingView
        style={MyScreenStyles.containerCommentInput}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={MyScreenStyles.next_button}
          onPress={handleSave}>
          <Text style={MyScreenStyles.next_button_text}>저장하기</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default ModifyProfileImg;

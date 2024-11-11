import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import WriteStyles from '@/pages/write/WriteStyles';
import {SvgXml} from 'react-native-svg';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import AlertModal from '../alertModal/AlertModal';

type RootStackParamList = {
  SavePage: undefined;
};

const WriteBottomTab: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedSubTitle, setSelectedSubtitle] = useState('');
  const [topButton, setTopButton] = useState('');
  const [bottomButton, setBottomButton] = useState('');

  // 임시 저장한 글 상태 관리로 개수가 10개 넘으면 실행하도록 수정 필요
  const openModal = (
    title: string,
    subTitle: string,
    topButton: string,
    bottomButton: string,
  ) => {
    setModalVisible(true);
    setSelectedTitle('10개를 초과해' + '\n' + '마지막 글을 삭제합니다.');
    setSelectedSubtitle('삭제하시겠어요?');
    setTopButton('삭제하기');
    setBottomButton('취소하기');
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
      <View style={WriteStyles.white} />
      <KeyboardAvoidingView
        style={WriteStyles.containerCommentInput}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity style={WriteStyles.bottom_container}>
          <SvgXml xml={PostIcon.commentImage} />
          <Text style={WriteStyles.bottom_icon_text}>사진</Text>
        </TouchableOpacity>

        <TouchableOpacity style={WriteStyles.bottom_container}>
          <SvgXml xml={DashboardIcon.hash} />
          <Text style={WriteStyles.bottom_icon_text}>태그</Text>
        </TouchableOpacity>

        <View style={WriteStyles.bottom_text_container}>
          <TouchableOpacity
            onPress={() =>
              openModal(
                selectedTitle,
                selectedSubTitle,
                topButton,
                bottomButton,
              )
            }>
            <Text style={{...WriteStyles.bottom_text, paddingRight: 12}}>
              임시저장
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SavePage')}>
            <Text style={WriteStyles.bottom_text}>목록</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* 모달 컴포넌트 */}
      <AlertModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={selectedTitle}
        subTitle={selectedSubTitle}
        topButton={topButton}
        bottomButton={bottomButton}
      />
    </>
  );
};

export default WriteBottomTab;

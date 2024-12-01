import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import WriteStyles from '@/pages/write/WriteStyles';
import {SvgXml} from 'react-native-svg';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import DeleteFirstTempModal from '../alertModal/DeleteFirstTempModal';
import {SelectImage} from '../selectImage/SelectImage';
import {createPost} from '@/api/post.api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  SavePage: undefined;
};

type WriteBottomTabProps = {
  title: string;
  content: string;
  post_type: string;
  category: string;
  hashTags: string[];
  imgUrls: string[];
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setPhotoCount: React.Dispatch<React.SetStateAction<number>>;
};

const WriteBottomTab: React.FC<WriteBottomTabProps> = ({
  title,
  content,
  post_type,
  category,
  hashTags,
  imgUrls,
  setContent,
  setPhotoCount,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedSubTitle, setSelectedSubtitle] = useState('');
  const [topButton, setTopButton] = useState('');
  const [bottomButton, setBottomButton] = useState('');
  const [savedPosts, setSavedPosts] = useState<any[]>([]);

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

  const addHashTag = () => {
    setContent(prevContent => prevContent + '#');
  };

  const postTypeMapping: Record<string, string> = {
    '게시판 선택 안함': 'NO_SELECT',
    '게시판 선택': 'NO_SELECT',
    '정보 게시판': 'INFORMATION',
    '후기 게시판': 'REVIEW',
    '배우 게시판': 'ACTOR',
    '자유 게시판': 'FREE',
  };

  const categoryMapping: Record<string, string> = {
    '카테고리 선택': 'NO_SELECT',
    '선택 안함': 'NO_SELECT',
    '오페라 글라스': 'OPERA_GLASS_RENTAL',
    '뮤지컬 용어': 'MUSICAL_TERMS',
    이벤트: 'EVENTS',
    '시야 후기': 'VIEW_REVIEW',
    '굿즈 후기': 'GOODS_REVIEW',
    '공연 감상': 'PERFORMANCE_REVIEW',
  };

  const handleTemporarySave = async () => {
    try {
      const mappedCategory = categoryMapping[category] || category;
      const mappedPostType = postTypeMapping[post_type] || post_type;

      const response = await createPost(
        mappedCategory,
        mappedPostType,
        title,
        content,
        hashTags,
        imgUrls,
        false,
        true,
      );

      console.log('임시 저장한 글 내용: ', response.data);

      if (response?.data?.code === 1000 && response?.data?.data?.post_id) {
        const savedPosts = JSON.parse(
          (await AsyncStorage.getItem('temporaryPosts')) || '[]',
        );

        if (savedPosts.length >= 10) {
          openModal(selectedTitle, selectedSubTitle, topButton, bottomButton);
          return;
        }

        const updatedPosts = [...savedPosts, response.data.data];

        await AsyncStorage.setItem(
          'temporaryPosts',
          JSON.stringify(updatedPosts),
        );

        Alert.alert('임시 저장이 완료되었습니다.');
      } else {
        Alert.alert('임시 저장 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Temporary save error:', error);
      Alert.alert('임시 저장 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <View style={WriteStyles.white} />
      <KeyboardAvoidingView
        style={WriteStyles.containerCommentInput}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={WriteStyles.bottom_container}
          onPress={() => {
            SelectImage(setPhotoCount);
          }}>
          <SvgXml xml={PostIcon.commentImage} />
          <Text style={WriteStyles.bottom_icon_text}>사진</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={WriteStyles.bottom_container}
          onPress={addHashTag}>
          <SvgXml xml={DashboardIcon.hash} />
          <Text style={WriteStyles.bottom_icon_text}>태그</Text>
        </TouchableOpacity>

        <View style={WriteStyles.bottom_text_container}>
          <TouchableOpacity onPress={handleTemporarySave}>
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
      <DeleteFirstTempModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={selectedTitle}
        subTitle={selectedSubTitle}
        topButton={topButton}
        bottomButton={bottomButton}
        savedPosts={savedPosts} // 현재 저장된 게시글 목록 전달
        setSavedPosts={setSavedPosts} // 상태 업데이트 함수 전달
      />
    </>
  );
};

export default WriteBottomTab;

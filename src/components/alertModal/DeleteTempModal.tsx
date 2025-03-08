import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AlertModalStyle from './AlertModalStyle';
import {deletePost} from '@/api/post.api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 게시판 작성 페이지 내 임시 저장 글 삭제 시 뜨는 모달
type DeleteTempModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  title: string;
  subTitle: string;
  topButton: string;
  bottomButton: string;
  postId: any;
  fetchSavedPosts: () => Promise<void>;
};

const DeleteTempModal: React.FC<DeleteTempModalProps> = ({
  modalVisible,
  setModalVisible,
  title,
  subTitle,
  topButton,
  bottomButton,
  postId,
  fetchSavedPosts,
}) => {
  const fetchDeletePost = async (postId: any) => {
    try {
      console.log('삭제할 postId: ', postId);
      await deletePost(postId);
      const storedData = await AsyncStorage.getItem('temporaryPosts');
      const parsedData = JSON.parse(storedData || '[]');
      const updatedPosts = parsedData.filter(
        (post: {post_id: number}) => post.post_id !== postId,
      );
      await AsyncStorage.setItem(
        'temporaryPosts',
        JSON.stringify(updatedPosts),
      );
      await fetchSavedPosts();

      Alert.alert('임시 저장된 글이 삭제되었습니다!');
      setModalVisible(false);
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
    }
  };

  const handleTopButton = () => {
    if (postId !== null) {
      fetchDeletePost(postId);
    } else {
      Alert.alert('삭제할 게시글의 ID를 찾을 수 없습니다!');
    }
  };

  const handleBottomButton = () => {
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent
      statusBarTranslucent>
      <View style={AlertModalStyle.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={AlertModalStyle.background} />
        </TouchableWithoutFeedback>
        <View style={AlertModalStyle.container}>
          <Text style={AlertModalStyle.title}>{title}</Text>
          <Text style={AlertModalStyle.subtitle}>{subTitle}</Text>
          <TouchableOpacity
            style={AlertModalStyle.topButton}
            onPress={handleTopButton}>
            <Text style={AlertModalStyle.topButtonText}>{topButton}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={AlertModalStyle.bottomButton}
            onPress={handleBottomButton}>
            <Text style={AlertModalStyle.bottomButtonText}>{bottomButton}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteTempModal;

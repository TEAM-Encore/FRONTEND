import React, {useState} from 'react';
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

type AlertModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  title: string;
  subTitle: string;
  topButton: string;
  bottomButton: string;
  postId: number | null;
};

const AlertModal: React.FC<AlertModalProps> = ({
  modalVisible,
  setModalVisible,
  title,
  subTitle,
  topButton,
  bottomButton,
  postId,
}) => {
  const fetchDeletePost = async (postId: number) => {
    try {
      await deletePost(postId);
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

  // console.log('삭제할 postId: ', postId);

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

export default AlertModal;

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
import AsyncStorage from '@react-native-async-storage/async-storage';

// 임시 저장 글 개수가 10개 초과 시 뜨는 모달
type DeleteFirstTempModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  title: string;
  subTitle: string;
  topButton: string;
  bottomButton: string;
  savedPosts: any[];
  setSavedPosts: React.Dispatch<React.SetStateAction<any[]>>;
};

const DeleteFirstTempModal: React.FC<DeleteFirstTempModalProps> = ({
  modalVisible,
  setModalVisible,
  title,
  subTitle,
  topButton,
  bottomButton,
  savedPosts,
  setSavedPosts,
}) => {
  const deleteFirstPost = async () => {
    try {
      const storedData = await AsyncStorage.getItem('temporaryPosts');
      const savedPosts = JSON.parse(storedData || '[]');

      if (savedPosts.length === 0) {
        Alert.alert('삭제할 게시글이 없습니다!');
        return;
      }

      // 첫 번째 게시글 삭제
      const updatedPosts = savedPosts.slice(1);

      // 업데이트된 savedPosts를 상태에 반영
      setSavedPosts(updatedPosts);

      // AsyncStorage에 저장
      await AsyncStorage.setItem(
        'temporaryPosts',
        JSON.stringify(updatedPosts),
      );

      Alert.alert('임시 저장된 첫 번째 글이 삭제되었습니다!');
      setModalVisible(false);
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
      Alert.alert('글 삭제 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleTopButton = () => {
    deleteFirstPost(); // 첫 번째 게시글 삭제
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

export default DeleteFirstTempModal;

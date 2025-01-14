import React, {useCallback} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import AlertModalStyle from './AlertModalStyle';
import {useFocusEffect} from '@react-navigation/native';

// 리뷰 등록 시 뜨는 모달
type RegisterReviewProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  loading: boolean;
};

const RegisterReviewModal: React.FC<RegisterReviewProps> = ({
  modalVisible,
  setModalVisible,
  loading,
}) => {
  const handleTopButton = () => {
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useFocusEffect(useCallback(() => {}, []));

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
          <Text style={AlertModalStyle.title}>등록 중입니다</Text>
          <Text style={AlertModalStyle.subtitle}>잠시만 기다려주세요.</Text>
          <TouchableOpacity
            style={AlertModalStyle.topButton}
            onPress={handleTopButton}>
            <Text style={AlertModalStyle.topButtonText}>취소하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RegisterReviewModal;

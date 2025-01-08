import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import AlertModalStyle from './AlertModalStyle';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../types';

// 리뷰 그만둘 시 뜨는 모달
type StopReviewModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const StopReviewModal: React.FC<StopReviewModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleTopButton = () => {
    setModalVisible(false);
    navigation.navigate('Tabs');
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
          <Text style={AlertModalStyle.title}>리뷰 작성을 그만할까요?</Text>
          <Text style={AlertModalStyle.subtitle}>
            중간에 나갈 시 작성한 내용은 삭제됩니다.
          </Text>
          <TouchableOpacity
            style={AlertModalStyle.topButton}
            onPress={handleTopButton}>
            <Text style={AlertModalStyle.topButtonText}>그만하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={AlertModalStyle.bottomButton}
            onPress={handleBottomButton}>
            <Text style={AlertModalStyle.bottomButtonText}>취소하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default StopReviewModal;

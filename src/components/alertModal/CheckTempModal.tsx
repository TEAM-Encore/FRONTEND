import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import AlertModalStyle from './AlertModalStyle';

type CheckTempModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  title: string;
  subTitle?: string;
  topButton: string;
  bottomButton: string;
  topButtonAction: () => void;
};

const CheckTempModal: React.FC<CheckTempModalProps> = ({
  modalVisible,
  setModalVisible,
  title,
  subTitle,
  topButton,
  bottomButton,
  topButtonAction,
}) => {
  const handleTopButton = () => {
    topButtonAction();
    setModalVisible(false);
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

export default CheckTempModal;

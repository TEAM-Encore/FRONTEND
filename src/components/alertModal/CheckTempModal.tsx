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
import {useNavigation, NavigationProp} from '@react-navigation/native';

// 임시 저장 글 유무 판단 시 뜨는 모달
type CheckTempModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  title: string;
  subTitle: string;
  topButton: string;
  bottomButton: string;
};

type RootStackParamList = {
  WritePage: undefined;
  SavePage: undefined;
};

const CheckTempModal: React.FC<CheckTempModalProps> = ({
  modalVisible,
  setModalVisible,
  title,
  subTitle,
  topButton,
  bottomButton,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleTopButton = () => {
    navigation.navigate('SavePage');
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

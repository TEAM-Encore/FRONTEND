import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import AlertModalStyle from './AlertModalStyle';
import {useNavigation} from '@react-navigation/native';

type RegisterReviewProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  topButton: string;    
  bottomButton: string; 
  loading: boolean;
};

const NoRegisterdTicketModal: React.FC<RegisterReviewProps> = ({
  modalVisible,
  setModalVisible,
  topButton,
  bottomButton,
  loading,
}) => {
  const navigation = useNavigation();

  const handleTopButton = () => {
    setModalVisible(false);
    navigation.navigate('TicketBookScreen');
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
          <Text style={AlertModalStyle.title}>아직 등록된 티켓이 없어요</Text>
          <Text style={AlertModalStyle.subtitle}>
            티켓북에서 관람 내역을 먼저 등록해주세요.
          </Text>
          <TouchableOpacity
            style={AlertModalStyle.topButton}
            onPress={handleTopButton}
            disabled={loading}>
            <Text style={AlertModalStyle.topButtonText}>{topButton}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={AlertModalStyle.bottomButton}
            onPress={handleBottomButton}
            disabled={loading}>
            <Text style={AlertModalStyle.bottomButtonText}>{bottomButton}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NoRegisterdTicketModal;
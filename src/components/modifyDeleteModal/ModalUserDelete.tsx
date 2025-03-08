import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {deleteComment} from '@/api/comment.api';
import CheckTempModal from '@/components/alertModal/CheckTempModal';
import ModalStyles from './ModalStyles';

type ModalUserDeleteProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  position: any;
};

// 사용자 차단, 신고 모달
const ModalUserDelete: React.FC<ModalUserDeleteProps> = ({
  modalVisible,
  setModalVisible,
  position,
}) => {
  const [checkTempModalVisible, setCheckTempModalVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedSubTitle, setSelectedSubtitle] = useState('');
  const [topButton, setTopButton] = useState('');
  const [bottomButton, setBottomButton] = useState('');

  const openCheckTempModal = () => {
    setSelectedTitle('이 작성자를 차단할까요?');
    setSelectedSubtitle(
      '이 작성자의 게시물이 노출되지 않으며,\n다시 해제하실 수 없습니다.',
    );
    setTopButton('차단하기');
    setBottomButton('취소하기');
    setCheckTempModalVisible(true);
    console.log('checkTempModalVisible:', checkTempModalVisible);
  };

  // API 연동 필요
  const fetchDeletePost = () => {
    setModalVisible(false);
  };

  const handleDelete = () => {
    openCheckTempModal();
  };

  return (
    <Modal
      isVisible={modalVisible}
      style={[
        ModalStyles.modal,
        {
          top: Math.max(0, position.y - position.height),
          left: Math.max(0, position.x - (position.width + 70)),
        },
      ]}
      onBackdropPress={() => setModalVisible(false)}
      backdropColor="rgba(0, 0, 0, 0.3)"
      animationIn="fadeIn"
      animationOut="fadeOut">
      <View style={ModalStyles.container}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}>
          <Text style={ModalStyles.text}>차단</Text>
        </TouchableOpacity>
        <View style={ModalStyles.line} />
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}>
          <Text style={ModalStyles.text}>신고</Text>
        </TouchableOpacity>
        <CheckTempModal
          modalVisible={checkTempModalVisible}
          setModalVisible={setCheckTempModalVisible}
          title={selectedTitle}
          subTitle={selectedSubTitle}
          topButton={topButton}
          bottomButton={bottomButton}
          topButtonAction={() => fetchDeletePost()}
        />
      </View>
    </Modal>
  );
};

export default ModalUserDelete;

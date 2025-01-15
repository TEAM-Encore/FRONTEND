import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';
import {deleteComment} from '@/api/comment.api';
import CheckTempModal from '@/components/alertModal/CheckTempModal';
const {subhead03} = typography;

type ModalUserDeleteProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  position: any;
};

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
        styles.modal,
        {
          top: Math.max(0, position.y - position.height),
          left: Math.max(0, position.x - (position.width + 70)),
        },
      ]}
      onBackdropPress={() => setModalVisible(false)}
      backdropColor="rgba(0, 0, 0, 0.3)"
      animationIn="fadeIn"
      animationOut="fadeOut">
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}>
          <Text style={styles.text}>차단</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}>
          <Text style={styles.text}>신고</Text>
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

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  container: {
    width: 77,
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.gray_01,
  },
  line: {
    height: 0.75,
    backgroundColor: Colors.gray_03,
  },
  text: {
    ...subhead03,
    marginVertical: 10,
  },
});

export default ModalUserDelete;

import React from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';
import {deletePost} from '@/api/post.api';

const {subhead03} = typography;

type NavigationProp = {
  navigate: (screen: 'ModifyPage') => void;
};

type ModalModifyDeleteProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  position: any;
  postId: number;
  onNavigation: any;
};

const ModalModifyDelete: React.FC<ModalModifyDeleteProps> = ({
  modalVisible,
  setModalVisible,
  position,
  postId,
  onNavigation,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const fetchDeletePost = async (postId: number) => {
    try {
      await deletePost(postId);
      onNavigation.goBack();
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
    }
  };

  const handleDelete = () => {
    setModalVisible(false);
    Alert.alert(
      '게시글을 삭제할까요?',
      '게시글이 삭제되며, 이는 돌이킬 수 없습니다.',
      [
        {text: '취소하기', style: 'cancel'},
        {
          text: '삭제하기',
          onPress: () => {
            fetchDeletePost(postId);
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <Modal
      isVisible={modalVisible}
      style={[
        styles.modal,
        {
          top: position.y - position.height,
          left: position.x - (position.width + 70),
        },
      ]}
      onBackdropPress={() => setModalVisible(false)}
      backdropColor="rgba(0, 0, 0, 0.3)"
      animationIn="fadeIn"
      animationOut="fadeOut">
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ModifyPage', {postId});
            setModalVisible(false);
          }}>
          <Text style={styles.text}>수정</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={handleDelete}>
          <Text style={[styles.text, {color: '#FF6464'}]}>삭제</Text>
        </TouchableOpacity>
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

export default ModalModifyDelete;

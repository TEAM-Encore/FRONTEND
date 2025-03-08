import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {deletePost} from '@/api/post.api';
import {deleteComment} from '@/api/comment.api';
import CheckTempModal from '@/components/alertModal/CheckTempModal';
import ModalStyles from './ModalStyles';

type NavigationProp = {
  navigate: (screen: 'ModifyPage') => void;
};

type ModalModifyDeleteProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  position: any;
  postId: number;
  commentId: number | null;
  onNavigation: any | null;
};

// 게시글 수정, 삭제 모달
const ModalModifyDelete: React.FC<ModalModifyDeleteProps> = ({
  modalVisible,
  setModalVisible,
  position,
  postId,
  commentId,
  onNavigation,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const [checkTempModalVisible, setCheckTempModalVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedSubTitle, setSelectedSubtitle] = useState('');
  const [topButton, setTopButton] = useState('');
  const [bottomButton, setBottomButton] = useState('');

  const openCheckTempModal = () => {
    setSelectedTitle('게시글을 삭제할까요?');
    setSelectedSubtitle('게시글이 삭제되며,\n이는 돌이킬 수 없습니다.');
    setTopButton('삭제하기');
    setBottomButton('취소하기');
    setCheckTempModalVisible(true);
  };

  const fetchDeletePost = async (postId: number) => {
    try {
      setModalVisible(false);
      await deletePost(postId);
      onNavigation.goBack();
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
    }
  };

  const handleDelete = () => {
    if (postId === null) {
      return;
    }
    openCheckTempModal();
  };

  // 댓글 삭제 모달
  const openCheckTempModalComment = () => {
    setSelectedTitle('댓글을 삭제할까요?');
    setSelectedSubtitle('댓글이 삭제되며,\n이는 돌이킬 수 없습니다.');
    setTopButton('삭제하기');
    setBottomButton('취소하기');
    setCheckTempModalVisible(true);
  };

  const fetchDeleteComment = async (postId: number, commentId: number) => {
    try {
      setModalVisible(false);
      await deleteComment(postId, commentId);
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
    }
  };

  const handleCommentDelete = () => {
    if (postId === null || commentId === null) {
      return;
    }
    openCheckTempModalComment();
  };

  return (
    <Modal
      isVisible={modalVisible}
      style={[
        ModalStyles.modal,
        {
          top: position.y - position.height,
          left: position.x - (position.width + 70),
        },
      ]}
      onBackdropPress={() => setModalVisible(false)}
      backdropColor="rgba(0, 0, 0, 0.3)"
      animationIn="fadeIn"
      animationOut="fadeOut">
      <View style={ModalStyles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ModifyPage');
            // navigation.navigate('ModifyPage', {postId: postId});
            setModalVisible(false);
          }}>
          <Text style={ModalStyles.text}>수정</Text>
        </TouchableOpacity>
        <View style={ModalStyles.line} />
        <TouchableOpacity
          onPress={commentId ? handleCommentDelete : handleDelete}>
          <Text style={[ModalStyles.text, {color: '#FF6464'}]}>삭제</Text>
        </TouchableOpacity>
        <CheckTempModal
          modalVisible={checkTempModalVisible}
          setModalVisible={setCheckTempModalVisible}
          title={selectedTitle}
          subTitle={selectedSubTitle}
          topButton={topButton}
          bottomButton={bottomButton}
          topButtonAction={() =>
            commentId
              ? fetchDeleteComment(postId, commentId)
              : fetchDeletePost(postId)
          }
        />
      </View>
    </Modal>
  );
};

export default ModalModifyDelete;

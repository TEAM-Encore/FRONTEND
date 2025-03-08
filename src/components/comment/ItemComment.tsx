import React, {useState, useRef, useEffect} from 'react';
import {FlatList, View, Image, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import {timeAgo} from '../../util/timeAgo';
import {createAndDeleteLikeComment} from '@/api/comment.api';
import ModalModifyDelete from '@/components/modifyDeleteModal/ModalModifyDelete';
import ItemCommentStyles from './ItemCommentStyles';

type CommentProps = {
  commentList: {
    id: number;
    nickname: string;
    is_my_comment: boolean;
    is_post_owner: boolean;
    created_at: string;
    modified_at: string;
    content: string;
    post_id: number;
    is_liked: boolean;
    like_count: number;
    child_comment_count: number;
  }[];
};

type ModalPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// 게시글의 댓글 리스트
const ItemComment: React.FC<CommentProps> = ({commentList}) => {
  const iconRef = useRef<View>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState<ModalPosition | null>(
    null,
  );
  const [comments, setComments] = useState(commentList);

  useEffect(() => {
    setComments(commentList);
  }, [commentList]);

  const handleIconPress = () => {
    setModalVisible(true);
    if (iconRef.current) {
      iconRef.current.measureInWindow((x, y, width, height) => {
        setModalPosition({x, y, width, height});
      });
    }
  };

  const fetchCreateAndDeleteLikeComment = async (
    post_id: number,
    comment_id: number,
  ) => {
    try {
      const response = await createAndDeleteLikeComment(post_id, comment_id);
      setComments(prev =>
        prev.map(comment =>
          comment.id === comment_id
            ? {
                ...comment,
                is_liked: response.data.data.is_liked,
                like_count: response.data.data.like_count,
              }
            : comment,
        ),
      );
    } catch (error) {
      console.error('댓글 좋아요 생성 및 삭제 오류:', error);
    }
  };

  return (
    <FlatList
      data={comments}
      keyExtractor={item => String(item.id)}
      renderItem={({item, index}) => {
        return (
          <>
            <View style={ItemCommentStyles.container}>
              <View style={ItemCommentStyles.containerWriterHeader}>
                <View style={ItemCommentStyles.containerRow}>
                  <>
                    <SvgXml xml={PostIcon.writerBackground} />
                    <Image
                      style={ItemCommentStyles.imageWriter}
                      source={require('@/assets/images/board/commentFace.png')}
                    />
                  </>
                  <View>
                    <View style={ItemCommentStyles.containerWriterText}>
                      <View style={ItemCommentStyles.containerRow}>
                        <Text style={ItemCommentStyles.textWriter}>
                          {item.nickname}
                        </Text>
                        <SvgXml xml={PostIcon.Badge} />
                      </View>
                      <View style={ItemCommentStyles.containerRow}>
                        {item.is_my_comment && (
                          <Text style={ItemCommentStyles.textIsWriterDate}>
                            작성자 ·{' '}
                          </Text>
                        )}
                        <Text style={ItemCommentStyles.textIsWriterDate}>
                          {timeAgo(item.created_at)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TouchableOpacity onPress={handleIconPress}>
                  <View ref={iconRef}>
                    <SvgXml xml={PostIcon.moreVertical} />
                  </View>
                </TouchableOpacity>
                {modalPosition && (
                  <ModalModifyDelete
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    position={modalPosition}
                    postId={item.post_id}
                    commentId={item.id}
                    onNavigation={null}
                  />
                )}
              </View>

              <Text style={ItemCommentStyles.textContent}>{item.content}</Text>
              <View style={ItemCommentStyles.containerRow}>
                <TouchableOpacity
                  style={ItemCommentStyles.containerLike}
                  onPress={() =>
                    fetchCreateAndDeleteLikeComment(item.post_id, item.id)
                  }>
                  <SvgXml
                    xml={
                      item.is_liked ? PostIcon.fullLike : PostIcon.commentLike
                    }
                  />
                  <Text style={ItemCommentStyles.textLikeComment}>
                    하트 {item.like_count}
                  </Text>
                </TouchableOpacity>
                <View style={ItemCommentStyles.containerRow}>
                  <SvgXml xml={PostIcon.commentComment} />
                  <Text style={ItemCommentStyles.textLikeComment}>
                    댓글 {item.child_comment_count}
                  </Text>
                </View>
              </View>
            </View>
            {index < comments.length - 1 ? (
              <View style={{marginHorizontal: 20}}>
                <View style={ItemCommentStyles.line} />
              </View>
            ) : (
              <View style={{marginBottom: 26}} />
            )}
          </>
        );
      }}
    />
  );
};

export default ItemComment;

import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../../types';

import Colors from '@/assets/colors/Colors';
import PostStyles from '@/pages/dashboard/post/PostStyles';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import {getPost, createAndDeleteLikePost} from '@/api/post.api';
import {getComments, createComment} from '@/api/comment.api';
import {timeAgo} from '../../../util/timeAgo';

import ModalModifyDelete from '@/components/modifyDeleteModal/ModalModifyDelete';
import ItemComment from '@/components/comment/ItemComment';

type PostPageRouteProp = RouteProp<RootStackParamList, 'PostPage'>;

interface PostPageProps {
  route: PostPageRouteProp;
}

type ModalPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const PostPage: React.FC<PostPageProps> = ({route}) => {
  const {postId} = route.params; // imgUrls 추가
  const navigation = useNavigation();
  const iconRef = useRef<View>(null);
  const [postData, setPostData] = useState<{
    category?: string;
    title?: string;
    content?: string;
    created_at?: string;
    num_of_comment?: number;
    num_of_like?: number;
    hashtags?: [];
    nick_name: string;
    post_images?: [];
    profile_image_url?: string;
  }>();
  const [commentData, setCommentData] = useState<
    {
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
    }[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState<ModalPosition | null>(
    null,
  );
  const [valueComment, onChangeComment] = useState('');
  const [postLike, setPostLike] = useState(false);

  const categoryMapping: Record<
    string,
    {label: string; color: string; boxColor: string}
  > = {
    OPERA_GLASS_RENTAL: {
      label: '오페라 글라스',
      color: '#FFB200',
      boxColor: Colors.sub_01,
    },
    MUSICAL_TERMS: {
      label: '뮤지컬 용어',
      color: '#FF7163',
      boxColor: '#FFEAE8',
    },
    EVENTS: {label: '이벤트', color: '#FF853E', boxColor: '#FFE9DC'},
    VIEW_REVIEW: {
      label: '시야 후기',
      color: '#FFB200',
      boxColor: Colors.sub_01,
    },
    GOODS_REVIEW: {label: '굿즈 후기', color: '#FF853E', boxColor: '#FFE9DC'},
    PERFORMANCE_REVIEW: {
      label: '공연 감상',
      color: '#FF4FB3',
      boxColor: '#FFE6F4',
    },
  };

  const getMappedCategory = (category: string | undefined) => {
    if (!category) return null;
    return categoryMapping[category];
  };

  const category = getMappedCategory(postData?.category);

  const handleGoBack = () => {
    const previousState = navigation.getState();
    const previousRouteName =
      previousState?.routes[previousState.routes.length - 2]?.name;

    if (previousRouteName === 'WritePage') {
      // 이전 화면이 WritePage일 경우 goBack() 두 번 호출
      navigation.goBack();
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  const fetchGetPost = async () => {
    try {
      const response = await getPost(postId);
      setPostData(response.data.data);
      // console.log('상세페이지 응답값:', response.data.data);
      setPostLike(response.data.data.is_liked);
    } catch (error) {
      console.error('게시글 조회 오류:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGetPost();
    }, [commentData]),
  );

  const fetchCreateAndDeleteLikePost = async () => {
    setPostLike(postLike);
    try {
      await createAndDeleteLikePost(1, postId);
    } catch (error) {
      console.error('게시글 좋아요 생성 및 삭제 오류:', error);
    }
  };

  const fetchGetComments = async () => {
    try {
      const response = await getComments(postId);
      setCommentData(response.data.data);
    } catch (error) {
      console.error('댓글 조회 오류:', error);
    }
  };

  useEffect(() => {
    fetchGetComments();
  }, [commentData]);

  const fetchCreateComment = async () => {
    try {
      if (valueComment.trim() === '') {
        return;
      }
      await createComment(postId, {content: valueComment, parent_id: null});
      onChangeComment('');
    } catch (error) {
      console.error('댓글 생성 오류:', error);
    }
  };

  const handleIconPress = () => {
    setModalVisible(true);
    if (iconRef.current) {
      iconRef.current.measureInWindow((x, y, width, height) => {
        setModalPosition({x, y, width, height});
      });
    }
  };

  return (
    <>
      <SafeAreaView style={PostStyles.container}>
        <FlatList
          data={commentData}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => <ItemComment commentList={[item]} />}
          ListHeaderComponent={
            <>
              {/* 헤더 컴포넌트 */}
              <View style={PostStyles.containerHeader}>
                <TouchableOpacity onPress={() => handleGoBack()}>
                  <SvgXml xml={PostIcon.arrowLeft} />
                </TouchableOpacity>
                <View style={PostStyles.containerRow}>
                  <TouchableOpacity>
                    <SvgXml style={{marginRight: 11}} xml={PostIcon.upload} />
                  </TouchableOpacity>
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
                      postId={postId}
                      commentId={null}
                      onNavigation={navigation}
                    />
                  )}
                </View>
              </View>
              {/* 게시글 정보 */}
              <View style={{marginHorizontal: 20}}>
                {category && (
                  <View
                    style={[
                      PostStyles.containerCategory,
                      {backgroundColor: category?.boxColor},
                    ]}>
                    <Text
                      style={[
                        PostStyles.textCategory,
                        {color: category?.color},
                      ]}>
                      {category?.label}
                    </Text>
                  </View>
                )}
                <Text style={PostStyles.textTitle}>{postData?.title}</Text>
                <Text style={PostStyles.textContent}>{postData?.content}</Text>
              </View>
              {/* 이미지 */}
              <View style={PostStyles.photos}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {postData?.post_images &&
                    postData.post_images.length > 0 &&
                    postData.post_images.map((url: string, index: number) =>
                      url ? (
                        <Image
                          key={index}
                          style={{
                            width: 84,
                            height: 92,
                            borderRadius: 9,
                            marginRight: 14,
                          }}
                          source={{uri: url}}
                          resizeMode="cover"
                        />
                      ) : null,
                    )}
                </ScrollView>
              </View>
              {/* 해시태그 */}
              {postData?.hashtags?.length !== 0 && (
                <View style={PostStyles.line} />
              )}
              <TouchableOpacity style={PostStyles.containerHashtag}>
                <Text style={PostStyles.textHashtag}>
                  {postData?.hashtags?.join(' ') || ''}
                </Text>
              </TouchableOpacity>
              {/* 좋아요 및 댓글 */}
              <View style={PostStyles.containerCommentLikeItems}>
                <TouchableOpacity
                  style={[PostStyles.containerCommentLike, {marginRight: 10}]}
                  onPress={fetchCreateAndDeleteLikePost}>
                  <SvgXml xml={postLike ? PostIcon.fullLike : PostIcon.like} />
                  <Text style={PostStyles.textCommentLike}>
                    {postData?.num_of_like}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[PostStyles.containerCommentLike, {marginRight: 10}]}>
                  <SvgXml xml={PostIcon.comment} />
                  <Text style={PostStyles.textCommentLike}>
                    {postData?.num_of_comment}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* 작성자 정보 */}
              <View style={PostStyles.containerWriter}>
                <View style={PostStyles.containerRow}>
                  <>
                    <SvgXml xml={PostIcon.writerBackground} />
                    <Image
                      style={PostStyles.imageWriter}
                      source={require('@/assets/images/board/commentFace.png')}
                    />
                  </>
                  <View style={PostStyles.containerWriterText}>
                    <View style={PostStyles.containerRow}>
                      <Text style={PostStyles.textWriter}>
                        {postData?.nick_name}
                      </Text>
                      <SvgXml xml={PostIcon.Badge} />
                    </View>
                    <Text style={PostStyles.textDate}>
                      {timeAgo(postData?.created_at)}
                    </Text>
                  </View>
                </View>
                <View style={PostStyles.containerWriterButton}>
                  <Text style={PostStyles.textWriterButton}>작성자</Text>
                </View>
              </View>
              {/* 댓글 헤더 */}
              <View style={PostStyles.containerCommentTitle}>
                <Text style={PostStyles.textCommentTitle}>
                  댓글 {postData?.num_of_comment}
                </Text>
                <View style={PostStyles.containerRow}>
                  <TouchableOpacity>
                    <Text
                      style={[
                        PostStyles.textLatestRecommended,
                        {marginRight: 12},
                      ]}>
                      최신순
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={PostStyles.textLatestRecommended}>추천순</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          }
          ListFooterComponent={<View style={{height: 20}} />}
          contentContainerStyle={{paddingBottom: 20}}
        />
      </SafeAreaView>

      <View style={PostStyles.white} />
      <KeyboardAvoidingView
        style={PostStyles.containerCommentInput}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SvgXml xml={PostIcon.commentImage} />
        <View style={PostStyles.containerCommentTextInput}>
          <TextInput
            style={PostStyles.textCommentInput}
            placeholder={'댓글을 입력해주세요'}
            onChangeText={text => onChangeComment(text)}
            value={valueComment}
          />
          <TouchableOpacity onPress={fetchCreateComment}>
            <Text style={PostStyles.textCommentSend}>등록</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default PostPage;

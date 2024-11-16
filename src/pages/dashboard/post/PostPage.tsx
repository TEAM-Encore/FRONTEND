// import React, {useEffect, useState, useRef} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   TextInput,
// } from 'react-native';
// import {SvgXml} from 'react-native-svg';
// import {useNavigation} from '@react-navigation/native';
// import {RouteProp} from '@react-navigation/native';
// import {RootStackParamList} from '../../../../types';

// import Colors from '@/assets/colors/Colors';
// import PostStyles from '@/pages/dashboard/post/PostStyles';
// import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
// import {getPost} from '@/api/post.api';
// import {getComments, createComment} from '@/api/comment.api';
// import {timeAgo} from '@/util/timeAgo';

// import ModalModifyDelete from '@/components/modifyDeleteModal/ModalModifyDelete';
// import ItemComment from '@/components/comment/ItemComment';

// type PostPageRouteProp = RouteProp<RootStackParamList, 'PostPage'>;

// interface PostPageProps {
//   route: PostPageRouteProp;
// }

// type ModalPosition = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// };

// const PostPage: React.FC<PostPageProps> = ({route}) => {
//   const {postId} = route.params;
//   const navigation = useNavigation();
//   const iconRef = useRef<View>(null);
//   const [postData, setPostData] = useState<{
//     category?: string;
//     title?: string;
//     content?: string;
//     created_at?: string;
//     num_of_comment?: number;
//     num_of_like?: number;
//   }>({});
//   const [commentData, setCommentData] = useState<
//     {
//       id: number;
//       is_my_comment: boolean;
//       is_post_owner: boolean;
//       created_at: string;
//       modified_at: string;
//       content: string;
//       post_id: number;
//     }[]
//   >([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalPosition, setModalPosition] = useState<ModalPosition | null>(
//     null,
//   );
//   const [valueComment, onChangeComment] = useState('');

//   const categoryMapping: Record<
//     string,
//     {label: string; color: string; boxColor: string}
//   > = {
//     OPERA_GLASS_RENTAL: {
//       label: '오페라 글래스',
//       color: '#FFB200',
//       boxColor: Colors.sub_01,
//     },
//     MUSICAL_TERM: {label: '뮤지컬 용어', color: '#FF7163', boxColor: '#FFEAE8'},
//     EVENT: {label: '이벤트', color: '#FF853E', boxColor: '#FFE9DC'},
//   };

//   const getMappedCategory = (category: string | undefined) => {
//     if (!category) return null;
//     return categoryMapping[category];
//   };

//   const category = getMappedCategory(postData.category);

//   const handleGoBack = () => {
//     navigation.goBack();
//   };

//   const fetchGetPost = async () => {
//     try {
//       const response = await getPost(postId);
//       setPostData(response.data.data);
//     } catch (error) {
//       console.error('게시글 조회 오류:', error);
//     }
//   };

//   useEffect(() => {
//     fetchGetPost();
//   }, []);

//   const fetchGetComments = async () => {
//     try {
//       const response = await getComments(postId);
//       setCommentData(response.data.data);
//     } catch (error) {
//       console.error('댓글 조회 오류:', error);
//     }
//   };

//   useEffect(() => {
//     fetchGetComments();
//   }, [commentData]);

//   const fetchCreateComment = async () => {
//     try {
//       if (valueComment.trim() === '') {
//         return;
//       }
//       await createComment(postId, {content: valueComment, parent_id: null});
//       onChangeComment('');
//     } catch (error) {
//       console.error('댓글 생성 오류:', error);
//     }
//   };

//   const handleIconPress = () => {
//     setModalVisible(true);
//     if (iconRef.current) {
//       iconRef.current.measureInWindow((x, y, width, height) => {
//         setModalPosition({x, y, width, height});
//       });
//     }
//   };

//   const images = [
//     {
//       id: '1',
//       image: require('@/assets/images/home/Musical4.jpeg'),
//     },
//     {
//       id: '2',
//       image: require('@/assets/images/home/Musical5.jpeg'),
//     },
//     {
//       id: '3',
//       image: require('@/assets/images/home/Musical6.jpeg'),
//     },
//     {
//       id: '4',
//       image: require('@/assets/images/home/Musical6.jpeg'),
//     },
//     {
//       id: '5',
//       image: require('@/assets/images/home/Musical6.jpeg'),
//     },
//   ];

//   return (
//     <>
//       <SafeAreaView style={PostStyles.container}>
//         <ScrollView>
//           <View style={PostStyles.containerHeader}>
//             <TouchableOpacity onPress={() => handleGoBack()}>
//               <SvgXml xml={PostIcon.arrowLeft} />
//             </TouchableOpacity>
//             <View style={PostStyles.containerRow}>
//               <TouchableOpacity>
//                 <SvgXml style={{marginRight: 11}} xml={PostIcon.upload} />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleIconPress}>
//                 <View ref={iconRef}>
//                   <SvgXml xml={PostIcon.moreVertical} />
//                 </View>
//               </TouchableOpacity>
//               {modalPosition && (
//                 <ModalModifyDelete
//                   modalVisible={modalVisible}
//                   setModalVisible={setModalVisible}
//                   position={modalPosition}
//                   postId={postId}
//                   commentId={null}
//                   onNavigation={navigation}
//                 />
//               )}
//             </View>
//           </View>

//           <View style={{marginHorizontal: 20}}>
//             <View
//               style={[
//                 PostStyles.containerCategory,
//                 {backgroundColor: category?.boxColor},
//               ]}>
//               <Text style={[PostStyles.textCategory, {color: category?.color}]}>
//                 {category?.label}
//               </Text>
//             </View>
//             <Text style={PostStyles.textTitle}>{postData.title}</Text>
//             <Text style={PostStyles.textContent}>{postData.content}</Text>
//           </View>

//           <FlatList
//             contentContainerStyle={{marginHorizontal: 20}}
//             data={images}
//             renderItem={({item}) => (
//               <Image style={PostStyles.images} source={item.image} />
//             )}
//             keyExtractor={(item, index) => index.toString()}
//             horizontal={true}
//             nestedScrollEnabled
//           />

//           <View style={{marginHorizontal: 20}}>
//             <View style={PostStyles.line} />
//           </View>

//           <TouchableOpacity style={PostStyles.containerHashtag}>
//             <Text style={PostStyles.textHashtag}>
//               #벤자민버튼 #MD #드레스리허설
//             </Text>
//           </TouchableOpacity>

//           <View style={PostStyles.containerCommentLikeItems}>
//             <View style={[PostStyles.containerCommentLike, {marginRight: 10}]}>
//               <SvgXml xml={PostIcon.comment} />
//               <Text style={PostStyles.textCommentLike}>
//                 {postData.num_of_like}
//               </Text>
//             </View>
//             <View style={PostStyles.containerCommentLike}>
//               <SvgXml xml={PostIcon.like} />
//               <Text style={PostStyles.textCommentLike}>
//                 {postData.num_of_comment}
//               </Text>
//             </View>
//           </View>

//           <View style={PostStyles.containerWriter}>
//             <View style={PostStyles.containerRow}>
//               <>
//                 <SvgXml xml={PostIcon.writerBackground} />
//                 <Image
//                   style={PostStyles.imageWriter}
//                   source={require('@/assets/logo/logo4.png')}
//                 />
//               </>
//               <View style={PostStyles.containerWriterText}>
//                 <View style={PostStyles.containerRow}>
//                   <Text style={PostStyles.textWriter}>뮤사랑</Text>
//                   <SvgXml xml={PostIcon.Badge} />
//                 </View>
//                 <Text style={PostStyles.textDate}>
//                   {timeAgo(postData.created_at)}
//                 </Text>
//               </View>
//             </View>
//             <View style={PostStyles.containerWriterButton}>
//               <Text style={PostStyles.textWriterButton}>작성자</Text>
//             </View>
//           </View>

//           <View style={PostStyles.containerCommentTitle}>
//             <Text style={PostStyles.textCommentTitle}>
//               댓글 {postData.num_of_comment}
//             </Text>
//             <View style={PostStyles.containerRow}>
//               <TouchableOpacity>
//                 <Text
//                   style={[PostStyles.textLatestRecommended, {marginRight: 12}]}>
//                   최신순
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <Text style={PostStyles.textLatestRecommended}>추천순</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <ItemComment commentList={commentData} />
//         </ScrollView>
//       </SafeAreaView>
//       <View style={PostStyles.white} />
//       <KeyboardAvoidingView
//         style={PostStyles.containerCommentInput}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//         <SvgXml xml={PostIcon.commentImage} />
//         <View style={PostStyles.containerCommentTextInput}>
//           <TextInput
//             style={PostStyles.textCommentInput}
//             placeholder={'댓글을 입력해주세요'}
//             onChangeText={text => onChangeComment(text)}
//             value={valueComment}
//           />
//           <TouchableOpacity onPress={fetchCreateComment}>
//             <Text style={PostStyles.textCommentSend}>등록</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </>
//   );
// };

// export default PostPage;
import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../../types';

import Colors from '@/assets/colors/Colors';
import PostStyles from '@/pages/dashboard/post/PostStyles';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import {getPost} from '@/api/post.api';
import {getComments, createComment} from '@/api/comment.api';
import {timeAgo} from '@/util/timeAgo';

import ModalModifyDelete from '@/components/modifyDeleteModal/ModalModifyDelete';
import ItemComment from '@/components/comment/ItemComment';

type PostPageRouteProp = RouteProp<RootStackParamList, 'PostPage'>;

interface PostPageProps {
  route: PostPageRouteProp;
  images?: string[];
}

type ModalPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const PostPage: React.FC<PostPageProps> = ({route}) => {
  const {postId, images: itemImgUrls} = route.params; // imgUrls 추가
  const navigation = useNavigation();
  const iconRef = useRef<View>(null);
  const [postData, setPostData] = useState<{
    category?: string;
    title?: string;
    content?: string;
    created_at?: string;
    num_of_comment?: number;
    num_of_like?: number;
  }>({});
  const [commentData, setCommentData] = useState<
    {
      id: number;
      is_my_comment: boolean;
      is_post_owner: boolean;
      created_at: string;
      modified_at: string;
      content: string;
      post_id: number;
    }[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState<ModalPosition | null>(
    null,
  );
  const [valueComment, onChangeComment] = useState('');

  const categoryMapping: Record<
    string,
    {label: string; color: string; boxColor: string}
  > = {
    OPERA_GLASS_RENTAL: {
      label: '오페라 글래스',
      color: '#FFB200',
      boxColor: Colors.sub_01,
    },
    MUSICAL_TERM: {label: '뮤지컬 용어', color: '#FF7163', boxColor: '#FFEAE8'},
    EVENT: {label: '이벤트', color: '#FF853E', boxColor: '#FFE9DC'},
  };

  const getMappedCategory = (category: string | undefined) => {
    if (!category) return null;
    return categoryMapping[category];
  };

  const category = getMappedCategory(postData.category);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const fetchGetPost = async () => {
    try {
      const response = await getPost(postId);
      setPostData(response.data.data);
    } catch (error) {
      console.error('게시글 조회 오류:', error);
    }
  };

  useEffect(() => {
    fetchGetPost();
  }, []);

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

  // 기본 이미지 리스트
  const defaultImages = [
    {
      id: '1',
      image: require('@/assets/images/home/Musical4.jpeg'),
    },
    {
      id: '2',
      image: require('@/assets/images/home/Musical5.jpeg'),
    },
    {
      id: '3',
      image: require('@/assets/images/home/Musical6.jpeg'),
    },
    {
      id: '4',
      image: require('@/assets/images/home/Musical6.jpeg'),
    },
    {
      id: '5',
      image: require('@/assets/images/home/Musical6.jpeg'),
    },
  ];

  const imagesToRender =
    itemImgUrls && itemImgUrls.length > 0
      ? itemImgUrls.map((url: string, index: number) => ({
          id: index.toString(),
          image: {uri: url},
        }))
      : defaultImages;

  return (
    <>
      <SafeAreaView style={PostStyles.container}>
        <ScrollView>
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

          <View style={{marginHorizontal: 20}}>
            <View
              style={[
                PostStyles.containerCategory,
                {backgroundColor: category?.boxColor},
              ]}>
              <Text style={[PostStyles.textCategory, {color: category?.color}]}>
                {category?.label}
              </Text>
            </View>
            <Text style={PostStyles.textTitle}>{postData.title}</Text>
            <Text style={PostStyles.textContent}>{postData.content}</Text>
          </View>

          {/* 이미지 렌더링 */}
          <FlatList
            contentContainerStyle={{marginHorizontal: 20}}
            data={imagesToRender} // 렌더링할 이미지 배열
            renderItem={({item}) => (
              <Image style={PostStyles.images} source={item.image} />
            )}
            keyExtractor={item => item.id}
            horizontal={true}
            nestedScrollEnabled
          />

          <View style={{marginHorizontal: 20}}>
            <View style={PostStyles.line} />
          </View>

          <TouchableOpacity style={PostStyles.containerHashtag}>
            <Text style={PostStyles.textHashtag}>
              #벤자민버튼 #MD #드레스리허설
            </Text>
          </TouchableOpacity>

          <View style={PostStyles.containerCommentLikeItems}>
            <View style={[PostStyles.containerCommentLike, {marginRight: 10}]}>
              <SvgXml xml={PostIcon.comment} />
              <Text style={PostStyles.textCommentLike}>
                {postData.num_of_like}
              </Text>
            </View>
            <View style={PostStyles.containerCommentLike}>
              <SvgXml xml={PostIcon.like} />
              <Text style={PostStyles.textCommentLike}>
                {postData.num_of_comment}
              </Text>
            </View>
          </View>

          <View style={PostStyles.containerWriter}>
            <View style={PostStyles.containerRow}>
              <>
                <SvgXml xml={PostIcon.writerBackground} />
                <Image
                  style={PostStyles.imageWriter}
                  source={require('@/assets/logo/logo4.png')}
                />
              </>
              <View style={PostStyles.containerWriterText}>
                <View style={PostStyles.containerRow}>
                  <Text style={PostStyles.textWriter}>뮤사랑</Text>
                  <SvgXml xml={PostIcon.Badge} />
                </View>
                <Text style={PostStyles.textDate}>
                  {timeAgo(postData.created_at)}
                </Text>
              </View>
            </View>
            <View style={PostStyles.containerWriterButton}>
              <Text style={PostStyles.textWriterButton}>작성자</Text>
            </View>
          </View>

          <View style={PostStyles.containerCommentTitle}>
            <Text style={PostStyles.textCommentTitle}>
              댓글 {postData.num_of_comment}
            </Text>
            <View style={PostStyles.containerRow}>
              <TouchableOpacity>
                <Text
                  style={[PostStyles.textLatestRecommended, {marginRight: 12}]}>
                  최신순
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={PostStyles.textLatestRecommended}>추천순</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ItemComment commentList={commentData} />
        </ScrollView>
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

import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';

import ModifyStyles from './ModifyStyles';
import {SvgXml} from 'react-native-svg';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import {RootStackParamList} from '../../../../types';
import {getPost} from '@/api/post.api';

import ModalCategory from '@/components/categoryModal/ModalCategory';
import WriteBottomTab from '@/components/bottomTab/WriteBottomTab';

type ModifyScreenRouteProp = RouteProp<RootStackParamList, 'ModifyScreen'>;

interface ModifyData {
  postId: number;
  category: string;
  post_type: string;
  title: string;
  content: string;
  imgUrls?: string[];
  hashTags: string[];
  isNotice?: boolean;
  isTemporarySave?: boolean;
}

interface ModifyScreenRouteProps {
  route: ModifyScreenRouteProp;
  setModifyData: React.Dispatch<React.SetStateAction<ModifyData | null>>;
}

const ModifyScreen: React.FC<ModifyScreenRouteProps> = ({
  route,
  setModifyData,
}) => {
  const {postId} = route.params;
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [post_type, setPostType] = React.useState('게시판 선택');
  const [category, setCategory] = React.useState('카테고리 선택');
  const [hashTags, setHashTags] = React.useState<string[]>([]);

  const [photoCount, setPhotoCount] = React.useState(0);
  const [dashboardModalVisible, setDashboardModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const dashboardList = [
    '게시판 선택 안함',
    '정보 게시판',
    '후기 게시판',
    '배우 게시판',
    '자유 게시판',
  ];
  const categoryList = ['선택 안함', '시야 후기', '굿즈 후기', '공연 감상'];

  const postTypeMapping: Record<string, string> = {
    '': '게시판 선택 안함',
    INFORMATION: '정보 게시판',
    REVIEW: '후기 게시판',
    ACTOR: '배우 게시판',
    FREE: '자유 게시판',
  };

  const categoryMapping: Record<string, string> = {
    '': '',
    VIEW_REVIEW: '시야 후기',
    GOODS_REVIEW: '굿즈 후기',
    PERFORMANCE_REVIEW: '공연 감상',
  };

  const pressDashboard = () => {
    setDashboardModalVisible(true);
    setModalTitle('게시판');
  };

  const pressCategory = () => {
    setCategoryModalVisible(true);
    setModalTitle('카테고리');
  };

  // 해시태그 추출하는 함수
  const handleContentChange = (text: string) => {
    setContent(text);
    setHashTags(text.match(/#[^\s#]+/g) || []); // 해시태그 감지
    // console.log('해시태그:', hashTags);
  };

  const fetchGetPost = async () => {
    try {
      const response = await getPost(postId);
      setTitle(response.data.data.title || '');
      setContent(response.data.data.content || '');
      setPostType(postTypeMapping[response.data.data.post_type] || '');
      setCategory(categoryMapping[response.data.data.category] || '');
      setHashTags(response.data.data.hashtags || []);
    } catch (error) {
      console.error('게시글 조회 오류 (수정 페이지):', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGetPost();
    }, []),
  );

  // App.tsx로 props 전달
  useEffect(() => {
    setModifyData({
      postId,
      category,
      post_type,
      title,
      content,
      imgUrls: [],
      hashTags,
      isNotice: false,
      isTemporarySave: false,
    });
  }, [postId, title, content, post_type, category]);

  return (
    <>
      <SafeAreaView style={ModifyStyles.container}>
        <ScrollView>
          <View style={ModifyStyles.field_container}>
            <View style={ModifyStyles.selectField}>
              <Text style={ModifyStyles.fieldText}>{post_type}</Text>
              <TouchableOpacity onPress={pressDashboard}>
                <SvgXml xml={DashboardIcon.downArrow} />
              </TouchableOpacity>

              <ModalCategory
                modalVisible={dashboardModalVisible}
                setModalVisible={setDashboardModalVisible}
                categoryList={dashboardList}
                modalTitle={modalTitle}
                onSelect={(item: string) => {
                  setPostType(item);
                }}
              />
            </View>

            <View style={ModifyStyles.selectField}>
              <Text style={ModifyStyles.fieldText}>{category}</Text>
              <TouchableOpacity onPress={pressCategory}>
                <SvgXml xml={DashboardIcon.downArrow} />
              </TouchableOpacity>

              <ModalCategory
                modalVisible={categoryModalVisible}
                setModalVisible={setCategoryModalVisible}
                categoryList={categoryList}
                modalTitle={modalTitle}
                onSelect={(item: string) => {
                  setCategory(item);
                }}
              />
            </View>
          </View>

          <View style={ModifyStyles.field_container}>
            <TextInput
              style={ModifyStyles.input_title}
              placeholder="제목"
              onChangeText={setTitle}
              value={title}
            />
            <View style={ModifyStyles.line} />
            <TextInput
              style={ModifyStyles.input_content}
              placeholder="내용을 작성해주세요."
              onChangeText={handleContentChange}
              value={content}
              multiline
            />
          </View>

          <View style={ModifyStyles.photo_container}>
            <View style={ModifyStyles.photo_text_container}>
              <Text>사진 </Text>
              <Text>({photoCount}/10)</Text>
            </View>
            <TouchableOpacity style={ModifyStyles.photo}>
              <SvgXml xml={DashboardIcon.camera} />
              <Text style={ModifyStyles.photo_text}>사진 추가</Text>
            </TouchableOpacity>
          </View>

          <View style={ModifyStyles.rule_container}>
            <Text style={ModifyStyles.rule_title}>게시판 이용 안내</Text>
            <Text style={ModifyStyles.rule_content}>
              아래와 같은 사항에 해당될 경우 해당 글은 삭제되며 글을 작성할 수
              있는 권한이 제한될 수 있습니다.
            </Text>

            <Text style={ModifyStyles.rule_content}>
              • 신고가 누적된 게시물
            </Text>
            <Text style={ModifyStyles.rule_content}>
              • 게시판의 취지와 무관한 게시물
            </Text>
            <Text style={ModifyStyles.rule_content}>• 중복되는 게시물</Text>
            <Text style={ModifyStyles.rule_content}>
              • 도배 다른 사람들의 불쾌감을 유발하는 게시물
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      <WriteBottomTab
        setContent={setContent}
        setPhotoCount={setPhotoCount}
        title={title}
        content={content}
        post_type={post_type}
        category={category}
        hashTags={hashTags}
        imgUrls={imgUrls}
      />
    </>
  );
};

export default ModifyScreen;

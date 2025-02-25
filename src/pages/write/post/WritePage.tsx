import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import WriteStyles from './WriteStyles';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import ModalCategory from '@/components/categoryModal/ModalCategory';
import WriteBottomTab from '@/components/bottomTab/WriteBottomTab';
import {SelectImage} from '@/components/selectImage/SelectImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckTempModal from '@/components/alertModal/CheckTempModal';
import {useRoute, RouteProp} from '@react-navigation/native';

interface PostData {
  title: string;
  content: string;
  post_type: string;
  category: string;
  hashTags: string[];
  imgUrls: string[];
  post_images?: string[];
}

interface WritePageProps {
  setPostData: React.Dispatch<React.SetStateAction<PostData | null>>;
}

type RootStackParamList = {
  SavePage: undefined;
  WritePage: {
    postData: PostData;
  };
};

type WritePageRouteProp = RouteProp<RootStackParamList, 'WritePage'>;

const WritePage: React.FC<WritePageProps> = ({setPostData}) => {
  const route = useRoute<WritePageRouteProp>();
  const postData = route.params?.postData;
  console.log('임시저장 글에서 넘어온 데이터: ', postData);

  const [title, setTitle] = useState(postData?.title || '');
  const [content, setContent] = useState(postData?.content || '');
  const [post_type, setPostType] = useState(
    postData?.post_type || '게시판 선택',
  );
  const [category, setCategory] = useState(
    postData?.category || '카테고리 선택',
  );
  const [hashTags, setHashTags] = useState<string[]>(postData?.hashTags || []);
  const [imgUrls, setImgUrls] = useState<string[]>(postData?.imgUrls || []);
  const [categoryDisabled, setCategoryDisabled] = useState(true);
  const [dashboardModalVisible, setDashboardModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [photoCount, setPhotoCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedSubTitle, setSelectedSubtitle] = useState('');
  const [topButton, setTopButton] = useState('');
  const [bottomButton, setBottomButton] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dashboardList = [
    '게시판 선택 안함',
    '정보 게시판',
    '후기 게시판',
    '배우 게시판',
    '자유 게시판',
  ];
  const pressDashboard = () => {
    setDashboardModalVisible(true);
    setModalTitle('게시판');
  };

  const infoCategoryList = [
    '선택 안함',
    '오페라 글라스',
    '뮤지컬 용어',
    '이벤트',
  ];
  const reviewCategoryList = [
    '선택 안함',
    '시야 후기',
    '굿즈 후기',
    '공연 감상',
  ];
  const [categoryList, setCategoryList] = useState(infoCategoryList);

  const postTypeMapping: Record<string, string> = {
    NO_SELECT: '게시판 선택',
    INFORMATION: '정보 게시판',
    REVIEW: '후기 게시판',
    ACTOR: '배우 게시판',
    FREE: '자유 게시판',
  };

  const categoryMapping: Record<string, string> = {
    NO_SELECT: '카테고리 선택',
    OPERA_GLASS_RENTAL: '오페라 글라스',
    MUSICAL_TERMS: '뮤지컬 용어',
    EVENTS: '이벤트',
    VIEW_REVIEW: '시야 후기',
    GOODS_REVIEW: '굿즈 후기',
    PERFORMANCE_REVIEW: '공연 감상',
  };

  const openModal = (
    title: string,
    subTitle: string,
    topButton: string,
    bottomButton: string,
  ) => {
    setModalVisible(true);
    setSelectedTitle('작성 중인 글이 있어요');
    setSelectedSubtitle('이어서 쓰시겠어요?');
    setTopButton('이어 쓰기');
    setBottomButton('새로 쓰기');
  };

  // 임시저장 글 유무에 따라 띄우는 모달
  const handleJudgeTempList = async () => {
    const storedData = await AsyncStorage.getItem('temporaryPosts');
    console.log('스토리지에 저장된 임시 저장 글: ', storedData);
    const parsedData = JSON.parse(storedData || '[]');

    if (parsedData.length > 0) {
      openModal(selectedTitle, selectedSubTitle, topButton, bottomButton);
    }
  };

  useEffect(() => {
    if (post_type === '정보 게시판') {
      setCategoryDisabled(false);
      setCategoryList(infoCategoryList);
    } else if (post_type == '후기 게시판') {
      setCategoryDisabled(false);
      setCategoryList(reviewCategoryList);
    } else {
      setCategoryDisabled(true);
      setCategory('카테고리 선택');
    }
  }, [post_type]);

  useEffect(() => {
    handleJudgeTempList();
  }, []);

  const pressCategory = () => {
    if (!categoryDisabled) {
      setCategoryModalVisible(true);
      setModalTitle('카테고리');
    }
  };

  const handleContentChange = (text: string) => {
    setContent(text);
    setHashTags(text.match(/#[^\s#]+/g) || []);
  };

  const handleSelectImage = async () => {
    const imageUrl = await SelectImage(setPhotoCount);
    if (imageUrl) {
      setImgUrls(prev => [...prev, imageUrl]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImgUrls(prev => prev.filter((_, i) => i !== index));
    setPhotoCount(prev => prev - 1);
  };

  // App.tsx로 props 전달
  useEffect(() => {
    setPostData({
      title,
      content,
      post_type,
      category,
      hashTags,
      imgUrls,
    });
  }, [title, content, post_type, category, imgUrls]);

  // 상태 업데이트
  useEffect(() => {
    if (route.params?.postData) {
      const postData = route.params?.postData;
      const mappedCategory = categoryMapping[postData.category] || '';
      const mappedPostType = postTypeMapping[postData.post_type] || '';

      console.log('임시저장 글에서 넘어온 데이터: ', postData);

      setTitle(postData.title);
      setContent(postData.content);
      setPostType(mappedPostType);
      setCategory(mappedCategory);
      setHashTags(postData.hashTags || []);
      setImgUrls(postData.post_images || []);
    }
  }, [route.params?.postData]);

  return (
    <>
      <SafeAreaView style={WriteStyles.container}>
        <ScrollView>
          <View style={WriteStyles.field_container}>
            <View style={WriteStyles.selectField}>
              <Text style={WriteStyles.fieldText}>{post_type}</Text>
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

            <View style={WriteStyles.selectField}>
              <Text
                style={[
                  WriteStyles.fieldText,
                  categoryDisabled && {color: '#BDBDBD'},
                ]}>
                {category}
              </Text>
              <TouchableOpacity
                onPress={pressCategory}
                disabled={categoryDisabled}>
                <SvgXml
                  xml={DashboardIcon.downArrow}
                  style={categoryDisabled && {opacity: 0.5}}
                />
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

          <View style={WriteStyles.field_container}>
            <TextInput
              style={WriteStyles.input_title}
              placeholder="제목"
              onChangeText={setTitle}
              value={title}
            />
            <View style={WriteStyles.line} />
            <TextInput
              style={WriteStyles.input_content}
              placeholder="내용을 작성해주세요."
              onChangeText={handleContentChange}
              value={content}
              multiline
              numberOfLines={10}
            />
          </View>

          <View style={WriteStyles.photo_container}>
            <View style={WriteStyles.photo_text_container}>
              <Text>사진 </Text>
              <Text>({photoCount}/10)</Text>
            </View>
            <View style={WriteStyles.photos}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  style={[
                    WriteStyles.photo,
                    photoCount == 10 && {opacity: 0.4},
                  ]}
                  onPress={handleSelectImage}
                  disabled={photoCount == 10}>
                  <SvgXml xml={DashboardIcon.camera} />
                  <Text style={WriteStyles.photo_text}>사진 추가</Text>
                </TouchableOpacity>
                {imgUrls.map((url, index) => (
                  <View key={index} style={WriteStyles.photo_wrapper}>
                    <Image
                      source={{uri: url}}
                      style={{
                        width: 84,
                        height: 92,
                        borderRadius: 9,
                      }}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      style={WriteStyles.closeButton}
                      onPress={() => handleRemoveImage(index)}>
                      <SvgXml xml={DashboardIcon.close} />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={WriteStyles.rule_container}>
            <Text style={WriteStyles.rule_title}>게시판 이용 안내</Text>
            <Text style={WriteStyles.rule_content}>
              아래와 같은 사항에 해당될 경우 해당 글은 삭제되며 글을 작성할 수
              있는 권한이 제한될 수 있습니다.
            </Text>

            <Text style={WriteStyles.rule_content}>• 신고가 누적된 게시물</Text>
            <Text style={WriteStyles.rule_content}>
              • 게시판의 취지와 무관한 게시물
            </Text>
            <Text style={WriteStyles.rule_content}>• 중복되는 게시물</Text>
            <Text style={WriteStyles.rule_content}>
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

      {/* 모달 컴포넌트 */}
      <CheckTempModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={selectedTitle}
        subTitle={selectedSubTitle}
        topButton={topButton}
        bottomButton={bottomButton}
        topButtonAction={() => navigation.navigate('SavePage')}
      />
    </>
  );
};

export default WritePage;

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
import WriteStyles from './WriteStyles';
import {SvgXml} from 'react-native-svg';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';
import ModalCategory from '@/components/categoryModal/ModalCategory';
import WriteBottomTab from '@/components/bottomTab/WriteBottomTab';
import {SelectImage} from '@/components/selectImage/SelectImage';

interface PostData {
  title: string;
  content: string;
  post_type: string;
  category: string;
  hashTags: string[];
  imgUrls: string[];
}

interface WritePageProps {
  setPostData: React.Dispatch<React.SetStateAction<PostData | null>>;
}

const WritePage: React.FC<WritePageProps> = ({setPostData}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [post_type, setPostType] = useState('게시판 선택');
  const [category, setCategory] = useState('카테고리 선택');
  const [categoryDisabled, setCategoryDisabled] = useState(true); // 카테고리 활성화 여부
  const [dashboardModalVisible, setDashboardModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [photoCount, setPhotoCount] = useState(0);
  const [imgUrls, setImgUrls] = useState<string[]>([]);

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

  // 게시판 선택에 따라 카테고리 선택 활성화/비활성화
  useEffect(() => {
    if (post_type === '정보 게시판') {
      setCategoryDisabled(false); // 활성화
      setCategoryList(infoCategoryList);
    } else if (post_type == '후기 게시판') {
      setCategoryDisabled(false);
      setCategoryList(reviewCategoryList);
    } else {
      setCategoryDisabled(true); // 비활성화
      setCategory('카테고리 선택'); // 기본값으로 초기화
    }
  }, [post_type]);

  const pressCategory = () => {
    if (!categoryDisabled) {
      setCategoryModalVisible(true);
      setModalTitle('카테고리');
    }
  };

  // 해시태그 추출하는 함수
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
            />
          </View>

          <View style={WriteStyles.photo_container}>
            <View style={WriteStyles.photo_text_container}>
              <Text>사진 </Text>
              <Text>({photoCount}/10)</Text>
            </View>
            <View style={WriteStyles.photos}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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

      <WriteBottomTab setContent={setContent} setPhotoCount={setPhotoCount} />
    </>
  );
};

export default WritePage;

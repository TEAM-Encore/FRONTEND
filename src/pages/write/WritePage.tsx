import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import WriteStyles from './WriteStyles';
import {SvgXml} from 'react-native-svg';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';

import ModalCategory from '@/components/categoryModal/ModalCategory';

import WriteBottomTab from '@/components/bottomTab/WriteBottomTab';

interface PostData {
  title: string;
  content: string;
  post_type: string;
  category: string;
  hashTags: string[];
}

interface WritePageProps {
  setPostData: React.Dispatch<React.SetStateAction<PostData | null>>;
}

const WritePage: React.FC<WritePageProps> = ({setPostData}) => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [post_type, setPostType] = React.useState('게시판 선택');
  const [category, setCategory] = React.useState('카테고리 선택');
  const [hashTags, setHashTags] = React.useState<string[]>([]);

  const [photoCount, setPhotoCount] = React.useState(0);
  const [dashboardModalVisible, setDashboardModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [categoryDisabled, setCategoryDisabled] = useState(true); // 카테고리 활성화 여부

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
    console.log('해시태그:', hashTags);
  };

  // App.tsx로 props 전달
  useEffect(() => {
    setPostData({
      title,
      content,
      post_type,
      category,
      hashTags,
    });
  }, [title, content, post_type, category]);

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
                  categoryDisabled && {color: '#BDBDBD'}, // 비활성화 스타일 적용
                ]}>
                {category}
              </Text>
              <TouchableOpacity
                onPress={pressCategory}
                disabled={categoryDisabled} // 비활성화 상태 반영
              >
                <SvgXml
                  xml={DashboardIcon.downArrow}
                  style={categoryDisabled && {opacity: 0.5}} // 비활성화 스타일
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
            <TouchableOpacity style={WriteStyles.photo}>
              <SvgXml xml={DashboardIcon.camera} />
              <Text style={WriteStyles.photo_text}>사진 추가</Text>
            </TouchableOpacity>
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

      <WriteBottomTab setContent={setContent} />
    </>
  );
};

export default WritePage;

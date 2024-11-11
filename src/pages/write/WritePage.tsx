import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import WriteStyles from './WriteStyles';
import {SvgXml} from 'react-native-svg';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';

import ModalCategory from '@/components/categoryModal/ModalCategory';

import WriteBottomTab from '@/components/bottomTab/WriteBottomTab';

const WritePage: React.FC = () => {
  const [title, onChangeTitle] = React.useState('');
  const [content, onChangeContent] = React.useState('');
  const [photoCount, setPhotoCount] = React.useState(0);
  const [dashboardModalVisible, setDashboardModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const dashboardList = [
    '게시판 선택 안함',
    '정보 게시판',
    '후기 게시판',
    '배우 게시판',
    '자유 게시판',
  ];
  const categoryList = ['선택 안함', '시야 후기', '굿즈 후기', '공연 감상'];

  const pressDashboard = () => {
    setDashboardModalVisible(true);
    setModalTitle('게시판');
  };

  const pressCategory = () => {
    setCategoryModalVisible(true);
    setModalTitle('카테고리');
  };

  return (
    <>
      <SafeAreaView style={WriteStyles.container}>
        <ScrollView>
          <View style={WriteStyles.field_container}>
            <View style={WriteStyles.selectField}>
              <Text style={WriteStyles.fieldText}>게시판 선택</Text>
              <TouchableOpacity onPress={pressDashboard}>
                <SvgXml xml={DashboardIcon.downArrow} />
              </TouchableOpacity>

              <ModalCategory
                modalVisible={dashboardModalVisible}
                setModalVisible={setDashboardModalVisible}
                categoryList={dashboardList}
                modalTitle={modalTitle}
              />
            </View>

            <View style={WriteStyles.selectField}>
              <Text style={WriteStyles.fieldText}>카테고리 선택</Text>
              <TouchableOpacity onPress={pressCategory}>
                <SvgXml xml={DashboardIcon.downArrow} />
              </TouchableOpacity>

              <ModalCategory
                modalVisible={categoryModalVisible}
                setModalVisible={setCategoryModalVisible}
                categoryList={categoryList}
                modalTitle={modalTitle}
              />
            </View>
          </View>

          <View style={WriteStyles.field_container}>
            <TextInput
              style={WriteStyles.input_title}
              placeholder="제목"
              onChangeText={onChangeTitle}
              value={title}
            />
            <View style={WriteStyles.line} />
            <TextInput
              style={WriteStyles.input_content}
              placeholder="내용을 작성해주세요."
              onChangeText={onChangeContent}
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

      <WriteBottomTab />
    </>
  );
};

export default WritePage;

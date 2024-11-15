import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import InformationStyles from '@/pages/dashboard/info/InformationStyles';
import {DashboardIcon} from '@/assets/icons/dashboard/DashboardIcon';

import ItemPost from '@/components/comment/ItemPost';
import ModalCategory from '@/components/categoryModal/ModalCategory';

type InformationScreenProps = {};

const InformationScreen: React.FC<InformationScreenProps> = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState('카테고리');
  const categoryList = ['전체보기', '오페라글라스', '뮤지컬 용어', '이벤트'];
  const [modalTitle, setModalTitle] = useState('');

  const postList = [
    {
      id: '1',
      nickname: '뮤사랑',
      date: '11분전',
      title: '샤롯데시어터 오페라글라스 대여',
      content:
        '방금 가보니 5개 정도 남아있다고 하네요. 빨리 가셔야 할 거 같아요.',
      image: require('@/assets/images/home/Musical1.jpeg'),
      like_count: 3,
      comment_count: 1,
    },
    {
      id: '2',
      nickname: '뮤뮤',
      date: '방금전',
      title: '회전문이 어떤 뜻인가요?',
      content: '다들 공연 회전문 돈다 이런 말씀들을 하시던데, 무슨 뜻인가요?',
      like_count: 10,
      comment_count: 0,
    },
    {
      id: '2',
      nickname: '뮤덕',
      date: '방금전',
      title: '소극장 뮤지컬 빨래 티켓권 이벤트',
      content: '저번에 엄청 좋게 봤던 뮤지컬 이벤트를 열고자 합니다!',
      image: require('@/assets/images/home/Musical2.jpeg'),
      like_count: 10,
      comment_count: 0,
    },
  ];

  const pressCategory = () => {
    setModalVisible(true);
    setModalTitle('카테고리');
  };

  return (
    <SafeAreaView style={InformationStyles.container}>
      <ScrollView>
        <View style={InformationStyles.containerCommentTitle}>
          <TouchableOpacity
            style={InformationStyles.containerRow}
            onPress={() => pressCategory()}>
            <Text style={InformationStyles.textCategory}>{category}</Text>
            <SvgXml xml={DashboardIcon.arrowDown} />
          </TouchableOpacity>
          <ModalCategory
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            categoryList={categoryList}
            modalTitle={modalTitle}
            onSelect={(item: string) => {
              setCategory(item);
            }}
          />
          <View style={InformationStyles.containerRow}>
            <TouchableOpacity>
              <Text
                style={[
                  InformationStyles.textLatestRecommended,
                  {marginRight: 12},
                ]}>
                최신순
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={InformationStyles.textLatestRecommended}>
                추천순
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ItemPost postList={postList} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InformationScreen;

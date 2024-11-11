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
import ModalCategory from '@/components/comment/ModalCategory';

type InformationScreenProps = {};

const InformationScreen: React.FC<InformationScreenProps> = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const postList = [
    {
      id: '1',
      writer: '뮤사랑',
      date: '11분전',
      title: '샤롯데시어터 오페라글라스 대여',
      content:
        '방금 가보니 5개 정도 남아있다고 하네요. 빨리 가셔야 할 거 같아요.',
      image: require('@/assets/images/home/Musical1.jpeg'),
      like: 3,
      comment: 1,
    },
    {
      id: '2',
      writer: '뮤뮤',
      date: '방금전',
      title: '회전문이 어떤 뜻인가요?',
      content: '다들 공연 회전문 돈다 이런 말씀들을 하시던데, 무슨 뜻인가요?',
      like: 10,
      comment: 0,
    },
    {
      id: '2',
      writer: '뮤덕',
      date: '방금전',
      title: '소극장 뮤지컬 빨래 티켓권 이벤트',
      content: '저번에 엄청 좋게 봤던 뮤지컬 이벤트를 열고자 합니다!',
      image: require('@/assets/images/home/Musical2.jpeg'),
      like: 10,
      comment: 0,
    },
  ];

  const pressCategory = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={InformationStyles.container}>
      <ScrollView>
        <View style={InformationStyles.containerCommentTitle}>
          <TouchableOpacity
            style={InformationStyles.containerRow}
            onPress={pressCategory}>
            <Text style={InformationStyles.textCategory}>카테고리</Text>
            <SvgXml xml={DashboardIcon.arrowDown} />
          </TouchableOpacity>
          <ModalCategory
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
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

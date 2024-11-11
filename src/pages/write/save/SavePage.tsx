import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import SaveStyles from './SaveStyles';
import AlertModal from '@/components/alertModal/AlertModal';

const items = [
  {
    id: 1,
    title: '프랑켄슈타인 막공 후기',
    date: '2024.10.9',
    expireDate: 3,
  },
  {
    id: 2,
    title: '프랑켄슈타인 막공 후기',
    date: '2024.10.9',
    expireDate: 5,
  },
  {
    id: 3,
    title: '프랑켄슈타인 막공 후기',
    date: '2024.10.9',
    expireDate: 7,
  },
  {
    id: 4,
    title: '프랑켄슈타인 막공 후기',
    date: '2024.10.9',
    expireDate: 10,
  },
];

const SavePage: React.FC = () => {
  //   const [count, setCount] = useState('4');
  //   const [title, setTitle] = useState('프랑켄슈타인 막공 후기');
  //   const [date, setDate] = useState('2024.10.9');
  //   const [expireDate, setExpireDate] = useState('3');

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedSubTitle, setSelectedSubtitle] = useState('');
  const [topButton, setTopButton] = useState('');
  const [bottomButton, setBottomButton] = useState('');

  const openModal = (
    title: string,
    subTitle: string,
    topButton: string,
    bottomButton: string,
  ) => {
    setModalVisible(true);
    setSelectedTitle('임시저장된 글을 삭제할까요?');
    setSelectedSubtitle(`삭제된 글은 복구할 수 없습니다`);
    setTopButton('삭제하기');
    setBottomButton('취소하기');
  };

  return (
    <>
      <SafeAreaView style={SaveStyles.container}>
        <ScrollView>
          <View style={{flex: 1}}>
            <View style={SaveStyles.count_container}>
              <Text style={SaveStyles.count_text}>총 {items.length}개</Text>
            </View>

            {items.map(item => (
              <View key={item.id} style={SaveStyles.list_container}>
                <View style={SaveStyles.list}>
                  <View style={SaveStyles.sub_container}>
                    <Text style={SaveStyles.list_title}>{item.title}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        openModal(
                          selectedTitle,
                          selectedSubTitle,
                          topButton,
                          bottomButton,
                        )
                      }>
                      <View>
                        <Text style={SaveStyles.delete}>삭제</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={SaveStyles.sub_container}>
                    <Text style={SaveStyles.list_date}>{item.date}</Text>
                    <Text style={SaveStyles.list_expire_date}>
                      {item.expireDate}일 뒤 자동 삭제
                    </Text>
                  </View>
                </View>
                <View style={SaveStyles.line} />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <Text style={SaveStyles.notice}>
        2주가 지난 임시저장글은 자동으로 삭제됩니다.
      </Text>

      {/* 모달 컴포넌트 */}
      <AlertModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={selectedTitle}
        subTitle={selectedSubTitle}
        topButton={topButton}
        bottomButton={bottomButton}
      />
    </>
  );
};

export default SavePage;

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SaveStyles from './SaveStyles';
import AlertModal from '@/components/alertModal/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPost} from '@/api/post.api';
import {timeAgo} from '@/util/timeAgo';

const SavePage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedSubTitle, setSelectedSubtitle] = useState('');
  const [topButton, setTopButton] = useState('');
  const [bottomButton, setBottomButton] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const [count, setCount] = useState(0);
  const [savedPosts, setSavedPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        // AsyncStorage에 저장되어 있는 데이터 확인
        const storedData = await AsyncStorage.getItem('temporaryPosts');
        const parsedData = JSON.parse(storedData || '[]');

        if (parsedData.length > 0) {
          const fetchedPosts = await Promise.all(
            parsedData.map(async (post: {post_id: number}) => {
              const response = await getPost(post.post_id);
              return response.data.data; // 각 post의 데이터
            }),
          );

          setSavedPosts(fetchedPosts);
          setCount(fetchedPosts.length);
        }
      } catch (error) {
        console.error('Error fetching saved posts:', error);
        Alert.alert(
          '임시 저장 목록을 불러오는 도중 문제가 발생했습니다. 다시 시도해주세요.',
        );
      }
    };

    fetchSavedPosts();
  }, []);

  const openModal = (
    title: string,
    subTitle: string,
    topButton: string,
    bottomButton: string,
    postId: number,
  ) => {
    setModalVisible(true);
    setSelectedTitle('임시저장된 글을 삭제할까요?');
    setSelectedSubtitle(`삭제된 글은 복구할 수 없습니다`);
    setTopButton('삭제하기');
    setBottomButton('취소하기');
    setSelectedPostId(postId); // 선택된 post_id 설정
  };

  console.log('storageData: ', savedPosts);

  return (
    <>
      <SafeAreaView style={SaveStyles.container}>
        <ScrollView>
          <View style={{flex: 1}}>
            <View style={SaveStyles.count_container}>
              <Text style={SaveStyles.count_text}>총 {count}개</Text>
            </View>

            {savedPosts.map(item => (
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
                          item.post_id,
                        )
                      }>
                      <View>
                        <Text style={SaveStyles.delete}>삭제</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={SaveStyles.sub_container}>
                    <Text style={SaveStyles.list_date}>
                      {timeAgo(item.modified_at)}
                    </Text>
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
        postId={selectedPostId}
      />
    </>
  );
};

export default SavePage;

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import SaveStyles from './SaveStyles';
import DeleteTempModal from '@/components/alertModal/DeleteTempModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPost} from '@/api/post.api';
import {timeAgo} from '@/util/timeAgo';
import {deleteTimeAgo} from '@/util/deleteTimeAgo';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type RootStackParamList = {
  SavePage: undefined;
  WritePage: {
    postData: {
      title: string;
      content: string;
      post_type: string;
      category: string;
      hashTags: string[];
      imgUrls: string[];
    };
  };
};

const SavePage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedSubTitle, setSelectedSubtitle] = useState('');
  const [topButton, setTopButton] = useState('');
  const [bottomButton, setBottomButton] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const [savedPosts, setSavedPosts] = useState<any[]>([]);

  const fetchSavedPosts = async () => {
    try {
      const storedData = await AsyncStorage.getItem('temporaryPosts');
      const parsedData = JSON.parse(storedData || '[]');

      const validPosts: any[] = [];
      const now = new Date();

      for (const post of parsedData) {
        const postId = post.post_id;
        const postModifiedAt = post.modified_at;
        const past = new Date(postModifiedAt);
        const diffInSeconds = Math.floor(
          (now.getTime() - past.getTime()) / 1000,
        );
        const twoWeeksInSeconds = 14 * 24 * 60 * 60;

        if (diffInSeconds >= twoWeeksInSeconds) {
          // 만료된 데이터: 스토리지에서 삭제
          console.log(
            `Post ${postId}가 만료되었습니다. 스토리지에서 삭제합니다.`,
          );
          continue;
        }

        // 유효한 데이터: UI에 반영
        const response = await getPost(postId);
        validPosts.push(response.data.data);
      }

      await AsyncStorage.setItem('temporaryPosts', JSON.stringify(validPosts));
      setSavedPosts(validPosts);
      setCount(validPosts.length);

      if (validPosts.length === 0) {
        setCount(0);
        setSavedPosts([]);
      }
    } catch (error) {
      console.error('Error fetching saved posts:', error);
      Alert.alert(
        '임시 저장 목록을 불러오는 도중 문제가 발생했습니다. 다시 시도해주세요.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 삭제 시 UI에 반영하기 위한 함수
  useEffect(() => {
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
    setSelectedPostId(postId);
  };

  console.log('storageData: ', savedPosts);
  // console.log('저장된 임시 저장글 개수: ', count);

  const handleClick = (postId: number) => {
    const postData = savedPosts.find(post => post.post_id === postId);
    if (postData) {
      navigation.navigate('WritePage', {postData});
    } else {
      Alert.alert('해당 임시 저장글을 찾지 못했습니다.');
    }
  };

  if (isLoading) {
    return (
      <View style={{marginTop: 20}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={SaveStyles.container}>
        <ScrollView>
          <View style={{flex: 1}}>
            <View style={SaveStyles.count_container}>
              <Text style={SaveStyles.count_text}>총 {count}개</Text>
            </View>
            {count === 0 ? (
              <View style={SaveStyles.no_container}>
                <Text style={SaveStyles.no_text}>
                  임시 저장된 글이 없습니다.
                </Text>
              </View>
            ) : (
              savedPosts.map(item => (
                <View key={item.post_id} style={SaveStyles.list_container}>
                  <TouchableOpacity onPress={() => handleClick(item.post_id)}>
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
                          {deleteTimeAgo(item.modified_at).message}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <View style={SaveStyles.line} />
                </View>
              ))
            )}
          </View>
          <View style={{marginTop: 60}}>
            <Text style={SaveStyles.notice}>
              2주가 지난 임시저장글은 자동으로 삭제됩니다.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* 모달 컴포넌트 */}
      <DeleteTempModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={selectedTitle}
        subTitle={selectedSubTitle}
        topButton={topButton}
        bottomButton={bottomButton}
        postId={selectedPostId}
        fetchSavedPosts={fetchSavedPosts}
      />
    </>
  );
};

export default SavePage;

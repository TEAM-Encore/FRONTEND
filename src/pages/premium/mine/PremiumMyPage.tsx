import React, {useEffect, useState, useCallback, useRef} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  FlatList,
  Alert,
  View,
  TouchableOpacity,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {PostIcon} from '@/assets/icons/dashboard/PostIcon';
import ModalModifyDelete from '@/components/modifyDeleteModal/ModalModifyDelete';
import PremiumMyStyles from './PremiumMyStyles';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getTicketReview} from '@/api/review.api';

type RootStackParamList = {
  PremiumMyPage: {reviewId: number};
};

type PremiumMyPageProps = NativeStackScreenProps<
  RootStackParamList,
  'PremiumMyPage'
>;

type ModalPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// type ReviewItems = {
//   reviewId: number;
//   elapsedTime: string;
//   likeRes: {
//     likeType: string;
//     likeCounts: {
//       total: number;
//       followUp: number;
//       fullOfTips: number;
//       thoroughAnalysis: number;
//     };
//   };
//   reviewData: {
//     view: {
//       level: number;
//       review: string;
//     };
//     sound: {
//       level: number;
//       review: string;
//     };
//     facility: {
//       level: number;
//       review: string;
//     };
//     rating: {
//       number: number;
//       story: number;
//       revisit: number;
//       actor: number;
//       performance: number;
//       total: number;
//       review: string;
//     };
//   };
//   tags: string[];
//   ticket: {
//     ticketId: number;
//     seat: string;
//     viewedDate: string;
//     imageUrl: string;
//     actors: string[];
//   };
//   title: string;
//   viewCount: number;
//   userId: number;
// };

const PremiumMyPage: React.FC<PremiumMyPageProps> = ({route}) => {
  const {reviewId} = route.params;
  const navigation = useNavigation();
  const [reviewData, setReviewData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState<ModalPosition | null>(
    null,
  );
  const iconRef = useRef<View>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  console.log('전달 받은 리뷰 아이디: ', reviewId);

  const fetchReiviewData = async () => {
    try {
      const response = await getTicketReview(reviewId);
      console.log(response.data.data);
      setReviewData(response.data.data);
    } catch (error) {
      Alert.alert('리뷰 작성 중에 문제가 발생했습니다.');
    }
  };

  useFocusEffect(() =>
    useCallback(() => {
      fetchReiviewData();
    }, []),
  );

  const handleGoBack = () => {
    const previousState = navigation.getState();
    const previousRouteName =
      previousState?.routes[previousState.routes.length - 2]?.name;

    console.log('이전 페이지: ', previousRouteName);

    if (previousRouteName === 'PremiumWritePage') {
      navigation.goBack();
      navigation.goBack();
      navigation.goBack();
      navigation.goBack();
      navigation.goBack();
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  const handleIconPress = () => {
    setModalVisible(true);
    if (iconRef.current) {
      iconRef.current.measureInWindow((x, y, width, height) => {
        setModalPosition({x, y, width, height});
      });
    }
  };

  // const renderItem: ListRenderItem<ReviewItems> = ({item}) => {
  //   if (!item) return null;
  //   return (
  //     <View>
  //       <Text>Review ID: {item.reviewId}</Text>
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView style={PremiumMyStyles.container}>
      <FlatList
        data={reviewData}
        keyExtractor={item => item.reviewId.toString()} // reviewId 사용
        renderItem={null}
        ListHeaderComponent={
          <>
            {/* 헤더 컴포넌트 */}
            <View style={PremiumMyStyles.containerHeader}>
              <TouchableOpacity onPress={() => handleGoBack()}>
                <SvgXml xml={PostIcon.arrowLeft} />
              </TouchableOpacity>
              <View style={PremiumMyStyles.containerRow}>
                <TouchableOpacity>
                  <SvgXml style={{marginRight: 11}} xml={PostIcon.upload} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleIconPress}>
                  <View ref={iconRef}>
                    <SvgXml xml={PostIcon.moreVertical} />
                  </View>
                </TouchableOpacity>
                {/* {modalPosition && (
                  <ModalModifyDelete
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    position={modalPosition}
                    postId={reviewId}
                    commentId={null}
                    onNavigation={navigation}
                  />
                )} */}
              </View>
            </View>
          </>
        }
        ListEmptyComponent={<Text>리뷰가 없습니다.</Text>}
      />
    </SafeAreaView>
  );
};

export default PremiumMyPage;

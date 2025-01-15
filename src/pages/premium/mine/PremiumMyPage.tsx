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
import {RootStackParamList} from 'types';
import {getTicketReview} from '@/api/review.api';

type PremiumMyPageRouteProp = RouteProp<RootStackParamList, 'PremiumMyPage'>;

type Props = {
  route: PremiumMyPageRouteProp;
};

type ModalPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ReviewItems = {
  reviewId: number;
};

const PremiumMyPage: React.FC<Props> = ({route}) => {
  const {reviewId} = route.params;
  const navigation = useNavigation();
  const [reviewData, setReviewData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState<ModalPosition | null>(
    null,
  );
  const iconRef = useRef<View>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  //   const fetchReview = async () => {
  //     try {
  //       const response = await getTicketReview(reviewId);
  //       console.log('리뷰 조회 결과: ', response.data.data);
  //       setReviewData(response.data.data);
  //     } catch (error) {
  //       Alert.alert('리뷰 작성 중 오류가 발생했습니다.');
  //       console.log(error);
  //     }
  //   };

  const fetchReview = async () => {
    try {
      setIsLoading(true); // 로딩 시작
      const response = await getTicketReview(reviewId);
      console.log('Response Data:', response.data.data);
      setReviewData(response.data.data);
    } catch (error) {
      if (error.response) {
        console.error('Response Error:', error.response.data);
        console.error('Status Code:', error.response.status);
        Alert.alert(
          '서버 에러',
          error.response.data.message || '알 수 없는 오류가 발생했습니다.',
        );
      } else if (error.request) {
        console.error('Request Error:', error.request);
        Alert.alert('네트워크 에러', '서버에 연결할 수 없습니다.');
      } else {
        console.error('Error Message:', error.message);
        Alert.alert('오류', '예상치 못한 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  //   const fetchReview = async () => {
  //     try {
  //       const response = await getTicketReview(review_id);
  //       console.log('리뷰 조회 결과: ', response.data.data);

  //       // 데이터가 객체라면 배열로 변환
  //       const reviewArray = Array.isArray(response.data.data)
  //         ? response.data.data
  //         : [response.data.data];

  //       setReviewData(reviewArray);
  //     } catch (error) {
  //       if (error.response) {
  //         console.error('Response Error:', error.response.data);
  //         Alert.alert(
  //           '서버 에러:',
  //           error.response.data.message || '알 수 없는 오류가 발생했습니다.',
  //         );
  //       } else if (error.request) {
  //         console.error('Request Error:', error.request);
  //         Alert.alert('네트워크 에러', '서버에 연결할 수 없습니다.');
  //       } else {
  //         console.error('Error Message:', error.message);
  //         Alert.alert('오류', '예상치 못한 오류가 발생했습니다.');
  //       }
  //     }
  //   };

  useFocusEffect(
    useCallback(() => {
      fetchReview();
    }, []),
  );

  console.log('Received reviewId:', reviewId, typeof reviewId);
  console.log(reviewData);

  const handleGoBack = () => {
    const previousState = navigation.getState();
    const previousRouteName =
      previousState?.routes[previousState.routes.length - 2]?.name;

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

  const renderItem: ListRenderItem<ReviewItems> = ({item}) => {
    if (!item) return null;
    return (
      <View>
        <Text>Review ID: {item.reviewId}</Text>
      </View>
    );
  };

  // return (
  //   // <SafeAreaView style={PremiumMyStyles.container}>
  //   //   <FlatList
  //   //     data={reviewData}
  //   //     keyExtractor={item => item.reviewId.toString()} // reviewId 사용
  //   //     renderItem={renderItem}
  //   //     ListHeaderComponent={
  //   //       <>
  //   //         {/* 헤더 컴포넌트 */}
  //   //         <View style={PremiumMyStyles.containerHeader}>
  //   //           <TouchableOpacity onPress={() => handleGoBack()}>
  //   //             <SvgXml xml={PostIcon.arrowLeft} />
  //   //           </TouchableOpacity>
  //   //           <View style={PremiumMyStyles.containerRow}>
  //   //             <TouchableOpacity>
  //   //               <SvgXml style={{marginRight: 11}} xml={PostIcon.upload} />
  //   //             </TouchableOpacity>
  //   //             <TouchableOpacity onPress={handleIconPress}>
  //   //               <View ref={iconRef}>
  //   //                 <SvgXml xml={PostIcon.moreVertical} />
  //   //               </View>
  //   //             </TouchableOpacity>
  //   //             {/* {modalPosition && (
  //   //               <ModalModifyDelete
  //   //                 modalVisible={modalVisible}
  //   //                 setModalVisible={setModalVisible}
  //   //                 position={modalPosition}
  //   //                 postId={reviewId}
  //   //                 commentId={null}
  //   //                 onNavigation={navigation}
  //   //               />
  //   //             )} */}
  //   //           </View>
  //   //         </View>
  //   //       </>
  //   //     }
  //   //     ListEmptyComponent={<Text>리뷰가 없습니다.</Text>}
  //   //   />
  //   // </SafeAreaView>
  //   <SafeAreaView style={PremiumMyStyles.container}>
  //     <FlatList
  //       data={reviewData}
  //       keyExtractor={item =>
  //         item?.reviewId ? item.reviewId.toString() : Math.random().toString()
  //       }
  //       renderItem={renderItem}
  //       ListEmptyComponent={<Text>리뷰가 없습니다.</Text>}
  //     />
  //   </SafeAreaView>
  // );
  return (
    <SafeAreaView style={PremiumMyStyles.container}>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" />
          <Text>로딩 중...</Text>
        </View>
      ) : (
        <FlatList
          data={reviewData}
          keyExtractor={item =>
            item?.reviewId ? item.reviewId.toString() : Math.random().toString()
          }
          renderItem={renderItem}
          ListEmptyComponent={<Text>리뷰가 없습니다.</Text>}
        />
      )}
    </SafeAreaView>
  );
};

export default PremiumMyPage;

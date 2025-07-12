import * as React from 'react';
import AppStyles from '../../AppStyles';
import {View, Text, TouchableOpacity, Alert.Alert} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import appTheme from '@/common/theme';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/common/queryClient';

import {RootStackParamList} from 'types';
import PremiumWriteScreen from '@/app/premium/PremiumWriteScreen';
import PremiumOthersScreen from '@/app/premium/PremiumOthersScreen';
import PremiumMyScreen from '@/app/premium/PremiumMyScreen';
import StopReviewModal from '@/components/alertModal/StopReviewModal';
import WriteScreen from './write/post/WriteScreen';
import PostScreen from './dashboard/post/PostScreen';
import ModifyScreen from './write/post/ModifyScreen';
// import PostHashtagScreen from './src/screens/dashboard/post/hashtag/PostHashtagScreen';
import SaveScreen from './write/save/SaveScreen';
import DashboardSearchScreenList from './dashboard/search/DashboardSearchScreenList';
import DashboardSearchDefaultScreen from './search/DashboardSearchDefaultScreen';
import HomeSearchScreen from '@/app/home/HomeSearchScreen';
import HomeSearchDefaultScreen from '@/app/home/HomeSearchDefaultScreen';
import HomeBannerScreen from '@/app/home/HomeBannerScreen';
import AddTicketScreen from '@/app/ticketBook/AddTicketScreen';
import TicketDetailScreen from '@/app/ticketBook/TicketDetailScreen';
import LoginScreen from '@/app/auth/LoginScreen';
import SignUpScreen from '@/app/auth/SignUpScreen';
import ProfileSettingScreen from '@/app/auth/ProfileSettingScreen';
import ProfileCardScreen from '@/app/auth/ProfileCardScreen';

import { AddTicketProvider } from '@/state/AddTicketContext';
import {OnboardingProvider} from '@/state/OnboardingContext';
import MusicalDetailScreen from '@/app/musical/MusicalDetailScreen';
import ModifyProfileImg from './myScreen/ModifyProfileImg';
import NotificationSettings from './myScreen/NotificationSettings';
import MarketingDetails from './myScreen/MarketingDetails';
import {createPost, putPost} from '@/api/post.api';
import { ensureAsyncStorageDir } from '@/util/ensureAsyncStorageDir';
import {ThemeProvider} from 'styled-components';

interface PostData {
  title: string;
  content: string;
  post_type: string;
  category: string;
  hashTags: string[];
  imgUrls: string[];
}

interface ModifyData {
  postId: number;
  category: string;
  post_type: string;
  title: string;
  content: string;
  imgUrls?: string[];
  hashTags: string[];
  isNotice?: boolean;
  isTemporarySave?: boolean;
}

// 글 작성 페이지 내 뒤로가기 버튼
function CustomBackButton({navigation}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={AppStyles.back_button}>
      <SvgXml
        xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.0303 4.46967C16.2966 4.73594 16.3208 5.1526 16.1029 5.44621L16.0303 5.53033L9.561 12L16.0303 18.4697C16.2966 18.7359 16.3208 19.1526 16.1029 19.4462L16.0303 19.5303C15.7641 19.7966 15.3474 19.8208 15.0538 19.6029L14.9697 19.5303L7.96967 12.5303C7.7034 12.2641 7.6792 11.8474 7.89705 11.5538L7.96967 11.4697L14.9697 4.46967C15.2626 4.17678 15.7374 4.17678 16.0303 4.46967Z" fill="black"/>
        </svg>`}
      />
    </TouchableOpacity>
  );
}

// 글 작성 페이지 내 x 버튼
function CustomCloseButton({setModalVisible}) {
  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={AppStyles.close_button}>
      <SvgXml
        xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`}
      />
    </TouchableOpacity>
  );
}

// 프리미엄 리뷰 작성 내 뒤로 가기 버튼
function CustomPreviousButton({goToPrevious}: {goToPrevious: () => void}) {
  return (
    <TouchableOpacity onPress={goToPrevious} style={AppStyles.back_button}>
      <SvgXml
        xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.0303 4.46967C16.2966 4.73594 16.3208 5.1526 16.1029 5.44621L16.0303 5.53033L9.561 12L16.0303 18.4697C16.2966 18.7359 16.3208 19.1526 16.1029 19.4462L16.0303 19.5303C15.7641 19.7966 15.3474 19.8208 15.0538 19.6029L14.9697 19.5303L7.96967 12.5303C7.7034 12.2641 7.6792 11.8474 7.89705 11.5538L7.96967 11.4697L14.9697 4.46967C15.2626 4.17678 15.7374 4.17678 16.0303 4.46967Z" fill="black"/>
        </svg>`}
      />
    </TouchableOpacity>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [postData, setPostData] = React.useState<PostData | null>(null);
  const [modifyData, setModifyData] = React.useState<ModifyData | null>(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    ensureAsyncStorageDir();
  }, []);

  const postTypeMapping: Record<string, string> = {
    '게시판 선택 안함': 'NO_SELECT',
    '정보 게시판': 'INFORMATION',
    '후기 게시판': 'REVIEW',
    '배우 게시판': 'ACTOR',
    '자유 게시판': 'FREE',
  };

  const categoryMapping: Record<string, string> = {
    '카테고리 선택': 'NO_SELECT',
    '선택 안함': 'NO_SELECT',
    '오페라 글라스': 'OPERA_GLASS_RENTAL',
    '뮤지컬 용어': 'MUSICAL_TERMS',
    이벤트: 'EVENTS',
    '시야 후기': 'VIEW_REVIEW',
    '굿즈 후기': 'GOODS_REVIEW',
    '공연 감상': 'PERFORMANCE_REVIEW',
  };

  const handleRegister = async navigation => {
    if (postData) {
      const apiPostType =
        postTypeMapping[postData.post_type] || postData.post_type;
      const apiCategory =
        categoryMapping[postData.category] || postData.category;

      // console.log('전송 데이터: ', {
      //   category: apiCategory,
      //   post_type: apiPostType,
      //   title: postData.title,
      //   content: postData.content,
      //   hashTags: postData.hashTags,
      //   imgUrls: postData.imgUrls,
      // });

      try {
        const response = await createPost(
          apiCategory,
          apiPostType,
          postData.title,
          postData.content,
          postData.hashTags,
          postData.imgUrls,
        );

        // console.log('서버 응답: ', response.data);

        if (response?.data?.code === 1000 && response?.data?.data?.post_id) {
          const postId = response.data.data.post_id;

          console.log('글이 성공적으로 등록되었습니다!');
          Alert.alert('글이 성공적으로 등록되었습니다.');

          setTimeout(() => {
            navigation.navigate('PostScreen', {postId});
          }, 0);
        } else {
          Alert.alert('게시글 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        Alert.alert('게시글 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    } else {
      console.error('postData가 비어 있습니다.');
      Alert.alert('등록할 데이터가 없습니다.');
    }
  };

  const fetchPutPost = async navigation => {
    if (modifyData) {
      const {
        postId,
        category,
        post_type,
        title,
        content,
        imgUrls,
        hashTags,
        isNotice,
        isTemporarySave,
      } = modifyData;
      try {
        const apiPostType =
          postTypeMapping[modifyData.post_type] || modifyData.post_type;
        const apiCategory =
          categoryMapping[modifyData.category] || modifyData.category;
        const response = await putPost(postId, {
          category: apiCategory,
          post_type: apiPostType,
          title,
          content,
          imgUrls: [],
          hashTags,
          isNotice: false,
          isTemporarySave: false,
        });
        if (response.status === 201 || response.status === 200) {
          console.log('글이 성공적으로 수정되었습니다!');
          Alert.alert('글이 성공적으로 수정되었습니다.');

          setTimeout(() => {
            navigation.goBack();
          }, 500);
        }
      } catch (error) {
        console.error('게시글 수정 오류:', error);
      }
    } else {
      console.log('No data from ModifyScreen');
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme}>
        <SafeAreaProvider>
          <OnboardingProvider>
            <AddTicketProvider>
              <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName="LoginScreen">
                  {/* 홈 배너 페이지 */}
                  <Stack.Screen
                    name="HomeBannerScreen"
                    component={HomeBannerScreen}
                    options={{
                      headerShown: false,
                      cardStyle: {backgroundColor: '#FBFBFB'},
                    }}
                  />

                  {/* 홈 검색 페이지 */}
                  <Stack.Screen
                    name="HomeSearchScreen"
                    component={HomeSearchScreen}
                    options={{
                      headerShown: false,
                      cardStyle: {backgroundColor: '#FBFBFB'},
                    }}
                  />
                  <Stack.Screen
                    name="HomeSearchDefaultScreen"
                    component={HomeSearchDefaultScreen}
                    options={{
                      headerShown: false,
                      cardStyle: {backgroundColor: '#FBFBFB'},
                    }}
                  />
                  <Stack.Screen
                    name="MusicalDetailScreen"
                    component={MusicalDetailScreen}
                    options={({navigation}) => ({
                      headerStyle: {
                        height: 123,
                        backgroundColor: '#FBFBFB',
                      },
                      title: '뮤지컬 공연 정보',
                      headerTitleStyle: {...AppStyles.title},
                      headerLeft: () => (
                        <CustomBackButton navigation={navigation} />
                      ),
                    })}
                  />
                  {/* 프리미엄 후기 작성 페이지*/}
                  <Stack.Screen
                    name="PremiumWriteScreen"
                    options={({navigation}) => ({
                      headerStyle: {
                        height: 123,
                        backgroundColor: '#FBFBFB',
                      },
                      title: '프리미엄 리뷰 작성',
                      headerTitleStyle: {...AppStyles.title},
                      headerLeft: () => (
                        <CustomPreviousButton
                          goToPrevious={() => {
                            const premiumWriteScreenInstance = navigation
                              .getState()
                              .routes.find(
                                route => route.name === 'PremiumWriteScreen',
                              );
                            if (
                              premiumWriteScreenInstance?.params?.goToPrevious
                            ) {
                              premiumWriteScreenInstance.params.goToPrevious();
                            } else {
                              navigation.goBack();
                            }
                          }}
                        />
                      ),
                      headerRight: () => (
                        <CustomCloseButton setModalVisible={setModalVisible} />
                      ),
                    })}>
                    {props => (
                      <PremiumWriteScreen
                        {...props}
                        goToPrevious={props.route.params?.goToPrevious}
                      />
                    )}
                  </Stack.Screen>
                  {/* 다른 사람 프리미엄 리뷰 상세 페이지*/}
                  <Stack.Screen
                    name="PremiumOthersScreen"
                    component={PremiumOthersScreen}
                    options={{headerShown: false}}
                  />
                  {/* 자신이 작성한 프리미엄 리뷰 상세 페이지 */}
                  <Stack.Screen
                    name="PremiumMyScreen"
                    component={PremiumMyScreen}
                    options={{headerShown: false}}
                  />
                  {/* 게시판 작성 페이지*/}
                  <Stack.Screen
                    name="WriteScreen"
                    options={({navigation}) => ({
                      headerStyle: {
                        height: 123,
                        backgroundColor: '#FBFBFB',
                      },
                      title: '글 작성하기',
                      headerTitleStyle: {...AppStyles.title},
                      headerLeft: () => (
                        <CustomBackButton navigation={navigation} />
                      ),
                      headerRight: () => (
                        <TouchableOpacity
                          onPress={() => handleRegister(navigation)}
                          style={AppStyles.register_button}>
                          <View style={AppStyles.register_container}>
                            <Text style={AppStyles.register_text}>등록</Text>
                          </View>
                        </TouchableOpacity>
                      ),
                    })}>
                    {props => (
                      <WriteScreen {...props} setPostData={setPostData} />
                    )}
                  </Stack.Screen>
                  {/* 게시글 상세 페이지 */}
                  <Stack.Screen
                    name="PostScreen"
                    component={PostScreen}
                    // initialParams={{postId: 0}}
                    options={{headerShown: false}}
                  />
                  {/* 게시글 수정 페이지 */}
                  <Stack.Screen
                    name="ModifyScreen"
                    options={({navigation}) => ({
                      headerStyle: {
                        height: 123,
                        backgroundColor: '#FBFBFB',
                      },
                      title: '글 수정하기',
                      headerTitleStyle: {...AppStyles.title},
                      headerLeft: () => (
                        <CustomBackButton navigation={navigation} />
                      ),
                      headerRight: () => (
                        <TouchableOpacity
                          onPress={() => fetchPutPost(navigation)}
                          style={AppStyles.register_button}>
                          <View style={AppStyles.register_container}>
                            <Text style={AppStyles.register_text}>수정</Text>
                          </View>
                        </TouchableOpacity>
                      ),
                    })}>
                    {props => (
                      <ModifyScreen {...props} setModifyData={setModifyData} />
                    )}
                  </Stack.Screen>
                  {/* 게시글 해시태그 검색 페이지 */}
                  {/* <Stack.Screen
                name="PostHashtagScreen"
                component={PostHashtagScreen}
                options={{headerShown: false}}
              /> */}
                  {/* 게시글 임시 저장 목록 페이지 */}
                  <Stack.Screen
                    name="SaveScreen"
                    component={SaveScreen}
                    options={({navigation}) => ({
                      headerStyle: {
                        height: 123,
                        backgroundColor: '#FBFBFB',
                      },
                      title: '임시저장 목록',
                      headerTitleStyle: {...AppStyles.title},
                      headerLeft: () => (
                        <CustomBackButton navigation={navigation} />
                      ),
                    })}
                  />
                  {/* 게시판 검색 페이지 */}
                  <Stack.Screen
                    name="DashboardSearchScreenList"
                    component={DashboardSearchScreenList}
                    options={{
                      headerShown: false,
                      cardStyle: {backgroundColor: '#FBFBFB'},
                    }}
                  />
                  <Stack.Screen
                    name="DashboardSearchDefaultScreen"
                    component={DashboardSearchDefaultScreen}
                    options={{
                      headerShown: false,
                      cardStyle: {backgroundColor: '#FBFBFB'},
                    }}
                  />
                  <Stack.Screen
                    name="AddTicketScreen"
                    component={AddTicketScreen}
                    options={{
                      headerShown: false,
                      cardStyle: {backgroundColor: '#FBFBFB'},
                    }}
                  />
                  <Stack.Screen
                    name="TicketDetailScreen"
                    component={TicketDetailScreen}
                    options={{
                      headerShown: false,
                      cardStyle: {backgroundColor: '#FBFBFB'},
                    }}
                  />
                  {/* 마이페이지: 프로필 수정 페이지 */}
                  <Stack.Screen
                    name="ModifyProfileImg"
                    component={ModifyProfileImg}
                    options={({navigation}) => ({
                      headerStyle: {
                        height: 123,
                        backgroundColor: '#FBFBFB',
                      },
                      title: '프로필 수정',
                      headerTitleStyle: {...AppStyles.title},
                      headerLeft: () => (
                        <CustomBackButton navigation={navigation} />
                      ),
                    })}
                  />
                  {/* 마이페이지: 수신 설정 페이지 */}
                  <Stack.Screen
                    name="NotificationSettings"
                    component={NotificationSettings}
                    options={({navigation}) => ({
                      headerStyle: {
                        height: 123,
                        backgroundColor: '#FBFBFB',
                      },
                      title: '수신 설정',
                      headerTitleStyle: {...AppStyles.title},
                      headerLeft: () => (
                        <CustomBackButton navigation={navigation} />
                      ),
                    })}
                  />
                  {/* 마이페이지: 마케팅 정보 수신 페이지 */}
                  <Stack.Screen
                    name="MarketingDetails"
                    component={MarketingDetails}
                    options={({navigation}) => ({
                      headerStyle: {
                        height: 123,
                        backgroundColor: '#FBFBFB',
                      },
                      title: '마케팅 정보 수신',
                      headerTitleStyle: {...AppStyles.title},
                      headerLeft: () => (
                        <CustomBackButton navigation={navigation} />
                      ),
                    })}
                  />
                </Stack.Navigator>
                {/* 프리미엄 리뷰 그만둘 시 뜨는 모달 */}
                <StopReviewModal
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                />
              </NavigationContainer>
            </AddTicketProvider>
          </OnboardingProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

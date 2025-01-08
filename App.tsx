import * as React from 'react';
import AppStyles from './AppStyles';
import {View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from './types';
import Tabs from './src/components/navigation/Tabs';
import PremiumWritePage from './src/pages/write/review/PremiumWritePage';
import WritePage from './src/pages/write/post/WritePage';
import PostPage from './src/pages/dashboard/post/PostPage';
import ModifyPage from './src/pages/write/post/ModifyPage';
import SavePage from './src/pages/write/save/SavePage';
import DashboardSearchPage from './src/pages/dashboard/search/DashboardSearchPage';
import DashboardSearchDefaultPage from './src/pages/search/DashboardSearchDefaultPage';
import HomeSearchPage from './src/pages/home/search/HomeSearchPage';
import HomeSearchDefaultPage from './src/pages/search/HomeSearchDefaultPage';
import HomeBannerPage from './src/pages/home/HomeBannerPage';
import AddTicketPage from './src/pages/ticketbook/AddTicketPage';
import TicketDetailPage from './src/pages/ticketbook/TicketDetailPage';
import {AddTicketProvider} from './src/state/AddTicketContext';

import {createPost, putPost} from './src/api/post.api';
import {ensureAsyncStorageDir} from './src/util/ensureAsyncStorageDir';

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
function CustomCloseButton({navigation}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={AppStyles.close_button}>
      <SvgXml
        xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `}
      />
    </TouchableOpacity>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [postData, setPostData] = React.useState<PostData | null>(null);
  const [modifyData, setModifyData] = React.useState<ModifyData | null>(null);

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
          alert('글이 성공적으로 등록되었습니다.');

          setTimeout(() => {
            navigation.navigate('PostPage', {postId});
          }, 0);
        } else {
          alert('게시글 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        alert('게시글 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    } else {
      console.error('postData가 비어 있습니다.');
      alert('등록할 데이터가 없습니다.');
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
          alert('글이 성공적으로 수정되었습니다.');

          setTimeout(() => {
            navigation.goBack();
          }, 500);
        }
      } catch (error) {
        console.error('게시글 수정 오류:', error);
      }
    } else {
      console.log('No data from ModifyPage');
    }
  };

  return (
    <SafeAreaProvider>
      <AddTicketProvider>
        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName="Tabs">
            <Stack.Screen
              name="Tabs"
              component={props => <Tabs {...props} postData={postData} />}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HomeBannerPage"
              component={HomeBannerPage}
              options={{
                headerShown: false,
                cardStyle: {backgroundColor: '#FBFBFB'},
              }}
            />

            {/* 홈 검색 페이지 */}
            <Stack.Screen
              name="HomeSearchPage"
              component={HomeSearchPage}
              options={{
                headerShown: false,
                cardStyle: {backgroundColor: '#FBFBFB'},
              }}
            />
            <Stack.Screen
              name="HomeSearchDefaultPage"
              component={HomeSearchDefaultPage}
              options={{
                headerShown: false,
                cardStyle: {backgroundColor: '#FBFBFB'},
              }}
            />

            {/* 프리미엄 후기 작성 페이지*/}
            <Stack.Screen
              name="PremiumWritePage"
              options={({navigation}) => ({
                headerStyle: {
                  height: 123,
                  backgroundColor: '#FBFBFB',
                },
                title: '프리미엄 리뷰 작성',
                headerTitleStyle: {...AppStyles.title},
                headerLeft: () => <CustomBackButton navigation={navigation} />,
                headerRight: () => (
                  <CustomCloseButton navigation={navigation} />
                ),
              })}>
              {props => <PremiumWritePage />}
            </Stack.Screen>

            {/* 게시판 작성 페이지*/}
            <Stack.Screen
              name="WritePage"
              options={({navigation}) => ({
                headerStyle: {
                  height: 123,
                  backgroundColor: '#FBFBFB',
                },
                title: '글 작성하기',
                headerTitleStyle: {...AppStyles.title},
                headerLeft: () => <CustomBackButton navigation={navigation} />,
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
              {props => <WritePage {...props} setPostData={setPostData} />}
            </Stack.Screen>
            {/* 게시글 상세 페이지 */}
            <Stack.Screen
              name="PostPage"
              component={PostPage}
              initialParams={{postId: 5}}
              options={{headerShown: false}}
            />
            {/* 게시글 수정 페이지 */}
            <Stack.Screen
              name="ModifyPage"
              options={({navigation}) => ({
                headerStyle: {
                  height: 123,
                  backgroundColor: '#FBFBFB',
                },
                title: '글 수정하기',
                headerTitleStyle: {...AppStyles.title},
                headerLeft: () => <CustomBackButton navigation={navigation} />,
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
              {props => <ModifyPage {...props} setModifyData={setModifyData} />}
            </Stack.Screen>
            {/* 게시글 임시 저장 목록 페이지 */}
            <Stack.Screen
              name="SavePage"
              component={SavePage}
              options={({navigation}) => ({
                headerStyle: {
                  height: 123,
                  backgroundColor: '#FBFBFB',
                },
                title: '임시저장 목록',
                headerTitleStyle: {...AppStyles.title},
                headerLeft: () => <CustomBackButton navigation={navigation} />,
              })}
            />
            {/* 게시판 검색 페이지 */}
            <Stack.Screen
              name="DashboardSearchPage"
              component={DashboardSearchPage}
              options={{
                headerShown: false,
                cardStyle: {backgroundColor: '#FBFBFB'},
              }}
            />
            <Stack.Screen
              name="DashboardSearchDefaultPage"
              component={DashboardSearchDefaultPage}
              options={{
                headerShown: false,
                cardStyle: {backgroundColor: '#FBFBFB'},
              }}
            />
            <Stack.Screen
              name="AddTicketPage"
              component={AddTicketPage}
              options={{
                headerShown: false,
                cardStyle: {backgroundColor: '#FBFBFB'},
              }}
            />
            <Stack.Screen
              name="TicketDetailPage"
              component={TicketDetailPage}
              options={{
                headerShown: false,
                cardStyle: {backgroundColor: '#FBFBFB'},
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AddTicketProvider>
    </SafeAreaProvider>
  );
}

import * as React from 'react';
import AppStyles from './AppStyles';
import {View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Tabs from './src/components/navigation/Tabs';
import WritePage from './src/pages/write/WritePage';
import PostPage from './src/pages/dashboard/post/PostPage';
import SavePage from './src/pages/write/save/SavePage';

import {createPost} from './src/api/post.api.tsx';

interface PostData {
  title: string;
  content: string;
  post_type: string;
  category: string;
  hashTags: string[];
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

const Stack = createStackNavigator();

export default function App() {
  const [postData, setPostData] = React.useState<PostData | null>(null);

  const postTypeMapping: Record<string, string> = {
    '게시판 선택 안함': '',
    '정보 게시판': 'INFORMATION',
    '후기 게시판': 'REVIEW',
    '배우 게시판': 'ACTOR',
    '자유 게시판': 'FREE',
  };

  const categoryMapping: Record<string, string> = {
    '선택 안함': '',
    '시야 후기': 'VIEW_REVIEW',
    '굿즈 후기': 'GOODS_REVIEW',
    '공연 감상': 'PERFORMANCE_REVIEW',
  };

  const handleRegister = async () => {
    if (postData) {
      const apiPostType =
        postTypeMapping[postData.post_type] || postData.post_type;
      const apiCategory =
        categoryMapping[postData.category] || postData.category;

      console.log('전달받은 데이터: ', postData);
      console.log('PostType: ', apiPostType);
      console.log('Category: ', apiCategory);

      try {
        const response = await createPost(
          apiCategory,
          apiPostType,
          postData.title,
          postData.content,
          postData.hashTags,
        );
        console.log('API RESPONSE: ', response.data);
      } catch (error) {
        if (error.response) {
          // 서버가 응답했지만, 상태 코드가 2xx 범위에 있지 않음
          console.log('Error Response Data:', error.response.data);
          console.log('Error Response Status:', error.response.status);
          console.log('Error Response Headers:', error.response.headers);
        } else if (error.request) {
          // 요청이 이루어졌으나, 응답을 받지 못함
          console.log('Error Request:', error.request);
        } else {
          // 요청 설정 중 에러가 발생한 경우
          console.log('Error Message:', error.message);
        }
        console.log('Error Config:', error.config);
      }
    } else {
      console.log('No data from WritePage');
    }
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Tabs">
          <Stack.Screen
            name=" "
            component={Tabs}
            options={{headerShown: false}}
          />
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
                  onPress={() => handleRegister()}
                  style={AppStyles.register_button}>
                  <View style={AppStyles.register_container}>
                    <Text style={AppStyles.register_text}>등록</Text>
                  </View>
                </TouchableOpacity>
              ),
            })}>
            {props => <WritePage {...props} setPostData={setPostData} />}
          </Stack.Screen>
          <Stack.Screen
            name="PostPage"
            component={PostPage}
            options={{headerShown: false}}
          />
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

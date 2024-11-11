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

// 글 작성 페이지 내 등록 버튼
function CustomRegisterButton({navigation}) {
  return (
    <TouchableOpacity
      // 추후에 등록된 글 리스트로 이동하게끔 수정 필요
      onPress={() => navigation.goBack()}
      style={AppStyles.register_button}>
      <View style={AppStyles.register_container}>
        <Text style={AppStyles.register_text}>등록</Text>
      </View>
    </TouchableOpacity>
  );
}

const Stack = createStackNavigator();

export default function App(): JSX.Element {
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
            component={WritePage}
            options={({navigation}) => ({
              headerStyle: {
                height: 123,
                backgroundColor: '#FBFBFB',
              },
              title: '글 작성하기',
              headerTitleStyle: {...AppStyles.title},
              headerLeft: () => <CustomBackButton navigation={navigation} />,
              headerRight: () => (
                <CustomRegisterButton navigation={navigation} />
              ),
            })}
          />
          <Stack.Screen
            name="PostPage"
            component={PostPage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

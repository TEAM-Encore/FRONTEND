import React, {useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import PostStyles from '../PostStyles';
import PostHashtagStyles from './PostHashtagStyles';
import {SearchIcon} from '@/assets/icons/search/SearchIcon';

// 1. Stack Param 타입 정의 (선택)
type RootStackParamList = {
  PostHashtagScreen: {hashTag: string};
};

const PostHashtagScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'PostHashtagScreen'>>();
  const {hashTag} = route.params;
  const [text, setText] = useState<string>(hashTag);
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Entire');

  if (text.trim() === '') {
    return <DefaultView />;
  }
  // 검색 중 화면
  return <DashboardSearchScreen postData={postData} />;
};

  return (
    <SafeAreaView style={PostStyles.container}>
      {/* 검색바 */}
      <View style={PostHashtagStyles.searchBarContainer}>
        <View style={PostHashtagStyles.searchBar}>
          {/* <TouchableOpacity onPress={() => fetchSearchList(text)}> */}
          <TouchableOpacity>
            <SvgXml
              xml={SearchIcon.searchIcon}
              style={PostHashtagStyles.icon}
            />
          </TouchableOpacity>
          <TextInput
            style={PostHashtagStyles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="해시태그 검색"
            // onSubmitEditing={() => fetchSearchList(text)}
          />
          {text.length > 0 && (
            <TouchableOpacity
              style={PostHashtagStyles.clearButton}
              onPress={() => {
                setText('');
              }}>
              <SvgXml xml={SearchIcon.closeIcon} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>취소</Text>
        </TouchableOpacity>
      </View>

      <View style={PostHashtagStyles.tabContainer}>
        {['Entire', 'Information', 'Review', 'Actor', 'Free'].map(
          (tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedTab(tab)}
              style={[
                PostHashtagStyles.tabButton,
                selectedTab === tab && PostHashtagStyles.activeTabButton,
              ]}>
              <Text
                style={[
                  PostHashtagStyles.tabText,
                  selectedTab === tab && PostHashtagStyles.activeTabText,
                ]}>
                {tab === 'Entire'
                  ? '전체'
                  : tab === 'Information'
                  ? '정보'
                  : tab === 'Review'
                  ? '후기'
                  : tab === 'Actor'
                  ? '배우'
                  : '자유'}
              </Text>
              {selectedTab === tab && (
                <View style={PostHashtagStyles.activeTabUnderline} />
              )}
            </TouchableOpacity>
          ),
        )}
      </View>

      {/* 검색 바 하단 화면 */}
      {renderComponent()}
    </SafeAreaView>
  );
};

export default PostHashtagScreen;

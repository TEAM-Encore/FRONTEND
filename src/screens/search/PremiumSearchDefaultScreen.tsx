import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SearchIcon} from '@/assets/icons/search/SearchIcon';
import SearchStyles from '@/screens/dashboard/search/SearchStyles';
import {RootStackParamList} from 'types';

type PremiumSearchPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PremiumSearchDefaultScreen'
>;

const PremiumSearchDefaultScreen: React.FC = () => {
  const navigation = useNavigation<PremiumSearchPageNavigationProp>();
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // 나중에 검색 로직이 들어갈 부분
  const fetchPremiumSearchResults = async () => {
    setLoading(true);
    try {
      // TODO: 프리미엄 검색 요청 로직
      console.log(`[DEBUG] 검색어: ${text}`);
    } catch (error) {
      console.error('Premium search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" />;
    }

    if (text === '') {
      return (
        <View style={SearchStyles.noHistoryContainer}>
          <Text style={SearchStyles.recentSearchTitle}>검색어를 입력해주세요</Text>
        </View>
      );
    }

    return (
      <View style={{padding: 16}}>
        <Text>🔍 "{text}"에 대한 프리미엄 검색 결과 표시 예정</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={SearchStyles.container}>
      {/* 상단 검색바 */}
      <View style={SearchStyles.searchBarContainer}>
        <View style={SearchStyles.searchBar}>
          <TouchableOpacity onPress={fetchPremiumSearchResults}>
            <SvgXml xml={SearchIcon.searchIcon} style={SearchStyles.icon} />
          </TouchableOpacity>
          <TextInput
            style={SearchStyles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="프리미엄 게시판 검색"
            onSubmitEditing={fetchPremiumSearchResults}
          />
          {text.length > 0 && (
            <TouchableOpacity
              style={SearchStyles.clearButton}
              onPress={() => setText('')}>
              <SvgXml xml={SearchIcon.closeIcon} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>취소</Text>
        </TouchableOpacity>
      </View>

      {/* 검색 결과 또는 안내 메시지 */}
      {renderContent()}
    </SafeAreaView>
  );
};

export default PremiumSearchDefaultScreen;

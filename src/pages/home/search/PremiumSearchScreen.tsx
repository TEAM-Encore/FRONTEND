import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert, FlatList} from 'react-native';
import HomeStyles from '../HomeStyles';
import {getSearchMusical} from '@/api/musical.api';
import {useFocusEffect} from '@react-navigation/native';

type SearchScreenProps = {
  postData: any;
  text: string;
};

const PremiumSearchScreen: React.FC<SearchScreenProps> = ({postData, text}) => {
  //   console.log('Musical Search Screen에 도달한 데이터: ', postData);
  console.log('PremiumSearchScreen에 도달한 검색어: ', text);

  const [data, setData] = useState();

  const fetchMusicalSearch = async () => {
    try {
      const response = await getSearchMusical(text);
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log('error: ', error);
      Alert.alert('프리미엄 리뷰 검색 중에 문제가 발생했습니다.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMusicalSearch();
    }, [text]),
  );

  const renderItem = ({item}: {item: {title: string; series: number}}) => (
    <View>
      <View style={HomeStyles.chip}>
        <Text style={HomeStyles.chipText}>NOW</Text>
      </View>
      <Text style={HomeStyles.musicalSearchTitle}>{item.title}</Text>
      <Text style={HomeStyles.seriesSearchText}>
        {mapSeriesToText(item.series)}
      </Text>
    </View>
  );

  const mapSeriesToText = (series: number): string => {
    switch (series) {
      case 1:
        return '초연';
      case 2:
        return '재연';
      case 3:
        return '3연';
      default:
        return `${series}연`;
    }
  };
  return (
    <View>
      <View style={HomeStyles.resultContainer}>
        <Text style={HomeStyles.resultText}>프리미엄</Text>
      </View>
      <View style={{marginTop: 19, marginHorizontal: 20}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 20}}>
              검색 결과가 없습니다.
            </Text>
          }
        />
      </View>
      <View style={HomeStyles.line2} />
    </View>
  );
};

export default PremiumSearchScreen;

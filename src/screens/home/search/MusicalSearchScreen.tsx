import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import HomeStyles from '../HomeStyles';
import {getSearchMusical} from '@/api/musical.api';
import {useFocusEffect} from '@react-navigation/native';

type SearchScreenProps = {
  postData: any;
  text: string;
};

const MusicalSearchScreen: React.FC<SearchScreenProps> = ({postData, text}) => {
  //   console.log('Musical Search Screen에 도달한 데이터: ', postData);
  console.log('Musical Search Screen에 도달한 검색어: ', text);

  const [data, setData] = useState();

  const fetchMusicalSearch = async () => {
    try {
      const response = await getSearchMusical(text);
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log('error: ', error);
      Alert.alert('공연 정보 검색 중에 문제가 발생했습니다.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMusicalSearch();
    }, [text]),
  );

  const renderItem = ({
    item,
  }: {
    item: {title: string; series: number; image_url: string};
  }) => (
    <View style={HomeStyles.containerRow}>
      <View>
        <View style={HomeStyles.chip}>
          <Text style={HomeStyles.chipText}>NOW</Text>
        </View>
        <Text style={HomeStyles.musicalSearchTitle}>{item.title}</Text>
        <Text style={HomeStyles.seriesSearchText}>
          {mapSeriesToText(item.series)}
        </Text>
      </View>

      <Image
        source={{uri: item.image_url}}
        style={HomeStyles.searchMusicalImage}
      />
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
        <Text style={HomeStyles.resultText}>공연 정보</Text>
      </View>
      <View style={{marginTop: 19, marginHorizontal: 20}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginVertical: 20}}>
              검색 결과가 없습니다.
            </Text>
          }
        />
      </View>
    </View>
  );
};

export default MusicalSearchScreen;

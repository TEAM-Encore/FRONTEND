import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SearchList from './SearchList';
import SearchStyles from './SearchStyles';

type SearchScreenProps = {
  postData: any;
};

const SearchScreen: React.FC<SearchScreenProps> = ({postData}) => {
  console.log('Search Screen에 도달한 데이터: ', postData);

  const [selectedFilter, setSelectedFilter] = useState<'최신순' | '인기순'>(
    '최신순',
  );

  const handlePress = (filter: '최신순' | '인기순') => {
    if (selectedFilter !== filter) {
      setSelectedFilter(filter);
    }
  };

  return (
    <View>
      <View style={SearchStyles.resultContainer}>
        <Text style={SearchStyles.resultText}>검색 결과</Text>
        <View style={SearchStyles.containerRow}>
          <TouchableOpacity onPress={() => handlePress('최신순')}>
            <Text
              style={[
                selectedFilter === '최신순'
                  ? SearchStyles.filter
                  : SearchStyles.tab_filter,
                {marginRight: 12},
              ]}>
              최신순
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('인기순')}>
            <Text
              style={[
                selectedFilter === '최신순'
                  ? SearchStyles.tab_filter
                  : SearchStyles.filter,
              ]}>
              인기순
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 19}}>
        <SearchList postData={postData} selectedFilter={selectedFilter} />
      </View>
    </View>
  );
};

export default SearchScreen;

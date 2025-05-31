import HomeStyles from '@/app/home/HomeScreen/style';
import React, {useCallback} from 'react';
import {FlatList, Image, ListRenderItem, Text, View} from 'react-native';
import styled from 'styled-components/native';
import useFeaturedMusicals from '../../hooks/useFeaturedMusicals';
import {IMusical} from '@/api/musical.api';
import {TouchableOpacity} from 'react-native';
import useAppNavigation from '@/app/useAppNavigation';
import DateUtil from '@/util/DateUtil';

function FeaturedMusicals() {
  const {navigate} = useAppNavigation();
  const {featuredMusicals} = useFeaturedMusicals();

  const renderItem: ListRenderItem<IMusical> = useCallback(({item}) => {
    return (
      <View
        style={{
          flexDirection: 'column',
          width: 125,
        }}>
        <TouchableOpacity
          onPress={() => navigate('MusicalDetailScreen', {data: item})}>
          <Image
            style={HomeStyles.imageMusical}
            source={{uri: item.image_url}}
          />
        </TouchableOpacity>
        <Text
          style={HomeStyles.textMusicalTitle}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={HomeStyles.textMusicalDateLocation}>
          {DateUtil.formatYYMMDD(item.start_date)} ~{' '}
          {DateUtil.formatYYMMDD(item.end_date)}
        </Text>
        <Text
          style={HomeStyles.textMusicalDateLocation}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.location}
        </Text>
      </View>
    );
  }, []);

  return (
    <Root>
      <Header>
        <Text style={HomeStyles.textTitle}>이달의 인기 뮤지컬</Text>
      </Header>

      <FlatList
        data={featuredMusicals}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        ItemSeparatorComponent={() => <Gap />}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{paddingHorizontal: 20}}
      />
    </Root>
  );
}

export default FeaturedMusicals;

const Root = styled.View`
  padding-bottom: 20px;
`;

const Header = styled.View`
  padding: 20px;
`;

const Gap = styled.View`
  width: 15px;
`;

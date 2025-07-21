import HomeStyles from '@/app/home/HomeScreen/style';
import React, {useCallback} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import useUpcomingMusicals from '../../hooks/useUpcomingMusicals';
import {IMusical} from '@/api/musical.api';
import DateUtil from '@/util/DateUtil';
import useAppNavigation from '@/features/core/hooks/useAppNavigation';

function UpcomingMusicals() {
  const {navigate} = useAppNavigation();

  const {upcomingMusicals} = useUpcomingMusicals();

  const renderItem: ListRenderItem<IMusical> = useCallback(({item}) => {
    const handlePress = () => {
      navigate('MusicalDetailScreen', {data: item});
    };

    return (
      <View
        style={{
          flexDirection: 'column',
          width: 125,
        }}>
        <TouchableOpacity onPress={handlePress}>
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
        <Text style={HomeStyles.textTitle}>개봉 예정 뮤지컬</Text>
      </Header>

      <FlatList
        data={upcomingMusicals}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <Gap />}
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{paddingHorizontal: 20}}
      />
    </Root>
  );
}

export default UpcomingMusicals;

const Root = styled.View`
  padding: 20px 0px;
`;

const Header = styled.View`
  padding: 20px;
`;

const Gap = styled.View`
  width: 15px;
`;

import React, {useRef, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';

const {subhead02} = typography;

const windowWidth = Dimensions.get('window').width;
const cardSize = {width: 77.25, height: 30.625};
const offset = cardSize.width + 10;

type CarouselItem = {
  id: string;
  tag: string;
};

type TagsProps = {
  onTagSelect: (tag: string) => void;
};

const data: CarouselItem[] = [
  {
    id: '1',
    tag: '전체보기',
  },
  {
    id: '2',
    tag: '뮤덕n년차',
  },
  {
    id: '3',
    tag: '총평만점',
  },
  {
    id: '4',
    tag: '회전문',
  },
  {
    id: '5',
    tag: '시야최고',
  },
  {
    id: '6',
    tag: '재관람',
  },
];

const Tags: React.FC<TagsProps> = ({onTagSelect}) => {
  const flatListRef = useRef<FlatList<CarouselItem>>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>('전체보기');

  const snapToOffsets = useMemo(
    () => Array.from(Array(data.length)).map((_, index) => index * offset),
    [data],
  );

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    onTagSelect(tag);
  };

  const renderItem: ListRenderItem<CarouselItem> = ({item}) => (
    <TouchableOpacity
      style={[
        styles.container,
        selectedTag === item.tag && styles.selectedContainer,
      ]}
      onPress={() => handleTagSelect(item.tag)}>
      <Text
        style={[styles.text, selectedTag === item.tag && styles.selectedText]}>
        #{item.tag}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{width: windowWidth}}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        snapToOffsets={snapToOffsets}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardSize.width,
    height: cardSize.height,
    backgroundColor: Colors.sub_01,
    borderRadius: 8,
    marginRight: 10.62,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedContainer: {
    backgroundColor: Colors.sub_05,
  },
  text: {
    ...subhead02,
    color: Colors.sub_05,
  },
  selectedText: {
    color: Colors.sub_01,
  },
});
export default Tags;

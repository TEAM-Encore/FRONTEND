import React, {useRef, useState} from 'react';
import {View, Text, FlatList, ListRenderItem} from 'react-native';
import TagsStyles from './TagsStyles';

type TagsProps = {
  tags: string[];
};

const TagsInReview: React.FC<TagsProps> = ({tags}: TagsProps) => {
  const selectedTag = useState<string | null>('전체보기');

  const tagMap: {[key: string]: string} = {
    PERFECT_REVIEW: '#총평만점',
    BEST_SOUND: '#음향최고',
    BEST_FACILITIES: '#시설최고',
    BEST_VIEW: '#시야최고',
    REVOLVING_DOOR: '#회전문',
    MUSEUM_EXPERT: '#뮤덕n년차',
  };

  // 선택된 태그가 없을 시 아무것도 표시하지 않음
  if (!tags || tags.length === 0) {
    return null;
  }

  console.log('태그: ', tags);
  return (
    <View style={TagsStyles.tagsContainer}>
      {tags.map((tag, idx) => (
        <View key={idx} style={TagsStyles.tags}>
          <Text key={idx} style={TagsStyles.tagsText}>
            {tagMap[tag] ?? `${tag}`}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default TagsInReview;

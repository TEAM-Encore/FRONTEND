import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '@/styles/typography';
import MusicalDetailStyles from '@/app/musical/MusicalDetailScreen/style';
import useMusicalReviews from '../../hooks/useMusicalReviews';
import styled from 'styled-components/native';
import Typo from '@/components/Typo';
import MusicalDetailReviewItem from '../MusicalDetailReviewItem';
import {TouchableOpacity} from 'react-native';

type Props = {
  id: number;
};

const categories = [
  {label: '넘버', key: 'average_number_rating'},
  {label: '스토리 구성', key: 'average_story_rating'},
  {label: '재관람 의사', key: 'average_revisit_rating'},
  {label: '배우합', key: 'average_actor_rating'},
  {label: '퍼포먼스', key: 'average_performance_rating'},
] as const;

const MusicalDetailReview = ({id}: Props) => {
  const reviewInfo = useMusicalReviews(id);

  return (
    <Root>
      <Section>
        <Title>앙코르 평점 {reviewInfo.average_total_rating}</Title>

        <View style={styles.select_star_category}>
          {categories.map((category, index) => {
            const filled = reviewInfo[category.key];
            const total = 5;
            return (
              <View key={index} style={styles.categoryView}>
                <View style={styles.indexView}>
                  <Text style={styles.categoryText}>{category.label}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: 174,
                    height: 11,
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}>
                  {[...Array(total)].map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.bar,
                        i < filled && styles.filledBar,
                        i !== total - 1 && styles.barWithBorder,
                      ]}
                    />
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </Section>

      <Gap />

      <Section>
        <View style={MusicalDetailStyles.containerTitle}>
          <Title>프리미엄 리뷰</Title>

          <TouchableOpacity>
            <Caption>전체보기 {'>'}</Caption>
          </TouchableOpacity>
        </View>
      </Section>

      <FlatList
        data={reviewInfo.reviews.slice(0, 3)}
        renderItem={({item}) => (
          <MusicalDetailReviewItem
            title={item.title}
            nickname={item.nick_name}
            date={item.elapsed_time}
            rating={item.total_rating}
            likes={item.like_count}
            views={item.view_count}
          />
        )}
        scrollEnabled={false}
      />
    </Root>
  );
};

const styles = StyleSheet.create({
  categoryView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  indexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    color: Colors.gray_12,
  },
  select_star_category: {
    backgroundColor: Colors.gray_03,
    height: 146,
    ...typography.caption,
    color: Colors.gray_12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  bar: {
    flex: 1,
    backgroundColor: Colors.gray_06,
  },
  filledBar: {
    backgroundColor: Colors.sub_04,
  },
  barWithBorder: {
    borderRightWidth: 1,
    borderColor: Colors.gray_07,
  },
});

export default MusicalDetailReview;

const Root = styled.View`
  padding: 20px 0px;
`;

const Section = styled.View`
  gap: 20px;
  padding: 20px;
`;

const Gap = styled.View`
  height: 20px;
`;

const Title = styled(Typo.Subhead04)``;

const Caption = styled(Typo.Body01)`
  color: ${p => p.theme.gray.gray_08};
`;

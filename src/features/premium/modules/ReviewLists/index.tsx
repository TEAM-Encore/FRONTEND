import React from 'react';
import {FlatList, ActivityIndicator, View, Text} from 'react-native';
import Tags from '@/components/premium/Tags';
import ItemReview from '@/components/premium/ItemReview';
import useReviewLists from '../../hooks/useReviewLists';
import PremiumStyles from '@/app/premium/PremiumScreen/style';

interface ReviewListsProps {
  tag?: string;
  onTagSelect: (tag: string) => void;
  isFetching: boolean;
  hasMore: boolean;
}

const ReviewLists: React.FC<ReviewListsProps> = ({
  tag,
  onTagSelect,
  isFetching,
  hasMore,
}) => {
  const {reviewLists} = useReviewLists(tag);
  const data = reviewLists?.data?.data?.content ?? [];

  //   console.log('ReviewLists tag:', tag);
  //   console.log('ReviewLists data:', data);

  return (
    <>
      <View style={PremiumStyles.containerHeader}>
        <View style={PremiumStyles.containerTags}>
          <Tags onTagSelect={onTagSelect} />
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        renderItem={({item}) => <ItemReview item={item} />}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <>
            <View>
              {data.length === 0 && (
                <View>
                  <Text style={PremiumStyles.noReviewText}>
                    등록된 리뷰가 없습니다.
                  </Text>
                </View>
              )}
            </View>
          </>
        }
        ListFooterComponent={
          isFetching && hasMore ? <ActivityIndicator size="small" /> : null
        }
      />
    </>
  );
};

export default ReviewLists;

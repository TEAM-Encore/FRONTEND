import HomeStyles from '@/app/home/HomeScreen/style';
import IconLike from '@/assets/icons/home/IconLike';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import usePopularPremiumReviews from '../../hooks/usePopularPremiumReviews';
import Typo from '@/components/Typo';

function HomePremiumReviews() {
  const {popularPremiumReviews} = usePopularPremiumReviews();

  const reviews = popularPremiumReviews.slice(0, 3);

  return (
    <Root>
      <Header>
        <Text style={HomeStyles.textTitle}>프리미엄 리뷰</Text>

        <TouchableOpacity>
          <Text style={HomeStyles.textWriteReview}>전체보기 {'>'}</Text>
        </TouchableOpacity>
      </Header>

      <ReviewSection>
        {reviews.map((review, index) => (
          <ReviewItem key={`k_review_${review.review_id}`}>
            <Rank>{index + 1}</Rank>

            <ReviewTitle>{review.title}</ReviewTitle>

            <Row>
              <IconLike />
              <LikeCount>
                {review.like_data.like_count_res.total_like_count}
              </LikeCount>
            </Row>
          </ReviewItem>
        ))}
      </ReviewSection>
    </Root>
  );
}

export default HomePremiumReviews;

const Root = styled.View`
  padding: 20px;
  gap: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ReviewSection = styled.View`
  gap: 8px;
`;

const ReviewItem = styled.TouchableOpacity`
  height: 44px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 6px 14px;
  border-radius: 5px;
  background-color: ${p => p.theme.gray.gray_02};
`;

const Rank = styled(Typo.Subhead02)`
  width: 24px;
  text-align: center;
`;

const ReviewTitle = styled(Typo.Subhead02)`
  flex: 1;
  color: ${p => p.theme.gray.gray_12};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

const LikeCount = styled(Typo.Caption)`
  color: ${p => p.theme.gray.gray_12};
`;

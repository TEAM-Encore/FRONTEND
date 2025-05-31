import httpApi, {IResponse} from './http.api';

export type IPremiumReview = {
  review_id: number;
  user_id: number;
  title: string;
  nickname: string;
  elapsed_time: string; // 예: "11분 전"
  view_count: number;
  like_data: {
    like_type:
      | 'FOLLOW_UP_RECOMMENDATION'
      | 'FULL_OF_TIPS'
      | 'THOROUGH_ANALYSIS';
    like_count_res: {
      total_like_count: number;
      follow_up_like_count: number;
      full_of_tips_like_count: number;
      thorough_analysis_like_count: number;
    };
  };
  rating: IReviewRating;
  location: string;
  seat: string;
  actors: string; // 단일 배우 이름. 여러 명일 경우 string[] 고려
};

export type IReviewRating = {
  number_rating: number;
  story_rating: number;
  revisit_rating: number;
  actor_rating: number;
  performance_rating: number;
  total_rating: number;
  rating_review: string;
};

export const getPopularPremiumReviews = async () => {
  const {data} = await httpApi.get<IResponse<IPremiumReview[]>>(
    '/api/v1/review/popular-list',
  );

  return data.data;
};

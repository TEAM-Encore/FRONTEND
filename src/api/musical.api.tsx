import httpApi, {IResponse} from './http.api';

export type IMusical = {
  id: number;
  title: string;
  start_date: string; // ISO 8601 날짜-시간 문자열
  end_date: string; // ISO 8601 날짜-시간 문자열
  location: string;
  image_url: string;
};

export type IMusicalDetail = {
  id: number;
  title: string;
  start_date: string; // ISO 8601 날짜-시간 문자열
  end_date: string; // ISO 8601 날짜-시간 문자열
  location: string;
  running_time: number; // 분 단위 등
  age: string;
  series: number;
  image_url: string;
  is_featured: boolean;
  actors: IActor[];
  show_times: IShowTime[];
};

export type IActor = {
  actor_name: string;
  actor_image_url: string;
  role_name: string;
  is_main_actor: boolean;
};

export type IShowTime = {
  day:
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY';
  time: string; // 예: "19:00"
};

export type GetMusicalReviewsResult = {
  reviews: SimpleReview[];
  average_total_rating: number;
  average_number_rating: number;
  average_story_rating: number;
  average_revisit_rating: number;
  average_actor_rating: number;
  average_performance_rating: number;
};

export type SimpleReview = {
  title: string;
  nick_name: string;
  elapsed_time: string; // 예: "11분 전"
  total_rating: number;
  view_count: number;
  like_count: number;
};

export const getDetailedMusical = async (musical_id: number) => {
  const {data} = await httpApi.get<IResponse<IMusicalDetail>>(
    `/api/v1/musical/${musical_id}`,
  );

  return data.data;
};

export const getFeaturedMusical = async () => {
  const {data} = await httpApi.get<IResponse<IMusical[]>>(
    `/api/v1/musical/featured`,
  );

  return data.data;
};

export const getUpcomingMusical = async () => {
  const {data} = await httpApi.get<IResponse<IMusical[]>>(
    `/api/v1/musical/upcoming`,
  );

  return data.data;
};

export const getMusicalReviews = async (musical_id: number) => {
  const {data} = await httpApi.get<IResponse<GetMusicalReviewsResult>>(
    `/api/v1/review/musical/${musical_id}/reviews`,
  );

  return data.data;
};

export const getSearchMusical = (keyword: string) => {
  return httpApi.get(`/api/v1/musical/search`, {
    params: {keyword},
  });
};

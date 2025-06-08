import httpApi, {IResponse} from './http.api';

export type IReviewParams = {
  size: number;
  sort: string;
  cursor?: number;
  tag?: string;
  search_word?: string;
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

export type ITicketReview = {
  review_id: number;
  user_id: number;
  title: string;
  nickname: string;
  elapsed_time: string;
  view_count: number;
  like_count: number;
  rating?: IReviewRating;
};

export type Pageable = {
  page_number: number;
  page_size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type ReviewListData = {
  content: ITicketReview[];
  pageable: Pageable;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  number_of_elements: number;
  empty: boolean;
};

export const postTicketReview = (ticket_id: number, requestData: any) => {
  return httpApi.post(`/api/v1/review/${ticket_id}`, requestData);
};

export const getTicketReview = (review_id: number) => {
  return httpApi.get(`/api/v1/review/${review_id}`);
};

// 리뷰 연관 검색어 조회
export const getReviewSearchSuggestions = (keyword: string) => {
  return httpApi.get(`/api/v1/review/search-suggestions`, {
    params: {keyword},
  });
};

// 프리미엄 리뷰 리스트 조회
export const getSafeTicketReviewList = async (params: IReviewParams) => {
  try {
    const data = await getTicketReviewList(params);
    return data;
  } catch (error: any) {
    // 태그에 해당하는 리뷰가 없는 경우 빈 배열 반환
    if (error.response?.status === 404) {
      return { content: [], pageable: {}, first: true, last: true, size: 0, number: 0, number_of_elements: 0, empty: true }; 
    }
    throw error;
  }
};

export const getTicketReviewList = async (params: IReviewParams) => {
  const {data} = await httpApi.get<IResponse<ReviewListData>>(
    `/api/v1/review/list`,
    {params},
  );
  return data.data; // ReviewListData
};

// 현재 보고 있는 리뷰를 제외한 유저의 리뷰 리스트 조회
export const getTicketReviewListByUser = (
  user_id: number,
  review_id?: number,
) => {
  const requestParams = {
    user_id,
    review_id,
  };
  return httpApi.get(`/api/v1/review/user-reviews`, {
    params: requestParams,
  });
};

export const getTicketReviewImage = (cycle: number) => {
  return httpApi.get(`/api/v1/review/view-image/${cycle}`);
};

export const deleteTicketReview = (review_id: number) => {
  return httpApi.delete(`/api/v1/review/${review_id}`);
};

import httpApi from './http.api';

export const postTicketReview = (ticket_id: number, requestData: any) => {
  return httpApi.post(`/api/v1/review/${ticket_id}`, requestData);
};

export const getTicketReview = (review_id: number) => {
  return httpApi.get(`/api/v1/review/${review_id}`);
};

// 리뷰 연관 검색어 조회
export const getReviewSearchSuggestions = (keyword: string) => {
  return httpApi.get(`/api/v1/review/search-suggestions`, {
    params: { keyword },
  });
};

// 프리미엄 리뷰 리스트 조회
export const getTicketReviewList = (
  size: number,
  sort: string,
  cursor?: number,
  tag?: string,
  search_word?: string,
) => {
  const requestParams = {
    size,
    sort,
    cursor,
    tag,
    search_word,
  };
  return httpApi.get(`/api/v1/review/list`, {
    params: requestParams,
  });
};

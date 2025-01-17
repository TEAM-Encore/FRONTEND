import httpApi from './http.api';

export const getPremiumReview = (
  search_keyword: any,
  cursor: number,
  tag: string,
  pageable: any,
) => {
  return httpApi.get('/api/v1/review/list', {
    params: {search_keyword, cursor, tag, pageable},
  });
};

export const getPopularPremiumReviews = () => {
  return httpApi.get('/api/v1/review/popular-list');
};

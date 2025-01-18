import httpApi from './http.api';

export const getPopularPremiumReviews = () => {
  return httpApi.get('/api/v1/review/popular-list');
};

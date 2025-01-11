import httpApi from './http.api';

export const getDetailedMusical = (musical_id: number) => {
  return httpApi.get(`/api/v1/musical/${musical_id}`);
};

export const getFeturedMusical = () => {
  return httpApi.get(`/api/v1/musical/featured`);
};

export const getUpcomingMusical = () => {
  return httpApi.get(`/api/v1/musical/upcoming`);
};

export const getMusicalReviews = (musical_id: number) => {
  return httpApi.get(`/api/v1/review/musical/${musical_id}/reviews`);
};

export const getSearchMusical = (keyword: string) => {
  return httpApi.get(`/api/v1/musical/search`, {
    params: {keyword},
  });
};

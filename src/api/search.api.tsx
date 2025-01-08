import httpApi from './http.api';

export const getMusicalSearch = (keyword: string) => {
  return httpApi.get(`/api/v1/musical/search`, {
    params: {keyword},
  });
};

export const getActorSearch = (keyword: string) => {
  return httpApi.get(`/api/v1/ticket/actors/search`, {
    params: {keyword},
  });
};

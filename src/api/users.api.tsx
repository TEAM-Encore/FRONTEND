import httpApi from './http.api';

export const getMyInfo = () => {
  return httpApi.get(`/api/v1/users/me`);
};

export const patchMyInfo = (data: {
  nickname?: string;
  viewing_frequency?: string;
  preferred_keywords?: string[];
}) => {
  return httpApi.patch(`/api/v1/users/me`, data);
};

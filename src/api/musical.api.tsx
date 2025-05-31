import httpApi, {IResponse} from './http.api';

export type IMusical = {
  id: number;
  title: string;
  start_date: string; // ISO 8601 날짜-시간 문자열
  end_date: string; // ISO 8601 날짜-시간 문자열
  location: string;
  image_url: string;
};

export const getDetailedMusical = (musical_id: number) => {
  return httpApi.get(`/api/v1/musical/${musical_id}`);
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

export const getMusicalReviews = (musical_id: number) => {
  return httpApi.get(`/api/v1/review/musical/${musical_id}/reviews`);
};

export const getSearchMusical = (keyword: string) => {
  return httpApi.get(`/api/v1/musical/search`, {
    params: {keyword},
  });
};

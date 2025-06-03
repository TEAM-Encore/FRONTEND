import httpApi, {IResponse} from './http.api';

export type IMusicalSearch = {
  musical_id: number;
  title: string;
  location: string;
  series: number;
  show_times: string[];
  image_url: string;
};

export type IActorSearch = {
  id: number;
  name: string;
  actor_image_url: string;
};

export const getMusicalSearch = async (keyword: string) => {
  const {data} = await httpApi.get<IResponse<IMusicalSearch[]>>(
    `/api/v1/musical/search`,
    {
      params: {keyword},
    },
  );

  return data.data;
};

export const getActorSearch = async (keyword: string) => {
  const {data} = await httpApi.get<IResponse<IActorSearch[]>>(
    `/api/v1/ticket/actors/search`,
    {
      params: {keyword},
    },
  );

  return data.data;
};

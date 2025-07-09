import httpApi, {IResponse} from './http.api';

export type IUser = {
  id: number;
  email: string;
  nickname: string;
  point: number;
  viewing_frequency: string;
  preferred_keywords: string[];
  num_of_subscriber: number;
  num_of_write_post: number;
};

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

export const createUser = (
  email: string,
  password: string,
  name: string,
  provider: string,
  role: string,
) => {
  const requestBody = {
    email,
    password,
    name,
    provider,
    role,
  };

  return httpApi.post('/api/v1/users/signup', requestBody);
};

export const getNicknameValidation = async (nickname: string) => {
  const {data} = await httpApi.get<IResponse<{is_valid: boolean}>>(
    `/api/v1/users/nickname-validation/${nickname}`,
  );

  return data.data.is_valid;
};

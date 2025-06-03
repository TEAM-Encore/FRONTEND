import httpApi from './http.api';

export const PostPresignedUrl = async (imageName: string) => {
  const {data} = await httpApi.post<string>(`/api/v1/image/presigned-url`, {
    imageName,
  });

  return data;
};

import httpApi from './http.api';

export const PostPresignedUrl = (imageName: string) => {
  return httpApi.post(`/api/v1/image/presigned-url`, {imageName});
};

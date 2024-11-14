import httpApi from './http.api';

export const PostDashboard = (
  category: string,
  post_type: string,
  title: string,
  content: string,
  hashtags: Array<string>,
  imgUrls?: Array<string>,
  isNotice?: boolean,
  isTemporarySave?: boolean,
) => {
  const requestBody = {
    category,
    post_type,
    title,
    content,
    hashTags: hashtags,
    imgUrls: imgUrls || [],
    isNotice: isNotice || false,
    isTemporarySave: isTemporarySave || false,
  };

  return httpApi.post(`/api/v1/post`, requestBody);
};

export const GetDashboard = (post_id: number) => {
  return httpApi.get(`/api/v1/post/${post_id}`);
};

export const PutDashboard = (post_id: number) => {
  return httpApi.put(`/api/v1/post/${post_id}`);
};

export const DeleteDashboard = (post_id: number) => {
  return httpApi.delete(`/api/v1/post/${post_id}`);
};

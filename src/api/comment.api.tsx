import httpApi from './http.api';

export const createComments = (content: string, parent_id: number) => {
  const requestBody = {
    content,
    parent_id,
  };

  return httpApi.post(`/api/v1/comment`, requestBody);
};

export const getComments = (post_id: number) => {
  return httpApi.get(`/api/v1/comment/${post_id}`);
};

export const updateComments = (post_id: number, comment_id: number) => {
  return httpApi.put(`/api/v1/comment/${post_id}/${comment_id}`);
};

export const deleteComments = (post_id: number, comment_id: number) => {
  return httpApi.delete(`/api/v1/comment/${post_id}/${comment_id}`);
};

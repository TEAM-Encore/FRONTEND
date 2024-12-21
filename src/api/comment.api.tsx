import httpApi from './http.api';

interface CreateCommentRequest {
  content: string;
  parent_id: number | null;
}

export const createComment = (post_id: number, data: CreateCommentRequest) => {
  return httpApi.post(`/api/v1/comment/${post_id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getComments = (post_id: number) => {
  return httpApi.get(`/api/v1/comment/${post_id}`);
};

export const updateComment = (post_id: number, comment_id: number) => {
  return httpApi.put(`/api/v1/comment/${post_id}/${comment_id}`);
};

export const deleteComment = (post_id: number, comment_id: number) => {
  return httpApi.delete(`/api/v1/comment/${post_id}/${comment_id}`);
};

export const createAndDeleteLikeComment = (
  post_id: number,
  comment_id: number,
) => {
  return httpApi.post(`/api/v1/comment/${post_id}/${comment_id}/like`);
};

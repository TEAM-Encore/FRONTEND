import httpApi from './http.api';

export const createPost = (
  category?: string,
  post_type?: string,
  title?: string,
  content?: string,
  hash_tags?: Array<string>,
  img_urls?: Array<string>,
  is_notice?: boolean,
  is_temporary_save?: boolean,
) => {
  const requestBody = {
    category,
    post_type,
    title,
    content,
    hash_tags: hash_tags,
    img_urls: img_urls || [],
    is_notice: is_notice ?? false,
    is_temporary_save: is_temporary_save ?? false,
  };

  return httpApi.post(`/api/v1/post`, requestBody);
};

export const getPost = (post_id: number) => {
  return httpApi.get(`/api/v1/post/${post_id}`);
};

interface UpdatePostRequest {
  category: string;
  post_type: string;
  title: string;
  content: string;
  img_urls: string[];
  hash_tags: string[];
  is_notice: boolean;
  is_temporarySave: boolean;
}

export const putPost = (postId: number, data: UpdatePostRequest) => {
  return httpApi.put(`/api/v1/post/${postId}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deletePost = (post_id: number) => {
  return httpApi.delete(`/api/v1/post/${post_id}`);
};

export const getPostHashtagList = (
  cursor: number,
  hashtag: string,
  pageable: object,
) => {
  return httpApi.get(`/api/v1/post/hashtag-list`, {
    params: {
      cursor,
      hashtag,
      pageable,
    },
  });
};

// 게시글 페이징 조회
export const GetPostList = (
  size: number,
  sort: string,
  cursor?: number,
  category?: string,
  type?: string,
  search_word?: string,
) => {
  const requestParams = {
    size,
    sort,
    cursor,
    category,
    type,
    search_word,
  };
  return httpApi.get(`/api/v1/post/list`, {
    params: requestParams,
  });
};

export const createAndDeleteLikePost = (user_id: number, post_id: number) => {
  const requestBody = {
    user_id,
    post_id,
  };

  return httpApi.post(`/api/v1/post/likes`, requestBody);
};

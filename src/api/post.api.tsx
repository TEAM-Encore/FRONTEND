import httpApi from './http.api';

export const createPost = (
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

export const getPost = (post_id: number) => {
  return httpApi.get(`/api/v1/post/${post_id}`);
};

export const putPost = (post_id: number) => {
  return httpApi.put(`/api/v1/post/${post_id}`);
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

export const getPostList = (
  cursor: number,
  category: string,
  type: string,
  search_word: string,
  pageable: object,
) => {
  return httpApi.get(`/api/v1/post/list`, {
    params: {
      cursor,
      category,
      type,
      search_word,
      pageable,
    },
  });
};

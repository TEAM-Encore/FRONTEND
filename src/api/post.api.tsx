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

interface UpdatePostRequest {
  category: string;
  post_type: string;
  title: string;
  content: string;
  imgUrls: string[];
  hashTags: string[];
  isNotice: boolean;
  isTemporarySave: boolean;
}

export const putPost = (postId: number, data: UpdatePostRequest) => {
  return httpApi.put(`/api/v1/post/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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
  page: number,
  size: number,
  sort: string,
  cursor?: number,
  category?: string,
  type?: string,
  search_word?: string,
) => {
  const requestParams = {
    page,
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

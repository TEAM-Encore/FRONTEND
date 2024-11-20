import httpApi from './http.api';

// 게시글 작성
export const PostPost = (
  category: string,
  post_type: string,
  title: string,
  content: string,
  hash_tags: Array<string>,
  img_urls?: Array<string>,
  is_notice?: boolean,
  is_temporarySave?: boolean,
) => {
  const requestBody = {
    category,
    post_type,
    title,
    content,
    hash_tags: hash_tags,
    img_urls: img_urls || [],
    is_notice: is_notice || false,
    is_temporarySave: is_temporarySave || false,
  };

  return httpApi.post(`/api/v1/post`, requestBody);
};

// 게시글 상세 조회
export const GetPost = (post_id: number) => {
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
  return httpApi.put(`/api/v1/post/${postId}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// 게시글 삭제
export const DeletePost = (post_id: number) => {
  return httpApi.delete(`/api/v1/post/${post_id}`);
};

// 게시글 페이징 조회
export const GetPostList = (
  pageable: object,
  cursor?: number,
  category?: string,
  type?: string,
  search_word?: string,
) => {
  const requestParams = {
    cursor,
    category,
    type,
    search_word,
    pageable: JSON.stringify(pageable),
  };
  return httpApi.get(`/api/v1/post/list`, {
    params: requestParams,
  });
};

export const postLike = (post_id: string) => {
  return httpApi.post(`/api/v1/post/likes/${post_id}`);
};

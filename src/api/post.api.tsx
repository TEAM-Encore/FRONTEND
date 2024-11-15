import httpApi from './http.api';

// 게시글 작성
export const PostPost = (
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

// 게시글 상세 조회
export const GetPost = (post_id: number) => {
  return httpApi.get(`/api/v1/post/${post_id}`);
};

// 게시글 수정
export const PutPost = (post_id: number) => {
  return httpApi.put(`/api/v1/post/${post_id}`);
};

// 게시글 삭제
export const DeletePost = (post_id: number) => {
  return httpApi.delete(`/api/v1/post/${post_id}`);
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

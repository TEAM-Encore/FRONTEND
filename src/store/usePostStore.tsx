import {create} from 'zustand';

interface PostStoreState {
  postResponse: any; // response.data 저장
  imgUrls: Record<number, string[]>; // id를 키로 하는 imgUrls 저장
  currentPostId: number | null; // 현재 선택된 postId
  setPostResponse: (data: any) => void; // response.data 업데이트
  setImgUrls: (id: number, urls: string[]) => void; // id에 해당하는 imgUrls 저장
  setCurrentPostId: (id: number) => void; // currentPostId 업데이트
}

export const usePostStore = create<PostStoreState>(set => ({
  postResponse: null, // 초기 상태
  imgUrls: {}, // id별 imgUrls 초기 상태
  currentPostId: null, // 초기 상태: null
  setPostResponse: data => set({postResponse: data}),
  setImgUrls: (id, urls) =>
    set(state => ({
      imgUrls: {
        ...state.imgUrls,
        [id]: urls, // 특정 id에 해당하는 imgUrls 저장
      },
    })),
  setCurrentPostId: id => set({currentPostId: id}), // currentPostId 업데이트
}));

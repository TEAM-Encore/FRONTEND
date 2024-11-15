export type RootStackParamList = {
    Tabs: undefined;
    WritePage: { setPostData: React.Dispatch<React.SetStateAction<PostData | null>> };
    PostPage: { postId: number };
    ModifyPage: { postId: number };
    SavePage: undefined;
};

export interface PostData {
    title: string;
    content: string;
    post_type: string;
    category: string;
    hashTags: string[];
}

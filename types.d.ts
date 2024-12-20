export type RootStackParamList = {
  Tabs: undefined;
  WritePage: {
    setPostData: React.Dispatch<React.SetStateAction<PostData | null>>;
  };
  PremiumWritePage: undefined;
  PostPage: {postId: number};
  ModifyPage: {postId: number};
  SavePage: undefined;
  DashboardSearchPage: {postData: any; text: string};
  DashboardSearchDefaultPage: undefined;
  HomeSearchPage: {postData: any; text: string};
  HomeSearchDefaultPage: undefined;
};

export interface PostData {
  title: string;
  content: string;
  post_type: string;
  category: string;
  hashTags: string[];
}

export type SearchPageProps = {
  route: SearchPageRouterProp;
  navigation: SearchPageNavigationProp;
};

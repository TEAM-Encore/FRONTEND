export type RootStackParamList = {
  Tabs: undefined;
  LoginPage: undefined;
  SignUpPage: undefined;
  OnboardingPage: undefined;
  ProfileCardPage: undefined;
  WritePage: {
    setPostData: React.Dispatch<React.SetStateAction<PostData | null>>;
  };
  PremiumWritePage: undefined;
  PremiumOthersPage: undefined;
  PremiumMyPage: {reviewId: number};
  PostPage: {postId: number};
  ModifyPage: {postId: number};
  SavePage: undefined;
  DashboardSearchPage: {postData: any; text: string};
  DashboardSearchDefaultPage: undefined;
  HomeSearchPage: {postData: any; text: string};
  HomeSearchDefaultPage: undefined;
  HomeBannerPage: {bannerId: number};
  AddTicketPage: undefined;
  TicketDetailPage: undefined;
  MusicalDetailPage: {data: any};
  ModifyProfileImg: undefined;
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

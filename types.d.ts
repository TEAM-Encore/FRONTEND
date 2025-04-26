export type RootStackParamList = {
  Tabs?: {
    frequency: string;
    checkedOptions: string[];
  };
  LoginScreen: undefined;
  SignUpScreen: undefined;
  OnboardingScreen: undefined;
  ProfileCardScreen: undefined;
  WriteScreen: {
    setPostData: React.Dispatch<React.SetStateAction<PostData | null>>;
  };
  PremiumWriteScreen: undefined;
  PremiumOthersScreen: undefined;
  PremiumMyScreen: {reviewId: number};
  PostScreen: {postId: number};
  ModifyScreen: {postId: number};
  // PostHashtagScreen: {hashTag: string};
  SaveScreen: undefined;
  DashboardSearchScreenList: {postData: any; text: string};
  DashboardSearchDefaultScreen: undefined;
  HomeSearchScreen: {postData: any; text: string};
  HomeSearchDefaultScreen: undefined;
  HomeBannerScreen: {bannerId: number};
  AddTicketScreen: undefined;
  TicketDetailScreen: undefined;
  MusicalDetailScreen: {data: any};
  ModifyProfileImg: undefined;
};

export interface PostData {
  title: string;
  content: string;
  post_type: string;
  category: string;
  hashTags: string[];
}

export type SearchScreenProps = {
  route: SearchScreenRouterProp;
  navigation: SearchScreenNavigationProp;
};

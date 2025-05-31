export type RootStackParamList = {
  Tabs?: {
    frequency: string;
    checkedOptions: string[];
  };

  WriteScreen: {
    setPostData: React.Dispatch<React.SetStateAction<PostData | null>>;
  };
  HomeSearchDefaultScreen: undefined;
  MusicalDetailScreen: {
    data: {
      id: number;
      title: string;
      start_date: string;
      end_date: string;
      image_url: string;
      location: string;
    };
  };
  PremiumWriteScreen: undefined;
  PremiumOthersScreen: undefined;
  PremiumMyScreen: {reviewId: number};
  PremiumSearchDefaultScreen: undefined;
  PostScreen: {postId: number};
  ModifyScreen: {postId: number};
  // PostHashtagScreen: {hashTag: string};
  SaveScreen: undefined;
  DashboardSearchScreenList: {postData: any; text: string};
  DashboardSearchDefaultScreen: undefined;

  TicketDetailScreen: undefined;
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

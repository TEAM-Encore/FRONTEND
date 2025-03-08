import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';

const {subhead02, subhead03, body01} = typography;

// 정보, 후기, 배우, 자유 게시판에서 사용되는 스타일
const PostStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerCommentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 18,
    marginLeft: 24,
    marginRight: 20,
  },
  textCategory: {
    ...subhead03,
    marginRight: 7,
  },
  textLatestRecommended: {
    ...body01,
    color: '#8B8B8B',
  },
  filter: {
    ...subhead02,
  },
  tab_filter: {
    ...body01,
    color: Colors.gray_07,
  },
});

export default PostStyles;

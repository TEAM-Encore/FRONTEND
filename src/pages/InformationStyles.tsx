import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../../styles/typography';

const {subhead02, subhead03, body01, caption} = typography;

const InformationStyles = StyleSheet.create({
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
  textCommentTitle: {
    ...subhead03,
  },
  textLatestRecommended: {
    ...body01,
    color: '#8B8B8B',
  },
});

export default InformationStyles;

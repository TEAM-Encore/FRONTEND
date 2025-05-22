import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../../../styles/typography';

const {subhead02, subhead03, body01, caption} = typography;

const PostHashtagStyles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.gray_03,
    width: 292,
    height: 40,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
  },
  clearButton: {
    marginLeft: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabText: {
    ...subhead03,
    color: Colors.gray_06,
    textAlign: 'center',
  },
  activeTabText: {
    ...subhead03,
    color: Colors.black,
  },
  activeTabButton: {
    position: 'relative',
  },
  activeTabUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: 67.3,
    backgroundColor: Colors.sub_04,
  },
});

export default PostHashtagStyles;

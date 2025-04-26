import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';
const {subhead02} = typography;

const cardSize = {width: 77.25, height: 30.625};

const TagsStyles = StyleSheet.create({
  container: {
    width: cardSize.width,
    height: cardSize.height,
    backgroundColor: Colors.gray_03,
    borderRadius: 8,
    marginRight: 10.62,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedContainer: {
    backgroundColor: Colors.gray_12,
  },
  text: {
    ...subhead02,
    color: Colors.gray_12,
  },
  selectedText: {
    color: Colors.gray_03,
  },
});

export default TagsStyles;

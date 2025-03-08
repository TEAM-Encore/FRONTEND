import {StyleSheet} from 'react-native';
import Colors from '../../assets/colors/Colors';
import {typography} from '../../styles/typography';
const {caption, bodyLong01} = typography;

const ItemCommentStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 26,
    paddingVertical: 11,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerWriterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerWriter: {
    flexDirection: 'row',
    width: '100%',
    height: 102,
    backgroundColor: Colors.gray_03,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageWriter: {
    position: 'absolute',
    width: 40,
    height: 40,
  },
  containerWriterText: {
    marginLeft: 8,
  },
  textWriter: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.3,
    marginRight: 4,
  },
  textIsWriterDate: {
    ...caption,
    color: '#878787',
  },
  containerLike: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 48,
    marginRight: 8,
  },
  textLikeComment: {
    ...caption,
    color: '#878787',
    marginLeft: 4,
  },
  textContent: {
    ...bodyLong01,
    marginLeft: 48,
    marginTop: 9,
    marginBottom: 16,
  },
  line: {
    height: 0.75,
    backgroundColor: Colors.gray_04,
    marginVertical: 26,
  },
});

export default ItemCommentStyles;

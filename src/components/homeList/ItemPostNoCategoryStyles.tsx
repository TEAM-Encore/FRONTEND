import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';
const {subhead03, body01, caption} = typography;

const ItemPostNoCategoryStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerCategory: {
    height: 24,
    borderRadius: 4.27,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFE9DC',
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginBottom: 22,
  },
  textCategory: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.3,
  },
  textTitle: {
    ...subhead03,
    marginBottom: 4,
  },
  textContent: {
    ...body01,
    color: Colors.gray_09,
  },
  containerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textIsWriterDate: {
    ...caption,
    color: Colors.gray_09,
  },
  textLikeComment: {
    ...caption,
    color: '#878787',
    marginLeft: 4,
    marginRight: 4,
  },
  image: {
    width: 84,
    height: 92,
    borderRadius: 9,
    marginLeft: 36,
  },
  line: {
    height: 0.75,
    backgroundColor: Colors.gray_04,
    marginVertical: 14,
  },
  line2: {
    height: 4,
    backgroundColor: Colors.gray_03,
    marginVertical: 16,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.gray_06,
  },
});

export default ItemPostNoCategoryStyles;

import {StyleSheet} from 'react-native';
import Colors from '../../assets/colors/Colors';
import {typography} from '../../styles/typography';
const {subhead03, subhead02, caption} = typography;
const cardSize = {width: 225, height: 208};

const ItemReviewStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  itemContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    ...subhead03,
    color: Colors.gray_12,
    marginBottom: 4,
  },
  popularTextTitle: {
    ...subhead02,
    color: Colors.gray_12,
    marginBottom: 8,
  },
  containerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  textStar: {
    ...caption,
    color: Colors.gray_08,
    marginLeft: 5,
  },
  textWriterDate: {
    ...caption,
    color: Colors.gray_07,
  },
  textViewAndLike: {
    ...caption,
    color: Colors.gray_08,
    marginLeft: 2,
    marginRight: 6,
  },
  line: {
    height: 0.75,
    backgroundColor: Colors.gray_04,
    marginVertical: 10,
  },
  containerPopularReview: {
    width: cardSize.width,
    height: cardSize.height,
    borderRadius: 8,
    marginRight: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageWriter: {
    width: 24,
    height: 24,
  },
  textWriter: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    lineHeight: 28,
    letterSpacing: -0.3,
    marginLeft: 8,
    marginRight: 4,
  },
  textContent: {
    ...caption,
    color: Colors.gray_10,
    marginBottom: 9,
  },
  textPlaceAndActor: {
    fontFamily: 'Pretendard-Regualr',
    fontSize: 10,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: Colors.gray_08,
    marginLeft: 6,
  },
  textLikeCount: {
    ...caption,
    color: Colors.gray_08,
    marginLeft: 4,
  },
});

export default ItemReviewStyles;

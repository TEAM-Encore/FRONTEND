import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';

const {subhead02, subhead03, headline, body01, caption} = typography;

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  containerHeader: {
    backgroundColor: Colors.primary_03,
    height: 283,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  carouselBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    marginTop: -100,
  },
  containerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 23,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerCarouselTicket: {
    marginHorizontal: 6,
  },
  containerCarouselTicketTitle: {
    position: 'absolute',
    marginTop: 10,
    marginLeft: 11,
    height: 22,
    backgroundColor: Colors.primary_01,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textCarouselTicketTitle: {
    ...caption,
    color: Colors.gray_01,
  },
  containerPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    margin: 3.5,
  },
  activeDot: {
    backgroundColor: Colors.gray_01,
  },
  inactiveDot: {
    backgroundColor: '#C7A0A0',
  },
  containerAdImage: {
    marginTop: 39,
  },
  containerAd: {
    position: 'absolute',
    top: 15,
    left: 20,
    width: 39,
    height: 18,
    backgroundColor: '#F7F7F7',
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAd: {
    ...caption,
    color: '#6F6F6F',
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 48,
    marginBottom: 20,
  },
  textTitle: {
    ...headline,
    color: Colors.gray_12,
  },
  textWriteReview: {
    ...body01,
    color: Colors.gray_08,
  },
  containerTicket: {
    flexDirection: 'row',
  },
  ticket1: {
    width: 251,
    height: 150,
    borderRadius: 8,
    backgroundColor: Colors.primary_05,
    justifyContent: 'flex-end',
    paddingHorizontal: 14,
    paddingVertical: 17,
  },
  textTicketTitle: {
    ...subhead03,
    color: Colors.gray_01,
    marginBottom: 9,
  },
  textTicketDateActor: {
    ...caption,
    color: Colors.gray_01,
    marginLeft: 6,
  },
  ticket2: {
    width: 84,
    height: 150,
    borderRadius: 8,
  },
  containerPremiumReviews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    alignItems: 'center',
    width: 335,
    height: 44,
    backgroundColor: Colors.gray_01,
    borderRadius: 5,
    paddingHorizontal: 14,
    shadowColor: 'rgba(23, 23, 23, 0.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  textPremiumReviewTitle: {
    ...subhead02,
    color: Colors.gray_12,
  },
  containerPremiumReviewRanking: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: Colors.primary_01,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textPremiumReviewRanking: {
    ...subhead02,
    color: Colors.gray_01,
  },
  textPremiumReviewLike: {
    ...caption,
    marginLeft: 4,
    color: Colors.gray_12,
  },
  containerBest: {
    width: 335,
    height: 128,
    borderRadius: 5,
    backgroundColor: Colors.gray_01,
    shadowColor: 'rgba(23, 23, 23, 0.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  textBest: {
    ...subhead03,
    width: '50%',
    marginTop: 20,
    marginLeft: 24,
  },
  containerBestLikeComment: {
    position: 'absolute',
    bottom: 18,
    left: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBestLikeComment: {
    ...caption,
    color: '#4F4F4F',
    marginHorizontal: 4,
  },
  imageMusical: {
    width: 125,
    height: 159,
    borderRadius: 9,
    marginBottom: 11,
  },
  textMusicalTitle: {
    ...subhead03,
    color: Colors.gray_12,
    marginBottom: 4,
  },
  textMusicalDateLocation: {
    ...caption,
    color: Colors.gray_07,
  },
  containerPoint: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7.5,
    paddingHorizontal: 15,
    width: 335,
    height: 72,
    borderRadius: 8,
    backgroundColor: Colors.gray_01,
    shadowColor: 'rgba(23, 23, 23, 0.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  textPointTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.6,
    color: Colors.gray_12,
  },
  textPointContent: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: -0.6,
    color: Colors.gray_08,
  },
  containerPointShortcut: {
    width: 69,
    height: 31,
    borderRadius: 6,
    backgroundColor: Colors.primary_01,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPointShortcut: {
    ...subhead02,
    color: Colors.gray_01,
  },
});

export default HomeStyles;

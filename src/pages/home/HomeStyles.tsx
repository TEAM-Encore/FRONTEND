import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  containerHeader: {
    backgroundColor: Colors.primary_01,
    height: 283,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    fontSize: 12,
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
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 48,
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 20,
    color: Colors.gray_12,
  },
  textWriteReview: {
    fontSize: 14,
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
    fontSize: 16,
    color: Colors.gray_01,
  },
  textTicketDate: {
    fontSize: 12,
    color: Colors.gray_01,
    marginLeft: 6,
  },
  textTicketActor: {
    fontSize: 12,
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
    fontSize: 14,
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
    fontSize: 14,
    color: Colors.gray_01,
  },
  textPremiumReviewLike: {
    fontSize: 12,
    color: Colors.gray_12,
  },
  containerBest: {
    width: 335,
    height: 128,
    borderRadius: 5,
    backgroundColor: Colors.gray_01,
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
  textBest: {
    fontSize: 16,
  },
  imageMusical: {
    width: 125,
    height: 159,
    borderRadius: 9,
    marginBottom: 11,
  },
  textMusicalTitle: {
    fontSize: 16,
    color: Colors.gray_12,
    marginBottom: 4,
  },
  textMusicalDateLocation: {
    fontSize: 12,
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
    fontSize: 15,
    color: Colors.gray_12,
  },
  textPointContent: {
    fontSize: 13,
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
    fontSize: 14,
    color: Colors.gray_01,
  },
});

export default HomeStyles;

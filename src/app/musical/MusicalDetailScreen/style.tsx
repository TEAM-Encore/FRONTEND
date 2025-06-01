import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../../styles/typography';

const MusicalDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  image: {
    width: 168,
    height: 224,
    borderRadius: 10,
  },
  chipContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: Colors.sub_02,
    width: 53,
    height: 24,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    color: Colors.sub_05,
    ...typography.subhead01,
  },
  title: {
    ...typography.subhead04,
    paddingTop: 28,
    paddingBottom: 16,
  },
  buttonContainer: {
    backgroundColor: Colors.gray_12,
    width: 65.25,
    height: 32.62,
    borderRadius: 7.44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: Colors.gray_01,
    ...typography.subhead03,
    paddingRight: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    ...typography.subhead03,
    color: Colors.gray_06,
    textAlign: 'center',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 1.5,
    width: 187.5,
    backgroundColor: Colors.gray_03,
  },
  activeTabText: {
    ...typography.subhead03,
    color: Colors.sub_05,
  },
  activeTabButton: {
    position: 'relative',
  },
  activeTabUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 1.5,
    width: 187.5,
    backgroundColor: Colors.sub_05,
  },
  infoContainer: {
    marginHorizontal: 20,
  },
  infoTitle: {
    ...typography.subhead04,
    marginTop: 33,
  },
  summaryContainer: {
    backgroundColor: Colors.gray_03,
    width: 335,
    height: 160,
    borderRadius: 12,
    position: 'relative',
  },
  icons: {
    flexDirection: 'column',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  icon_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  iconTitle: {
    ...typography.subhead02,
  },
  iconContent_1: {
    ...typography.body01,
    color: Colors.gray_09,
    marginLeft: 50,
  },
  iconContent_2: {
    ...typography.body01,
    color: Colors.gray_09,
    marginLeft: 38,
  },
  iconContent_3: {
    ...typography.body01,
    color: Colors.gray_09,
    marginLeft: 26,
  },
  iconContent_4: {
    ...typography.body01,
    color: Colors.gray_09,
    marginLeft: 27,
  },
  subTitle: {
    ...typography.subhead02,
    marginBottom: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actorContainer: {
    width: 71.23,
    height: 71.23,
    borderRadius: 7.35,
    marginBottom: 4,
  },
  actorTextContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  actorText: {
    ...typography.caption,
    color: Colors.gray_09,
  },
  urlContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  reviewsContainer: {
    backgroundColor: Colors.sub_01,
    width: 335,
    height: 146,
    borderRadius: 8,
    position: 'relative',
  },
  reviews: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginVertical: 14,
  },
  reviewText: {
    ...typography.caption,
    color: Colors.gray_12,
  },
  reviewImage: {
    width: 174,
    height: 11,
    resizeMode: 'contain',
    marginRight: 48,
  },
  review_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWriteReview: {
    ...typography.body01,
    color: Colors.gray_08,
    marginTop: 33,
    marginBottom: 20,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MusicalDetailStyles;

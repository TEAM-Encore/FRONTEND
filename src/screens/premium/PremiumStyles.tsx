import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';

import {typography} from '../../styles/typography';

const {headline, display01, subhead03} = typography;

const PremiumStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  containerHeader: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerOtherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 23,
  },
  containerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    ...display01,
    color: Colors.gray_12,
    marginVertical: 23,
  },
  textPopularReviewsTilte: {
    ...headline,
    marginTop: 21,
    marginBottom: 14,
  },
  containerPopularReviews: {
    alignContent: 'center',
    alignItems: 'center',
  },
  containerTags: {
    marginTop: 26,
    marginBottom: 22.37,
  },
  // 글쓰기 버튼
  writeButton: {
    position: 'absolute',
    bottom: 14,
    right: 20,
    width: 119,
    height: 43,
    borderRadius: 49,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  writeIcon: {
    marginRight: 6,
  },
  buttonText: {
    ...subhead03,
  },
  containerWriter: {
    flexDirection: 'row',
    width: '100%',
    height: 71,
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 20,
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
  textDate: {
    ...typography.caption,
    color: '#878787',
  },
  reviewTitle: {
    ...typography.subhead05,
    marginTop: 30,
    marginBottom: 22,
  },
  field_container: {
    marginHorizontal: 20,
  },
  reviewSubTitle: {
    ...typography.subhead04,
    color: Colors.gray_12,
    marginBottom: 17,
  },
  reviewText: {
    ...typography.bodyLong01,
    color: Colors.gray_10,
    marginBottom: 17,
    marginTop: 8,
  },
  seatReviewContainer: {
    borderRadius: 12,
    backgroundColor: Colors.gray_03,
    width: 335,
    height: 99,
  },
  seatTitle: {
    ...typography.subhead02,
    color: Colors.wireframe_950,
    marginBottom: 3,
  },
  seatInfoText: {
    ...typography.caption,
    color: Colors.gray_10,
    marginBottom: 3,
    marginLeft: 2,
  },
  helpText: {
    color: Colors.gray_07,
    fontSize: 10,
    marginTop: 3,
  },
  circleContainer: {
    borderRadius: '50%',
    backgroundColor: '#FBFBFB',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  yellowContainer: {
    borderRadius: 4,
    backgroundColor: Colors.sub_02,
    width: 102,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  yellowContainerText: {
    fontSize: 12,
    color: Colors.gray_11,
    marginLeft: 4.5,
  },
  chipContainer: {
    maxWidth: 77.25,
    height: 30.62,
    borderRadius: 7.44,
    backgroundColor: Colors.sub_05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipText: {
    color: Colors.sub_02,
    ...typography.subhead02,
  },
  line2: {
    height: 4,
    backgroundColor: Colors.gray_03,
    marginTop: 44.38,
    marginBottom: 34,
  },
  responseContainer: {
    flexDirection: 'column',
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  responseText: {
    ...typography.subhead02,
    color: Colors.gray_12,
    marginTop: 6,
  },
  responseNumber: {
    ...typography.caption,
    color: Colors.gray_08,
    marginTop: 2,
  },
  warningContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 53,
  },
  warningText: {
    ...typography.caption,
    color: Colors.gray_06,
  },
  fadeLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 10,
  },
  fadeTextContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fadeText: {
    ...typography.subheadLong02,
    textAlign: 'center',
  },
  usePointsButton: {
    backgroundColor: Colors.gray_12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7.44,
    width: 84.25,
    height: 30.62,
    marginTop: 21,
  },
  usePointsButtonText: {
    color: Colors.sub_01,
    fontSize: 14,
    fontWeight: 'bold',
  },
  noReviewText: {
    ...typography.subheadLong02,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default PremiumStyles;

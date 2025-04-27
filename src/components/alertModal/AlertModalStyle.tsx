import Colors from '@/assets/colors/Colors';
import {StyleSheet} from 'react-native';

import {typography} from '../../styles/typography';

const {subhead03, subhead02, body01} = typography;

const AlertModalStyle = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    width: 267,
    paddingTop: 20,
    paddingBottom: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.gray_01,
    alignItems: 'center',
  },
  title: {
    ...subhead03,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    ...body01,
    textAlign: 'center',
    color: Colors.gray_07,
    marginBottom: 13,
  },
  topButton: {
    width: 236,
    height: 48,
    borderRadius: 4,
    backgroundColor: Colors.sub_04,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 9,
  },
  topButtonText: {
    ...subhead02,
  },
  bottomButton: {
    width: 236,
    height: 48,
    borderRadius: 4,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 9,
  },
  bottomButtonText: {
    ...subhead02,
  },
  containerReviewModal: {
    position: 'absolute',
    zIndex: 2,
    right: 0,
    marginRight: 19.8,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    bottom: -3,
    right: -172,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.gray_12,
  },
  reviewModal: {
    flexDirection: 'row',
    minHeight: 32,
    paddingHorizontal: 11.75,
    paddingVertical: 7.23,
    borderRadius: 8.14,
    backgroundColor: Colors.gray_12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textReviewModal: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 10.847,
    lineHeight: 16.271,
    letterSpacing: -0.271,
    color: Colors.gray_01,
    marginRight: 3.62,
  },
  toastBarcontainer: {
    position: 'absolute',
    bottom: 35,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 1000,
  },
  toastBarBox: {
    display: 'flex',
    backgroundColor: Colors.gray_12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: 335,
    height: 43,
    justifyContent: 'space-between',
  },
  toastBarmessage: {
    ...subhead02,
    color: Colors.white,
    fontSize: 14,
    marginRight: 8,
  },
});

export default AlertModalStyle;

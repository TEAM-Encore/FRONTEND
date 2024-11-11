import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../../styles/typography';

const {subhead02, subhead03, body01, caption} = typography;

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 23,
    marginHorizontal: 22,
  },
  containerCategory: {
    width: 55,
    height: 24,
    borderRadius: 4.27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE9DC',
    marginBottom: 22,
  },
  textCategory: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: '#FF853E',
  },
  textTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: -0.3,
    marginBottom: 13,
  },
  textContent: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 15,
    lineHeight: 25,
    letterSpacing: -0.3,
    marginBottom: 26,
  },
  images: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  line: {
    width: '100%',
    height: 0.75,
    backgroundColor: Colors.gray_04,
    marginVertical: 26,
  },
  containerHashtag: {
    marginHorizontal: 24,
    marginBottom: 15,
  },
  textHashtag: {
    ...body01,
    color: '#5D5D5D',
  },
  containerCommentLikeItems: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 21,
    marginBottom: 31,
  },
  containerCommentLike: {
    flexDirection: 'row',
    width: 61,
    height: 26,
    borderRadius: 68,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray_03,
  },
  textCommentLike: {
    ...body01,
    marginLeft: 4,
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
  textDate: {
    ...caption,
    color: '#878787',
  },
  containerWriterButton: {
    width: 55,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4.27,
    backgroundColor: Colors.gray_12,
  },
  textWriterButton: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: Colors.gray_01,
  },
  containerCommentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 18,
    marginLeft: 24,
    marginRight: 20,
  },
  textCommentTitle: {
    ...subhead03,
  },
  textLatestRecommended: {
    ...body01,
    color: '#8B8B8B',
  },
  containerCommentInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 62,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    marginBottom: 20,
    shadowColor: 'rgba(113, 113, 113, 0.10)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 57,
    elevation: 5,
  },
  white: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 21,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  containerCommentTextInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
    borderRadius: 38,
    backgroundColor: Colors.gray_03,
    marginLeft: 18,
    paddingHorizontal: 17,
  },
  textCommentInput: {
    ...body01,
  },
  textCommentSend: {
    ...subhead02,
    color: Colors.gray_12,
  },
});

export default HomeStyles;

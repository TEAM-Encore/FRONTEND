import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '@/styles/typography';

const {headline, subhead03, body01} = typography;

const SignUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  textTitle: {
    ...headline,
    fontFamily: 'Pretendard-SemiBold',
    paddingTop: 8,
    color: Colors.gray_12,
    marginTop: 31,
    marginBottom: 32,
  },
  containerAgree: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 52,
    borderRadius: 8,
    paddingHorizontal: 13,
  },
  textAgreeTitle: {
    ...subhead03,
  },
  textAgree: {
    ...body01,
  },
  iconArrowRight: {
    position: 'absolute',
    right: 20,
  },

  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.gray_03,
  },
  containerButton: {
    marginTop: 310,
    marginHorizontal: 20,
  },
  containerNextButton: {
    width: '100%',
    height: 51,
    backgroundColor: Colors.gray_06,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNextButton: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.3,
    color: Colors.gray_01,
  },
});

export default SignUpStyles;

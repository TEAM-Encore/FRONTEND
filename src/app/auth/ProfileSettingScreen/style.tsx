import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '@/styles/typography';

const {headline, subhead05, body01, body02, caption} = typography;

const OnboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  textProgress: {
    ...body01,
    marginTop: 29,
    color: Colors.gray_07,
  },
  textTitle: {
    ...headline,
    fontFamily: 'Pretendard-SemiBold',
    paddingTop: 8,
    color: Colors.gray_12,
    marginBottom: 33,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.gray_03,
  },
  containerButton: {
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

  // step1
  profile: {
    position: 'relative',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FEE892',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 12,
  },
  iconProfile: {
    position: 'absolute',
    top: 16.5,
    left: 16,
  },
  iconProfileCamera: {
    position: 'absolute',
    top: 36,
    left: 33,
  },
  profileTranslucent: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#00000050',
  },
  textNickname: {
    ...body01,
    marginBottom: 8,
  },
  containerTextInput: {
    justifyContent: 'center',
  },
  textInputNickname: {
    ...body01,
    lineHeight: 0,
    width: '100%',
    height: 52,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray_04,
    paddingHorizontal: 13,
  },
  containerDuplicateCheck: {
    position: 'absolute',
    right: 13,
    width: 64,
    height: 28,
    backgroundColor: Colors.sub_04,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDuplicateCheck: {
    ...caption,
    color: Colors.gray_12,
  },

  // step2
  textSubTitle: {
    ...body01,
    color: Colors.gray_08,
    marginBottom: 17,
  },
  containerKeyword: {
    width: 100,
    height: 100,
    backgroundColor: Colors.gray_03,
    borderRadius: 8,
    marginHorizontal: 8.5,
    marginVertical: 7.5,
    paddingHorizontal: 9.81,
    paddingVertical: 8.17,
    color: '#3D3D3D',
    overflow: 'hidden',
  },
  textKeyword: {
    ...body01,
  },
  iconKeyword: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  iconKeyword2: {
    position: 'absolute',
    right: -10,
    bottom: -15,
  },

  // step3
  containerFrequency: {
    width: '100%',
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray_03,
    borderRadius: 8,
    marginBottom: 20,
  },
  textFrequency: {
    ...body02,
    color: Colors.gray_08,
  },

  // profileCard
  textProfileCard: {
    ...subhead05,
    marginTop: 56,
    marginBottom: 37,
  },
});

export default OnboardingStyles;

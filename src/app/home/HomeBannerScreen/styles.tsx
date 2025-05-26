import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '@/styles/typography';

const {headline, bodyLong01, caption} = typography;

const HomeBannerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 62,
  },
  iconGoBack: {
    position: 'absolute',
    left: 20,
  },
  containerCategory: {
    height: 24,
    borderRadius: 4.27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDDCFF',
    marginLeft: 20,
    marginBottom: 14,
  },
  textCategory: {
    ...caption,
    fontFamily: 'Pretendard-Bold',
    color: '#A765EE',
  },
  textTitle: {
    ...headline,
    color: Colors.gray_12,
  },
  textSubTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.3,
    color: Colors.gray_12,
    marginHorizontal: 20,
    marginBottom: 18,
  },
  textContentBold: {
    ...bodyLong01,
    fontFamily: 'Pretendard-SemiBold',
    color: Colors.gray_12,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  textContent: {
    ...bodyLong01,
    color: Colors.gray_12,
    marginHorizontal: 20,
  },
  image: {
    width: 335,
    height: 143,
    borderRadius: 12,
  },
  image2: {
    width: 180,
    height: 290,
    borderRadius: 12,
  },
  boldLine: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.gray_03,
    marginVertical: 30,
  },
  line: {
    height: 0.75,
    backgroundColor: '#E1E1E1',
    marginVertical: 30,
    marginHorizontal: 19,
  },
});

export default HomeBannerStyles;

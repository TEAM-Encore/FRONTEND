import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';
const {headline, body02} = typography;

const ModalCategoryStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  container: {
    width: '100%',
    maxHeight: 397,
    justifyContent: 'center',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: Colors.gray_01,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  textTitle: {
    ...headline,
  },
  iconCancel: {
    position: 'absolute',
    top: 26.5,
    right: 20,
  },
  containerList: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textList: {
    ...body02,
    color: Colors.gray_07,
  },
  buttonCheck: {
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.sub_04,
    marginHorizontal: 20,
    marginTop: 19,
    marginBottom: 33,
  },
  textButton: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.3,
  },
});

export default ModalCategoryStyles;

import {StyleSheet} from 'react-native';

const AppStyles = StyleSheet.create({
  back_button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  title: {
    color: '#171717',
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.3,
  },
  register_button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  register_container: {
    width: 48,
    height: 28,
    backgroundColor: '#FFF1BB',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  register_text: {
    color: '#333333',
  },
});

export default AppStyles;

import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';

import {typography} from '../../styles/typography';

const {subhead03, subheadLong03, body01} = typography;

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  containerLogoTitle: {
    alignItems: 'center',
    marginTop: 136,
  },
  textTitle: {
    ...subhead03,
    color: Colors.gray_12,
    marginBottom: 103,
  },
  containerLogin: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
    borderRadius: 60,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 11,
  },
  iconLogin: {
    position: 'absolute',
    left: 20,
  },
  textLogin: {
    ...subheadLong03,
    color: Colors.gray_12,
  },
  textGuestLogin: {
    ...body01,
    color: Colors.gray_07,
    marginTop: 19,
  },
});

export default LoginStyles;

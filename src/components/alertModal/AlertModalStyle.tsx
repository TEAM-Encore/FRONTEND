import Colors from '@/assets/colors/Colors';
import {SvgXml} from 'react-native-svg';
import {StyleSheet} from 'react-native';

import {typography} from '../../styles/typography';

const {subhead03, subhead02, body01, caption} = typography;

const AlertModalStyle = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    ...StyleSheet.absoluteFillObject, // Fills the entire screen
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
});

export default AlertModalStyle;

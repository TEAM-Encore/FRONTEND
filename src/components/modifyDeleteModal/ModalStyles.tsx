import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';
const {subhead03} = typography;

const ModalStyles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  container: {
    width: 77,
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.gray_01,
  },
  line: {
    height: 0.75,
    backgroundColor: Colors.gray_03,
  },
  text: {
    ...subhead03,
    marginVertical: 10,
  },
});

export default ModalStyles;

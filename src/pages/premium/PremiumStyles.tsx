import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';

import {typography} from '../../styles/typography';

const {display01, subhead03} = typography;

const PremiumStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  // 상단바
  containerHeader: {
    height: 70,
    justifyContent: 'center',
    paddingHorizontal: 23,
  },
  containerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    ...display01,
    color: Colors.black,
  },
  // 글쓰기 버튼
  writeButton: {
    position: 'absolute',
    bottom: 14,
    right: 20,
    width: 119,
    height: 43,
    borderRadius: 49,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  writeIcon: {
    marginRight: 6,
  },
  buttonText: {
    ...subhead03,
  },
});

export default PremiumStyles;

import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';

import {typography} from '../../styles/typography';

const {headline, display01, subhead03} = typography;

const TicketBookStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  containerHeader: {
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  textCategory: {
    ...subhead03,
    marginRight: 7,
  },
  textTitle: {
    ...display01,
    color: Colors.gray_12,
    marginVertical: 23,
  },
  containerPlusButton: {
    position: 'absolute',
    bottom: 14,
    right: 20,
    width: 86,
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
  iconPlus: {
    marginRight: 6,
  },
  textPlusButton: {
    ...subhead03,
  },
});

export default TicketBookStyles;

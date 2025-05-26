import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../../styles/typography';

const {caption, subhead03} = typography;

const SaveStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  count_container: {
    width: 55,
    height: 24,
    backgroundColor: Colors.gray_03,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4.27,
    marginLeft: 20,
    marginTop: 11,
  },
  count_text: {
    ...caption,
  },
  list_container: {
    width: 335,
    height: 78,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  sub_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  list: {
    width: 335,
    height: 70,
    backgroundColor: Colors.white,
  },
  list_title: {
    ...subhead03,
    paddingTop: 11,
  },
  list_date: {
    ...caption,
    color: Colors.gray_08,
    paddingTop: 8,
  },
  list_expire_date: {
    ...caption,
    color: Colors.gray_06,
  },
  delete: {
    width: 41,
    height: 18,
    borderRadius: 35,
    backgroundColor: '#FFE8E2',
    color: '#FF0E0E',
    ...caption,
    paddingHorizontal: 10,
  },
  line: {
    height: 1,
    backgroundColor: Colors.wireframe_200,
    width: 335,
  },
  notice: {
    ...caption,
    color: Colors.wireframe_400,
    bottom: 40,
    alignSelf: 'center',
  },
  no_container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  no_text: {
    ...caption,
  },
});

export default SaveStyles;

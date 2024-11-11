import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../../styles/typography';

const {bodyLong02, headline, subhead02, body01} = typography;

const EntireStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notice: {
    width: 335,
    height: 45,
    backgroundColor: Colors.sub_04,
    borderRadius: 8,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 17,
    marginBottom: 32,
  },
  notice_container_title: {
    alignContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    width: 37,
    height: 24,
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  notice_title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    lineHeight: 22,
    color: Colors.gray_12,
  },
  notice_body: {
    ...bodyLong02,
    color: Colors.gray_12,
  },
  notice_icon: {
    paddingLeft: 270,
  },
  hottest_container: {
    alignContent: 'center',
    alignItems: 'center',
  },
  hottest_title: {
    ...headline,
    marginHorizontal: 20,
    marginBottom: 14,
  },
  hottest_title2: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    width: 187,
    height: 45,
    overflow: 'hidden',
  },
  hottest_icon: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    lineHeight: 22,
    color: Colors.gray_12,
    paddingRight: 5,
  },
  footer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 13,
  },
  fiter_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 39,
    marginBottom: 24,
  },
  more_title: {
    ...headline,
  },
  filter: {
    ...subhead02,
  },
  tab_filter: {
    ...body01,
  },
});

export default EntireStyles;

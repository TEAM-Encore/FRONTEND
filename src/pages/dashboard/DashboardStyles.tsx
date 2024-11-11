import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';

import {typography} from '../../styles/typography';

const {
  display01,
  subhead03,
  subhead02,
  subhead01,
  subheadLong02,
  headline,
  body01,
  caption,
} = typography;

const DashboardStyles = StyleSheet.create({
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
  // 탭
  containerTab: {
    backgroundColor: Colors.primary_03,
    flexDirection: 'row',
    height: 44,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabText: {
    ...subhead03,
    color: Colors.gray_06,
  },
  activeTabText: {
    ...subhead03,
    color: Colors.black,
  },
  activeTabButton: {
    position: 'relative',
  },
  activeTabUnderline: {
    position: 'absolute',
    bottom: -1,
    height: 1.5,
    width: 74,
    backgroundColor: Colors.sub_04,
  },
  // 글쓰기 버튼
  writeButton: {
    position: 'absolute',
    bottom: 14, // 하단 바 위 14px 간격
    right: 20, // 오른쪽 끝에서 20px 간격
    width: 105,
    height: 41,
    borderRadius: 49,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.75,
    shadowRadius: 1.5,
  },
  writeIcon: {
    marginRight: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
});

export default DashboardStyles;

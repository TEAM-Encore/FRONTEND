import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';

const DashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  containerHeader: {
    borderColor: 'black',
    borderWidth: 1,
    height: 70,
  },
  containerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 23,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerTab: {
    backgroundColor: Colors.primary_03,
    flexDirection: 'row',
    height: 44,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
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

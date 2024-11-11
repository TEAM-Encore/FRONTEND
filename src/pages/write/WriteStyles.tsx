import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';

const WriteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  selectField: {
    width: 335,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectCategoryField: {
    width: 335,
    height: 48,
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary_03,
  },
  fieldText: {
    fontSize: 18,
  },
});

export default WriteStyles;

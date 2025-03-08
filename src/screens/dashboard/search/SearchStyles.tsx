import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../../styles/typography';

const SearchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBarContainer: {
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.gray_02,
    width: 292,
    height: 40,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    // paddingVertical: 20,
    // marginBottom: 10,
  },
  clearButton: {
    marginLeft: 10,
  },
  listContainer: {
    paddingTop: 10,
  },
  itemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 15,
    color: Colors.gray_06,
    // ...typography.body,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.gray_06,
    // ...typography.body,
  },
  recentSearchContainer: {
    marginTop: 17,
    marginHorizontal: 20,
  },
  recentSearchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recentSearchTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.wireframe_950,
  },
  clearHistoryText: {
    marginTop: 12,
    fontSize: 13,
    color: Colors.wireframe_400,
  },
  recentSearchItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recentSearchText: {
    fontSize: 16,
    color: '#333',
  },
  noHistoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noHistoryText: {
    fontSize: 16,
    color: '#999',
  },
  closeIcon: {
    right: 0,
  },
  resultContainer: {
    flexDirection: 'row',
    marginTop: 21,
    marginHorizontal: 22,
    justifyContent: 'space-between',
  },
  resultText: {
    ...typography.subhead03,
    color: Colors.wireframe_950,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filter: {
    ...typography.subhead02,
  },
  tab_filter: {
    ...typography.body01,
    color: Colors.gray_07,
  },
  componentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'gray',
  },
  searchList: {
    marginHorizontal: 20,
    paddingHorizontal: 37,
  },
  searchText: {
    color: Colors.gray_12,
    fontSize: 16,
  },
  line: {
    height: 0.5,
    backgroundColor: Colors.gray_04,
    width: 335,
    marginTop: 12,
    marginBottom: 23,
    marginHorizontal: 20,
  },
});

export default SearchStyles;

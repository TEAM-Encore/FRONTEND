import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';

const {bodyLong02, bodyLong01, subhead02, headline, caption} = typography;

const ModifyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  field_container: {
    marginHorizontal: 20,
  },
  selectField: {
    width: 335,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldText: {
    ...bodyLong02,
  },
  input_title: {
    ...headline,
    color: Colors.gray_07,
    width: 335,
    height: 28,
    marginTop: 29,
  },
  input_content: {
    ...bodyLong01,
    color: Colors.gray_07,
    marginBottom: 20,
  },
  line: {
    height: 1,
    backgroundColor: Colors.wireframe_200,
    width: 335,
    marginTop: 12,
    marginBottom: 23,
  },
  photo_container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  photo_text_container: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  photo: {
    width: 84,
    height: 92,
    borderRadius: 9,
    backgroundColor: Colors.gray_03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo_text: {
    ...caption,
    color: Colors.gray_07,
  },
  selected_photos_container: {
    flexDirection: 'row', // 가로로 사진을 나란히 배치
    flexWrap: 'wrap', // 사진이 많을 경우 줄 바꿈
    marginTop: 10, // 상단 여백
    padding: 5, // 내부 여백
  },

  // Optional: 스타일을 추가하여 이미지 미리보기를 꾸밀 수 있음
  selected_photo: {
    width: 100,
    height: 100,
    margin: 5, // 이미지 사이 간격
    borderRadius: 8, // 둥근 모서리
  },
  rule_container: {
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.gray_02,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  rule_title: {
    ...subhead02,
    paddingBottom: 8,
  },
  rule_content: {
    ...caption,
    color: Colors.wireframe_800,
  },
  containerCommentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 62,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    marginBottom: 20,
    shadowColor: 'rgba(113, 113, 113, 0.10)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 57,
    elevation: 5,
  },
  white: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 21,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  bottom_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom_icon_text: {
    color: Colors.wirteframe_500,
    ...subhead02,
    paddingLeft: 7,
    paddingRight: 16,
  },
  bottom_text_container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    paddingRight: 20,
  },
  bottom_text: {
    color: Colors.gray_11,
  },
});

export default ModifyStyles;

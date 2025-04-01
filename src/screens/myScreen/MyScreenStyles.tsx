import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';

const MyScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  containerHeader: {
    justifyContent: 'center',
    marginHorizontal: 20,
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
    ...typography.display01,
    color: Colors.gray_12,
    marginVertical: 23,
  },
  coinContainer: {
    backgroundColor: Colors.sub_04,
    borderRadius: 4,
    width: 60,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  coinText: {
    paddingLeft: 5,
  },
  rectContainer: {
    position: 'relative',
  },
  profileImg: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: 22,
    left: 20,
  },
  overlayContainer: {
    position: 'absolute',
    top: 22,
    left: 20,
  },
  overlayText: {
    position: 'absolute',
    top: 32,
    left: 106,
    flexDirection: 'row',
  },
  overlaySubText: {
    position: 'absolute',
    top: 62,
    left: 106,
    flexDirection: 'row',
  },
  nickname: {
    ...typography.subhead05,
  },
  infoText: {
    fontSize: 14,
    color: Colors.gray_09,
  },
  userInfoContainer: {
    backgroundColor: Colors.sub_01,
    borderRadius: 11,
    width: 336,
    height: 176,
    paddingHorizontal: 20,
    paddingVertical: 26,
  },
  userInfoText: {
    color: Colors.gray_12,
    ...typography.subhead02,
    marginLeft: 4,
  },
  chipContainer: {
    backgroundColor: Colors.sub_04,
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 66,
    height: 22,
    justifyContent: 'center',
  },
  infoTitle: {
    ...typography.subhead04,
    color: Colors.gray_12,
  },
  infoSubTitle: {
    ...typography.subheadLong03,
    color: Colors.gray_08,
  },
  emailText: {
    ...typography.caption,
    color: Colors.gray_06,
  },
  line: {
    backgroundColor: Colors.gray_04,
    width: 335,
    height: 0.75,
    marginTop: 30,
  },
  userAccountText: {
    ...typography.caption,
    color: Colors.gray_07,
  },
  profileTitleText: {
    ...typography.headline,
    color: Colors.gray_12,
  },
  profileEditText: {
    ...typography.caption,
    marginRight: 8,
  },
  nicknameContainer: {
    ...typography.body01,
    marginTop: 39,
    marginBottom: 15,
  },
  textCommentInput: {
    ...typography.body02,
    borderColor: Colors.gray_04,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 13,
    borderRadius: 8,
    borderColor: Colors.gray_04,
    borderWidth: 1,
    width: '100%',
    height: 52,
  },
  checkDuplicate: {
    borderRadius: 4,
    backgroundColor: Colors.sub_04,
    width: 64,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkDuplicateText: {
    ...typography.caption,
    color: Colors.gray_12,
  },
  frequencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    paddingHorizontal: 13,
    borderRadius: 8,
    borderColor: Colors.sub_05,
    borderWidth: 1,
    width: 104.25,
    height: 30.62,
  },
  frequencyText: {
    color: Colors.sub_05,
  },
  optionContainer: {
    flexDirection: 'row', // 체크박스와 텍스트를 가로로 정렬
    alignItems: 'center', // 수직 가운데 정렬
    justifyContent: 'flex-start', // 모든 체크박스가 왼쪽에서 시작
    width: '50%', // 각 옵션의 너비를 동일하게 설정
  },
  optionText: {
    ...typography.body01,
  },
  white: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 21,
    backgroundColor: '#FBFBFB',
    zIndex: 10,
  },
  containerCommentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 62,
    backgroundColor: '#FBFBFB',
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
  next_button: {
    backgroundColor: Colors.sub_04,
    width: 337,
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  next_button_text: {
    ...typography.subhead04,
  },
  notificationContainer: {
    flex: 1,
    padding: 20,
  },
  notificationInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  notificationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  notificationSubText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  


  // // 마케팅 정보 수신 항목 스타일
  // marketingItemContainer: {
  //   marginTop: 30, // 기존 항목과 구분되는 간격
  // },

  // // 마케팅 항목 아래 선
  // fullWidthLine: {
  //   width: "100%", // 선이 가로로 꽉 차게
  //   height: 1, // 선의 두께
  //   backgroundColor: "#ddd", // 선 색상
  //   marginTop: 11, // 11 만큼 간격 추가
  // },

  marketingItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  
  fullWidthLine: {
    width: "100%", // 선이 가로로 꽉 차게
    height: 1, // 선의 두께
    backgroundColor: "#ddd", // 선 색상
    marginTop: 11, // 11 만큼 간격 추가
  },

  // 마케팅 정보 수신 동의 약관 스타일
  termsText: {
    marginTop: 11, // 간격 설정
    color: "#A5A5A5", // 회색 텍스트 색상
    textDecorationLine: "underline", // 밑줄 추가
    fontSize: 14,
  },
});

export default MyScreenStyles;

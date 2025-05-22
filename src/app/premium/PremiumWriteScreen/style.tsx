import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '@/styles/typography';

const PremiumWriteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  field_container: {
    marginHorizontal: 20,
    marginBottom: 140,
    position: 'relative',
  },
  progressText: {
    ...typography.body01,
    marginTop: 29,
    color: Colors.gray_07,
  },
  title: {
    ...typography.subhead05,
    paddingTop: 8,
    color: Colors.gray_12,
    marginBottom: 33,
  },
  list_container: {
    marginTop: 14,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  list_image: {
    marginHorizontal: 16,
    marginVertical: 14,
    resizeMode: 'contain',
    borderRadius: 4.79,
  },
  list_yellow: {
    width: 335,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    flexDirection: 'row',
  },
  list_title: {
    ...typography.subhead03,
    zIndex: 1,
    marginVertical: 14,
    width: 210,
  },
  icons: {
    flexDirection: 'column',
  },
  icon_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  list_text: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 10,
    lineHeight: 18,
    letterSpacing: -0.3,
    width: 170,
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
    width: 337,
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  next_button_text: {
    ...typography.subhead04,
  },
  review_title: {
    color: Colors.gray_12,
    ...typography.body01,
    marginTop: 17,
  },
  textInput: {
    backgroundColor: Colors.gray_03,
    width: 337,
    height: 52,
    fontSize: 15,
    marginTop: 8,
    paddingHorizontal: 13,
    borderRadius: 8,
  },
  tag_external_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginBottom: 10,
  },
  tag_container: {
    flexDirection: 'row',
    width: 95,
    height: 32.62,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7.44,
    paddingHorizontal: 10.62,
    paddingVertical: 5.31,
  },
  tag_text: {
    ...typography.subhead03,
    flexShrink: 1,
  },
  seat_title: {
    marginTop: 8,
    marginBottom: 6,
    color: Colors.gray_12,
    ...typography.subhead05,
  },
  seat_subTitle: {
    color: Colors.gray_08,
    ...typography.body01,
  },
  reload_text: {
    color: Colors.gray_10,
    ...typography.caption,
    paddingLeft: 4,
  },
  seat_input: {
    backgroundColor: Colors.gray_03,
    width: 337,
    height: 119,
    fontSize: 15,
    marginTop: 22,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  music_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  music_text: {
    ...typography.caption,
    marginTop: 20,
  },
  total_container: {
    width: 90,
    height: 31,
    backgroundColor: Colors.sub_02,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  total_score: {
    ...typography.subhead02,
    color: Colors.gray_11,
    marginLeft: 4,
  },
  fadeLayer: {
    position: 'absolute', // 화면 위에 겹치도록 설정
    bottom: 0, // 하단에 고정
    left: 0,
    right: 0,
    height: 50, // 페이드 효과 높이
  },
});

export default PremiumWriteStyles;

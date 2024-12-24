import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../../styles/typography';

const PremiumWriteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  field_container: {
    marginHorizontal: 20,
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
  list_yellow_icon: {
    marginTop: 27,
    marginLeft: -50,
    resizeMode: 'cover',
  },
  list_image: {
    marginHorizontal: 16,
    marginVertical: 14,
    resizeMode: 'contain',
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
    backgroundColor: Colors.sub_04,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  next_button_text: {
    color: Colors.gray_12,
    ...typography.subhead04,
  },
});

export default PremiumWriteStyles;

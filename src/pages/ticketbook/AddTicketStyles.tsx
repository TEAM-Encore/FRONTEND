import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '../../styles/typography';

const {headline, subhead02, body01, caption} = typography;

const AddTicketStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  textProgress: {
    ...body01,
    marginTop: 29,
    color: Colors.gray_07,
  },
  textTitle: {
    ...headline,
    fontFamily: 'Pretendard-SemiBold',
    paddingTop: 8,
    color: Colors.gray_12,
    marginBottom: 33,
  },

  // step 페이지에서만 사용
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.gray_03,
  },
  containerButton: {
    marginHorizontal: 20,
  },
  containerNextButton: {
    width: '100%',
    height: 51,
    backgroundColor: Colors.gray_06,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNextButton: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.3,
    color: Colors.gray_01,
  },

  // step1
  containerTextInputIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputSearch: {
    ...body01,
    lineHeight: 0,
    width: '100%',
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.gray_03,
    paddingHorizontal: 45,
  },
  iconSearch: {
    position: 'absolute',
    left: 13,
  },
  iconSearchCancel: {
    position: 'absolute',
    right: 13,
  },

  // step3
  textSubTitle: {
    ...subhead02,
    color: Colors.gray_10,
    marginBottom: 12,
  },
  containerTime: {
    width: 83,
    height: 37,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray_03,
    padding: 10,
    borderRadius: 4,
    marginBottom: 32,
  },
  textCategory: {
    ...body01,
    marginRight: 4,
  },
  textInputPlace: {
    ...body01,
    lineHeight: 0,
    width: '100%',
    borderRadius: 4,
    backgroundColor: Colors.gray_03,
    padding: 10,
    marginBottom: 32,
  },
  textInputSeat: {
    ...body01,
    lineHeight: 0,
    width: 40,
    height: 25,
    borderRadius: 4,
    backgroundColor: Colors.gray_03,
    paddingHorizontal: 10,
  },
  textSeat: {
    ...body01,
    color: '#4F4F4F',
    marginLeft: 6,
    marginRight: 12,
  },

  // step5
  textDiscription: {
    ...body01,
    color: Colors.gray_08,
    marginTop: 8,
    marginBottom: 44,
  },
  containerDashed: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray_05,
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 11,
  },
  containerAddImage: {
    flexDirection: 'row',
    width: 97,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.gray_03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAddImage: {
    ...body01,
    color: Colors.gray_08,
    marginLeft: 4,
  },
  textCheckBox: {
    ...caption,
    color: Colors.gray_08,
    marginLeft: 6,
  },
});

export default AddTicketStyles;

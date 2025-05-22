import {StyleSheet} from 'react-native';
import Colors from '@/assets/colors/Colors';
import {typography} from '@/styles/typography';

const {headline, subhead03, body01, caption} = typography;

const TicketDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_01,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 62,
  },
  iconGoBack: {
    position: 'absolute',
    left: 20,
  },
  textTitle: {
    ...headline,
    color: Colors.gray_12,
  },
  containerTicketDetail: {
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 32,
  },
  containerTicket: {
    flexDirection: 'row',
    width: 335,
    height: 146,
    borderRadius: 8,
    backgroundColor: Colors.gray_03,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  containerTicketImage: {
    width: 82,
    height: 108,
    borderRadius: 7,
    backgroundColor: '#000',
  },
  containerReview: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 335,
    height: 68,
    backgroundColor: Colors.sub_02,
    borderRadius: 8,
    padding: 14,
    marginTop: 38,
  },
  iconPencil: {
    marginLeft: 5,
    marginRight: 10,
  },
  iconArrowRight: {
    position: 'absolute',
    right: 14,
  },
  textReviewTitle: {
    ...caption,
    color: Colors.gray_12,
  },
  textReviewSubTitle: {
    ...subhead03,
    color: Colors.gray_12,
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
  ticketAuthImage: {
    width: 335,
    height: 270,
    borderRadius: 8,
    backgroundColor: '#000',
  },
});

export default TicketDetailStyles;

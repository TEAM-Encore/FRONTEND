import dayjs, {Dayjs} from 'dayjs';

class _DateUtil {
  now = () => dayjs();
  nowFormat = () => this.now().format('YYYY-MM-DD');
  formatDot = (d: Dayjs | Date | string) => dayjs(d).format('YYYY.MM.DD');
  formatYYMMDD = (d: Dayjs | Date | string) => dayjs(d).format('YY.MM.DD');
}

const DateUtil = new _DateUtil();

export default DateUtil;

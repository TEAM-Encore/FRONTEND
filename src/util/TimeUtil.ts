import dayjs, {Dayjs} from 'dayjs';

const timeStr = 'HH:mm' as string;
type TimeStr = typeof timeStr;

class _TimeUtil {
  now = () => dayjs();
  nowFormat = () => this.now().format(timeStr);

  /** @param d HH:mm */
  toDay = (d: TimeStr) => {
    if (!d) return this.now();
    const [h, m] = d.split(':').map(Number);
    return this.now().set('hour', h).set('minute', m);
  };
  format = (d: Dayjs | Date | string) => dayjs(d).format(timeStr);
}

const TimeUtil = new _TimeUtil();

export default TimeUtil;

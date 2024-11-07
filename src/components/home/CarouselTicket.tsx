import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const CarouselTicket: React.FC<SvgProps> = props => (
  <Svg width={290} height={170} viewBox="0 0 290 170" fill="none" {...props}>
    <Path
      d="M0 8C0 3.58172 3.58173 0 8 0H282C286.418 0 290 3.58173 290 8V113C285.582 113 282 116.582 282 121C282 125.418 285.582 129 290 129V162C290 166.418 286.418 170 282 170H8C3.58172 170 0 166.418 0 162V129C4.41828 129 8 125.418 8 121C8 116.582 4.41828 113 0 113V8Z"
      fill="white"
    />
  </Svg>
);

export default CarouselTicket;

import React from 'react';
import {Dimensions} from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';

const CarouselBackground: React.FC<SvgProps> = props => (
  <Svg width="100%" height="100%" viewBox="0 0 375 188" fill="none" {...props}>
    <Path
      d="M186.5 136.5L-1 187.5V-47H374.5V187.5L186.5 136.5Z"
      fill="url(#paint0_linear_848_3148)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_848_3148"
        x1="186.75"
        y1="0.5"
        x2="186.75"
        y2="235.5"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#DA093E" />
        <Stop offset="1" stopColor="#DD0037" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default CarouselBackground;

import * as React from 'react';
import Svg, {Path, G, SvgProps} from 'react-native-svg';

const IconSearch: React.FC<SvgProps> = props => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <G id="search">
      <Path
        id="Vector"
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="#FBFBFB"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_2"
        d="M21 20.9999L16.65 16.6499"
        stroke="#FBFBFB"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default IconSearch;

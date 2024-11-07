import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect, SvgProps } from 'react-native-svg';

const IconActor: React.FC<SvgProps> = props => (
  <Svg width="11" height="12" viewBox="0 0 11 12" fill="none">
    <G clipPath="url(#clip0_848_3354)">
      <Path
        d="M9.16665 10.5833H1.83331V9.66659C1.83331 8.40094 2.85933 7.37492 4.12498 7.37492H6.87498C8.14062 7.37492 9.16665 8.40094 9.16665 9.66659V10.5833ZM5.49998 6.45825C3.9812 6.45825 2.74998 5.22703 2.74998 3.70825C2.74998 2.18947 3.9812 0.958252 5.49998 0.958252C7.01876 0.958252 8.24998 2.18947 8.24998 3.70825C8.24998 5.22703 7.01876 6.45825 5.49998 6.45825Z"
        fill="#FBFBFB"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_848_3354">
        <Rect width="11" height="11" fill="white" transform="translate(0 0.5)" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default IconActor;

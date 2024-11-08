import React from 'react';
import Svg, {Path, G, SvgProps} from 'react-native-svg';

const IconComment: React.FC<SvgProps> = props => {
  return (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
      <G id="message-circle">
        <Path
          id="Vector"
          d="M10.5 5.75001C10.5017 6.40995 10.3475 7.06096 10.05 7.65001C9.69722 8.35589 9.15488 8.9496 8.48372 9.36465C7.81257 9.77971 7.03912 9.99971 6.25 10C5.59007 10.0017 4.93906 9.84755 4.35 9.55001L1.5 10.5L2.45 7.65001C2.15247 7.06096 1.99828 6.40995 2 5.75001C2.00031 4.96089 2.22031 4.18744 2.63536 3.51629C3.05041 2.84514 3.64413 2.3028 4.35 1.95001C4.93906 1.65248 5.59007 1.49829 6.25 1.50001H6.5C7.54217 1.55751 8.52652 1.99739 9.26457 2.73544C10.0026 3.47349 10.4425 4.45784 10.5 5.50001V5.75001Z"
          stroke="#4F4F4F"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export default IconComment;

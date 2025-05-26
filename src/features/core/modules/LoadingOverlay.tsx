import React, {useEffect, useRef} from 'react';
import {ActivityIndicator} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

type Props = {
  isOpen: boolean;
  unmount: () => void;
};

function LoadingOverlay({isOpen, unmount}: Props) {
  const theme = useTheme();
  const mountedRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      mountedRef.current = true;
    }

    if (!isOpen && mountedRef.current) unmount();
  }, [isOpen, mountedRef]);

  return (
    <Root>
      <ActivityIndicator size={'large'} color={theme.system.sub_02} />
    </Root>
  );
}

export default LoadingOverlay;

const Root = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

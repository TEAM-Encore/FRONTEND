import Typo from '@/components/Typo';
import React, {useEffect, useRef} from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

interface Props {
  isOpen: boolean;
  close: () => void;
  unmount: () => void;
  message: string;
  onPress?: () => void;
}

const Y_FROM = -150;
const Y_TO = 0;

const TOP_OFFSET = 20;
const DURATION_MS = 1000 * 3;

function Toast({isOpen, close, unmount, message, onPress}: Props) {
  const {top} = useSafeAreaInsets();
  const mountedRef = useRef(false);

  const mount = () => {
    mountedRef.current = true;
  };
  const exit = () => {
    if (!mountedRef.current) return;
    unmount();
  };

  useEffect(() => {
    const timer = setTimeout(() => close(), DURATION_MS);

    return () => clearTimeout(timer);
  }, []);

  const y = useSharedValue(Y_FROM);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: y.value}],
  }));

  useEffect(() => {
    if (isOpen) {
      y.value = withTiming(Y_TO, undefined, finished => {
        if (finished) runOnJS(mount)();
      });
    } else {
      y.value = withTiming(Y_FROM, undefined, finished => {
        if (finished) runOnJS(exit)();
      });
    }
  }, [isOpen]);

  const handlePress = () => {
    close();
    onPress?.();
  };

  return (
    <Root style={[animatedStyle, {top: TOP_OFFSET + top}]}>
      <Btn onPress={handlePress}>
        <Message>{message}</Message>
      </Btn>
    </Root>
  );
}

export default Toast;

const Root = styled(Animated.View)`
  position: absolute;
  top: 60px;
  left: 20px;
  right: 20px;
`;

const Btn = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: ${p => p.theme.gray.gray_12};
`;

const Message = styled(Typo.Subhead03)`
  text-align: center;
  color: ${p => p.theme.system.white};
`;

import React, {useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = React.PropsWithChildren<{
  isOpen: boolean;
  close: () => void;
  unmount: () => void;
}>;

const BACKDROP_OPACITY_FROM = 0;
const BACKDROP_OPACITY_TO = 1;

const BODY_OPACITY_FROM = 0;
const BODY_OPACITY_TO = 1;
const BODY_Y_FROM = 150;
const BODY_Y_TO = 0;

function BottomSheetModal({isOpen, close, unmount, children}: Props) {
  const opacity = useSharedValue(BODY_OPACITY_FROM);
  const y = useSharedValue(BODY_Y_FROM);

  const mountedRef = useRef(false);

  const mount = () => {
    mountedRef.current = true;
  };
  const exit = () => {
    if (!mountedRef.current) return;
    unmount();
  };

  const backdropAnimatedStyles = useAnimatedStyle(() => ({
    opacity: withTiming(isOpen ? BACKDROP_OPACITY_TO : BACKDROP_OPACITY_FROM),
  }));

  const bodyAnimatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: y.value}],
  }));

  useEffect(() => {
    if (isOpen) {
      opacity.value = withTiming(BODY_OPACITY_TO, undefined, () =>
        runOnJS(mount)(),
      );
      y.value = withTiming(BODY_Y_TO);
    } else {
      opacity.value = withTiming(BODY_OPACITY_FROM, undefined, () =>
        runOnJS(exit)(),
      );
      y.value = withTiming(BODY_Y_FROM);
    }
  }, [isOpen]);

  const handleBackdropPress = () => close();

  return (
    <Backdrop onTouchEnd={handleBackdropPress} style={backdropAnimatedStyles}>
      <Body onTouchEnd={e => e.stopPropagation()} style={bodyAnimatedStyles}>
        {children}
      </Body>
    </Backdrop>
  );
}

export default BottomSheetModal;

const Backdrop = styled(Animated.View)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Body = styled(Animated.View)``;

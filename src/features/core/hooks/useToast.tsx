import {overlay} from 'overlay-kit';
import React from 'react';
import Toast from '../modules/Toast';

function useToast() {
  const showToast = (message: string, onPress?: () => void) => {
    overlay.open(({isOpen, close, unmount}) => (
      <Toast
        isOpen={isOpen}
        close={close}
        unmount={unmount}
        message={message}
        onPress={onPress}
      />
    ));
  };

  return {showToast};
}

export default useToast;

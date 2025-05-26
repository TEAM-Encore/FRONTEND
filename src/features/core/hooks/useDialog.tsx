import {overlay} from 'overlay-kit';
import Dialog, {DialogConfig} from '../modules/Dialog';
import React from 'react';

function useDialog() {
  const showDialog = (config: DialogConfig) => {
    overlay.open(({isOpen, close, unmount}) => (
      <Dialog {...config} isOpen={isOpen} close={close} unmount={unmount} />
    ));
  };

  return {showDialog};
}

export default useDialog;

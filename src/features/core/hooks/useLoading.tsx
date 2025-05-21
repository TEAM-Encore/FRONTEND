import {overlay} from 'overlay-kit';
import React, {useRef} from 'react';
import LoadingOverlay from '../modules/LoadingOverlay';

function useLoading() {
  const idRef = useRef<string | null>(null);

  const showLoading = () => {
    if (idRef.current) return;

    overlay.open(({isOpen, close, unmount, overlayId}) => {
      idRef.current = overlayId;
      return <LoadingOverlay isOpen={isOpen} unmount={unmount} />;
    });
  };

  const hideLoading = () => {
    if (!idRef.current) return;

    overlay.close(idRef.current);
    idRef.current = null;
  };

  return {
    showLoading,
    hideLoading,
  };
}

export default useLoading;

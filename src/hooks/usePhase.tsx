import React, {useCallback, useState} from 'react';

function usePhase<T extends string>(phases: T[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPhase = phases[currentIndex];

  const setPhase = (name: T) => {
    const targetIndex = phases.indexOf(name);
    setCurrentIndex(targetIndex);
  };
  const nextPhase = () =>
    setCurrentIndex(prev => Math.min(prev + 1, phases.length - 1));
  const prevPhase = () => setCurrentIndex(prev => Math.max(prev - 1, 0));
  const resetPhase = () => setCurrentIndex(0);

  const Show = useCallback(
    ({name, children}: React.PropsWithChildren<{name: T}>) => {
      if (name !== currentPhase) return <></>;

      return children;
    },
    [currentPhase],
  );

  return {Show, currentPhase, setPhase, nextPhase, prevPhase, resetPhase};
}

export default usePhase;

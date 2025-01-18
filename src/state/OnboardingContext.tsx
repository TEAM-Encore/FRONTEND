import React, {createContext, useContext, useState, ReactNode} from 'react';

interface OnboardingData {
  agreements: string[];
  profileUrl: string;
  nickname: string;
  keywords: string[];
  frequency: string;
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  updateOnboardingData: (newData: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      'useOnboarding은 OnboardingProvider 내에서 사용해야 합니다',
    );
  }
  return context;
};

interface OnboardingProps {
  children: ReactNode;
}

export const OnboardingProvider = ({children}: OnboardingProps) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    agreements: [],
    profileUrl: '',
    nickname: '',
    keywords: [],
    frequency: '',
  });

  const updateOnboardingData = (newData: Partial<OnboardingData>) => {
    setOnboardingData(prev => {
      const updatedData = {...prev, ...newData};
      console.log('온보딩 데이터:', updatedData);
      return updatedData;
    });
  };

  return (
    <OnboardingContext.Provider value={{onboardingData, updateOnboardingData}}>
      {children}
    </OnboardingContext.Provider>
  );
};

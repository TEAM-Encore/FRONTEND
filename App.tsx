import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import appTheme from './src/common/theme';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/common/queryClient';
import {AddTicketProvider} from './src/state/AddTicketContext';
import {OnboardingProvider} from './src/state/OnboardingContext';
import {ThemeProvider} from 'styled-components';
import Navigator from './src/app/Navigator';
import {OverlayProvider} from 'overlay-kit'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme}>
        <SafeAreaProvider>
          <OverlayProvider>
            <OnboardingProvider>
              <AddTicketProvider>
                <Navigator />
              </AddTicketProvider>
            </OnboardingProvider>
          </OverlayProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

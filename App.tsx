import {SafeAreaProvider} from 'react-native-safe-area-context';
import appTheme from './src/common/theme';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/common/queryClient';
import {AddTicketProvider} from './src/state/AddTicketContext';
import {OnboardingProvider} from './src/state/OnboardingContext';
import {ThemeProvider} from 'styled-components';
import Navigator from './src/app/Navigator';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme}>
        <SafeAreaProvider>
          <OnboardingProvider>
            <AddTicketProvider>
              <Navigator />
            </AddTicketProvider>
          </OnboardingProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

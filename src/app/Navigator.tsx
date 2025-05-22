import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RootStack from './RootStack';

function Navigator() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default Navigator;

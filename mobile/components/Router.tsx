import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import LoginStack from './LoginStack';

export default function Router(): JSX.Element {
  const isLoggedIn: boolean = true;

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <LoginStack />}
    </NavigationContainer>
  );
}

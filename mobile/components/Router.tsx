import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '../redux/hooks';
import AppStack from './AppStack';
import LoginStack from './LoginStack';

export default function Router(): JSX.Element {
  // get authentication state from redux store
  const isLoggedIn: JWT | undefined = useAppSelector((state) => state.authentication.jwt);

  return <NavigationContainer>{!isLoggedIn ? <AppStack /> : <LoginStack />}</NavigationContainer>;
}

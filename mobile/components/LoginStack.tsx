import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from './Authentication';

const LoginStackNav = createNativeStackNavigator<NavigationTypes.LoginStackParamList>();

export default function LoginStack(): JSX.Element {
  return (
    <LoginStackNav.Navigator>
      <LoginStackNav.Screen
        name="Authentication"
        component={Authentication}
        options={{ headerShown: false }}
      />
    </LoginStackNav.Navigator>
  );
}

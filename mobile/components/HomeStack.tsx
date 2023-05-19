import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import CreatePost from './CreatePost';

const Stack = createStackNavigator<NavigationTypes.HomeStackParamList>();

export default function HomeStack(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerTitle: 'Reposted' }} />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{ headerTitle: 'New Post' }}
      />
    </Stack.Navigator>
  );
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeStack from './HomeStack';
import Profile from './Profile';
import Explore from './Explore';

const AppTab = createBottomTabNavigator();

export default function AppStack(): JSX.Element {
  return (
    <AppTab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      initialRouteName="Map"
      backBehavior="order"
    >
      <AppTab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" color={color} size={size} />,
        }}
      />
      <AppTab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-friends" color={color} size={size} />
          ),
        }}
      />
      <AppTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-circle" color={color} size={size} />
          ),
        }}
      />
    </AppTab.Navigator>
  );
}

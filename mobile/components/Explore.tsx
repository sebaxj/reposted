import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Explore(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Explore</Text>
    </View>
  );
}

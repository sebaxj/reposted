import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Loading(): JSX.Element {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

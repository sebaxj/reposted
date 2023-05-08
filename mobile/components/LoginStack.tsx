import React from 'react';
import {  Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { moderateScale, verticalScale } from '../utils/scale.utility';
import { useAppDispatch } from '../redux/hooks';
import { login } from '../redux/authenticationSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: verticalScale(8),
    borderRadius: moderateScale(8),
    margin: verticalScale(8),
  },
});

export default function LoginStack(): JSX.Element {
  // import hooks for authentication reducer
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => dispatch(login())} style={styles.button}>
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

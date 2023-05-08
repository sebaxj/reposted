import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, verticalScale } from '../utils/scale.utility';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleFeedView } from '../redux/feedSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'blue',
    padding: verticalScale(8),
    borderRadius: moderateScale(8),
    margin: verticalScale(8),
  },
});

function Global(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Global</Text>
    </SafeAreaView>
  );
}

function Following(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Following</Text>
    </SafeAreaView>
  );
}

export default function Home(): JSX.Element {
  // get feed view from redux store
  const globalFeedView: boolean = useAppSelector((state) => state.feed.global);

  // get dispatcher
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => dispatch(toggleFeedView(true))} style={styles.button}>
          <Text>Global</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(toggleFeedView(false))} style={styles.button}>
          <Text>Feed</Text>
        </TouchableOpacity>
      </View>
      {globalFeedView ? <Global /> : <Following />}
    </SafeAreaView>
  );
}

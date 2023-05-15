import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TwitterPreview from 'react-native-twitter-preview';
import { moderateScale, verticalScale } from '../utils/scale.utility';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleFeedView } from '../redux/feedSlice';
import InstagramEmbed from './InstagramEmbed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8FF',
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
  tweet: {
    width: 300,
    height: 580,
  },
});

function Global(): JSX.Element {
  return (
    <ScrollView style={{ width: '100%' }}>
      <Text>Global</Text>
      <InstagramEmbed url="https://www.instagram.com/p/CsOJmhNPsx4/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==" />
    </ScrollView>
  );
}

function Following(): JSX.Element {
  return (
    <ScrollView style={{ width: '100%' }}>
      <Text>Following</Text>
      <TwitterPreview
        url="https://twitter.com/Tesla/status/1655673425736638473"
        backgroundColor="#F8F8FF"
      />
      <TwitterPreview
        url="https://twitter.com/RoyalFamily/status/1655603604957306882?s=20"
        backgroundColor="#F8F8FF"
      />
      <TwitterPreview
        url="https://twitter.com/megynkelly/status/1655329512912044032?s=20"
        backgroundColor="#F8F8FF"
      />
      <TwitterPreview
        url="https://twitter.com/megynkelly/status/1655329512912044032?s=20"
        backgroundColor="#F8F8FF"
      />
    </ScrollView>
  );
}

export default function Home(): JSX.Element {
  // get feed view and instagram token from redux store
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
          <Text>Following</Text>
        </TouchableOpacity>
      </View>
      {globalFeedView ? <Global /> : <Following />}
    </SafeAreaView>
  );
}

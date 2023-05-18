import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TwitterPreview from 'react-native-twitter-preview';
import { moderateScale, verticalScale } from '../utils/scale.utility';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleFeedView } from '../redux/feedSlice';
import InstagramEmbed from './InstagramEmbed';
import TiktokEmbed from './TikTokEmbed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8FF',
  },
  content: {
    flexDirection: 'row',
  },
  activeText: {
    color: 'white',
    fontSize: 16,
  },
  
  inactiveText: {
    color: 'grey',
    fontSize: 16,
  },  
  button: {
    backgroundColor: 'black',
    padding: verticalScale(10),
    borderRadius: moderateScale(5),
    margin: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tweet: {
    width: 300,
    height: 580,
  },
});

function Global(): JSX.Element {
  return (
    <ScrollView style={{ width: '100%' }}>
      <InstagramEmbed url="https://www.instagram.com/p/CsOJmhNPsx4/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==" />
      <TiktokEmbed url="https://www.tiktok.com/@scout2015/video/6718335390845095173" />
      <InstagramEmbed url="https://www.instagram.com/p/CsOJmhNPsx4/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==" />
      <TiktokEmbed url="https://www.tiktok.com/@goodthing828/video/7232724820650167579" />
    </ScrollView>
  );
}

function Following(): JSX.Element {
  return (
    <ScrollView style={{ width: '100%' }}>
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
        <Text style={globalFeedView ? styles.activeText : styles.inactiveText}>Global</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(toggleFeedView(false))} style={styles.button}>
        <Text style={globalFeedView ? styles.inactiveText : styles.activeText}>Following</Text>
      </TouchableOpacity>
      </View>
      {globalFeedView ? <Global /> : <Following />}
    </SafeAreaView>
  );
}

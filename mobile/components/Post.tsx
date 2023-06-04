import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import TwitterPreview from 'react-native-twitter-preview';
import InstagramEmbed from './InstagramEmbed';
import TiktokEmbed from './TikTokEmbed';
import { horizontalScale, scaleFont } from '../utils/scale.utility';

const styles = StyleSheet.create({
  username: {
    fontSize: scaleFont(15),
    color: '#EC555E',
  },
  post: {
    backgroundColor: '#FFFFFF',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(8),
    paddingLeft: horizontalScale(8),
  },
  profileImage: {
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderRadius: horizontalScale(25),
  },
});

interface PostProps {
  item: { url: string; postedBy: string; content: 'twitter' | 'instagram' | 'tiktok'; key: string };
}

export default function Post(props: PostProps): JSX.Element {
  const { item } = props;

  if (item.content === 'instagram') {
    return (
      <View style={styles.post}>
        <View style={styles.postHeader}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.profileImage} />
          <Text style={styles.username}>@{item.postedBy}</Text>
        </View>
        <InstagramEmbed url={item.url} />
      </View>
    );
  }
  if (item.content === 'tiktok') {
    return (
      <View style={styles.post}>
        <View style={styles.postHeader}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.profileImage} />
          <Text style={styles.username}>@{item.postedBy}</Text>
        </View>
        <TiktokEmbed url={item.url} />
      </View>
    );
  }
  if (item.content === 'twitter') {
    return (
      <View style={styles.post}>
        <View style={styles.postHeader}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.profileImage} />
          <Text style={styles.username}>@{item.postedBy}</Text>
        </View>
        <TwitterPreview url={item.url} />
      </View>
    );
  }
  return <Text>Invalid URL</Text>;
}

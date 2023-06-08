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
    marginVertical: horizontalScale(8),
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
  comments: {
    marginHorizontal: horizontalScale(10),
    gap: horizontalScale(4),
  },
  commentLine: {
    flexDirection: 'row',
    gap: horizontalScale(6),
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
          <Image
            source={{
              uri: 'https://via.placeholder.com/50',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>@{item.postedBy}</Text>
        </View>
        <InstagramEmbed url={item.url} />
        <View style={styles.comments}>
          <View style={styles.commentLine}>
            <Text style={{ fontWeight: 'bold', fontSize: scaleFont(15) }}>peyton</Text>
            <Text style={{ fontSize: scaleFont(15) }}>
              I love this! I'm going to try it out this weekend.
            </Text>
          </View>
          <View style={styles.commentLine}>
            <Text style={{ fontWeight: 'bold', fontSize: scaleFont(15) }}>sammyk</Text>
            <Text style={{ fontSize: scaleFont(15) }}>lol damn thats the truth</Text>
          </View>
        </View>
      </View>
    );
  }
  if (item.content === 'tiktok') {
    return (
      <View style={styles.post}>
        <View style={styles.postHeader}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/50',
            }}
            style={styles.profileImage}
          />
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
          <Image
            source={{
              uri: 'https://via.placeholder.com/50',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>@{item.postedBy}</Text>
        </View>
        <TwitterPreview url={item.url} />
        <View style={styles.comments}>
          <View style={styles.commentLine}>
            <Text style={{ fontWeight: 'bold', fontSize: scaleFont(15) }}>wylie</Text>
            <Text style={{ fontSize: scaleFont(15) }}>
              <Text style={{ color: 'blue' }}>@tarpar</Text> relatable?
            </Text>
          </View>
          <View style={styles.commentLine}>
            <Text style={{ fontWeight: 'bold', fontSize: scaleFont(15) }}>tarpar</Text>
            <Text style={{ fontSize: scaleFont(15) }}>
              <Text style={{ color: 'blue' }}>@wylie</Text> ha... ha ha... no I be crushin it
            </Text>
          </View>
          <View style={styles.commentLine}>
            <Text style={{ fontWeight: 'bold', fontSize: scaleFont(15) }}>dylanly</Text>
            <Text style={{ fontSize: scaleFont(15) }}>guyssss we are ALL crushin in</Text>
          </View>
          <View style={styles.commentLine}>
            <Text style={{ fontWeight: 'bold', fontSize: scaleFont(15) }}>chogan</Text>
            <Text style={{ fontSize: scaleFont(15) }}>
              <Text style={{ color: 'blue' }}>@dylanly</Text> What do you mean I saw you skip leg
              day...
            </Text>
          </View>
          <Text style={{ color: '#AAAABB', fontSize: scaleFont(15) }}>Post a Comment...</Text>
        </View>
      </View>
    );
  }
  return <Text>Invalid URL</Text>;
}

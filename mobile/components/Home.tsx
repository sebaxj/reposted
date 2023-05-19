import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TwitterPreview from 'react-native-twitter-preview';
import { horizontalScale, moderateScale, scaleFont, verticalScale } from '../utils/scale.utility';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleFeedView } from '../redux/feedSlice';
import InstagramEmbed from './InstagramEmbed';
import TiktokEmbed from './TikTokEmbed';
import { StackScreenProps } from '@react-navigation/stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    gap: horizontalScale(32),
    marginVertical: verticalScale(8),
  },
  activeText: {
    color: '#EC555E',
    fontSize: 16,
  },

  inactiveText: {
    color: '#AAAABB',
    fontSize: 16,
  },
  activeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: moderateScale(2),
    borderBottomColor: '#EC555E',
    paddingBottom: verticalScale(3),
  },
  inactiveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: moderateScale(2),
    borderBottomColor: '#AAAABB',
    paddingBottom: verticalScale(3),
  },
  feedList: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
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
  postButtonContainer: {
    position: 'absolute',
    bottom: horizontalScale(16),
    right: verticalScale(16),
  },
  postButton: {
    backgroundColor: '#EC555E',
    height: horizontalScale(64),
    width: horizontalScale(64),
    borderRadius: horizontalScale(32),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  postButtonText: {
    fontSize: scaleFont(40),
    color: '#FFFFFF',
  },
});

function Post({
  item,
}: {
  item: { url: string; postedBy: string; content: 'twitter' | 'instagram' | 'tiktok'; key: string };
}): JSX.Element {
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

function Global(): JSX.Element {
  const data: {
    url: string;
    postedBy: string;
    content: 'twitter' | 'instagram' | 'tiktok';
    key: string;
  }[] = [
    {
      url: 'https://www.instagram.com/p/CsOJmhNPsx4/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==',
      postedBy: 'user1234',
      content: 'instagram',
      key: '1',
    },
    {
      url: 'https://www.tiktok.com/@scout2015/video/6718335390845095173',
      postedBy: 'dylanly',
      content: 'tiktok',
      key: '2',
    },
    {
      url: 'https://www.instagram.com/p/CsTXpfXxHTJ/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==',
      postedBy: 'user5678',
      content: 'instagram',
      key: '3',
    },
    {
      url: 'https://www.tiktok.com/@goodthing828/video/7232724820650167579',
      postedBy: 'tarpar',
      content: 'tiktok',
      key: '4',
    },
  ];

  return (
    <FlatList
      style={styles.feedList}
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <Post item={item} />}
    />
  );
}

function Following(): JSX.Element {
  const data: {
    url: string;
    postedBy: string;
    content: 'twitter' | 'instagram' | 'tiktok';
    key: string;
  }[] = [
    {
      url: 'https://twitter.com/Tesla/status/1655673425736638473',
      postedBy: 'saurenk',
      content: 'twitter',
      key: '1',
    },
    {
      url: 'https://www.tiktok.com/@scout2015/video/6718335390845095173',
      postedBy: 'corbino',
      content: 'tiktok',
      key: '2',
    },
    {
      url: 'https://twitter.com/RoyalFamily/status/1655603604957306882?s=20',
      postedBy: 'corbino',
      content: 'twitter',
      key: '3',
    },
    {
      url: 'https://www.tiktok.com/@goodthing828/video/7232724820650167579',
      postedBy: 'sebastianxj',
      content: 'tiktok',
      key: '4',
    },
  ];
  return (
    <FlatList
      style={styles.feedList}
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <Post item={item} />}
    />
  );
}

type HomeProps = StackScreenProps<NavigationTypes.HomeStackParamList, 'Home'>;

export default function Home(props: HomeProps): JSX.Element {
  // get feed view and instagram token from redux store
  const globalFeedView: boolean = useAppSelector((state) => state.feed.global);

  // get dispatcher
  const dispatch = useAppDispatch();

  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => dispatch(toggleFeedView(true))}
          style={globalFeedView ? styles.activeButton : styles.inactiveButton}
        >
          <Text style={globalFeedView ? styles.activeText : styles.inactiveText}>Global</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(toggleFeedView(false))}
          style={!globalFeedView ? styles.activeButton : styles.inactiveButton}
        >
          <Text style={globalFeedView ? styles.inactiveText : styles.activeText}>Following</Text>
        </TouchableOpacity>
      </View>
      {globalFeedView ? <Global /> : <Following />}
      <View style={styles.postButtonContainer}>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => navigation.navigate('CreatePost')}
        >
          <Text style={styles.postButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

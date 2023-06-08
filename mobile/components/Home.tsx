import React from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { horizontalScale, moderateScale, scaleFont, verticalScale } from '../utils/scale.utility';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleFeedView } from '../redux/feedSlice';
import { useGetUserQuery } from '../redux/api';
import Post from './Post';

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

function Global(): JSX.Element {
  // TODO: clean up
  // get dispatcher
  const jwt: JWT | undefined = useAppSelector((state) => state.authentication.jwt);
  const { isLoading, isFetching, refetch } = useGetUserQuery(jwt?._id as string);
  // if isLoading || isFetching, render Loading component

  const data: {
    url: string;
    postedBy: string;
    content: 'twitter' | 'instagram' | 'tiktok';
    key: string;
  }[] = [
    {
      url: 'https://www.instagram.com/p/CsOJmhNPsx4/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==',
      postedBy: 'chogan',
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
      postedBy: 'wylie',
      content: 'instagram',
      key: '3',
    },
    {
      url: 'https://www.tiktok.com/@goodthing828/video/7232724820650167579',
      postedBy: 'tarpar',
      content: 'tiktok',
      key: '4',
    },
    {
      url: 'https://www.instagram.com/p/CsTXpfXxHTJ/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==',
      postedBy: 'peyton',
      content: 'instagram',
      key: '5',
    },
    {
      url: 'https://www.instagram.com/p/CsTXpfXxHTJ/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==',
      postedBy: 'sammyk',
      content: 'instagram',
      key: '6',
    },
  ];

  return (
    <FlatList
      style={styles.feedList}
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <Post item={item} />}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
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
      url: 'https://www.instagram.com/p/CtNbkqds1SU/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==',
      postedBy: 'dylanly',
      content: 'instagram',
      key: '1',
    },
    {
      url: 'https://twitter.com/JimGaffigan/status/178986566541258752?s=20',
      postedBy: 'chogan',
      content: 'twitter',
      key: '2',
    },
    {
      url: 'https://www.instagram.com/p/CtDEDyohlUg/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==',
      postedBy: 'wylie',
      content: 'instagram',
      key: '3',
    },
    {
      url: 'https://www.tiktok.com/@goodthing828/video/7232724820650167579',
      postedBy: 'tarpar',
      content: 'tiktok',
      key: '4',
    },
    {
      url: 'https://www.instagram.com/p/CsTXpfXxHTJ/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==',
      postedBy: 'peyton',
      content: 'instagram',
      key: '5',
    },
    {
      url: 'https://www.instagram.com/p/CsTXpfXxHTJ/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==',
      postedBy: 'sammyk',
      content: 'instagram',
      key: '6',
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
          <Text style={globalFeedView ? styles.activeText : styles.inactiveText}>MungerHouse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(toggleFeedView(false))}
          style={!globalFeedView ? styles.activeButton : styles.inactiveButton}
        >
          <Text style={globalFeedView ? styles.inactiveText : styles.activeText}>GymMemez</Text>
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

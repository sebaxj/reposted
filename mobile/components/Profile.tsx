import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList } from 'react-native';
import { useAppDispatch } from '../redux/hooks';
import TwitterPreview from 'react-native-twitter-preview';
import { logout } from '../redux/authenticationSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 150,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    top: 130,
    alignSelf: 'center',
  },
  userInfo: {
    marginTop: 60, // Half of profile image size
    alignItems: 'center',
  },
  handle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  fullName: {
    fontSize: 18,
    color: 'grey',
  },
  bio: {
    fontSize: 16,
    color: 'grey',
    marginTop: 10,
  },
  followerCount: {
    fontSize: 16,
    color: 'grey',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default function Profile(): JSX.Element {
  // import hooks for authentication reducer
  const dispatch = useAppDispatch();
  const twitterData = [
    { url: "https://twitter.com/Tesla/status/1655673425736638473", key: '1' },
    { url: "https://twitter.com/RoyalFamily/status/1655603604957306882?s=20", key: '2' },
    { url: "https://twitter.com/megynkelly/status/1655329512912044032?s=20", key: '3' },
    { url: "https://twitter.com/megynkelly/status/1655329512912044032?s=20", key: '4' },
  ];  

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
      ListHeaderComponent={(<>
          <Image
          style={styles.headerImage}
          source={{ uri: 'https://via.placeholder.com/500' }}
        />
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://via.placeholder.com/100' }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.handle}>@user0</Text>
          <Text style={styles.fullName}>User Zero</Text>
          <Text style={styles.bio}>Reposting some fun stuff</Text>
          <Text style={styles.followerCount}>123 followers</Text>
        </View>
        </>
      )}
        style={{ width: '100%' }}
        data={twitterData}
        renderItem={({ item }) => (
          <TwitterPreview
            url={item.url}
            backgroundColor="#F8F8FF"
          />
        )}
      />
    </SafeAreaView>
  );
}

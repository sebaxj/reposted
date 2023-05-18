import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 35,
    marginRight: 10,
  },
  handle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullName: {
    fontSize: 14,
  },
});

const profiles = [
  { id: '1', handle: '@user1', fullName: 'User One', image: 'https://via.placeholder.com/50' },
  { id: '2', handle: '@user2', fullName: 'User Two', image: 'https://via.placeholder.com/50' },
  { id: '3', handle: '@user3', fullName: 'User Three', image: 'https://via.placeholder.com/50' },
  { id: '4', handle: '@user4', fullName: 'User Four', image: 'https://via.placeholder.com/50' },
];

export default function Explore(): JSX.Element {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.profileImage} />
      <View>
        <Text style={styles.handle}>{item.handle}</Text>
        <Text style={styles.fullName}>{item.fullName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

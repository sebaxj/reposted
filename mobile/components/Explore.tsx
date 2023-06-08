import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { horizontalScale, scaleFont, verticalScale } from '../utils/scale.utility';
import SearchBar from './SearchBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(8),
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
  followersList: {
    marginTop: verticalScale(8),
  },
  title: {
    fontSize: scaleFont(22),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scaleFont(17),
    color: '#AAAABB',
  },
  header: {
    gap: horizontalScale(8),
  },
});

const profiles = [
  {
    id: '1',
    handle: '@chogan',
    fullName: 'Connor Hogan',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '2',
    handle: '@dylanly',
    fullName: 'Dylan Ly',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '3',
    handle: '@wylie',
    fullName: 'Wylie Kaplan',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '4',
    handle: '@tarpar',
    fullName: 'Tara Parekh',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '5',
    handle: '@peyton',
    fullName: 'Peyton Hulsey',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '6',
    handle: '@sammyk',
    fullName: 'Sam Kirchner',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '7',
    handle: '@saurenk',
    fullName: 'Sauren Khosla',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '8',
    handle: '@corbino',
    fullName: 'Corbin Schmeil',
    image: 'https://via.placeholder.com/50',
  },
];

const renderItem = ({ item }) => (
  <TouchableOpacity style={styles.itemContainer}>
    <Image source={{ uri: item.image }} style={styles.profileImage} />
    <View>
      <Text style={styles.handle}>{item.handle}</Text>
      <Text style={styles.fullName}>{item.fullName}</Text>
    </View>
  </TouchableOpacity>
);

export default function Explore(): JSX.Element {
  // state for search bar
  const [value, setValue] = React.useState<string>('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <SearchBar
          placeholder="Search for a user"
          value={value}
          onValueChange={setValue}
          onClear={() => setValue('')}
          onCancel={() => setValue('')}
        />
        <Text style={styles.subtitle}>Recently Searched:</Text>
      </View>
      <FlatList
        style={styles.followersList}
        data={profiles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

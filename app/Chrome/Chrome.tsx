import React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import Tile from './Tile';
import SortableList from './SortableList';
import {MARGIN} from './Config';

const tiles = [
  {
    id: 'google',
    uri: 'https://google.com',
  },

  {
    id: 'expo',
    uri: 'https://expo.io',
  },
  {
    id: 'facebook',
    uri: 'https://facebook.com',
  },
  {
    id: 'reanimated',
    uri: 'https://docs.swmansion.com/react-native-reanimated/',
  },
  {
    id: 'github',
    uri: 'https://github.com',
  },
  {
    id: 'rnnavigation',
    uri: 'https://reactnavigation.org/',
  },
  {
    id: 'youstube',
    uri: 'https://youtube.com',
  },
  {
    id: 'twiaatter',
    uri: 'https://twitter.com',
  },
  {
    id: 'twifftter',
    uri: 'https://twitter.com',
  },
  {
    id: 'twitadter',
    uri: 'https://twitter.com',
  },
  {
    id: 'twitfter',
    uri: 'https://twitter.com',
  },
  {
    id: 'twistter',
    uri: 'https://twitter.com',
  },
  {
    id: 'twitte25r',
    uri: 'https://twitter.com',
  },
];

interface ChromeProps {}

function Chrome(props: ChromeProps): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <SortableList>
        {tiles.map(tile => (
          <Tile
            onLongPress={() => true}
            key={tile.id}
            id={tile.id}
            uri={tile.uri}
          />
        ))}
      </SortableList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: MARGIN,
  },
});

export default Chrome;

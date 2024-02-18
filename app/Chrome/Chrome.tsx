import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
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
    id: 'instagram',
    uri: 'https://instagram.com/',
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
    id: 'youtube',
    uri: 'https://youtube.com',
  },
  {
    id: 'twitter',
    uri: 'https://twitter.com',
  },
  {
    id: 'linkedin',
    uri: 'https://www.linkedin.com',
  },
  {
    id: 'wikipedia',
    uri: 'https://www.wikipedia.org',
  },
  {
    id: 'amazon',
    uri: 'https://www.amazon.com',
  },
  {
    id: 'ebay',
    uri: 'https://www.ebay.com',
  },
  {
    id: 'netflix',
    uri: 'https://www.netflix.com',
  },
  {
    id: 'apple',
    uri: 'https://www.apple.com',
  },
  {
    id: 'microsoft',
    uri: 'https://www.microsoft.com',
  },
  {
    id: 'yahoo',
    uri: 'https://www.yahoo.com',
  },
  {
    id: 'bing',
    uri: 'https://www.bing.com',
  },
  {
    id: 'stackoverflow',
    uri: 'https://stackoverflow.com',
  },
  {
    id: 'wordpress',
    uri: 'https://wordpress.com',
  },
  {
    id: 'imdb',
    uri: 'https://www.imdb.com',
  },
  {
    id: 'craigslist',
    uri: 'https://www.craigslist.org',
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
    paddingHorizontal: MARGIN,
  },
});

export default Chrome;

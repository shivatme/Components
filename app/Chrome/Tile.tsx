import React from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';

import {MARGIN, SIZE} from './Config';

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    padding: MARGIN * 2,
  },
  web: {
    flex: 1,
    borderRadius: MARGIN * 2,
    backgroundColor: '#f0f4f5',
    borderWidth: 1,
    borderColor: 'black',
  },
});
interface TileProps {
  id: string;
  uri: string;
  onLongPress: () => void;
}

const Tile = ({uri}: TileProps) => {
  return (
    <View style={styles.container} pointerEvents="none">
      {/* <WebView source={{uri}} containerStyle={styles.web} /> */}
      <View style={styles.web} />
    </View>
  );
};

export default Tile;

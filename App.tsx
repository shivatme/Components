import React from 'react';

import {StatusBar, View, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Chrome from './app/Chrome';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ParallaxCarousel from './app/Parallax Carousel';
import SkiaScreen from './app/SkiaScreen';
// import Chrome from 'drag-to-sort-react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          {/* <View style={{width: 1000, height: 600}}>
          <Chrome />
        </View> */}
          {/* <ParallaxCarousel /> */}
          <SkiaScreen />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </>
  );
}

export default App;

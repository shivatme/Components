import React from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {images} from './images';

interface ParallexCarouselProps {}

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

function ParallexCarousel(props: ParallexCarouselProps): JSX.Element {
  const scrollX = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={images}
        keyExtractor={item => item}
        onScroll={handleScroll}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <CarouselItem item={item} index={index} scrollX={scrollX} />
        )}
      />
    </View>
  );
}

interface CarouselItemProps {
  item: string;
  index: number;
  scrollX: SharedValue<number>;
}

const CarouselItem: React.FC<CarouselItemProps> = ({item, index, scrollX}) => {
  const imageStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-width * 0.6, 0, width * 0.6],
    );
    return {
      transform: [{translateX}],
    };
  });

  return (
    <View style={{width, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
          //   overflow: 'hidden',
        }}>
        <View
          style={{
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            overflow: 'hidden',
            alignItems: 'center',
            borderRadius: 18,
            borderWidth: 10,
            borderColor: 'white',
            elevation: 15,
          }}>
          <Animated.Image
            source={{uri: item}}
            style={[styles.image, imageStyle]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  image: {
    width: ITEM_WIDTH * 1.4,
    height: ITEM_HEIGHT,
    alignSelf: 'center',
  },
});

export default ParallexCarousel;

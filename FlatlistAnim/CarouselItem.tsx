import {Dimensions, Pressable} from 'react-native';
import Animated, {
  Easing,
  SharedTransition,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

interface CarouselItemProps {
  item: any;
  index: number;
  scrollXIndex: SharedValue<number>;
}

const {width} = Dimensions.get('screen');
const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const CarouselItem: React.FC<CarouselItemProps> = ({
  item,
  index,
  scrollXIndex,
}) => {
  const navigation = useNavigation();

  const inputRange = [index - 1, index, index + 1];
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(
      interpolate(
        scrollXIndex.value,
        inputRange,
        [1 - 1 / VISIBLE_ITEMS, 1, 1],
        // Extrapolation.CLAMP,
      ),
    ),

    transform: [
      {
        translateX: withSpring(
          interpolate(scrollXIndex.value, inputRange, [50, 0, -600]),
          {
            duration: 1000,
            dampingRatio: 3,
            stiffness: 500,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
          },
        ),
      },
      {
        scale: withTiming(
          interpolate(scrollXIndex.value, inputRange, [0.8, 1, 0.7]),
          {
            easing: Easing.out(Easing.quad),
          },
        ),
      },
    ],
  }));

  const customTransition = SharedTransition.custom(values => {
    'worklet';
    return {
      height: withSpring(values.targetHeight),
      width: withSpring(values.targetWidth),
      originX: withSpring(values.targetOriginX),
      originY: withSpring(values.targetOriginY),
    };
  });
  return (
    <Pressable
      onPress={() => navigation.navigate('Description', {item: item.poster})}>
      <Animated.View
        style={[
          {
            // backgroundColor: 'red',
            position: 'absolute',
            left: -ITEM_WIDTH / 2,
          },
          animatedStyle,
        ]}>
        <Animated.Image
          sharedTransitionTag={item.poster}
          // sharedTransitionStyle={customTransition}
          source={{uri: item.poster}}
          style={{
            // resizeMode: 'stretch',
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            // borderRadius: 20,
            //   flex: 1,
          }}
        />
      </Animated.View>
    </Pressable>
  );
};

export default CarouselItem;

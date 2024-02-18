import React, {ReactNode} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  COL,
  Positions,
  SIZE,
  animationConfig,
  getOrder,
  getPosition,
} from './Config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  AnimatedRef,
  SharedValue,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

interface ItemProps {
  children: ReactNode;
  id: string;
  positions: SharedValue<Positions>;
  scrollView: AnimatedRef<Animated.ScrollView>;
  scrollY: SharedValue<number>;
}

function Item({
  children,
  positions,
  id,
  scrollView,
  scrollY,
}: ItemProps): JSX.Element {
  const inset = useSafeAreaInsets();
  const containerHeight =
    Dimensions.get('window').height - inset.top - inset.bottom;
  const contentHeight = (Object.keys(positions.value).length / COL) * SIZE;

  const position = getPosition(positions.value[id]);
  const isGestureActive = useSharedValue(false);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  useAnimatedReaction(
    () => positions.value[id],
    newOrder => {
      const newPosition = getPosition(newOrder);
      translateX.value = withTiming(newPosition.x, animationConfig);
      translateY.value = withTiming(newPosition.y, animationConfig);
    },
  );

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_, ctx) => {
      isGestureActive.value = true;
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: ({translationX, translationY}, ctx) => {
      translateX.value = ctx.x + translationX;
      translateY.value = ctx.y + translationY;

      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateX.value, translateY.value);
      if (oldOrder !== newOrder) {
        const newPositions = JSON.parse(JSON.stringify(positions.value));

        console.log(newPositions[id]);
        for (const key in newPositions) {
          if (newOrder > oldOrder)
            if (newPositions[key] <= newOrder && newPositions[key] > oldOrder) {
              newPositions[key]--;
            }
          if (newOrder < oldOrder) {
            if (newPositions[key] >= newOrder && newPositions[key] < oldOrder) {
              newPositions[key]++;
            }
          }
          newPositions[id] = newOrder;
          positions.value = newPositions;
        }
      }

      const lowerBound = scrollY.value;
      const upperBound = lowerBound + containerHeight - SIZE;
      const maxScroll = contentHeight - containerHeight;
      const scrollLeft = maxScroll - scrollY.value;

      if (translateY.value > upperBound) {
        const diff = Math.min(translateY.value - upperBound, scrollLeft);
        scrollY.value += diff;
        ctx.y += diff;
        translateY.value = ctx.y + translationY;
        scrollTo(scrollView, 0, scrollY.value, false);
      }
      if (translateY.value < lowerBound) {
        const diff = Math.min(lowerBound - translateY.value, lowerBound);
        scrollY.value -= diff;
        ctx.y -= diff;
        translateY.value = ctx.y + translationY;
        scrollTo(scrollView, 0, scrollY.value, false);
      }
    },
    onEnd: () => {
      const destination = getPosition(positions.value[id]);
      translateX.value = withTiming(destination.x, animationConfig, () => {
        isGestureActive.value = false;
      });
      translateY.value = withTiming(destination.y, animationConfig);
    },
    onFinish: () => {
      isGestureActive.value = false;
    },
  });

  const style = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0;
    const scale = isGestureActive.value ? 1.1 : 1;
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SIZE,
      height: SIZE,
      zIndex,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale},
      ],
    };
  });
  return (
    <Animated.View style={style}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        activateAfterLongPress={150}>
        <Animated.View style={StyleSheet.absoluteFill}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Item;

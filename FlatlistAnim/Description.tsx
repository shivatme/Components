import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {SharedTransition, withSpring} from 'react-native-reanimated';

function Description(props: DescriptionProps): JSX.Element {
  const {item} = props.route.params;
  if (item) console.log(item);

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
    <Animated.View style={styles.container}>
      <Animated.Image
        sharedTransitionTag={item}
        // sharedTransitionStyle={customTransition}
        source={{uri: item}}
        style={{
          // resizeMode: 'stretch',
          width: 500,
          height: 500,
          // borderRadius: 20,
          //   flex: 1,
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Description;

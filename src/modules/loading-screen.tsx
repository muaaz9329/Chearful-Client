import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Colors } from '@app/constants';
import { StyleSheet, View } from 'react-native';
import * as Animated from 'react-native-animatable';
import { ActivityIndicator } from 'react-native-paper';

/**
 * @description This is a Loading Screen Component
 * @param {object} ref - pass the ref to the componet to access the LoadingEnds function
 * @function LoadingEnds - This function is used to end the loading screen
 */
const LoadingScreen = forwardRef(
  (
    props: {
      opacity?: number;
    },
    ref,
  ) => {
    const AnimationRef = useRef(null);
    const [zIndex, setZIndex] = useState(100);

    useImperativeHandle(ref, () => ({
      LoadingEnds() {
        // @ts-ignore
        AnimationRef?.current?.fadeOut(500);
        setTimeout(() => {
          setZIndex(-100);
        }, 500);
      },
      LoadingStarts() {
        setZIndex(100);
        // @ts-ignore
        AnimationRef?.current?.fadeIn(100);
      },
    }));

    return (
      <View
        style={[
          styles.cont1,
          { zIndex: zIndex },
          { opacity: props.opacity || 1 },
        ]}
      >
        <Animated.View style={styles.cont} ref={AnimationRef}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </Animated.View>
      </View>
    );
  },
);

export default LoadingScreen;

const styles = StyleSheet.create({
  cont1: {
    position: 'absolute',

    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  cont: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
    return (
      <View style={[styles.cont1, { opacity: props.opacity || 1 }]}>
        <View style={styles.cont}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </View>
    );
  },
);

export default LoadingScreen;

const styles = StyleSheet.create({
  cont1: {
    position: 'absolute',

    alignSelf: 'center',
    top: '50%',
    backgroundColor: '#fff',
    flex: 1,
  },
  cont: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

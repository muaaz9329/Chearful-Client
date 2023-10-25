import React, { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Svg, G, Circle } from 'react-native-svg';
import { IconArrowRight } from 'tabler-icons-react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
} from 'react-native-reanimated';
import useSignupStore from '../hooks/use-signup-store';
import { IsPhone, IsTablet } from '@app/utils';
import { Colors } from '@app/constants';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const NextBtn = forwardRef(
  (
    {
      percentage,
      radius,
      color,
      HandleFunction,
      index,
    }: {
      percentage: number;
      radius: number;
      color: string;
      HandleFunction: () => void;
      index?: number;
    },
    ref,
  ) => {
    const { setSignUpDataValid } = useSignupStore();
    const strokeWidth = Math.round(radius / 13.3);
    const halfCircle = radius + strokeWidth;
    const CircleCircmference = 2 * Math.PI * radius;
    const StrokeOffSet =
      CircleCircmference - (CircleCircmference * percentage) / 100;

    const progress = useSharedValue(IsPhone ? 0.25 : 0);

    const animatedProps = useAnimatedProps(() => ({
      strokeDashoffset: CircleCircmference * (1 - progress.value),
    }));

    const onPress = () => {
      if (index == 1 && IsPhone) {
        setSignUpDataValid(true);
      } // this triggers the validation of the form for mobile view
      else if (index == 0 && IsTablet) {
        setSignUpDataValid(true);
      } // this triggers the validation of the form for tablet view
      else {
        progress.value = withTiming(
          progress.value < 1 ? progress.value + (IsPhone ? 0.25 : 0.5) : 1,
          { duration: 500 },
        );

        HandleFunction();
      } // this triggers the next slide for both mobile and tablet view
    };
    useImperativeHandle(ref, () => ({
      onMoveNext: (index: number) => {
        if (IsPhone) {
          if (index == 0) {
            progress.value = withTiming(0.25, { duration: 500 });
          } else if (index == 1) {
            progress.value = withTiming(0.5, { duration: 500 });
          } else if (index == 2) {
            progress.value = withTiming(0.75, { duration: 500 });
          } else if (index == 3) {
            progress.value = withTiming(1, { duration: 500 });
          }
        } else {
          if (index == 0) {
            progress.value = withTiming(0.0, { duration: 500 });
          } else if (index == 1) {
            progress.value = withTiming(0.5, { duration: 500 });
          } else if (index == 2) {
            progress.value = withTiming(1, { duration: 500 });
          }
        }
      },
    }));

    return (
      <View>
        <Pressable onPress={onPress}>
          <Svg
            width={radius * 2}
            height={radius * 2}
            viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
          >
            <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
              <AnimatedCircle
                cx={'50%'}
                cy={'50%'}
                stroke={color}
                strokeWidth={strokeWidth}
                r={radius}
                fill="transparent"
                strokeDasharray={CircleCircmference}
                strokeDashoffset={StrokeOffSet}
                animatedProps={animatedProps}
                strokeLinecap="round"
              />
            </G>
          </Svg>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                height: radius * 2,
                width: radius * 2,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: radius * 1.6,
                width: radius * 1.6,
                borderRadius: radius * 1.8,
                borderWidth: 1,
                borderColor: Colors.primary,
              }}
            >
              <IconArrowRight
                color={Colors.primary}
                width={radius / 2}
                height={radius / 2}
              />
            </View>
          </View>
        </Pressable>
      </View>
    );
  },
);

export default NextBtn;

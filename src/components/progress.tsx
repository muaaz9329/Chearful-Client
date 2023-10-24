import React from 'react';
import { Image, View, ViewProps } from 'react-native';
import { AppImages } from '@app/assets/images';
import { Colors } from '@app/constants';

export default function ProgressBar({
  progress,
  containerStyle,
  barStyle,
  colorScheme = 'primary',
  showSnail = false,
  ...props
}: ViewProps & {
  progress: number;
  containerStyle?: ViewProps['style'];
  barStyle?: ViewProps['style'];
  colorScheme?: 'primary' | 'red' | 'yellow' | 'orange';
  showSnail?: boolean;
}) {
  return (
    <View>
      {showSnail && (
        <Image
          source={AppImages.snailGreen}
          style={{
            // The snail will walk from left to right based on the progress. Also
            // it will be at end not out of view at 100% progress
            bottom: progress === 100 ? 0 : -5,
            left: `${
              progress > 90 ? progress - 12 : progress <= 0 ? 0 : progress - 1
            }%`,
            zIndex: 2,
          }}
        />
      )}

      <View
        style={[
          {
            backgroundColor: {
              primary: Colors.greenLight,
              yellow: Colors.yellowLight,
              red: Colors.redDim,
              orange: Colors.orangeDim,
            }[colorScheme],
            height: 6,
            borderRadius: 5,
            width: '100%',
          },
          containerStyle,
        ]}
      >
        <View
          style={[
            {
              backgroundColor: {
                primary: Colors.brandGreen,
                yellow: Colors.yellow,
                red: Colors.red,
                orange: Colors.orange,
              }[colorScheme],
              height: 6,
              borderRadius: 5,
              width: `${progress > 100 ? 100 : progress}%`,
            },
            barStyle,
          ]}
        />
      </View>
    </View>
  );
}

import { Wp } from '@app/utils';
import React, { useRef } from 'react';
import { Animated, FlatListProps } from 'react-native';

type Props = FlatListProps<any> & {
  itemSize: number;
  renderItem: ({ item, index }: { item: any; index: number }) => JSX.Element;
};

const AnimatedFlatList = ({
  data,
  renderItem,
  contentContainerStyle,
  showsVerticalScrollIndicator,
  itemSize = Wp(76 + 16 + 20),
  ...props
}: Props) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderAnimatedItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    const inputRange = [-1, 0, itemSize * index, itemSize * (index + 2)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });

    const OpacityInputRange = [
      -1,
      0,
      itemSize * index,
      itemSize * (index + 0.8),
    ];
    const opacity = scrollY.interpolate({
      inputRange: OpacityInputRange,
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View style={{ transform: [{ scale }], opacity }}>
        {renderItem({ item, index })}
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
      )}
      data={data}
      renderItem={renderAnimatedItem}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      {...props}
    />
  );
};

export default AnimatedFlatList;

import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ms from '@app/assets/master-styles';
import AppText from './app-text';

const BadgeSelect = ({
  item,

  handleSelect,
  selected,
}: {
  item: string;
  handleSelect: (item: string) => void;
  selected: string[];
}) => {
  return (
    <Pressable
      style={ms([
        'py_8',
        'px_14',
        'bg_cont',
        'mx:3',
        'mb:8',
        'rounded-4',
        'flexRow',
        'justifyAround',
        //@ts-ignore
        selected && selected.includes(item) && 'bg_primary',
      ])}
      onPress={() => {
        handleSelect(item);
      }}
    >
      <AppText
        size="md"
        style={ms([
          //@ts-ignore
          selected && selected.includes(item) && 'textWhite',
        ])}
      >
        {item}
      </AppText>
    </Pressable>
  );
};

export default BadgeSelect;

const styles = StyleSheet.create({});

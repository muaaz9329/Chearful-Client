import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ms from '@app/assets/master-styles';
import { ChevronLeft, ChevronRight } from '@app/assets/svgs';
import { Wp } from '@app/utils';
import { ColorProperties } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { Colors } from '@app/constants';
import { AppText } from '@app/components';
import { IconChevronDown } from 'tabler-icons-react-native';

type Props = {};

const MonthSelection = ({
  onPressPreviousMonth,
  onPressNextMonth,
  text,
}:{
  onPressPreviousMonth: () => void;
  onPressNextMonth: () => void;
  text: string;
}) => {

  return (
    <View style={ms(['flexRow', 'justifyBetween', 'alignCenter'])}>
      <Pressable style={ms(['bg_secondary', 'px:10', 'py:10', 'rounded-2'])} onPress={onPressPreviousMonth}>
        <ChevronLeft width={Wp(20)} height={Wp(20)} color={Colors.primary} />
      </Pressable>
      <Pressable style={ms(['alignCenter', 'flexRow'])}>
        <AppText style={ms(['nunito_700', 'mr:2'])} size="md">
          {text}
        </AppText>
        <IconChevronDown size={Wp(18)} color={Colors.primary} />
      </Pressable>
      <Pressable style={ms(['bg_secondary', 'px:10', 'py:10', 'rounded-2'])} onPress={onPressNextMonth}>
        <ChevronRight width={Wp(20)} height={Wp(20)} color={Colors.primary} />
      </Pressable>
    </View>
  );
};

export default MonthSelection;

const styles = StyleSheet.create({});

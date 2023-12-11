import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ms from '@app/assets/master-styles';
import { Colors } from '@app/constants';
import { AppText } from '@app/components';

type Props = {};

const CouponInput = (props: Props) => {
  return (
    <View style={ms(['flexRow', 'alignCenter'])}>
      <View style={ms(['py:15', 'px:12', 'bg_cont', 'rounded-3', 'flex1'])}>
        <TextInput placeholder="Enter Coupon Code" />
      </View>
      <TouchableOpacity
        style={ms([
          'py:12',
          'px:35',
          `bg:${Colors.brandGreen}`,
          'rounded-5',
          'ml:10',
        ])}
      >
        <AppText style={ms(['textWhite', 'nunito_700'])} size="base">
          Apply
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default CouponInput;

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ms from '@app/assets/master-styles';
import { AppText } from '@app/components';
import { Divider } from 'react-native-paper';
import { Wp } from '@app/utils';

const Charges = ({ amount, title }: { title: string; amount: string }) => {
  return (
    <View style={ms(['flexRow', 'justifyBetween', 'alignCenter', 'my:8'])}>
      <AppText style={ms(['textPrimary'])}>{title}</AppText>
      <AppText style={ms(['textPrimary', 'nunito_700'])} size="md">
        {amount}
      </AppText>
    </View>
  );
};

const InvoiceMaker = () => {
  return (
    <View>
      {[
        {
          title: 'Consultation Fee',
          amount: '$ 100',
        },
        {
          title: 'Coupon Discount',
          amount: '$ 100',
        },
      ].map((item, index) => (
        <Charges key={index} {...item} />
      ))}
      <Divider style={{height:0.5 , marginVertical:Wp(10)}} />
      <View style={ms(['flexRow', 'justifyBetween', 'alignCenter', 'my:8'])}>
      <AppText style={ms(['textPrimary'])} size='lg'>Total</AppText>
      <AppText style={ms(['textPrimary', 'nunito_700'])} size="lg">
        $23.00
      </AppText>
    </View>
    </View>
  );
};

export default InvoiceMaker;

const styles = StyleSheet.create({});

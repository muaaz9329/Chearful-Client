import { StyleSheet, Text, Touchable, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ms from '@app/assets/master-styles';
import { AppText, Header } from '@app/components';
import { ChevronLeft } from '@app/assets/svgs';
import { IconComponent } from '@app/types';
import Heading from '../../../../components/ui/heading';
import PractitionerCard from './components/practitioner-card';
import CouponInput from './components/coupon-input';
import InvoiceMaker from './components/invoice-maker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Wp } from '@app/utils';

type Props = {};

const Checkout = (props: Props) => {
  return (
    <SafeAreaView style={ms(['Wrapper'])}>
      <Header Icon={ChevronLeft as IconComponent} headerType="New" pram="back">
        <Heading>Practitioner</Heading>
      </Header>
      <View style={ms(['topMargin'])}>
        <PractitionerCard />
      </View>
      <View style={ms(['topMargin'])}>
        <CouponInput />
      </View>
      <View style={ms(['topMargin'])}>
        <InvoiceMaker />
      </View>
      <View
        style={ms([
          'flexRow',
          'justifyBetween',
          'alignSelfCenter',
          'alignCenter',
          styles.bottomBtn,
        ])}
      >
        <TouchableOpacity
          style={ms(['bg_cont', 'px:20', 'py:10', 'rounded-5'])}
        >
          <AppText size="base" style={ms(['textPrimary', 'nunito_700'])}>
            Cancel
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={ms(['bg_primary', 'px:20', 'py:10', 'rounded-5'])}
        >
          <AppText size="base" style={ms(['textWhite', 'nunito_700'])}>
            Pay Now
          </AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  bottomBtn: {
    width: '100%',
    position: 'absolute',
    bottom: Wp(30),
  },
});

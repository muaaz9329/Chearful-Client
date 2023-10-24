import React from 'react';
import { StyleSheet, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Colors } from '@app/constants';
import { IsPhone, IsTablet, Wp } from '@app/utils';

type Props = {
  onPress: (value: boolean) => void;
  children: React.ReactNode;
};

const BouncyCheckBox = ({ onPress, children }: Props) => {
  return (
    <View
      style={[
        styles.InputCont,
        {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: IsPhone ? Wp(30) : Wp(10),
        },
      ]}
    >
      <BouncyCheckbox
        size={IsTablet ? Wp(13) : Wp(25)}
        fillColor={Colors.primary}
        unfillColor="#FFFFFF"
        iconStyle={{
          borderColor: Colors.primary,
        }}
        innerIconStyle={{
          borderWidth: 2,
        }}
        disableText={true}
        onPress={(isChecked: boolean) => {
          onPress(isChecked);
        }}
      />

      <View>{children}</View>
    </View>
  );
};

export default BouncyCheckBox;

const styles = StyleSheet.create({
  InputCont: {
    marginTop: Wp(20),
  },
});

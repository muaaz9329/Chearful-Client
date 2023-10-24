import { Colors } from '@app/constants';
import { IsTablet, Mulish, Wp } from '@app/utils';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  children: React.ReactNode;
};

const FormLabel = ({ label, children }: Props) => {
  return (
    <View>
      <Text
        style={[
          styles.Label,
          IsTablet && {
            fontSize: Wp(10),
            marginBottom: Wp(4),
          },
        ]}
      >
        {label}
      </Text>
      <View style={{ marginLeft: IsTablet ? Wp(6) : Wp(10) }}>{children}</View>
    </View>
  );
};

export default FormLabel;

const styles = StyleSheet.create({
  Label: {
    fontSize: Wp(16),
    fontFamily: Mulish(700),
    color: Colors.primary,
    marginBottom: Wp(8),
  },
});

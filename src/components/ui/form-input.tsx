import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '@app/constants';
import { IconComponent } from '@app/types';
import { colorWithOpacity, IsTablet, Mulish, Wp } from '@app/utils';

type Props = {
  showLabel?: boolean;
  label?: string;
  Icon: IconComponent;
  showIcon?: boolean;
  placeholder: string;
  onChangeText: (text: string, name: string) => void;
  name: string;
  width?: number;
  Protected?: boolean;
};

const FormInput = ({
  showLabel,
  label,
  Icon,
  onChangeText,
  placeholder,
  showIcon,
  name,
  width,
  Protected,
}: Props) => {
  return (
    <View>
      {showLabel && (
        <Text
          style={[
            styles.Label,
            IsTablet && {
              fontSize: Wp(10),
              fontFamily: Mulish(700),
              color: Colors.primary,
              marginBottom: Wp(4),
            },
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.TextInput,
          showIcon && styles.ShowIcon,
          {
            width: wp(width ? width : 75),
          },
          IsTablet && {
            width: wp(width ? width : 30),
            height: Wp(28),

            borderRadius: Wp(8),
            paddingHorizontal: Wp(8),
            marginLeft: Wp(5),
          },
        ]}
      >
        {showIcon && (
          <View
            style={[
              styles.icon,
              IsTablet && {
                marginHorizontal: Wp(0),
                marginRight: Wp(4),
              },
            ]}
          >
            <Icon
              width={IsTablet ? Wp(10) : Wp(20)}
              height={IsTablet ? Wp(10) : Wp(20)}
              color={Colors.primary}
            />
          </View>
        )}
        <TextInput
          style={[
            styles.TextInputStyles,
            {
              width: wp(width ? (showIcon ? width - 15 : width - 10) : 75),
            },
            IsTablet && {
              width: wp(width ? (showIcon ? width - 7 : width - 5) : 30),

              fontSize: Wp(9),
            },
          ]}
          onChangeText={(text) => onChangeText(text, name)}
          placeholder={placeholder}
          secureTextEntry={Protected ? true : false}
          placeholderTextColor={colorWithOpacity(Colors.primary, 0.5)}
        />
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  TextInput: {
    height: Wp(55),
    width: wp(75),
    borderRadius: Wp(12),
    backgroundColor: '#EFF3F2',
    justifyContent: 'center',
    paddingHorizontal: Wp(16),
    marginLeft: Wp(10),
  },
  TextInputStyles: {
    fontSize: Wp(15),
    fontFamily: Mulish(400),
    color: Colors.primary,
  },
  Label: {
    fontSize: Wp(16),
    fontFamily: Mulish(700),
    color: Colors.primary,
    marginBottom: Wp(8),
  },
  icon: {
    marginHorizontal: Wp(10),
  },
  ShowIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: Wp(8),
  },
});

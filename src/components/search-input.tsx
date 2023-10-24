import React from 'react';
import { StyleSheet, View, TextInput, Pressable, Platform } from 'react-native';
import { IconSearch } from 'tabler-icons-react-native';
import { Wp, Mulish, IsTablet, IsPhone } from '@app/utils';

const defaultProps = {
  placeholder: 'Search',
  onChangeText: (text: string) => console.log(text),
};

const SearchInput = ({
  placeholder = defaultProps.placeholder,
  onChangeText = defaultProps.onChangeText,
  onSubmitEvent,
}: {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onSubmitEvent?: () => void;
}) => {
  return (
    <View style={[styles.cont, IsTablet && styles.cont_tablet]}>
      <Pressable
        onPress={onSubmitEvent}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconSearch size={IsPhone ? Wp(25) : Wp(15)} color="black" />
      </Pressable>

      <TextInput
        placeholder={placeholder}
        style={[styles.InputStyles, IsTablet && styles.InputStyles_tablet]}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEvent}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  InputStyles_tablet: {
    fontFamily: Mulish(400),
    fontSize: Wp(8),
    marginLeft: Wp(3),
  },
  cont_tablet: {
    paddingHorizontal: Wp(8),
    paddingVertical: Wp(8),
    borderRadius: Wp(6),
  },
  InputStyles: {
    flex: 1,
    fontFamily: Mulish(400),
    fontSize: Wp(14),
    marginLeft: Wp(5),
  },
  cont: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: Wp(14),
    paddingVertical: Platform.OS === 'ios' ? Wp(14) : Wp(6),
    flexDirection: 'row',
    borderRadius: Wp(8),
  },
});

import { StyleSheet, Text, View } from 'react-native';
import { IsTablet, Wp } from '@app/utils';
import { Colors, Fonts } from '@app/constants';

const ChipTags = ({ value }: { value: string }) => {
  return (
    <View style={[styles.ChipCont, IsTablet && styles.ChipCont_tablet]}>
      <Text
        style={[
          styles.chipTextStyles,
          IsTablet && styles.chipTextStyles_tablet,
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

export default ChipTags;

const styles = StyleSheet.create({
  chipTextStyles_tablet: {
    fontSize: Wp(8),
  },
  ChipCont_tablet: {
    paddingVertical: Wp(4),
    paddingHorizontal: Wp(6),
    marginRight: Wp(5),
    marginBottom: Wp(3.5),
  },
  chipTextStyles: {
    fontFamily: Fonts.Mulish['700'],
    fontSize: Wp(14),
    color: Colors.primary,
  },
  ChipCont: {
    paddingVertical: Wp(6),
    paddingHorizontal: Wp(10),
    borderRadius: Wp(70),
    backgroundColor: '#F2F2F2',
    marginRight: Wp(8),
    marginBottom: Wp(5),
  },
});

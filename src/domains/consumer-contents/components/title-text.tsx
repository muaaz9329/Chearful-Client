import { Colors, Fonts } from '@app/constants';
import { IsTablet, Wp } from '@app/utils';
import { StyleSheet, Text } from 'react-native';

type Props = {
  children: string;
};

const TitleText = ({ children }: Props) => {
  return (
    <Text
      style={[
        styles.Title,
        IsTablet && {
          fontSize: Wp(14),
        },
      ]}
    >
      {children}
    </Text>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  Title: {
    fontSize: Wp(20),
    fontFamily: Fonts.Mulish['700'],
    color: Colors.primary,
  },
});

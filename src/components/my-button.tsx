import { Colors } from '@app/constants';
import { Wp, Mulish } from '@app/utils';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';

type MyButtonProps = {
  title: string;
  status?: 'primary' | 'secondary' | 'danger';
  style?: any;
  onPress: () => void;
};

/**
 * A button component
 * @param title - The title of the button
 * @param status - The status of the button
 * @param style - The style of the button
 * @param onPress - The onPress function of the button
 *
 * @todo Implement all status styles for the button
 */
export default function MyButton({
  title,
  status = 'primary',
  style = [{}],
  onPress,
}: MyButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyles.btn, ...style]}>
      <Text style={[buttonStyles.btnText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const buttonStyles = StyleSheet.create({
  btn: {
    width: Wp(110),
    height: Wp(45),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Wp(12),
  },

  btn__tablet: {
    width: Wp(80),
    height: Wp(30),
  },

  btnText: {
    fontFamily: Mulish(700),
    fontSize: scale(16),
    color: 'white',
  },
});

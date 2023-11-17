import { Colors, Fonts } from '@app/constants';
import { TextInput, TextInputProps } from 'react-native';
import { ms } from 'react-native-size-matters';

const AnswerInput = ({ style = {}, ...props }: TextInputProps) => {
  return (
    <TextInput
      multiline
      style={[
        {
          height: ms(180),
          backgroundColor: Colors.light,
          borderRadius: ms(10),
          borderWidth: 1,
          borderColor: Colors.muted,
          padding: ms(10),
          textAlignVertical: 'top',
          fontFamily: Fonts.Mulish['400'],
        },
        style,
      ]}
      {...props}
    />
  );
};

export default AnswerInput;

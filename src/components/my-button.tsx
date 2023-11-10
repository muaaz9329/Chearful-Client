import { Colors } from '@app/constants';
import { Wp, wp } from '@app/utils';
import {
  FlexAlignType,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { AppText } from './ui';
import globalStyles from '@app/assets/global-styles';

/**
 * A button component
 //  * @param status - The status of the button
 * @param title - The title of the button
 * @param style - The style of the button
 * @param onPress - The onPress function of the button
 *
 * @todo Implement all status styles for the button
 */

export default function MyButton({
  style,
  title,
  display = 'block',
  textStyles,
  icon,
  ...props
}: TouchableOpacityProps & {
  title: string;
  display?: 'block' | 'inline-start' | 'inline-center';
  textStyles?: TextStyle;
  icon?: React.ReactNode;
}) {
  const styles: TouchableOpacityProps['style'] = {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Wp(8),
    padding: wp(2.3),
    flexDirection: 'row',
  };

  return (
    // This view is here just to make the button align to the left when display is inline
    <View
      style={{
        alignSelf: {
          block: 'auto',
          'inline-start': 'flex-start',
          'inline-center': 'center',
        }[display] as FlexAlignType,
      }}
    >
      <TouchableOpacity {...props} style={[styles, style]}>
        {icon && icon}
        <AppText
          style={[
            globalStyles.textWhite,
            globalStyles.mulish_700,
            { ...textStyles },
          ]}
          size="md"
        >
          {title}
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

import { ImageSourcePropType, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native-animatable';
import { IsPhone, Wp } from '@app/utils';

const SocialBtn = ({
  img,
  onPress,
  width,
  height,
}: {
  img: ImageSourcePropType;
  onPress: () => void;
  width: number;
  height: number;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginHorizontal: IsPhone ? Wp(10) : Wp(5),
      }}
    >
      <Image
        source={img}
        style={{
          width: Wp(width),
          height: Wp(height),
          resizeMode: 'contain',
        }}
      />
    </TouchableOpacity>
  );
};
export default SocialBtn;

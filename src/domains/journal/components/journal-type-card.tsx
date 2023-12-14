import { AppImages } from '@app/assets/images';
import { AppText, BaseCard, Heading } from '@app/components';
import { wp } from '@app/utils';
import { Image, TouchableOpacity, View } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';

type Props = {
  title: string;
  description: string;
  image?: any;
  onPress?: () => void;
};

const JournalTypeCard = ({
  title,
  description,
  image = AppImages.userGoal,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
      }}
    >
      <BaseCard
        style={{
          minHeight: wp(17),
          minWidth: moderateVerticalScale(300),
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            height: moderateVerticalScale(80),
            width: '50%',
            resizeMode: 'contain',
          }}
        />

        <View
          style={{
            maxWidth: '68%',
            //   paddingTop: scale(5),
          }}
        >
          <Heading size="md">{title}</Heading>
          <AppText>{description}</AppText>
        </View>
      </BaseCard>
    </TouchableOpacity>
  );
};

export default JournalTypeCard;

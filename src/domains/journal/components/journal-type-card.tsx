import { AppImages } from '@app/assets/images';
import { AppText, BaseCard, Heading } from '@app/components';
import { wp } from '@app/utils';
import { Image, View } from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

type Props = {
  title: string;
  description: string;
  image?: any;
};

const JournalTypeCard = ({
  title,
  description,
  image = AppImages.userGoal,
}: Props) => {
  return (
    <BaseCard
      style={{
        minHeight: wp(17),
        minWidth: moderateVerticalScale(300),
      }}
    >
      <Image
        source={image}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          //   width: moderateScale(100),
          height: moderateVerticalScale(80),
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
  );
};

export default JournalTypeCard;

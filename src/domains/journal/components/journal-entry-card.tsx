import { Image, TouchableOpacity, View } from 'react-native';
import { AppText, BaseCard, Heading } from '@app/components';
import { JournalEntry } from '../types';
import { Wp } from '@app/utils';
import { AppImages } from '@app/assets/images';
import { ms, mvs } from 'react-native-size-matters';
import { Colors } from '@app/constants';

interface Props {
  entry: JournalEntry;
  onPress?: () => void;
}

const JournalEntryCard = ({ entry, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <BaseCard
        style={{
          justifyContent: 'space-between',
          minWidth: mvs(200),
        }}
      >
        <View>
          <Heading size="sm">{entry.time.title + ' Entry'}</Heading>
          <AppText>
            {new Date(entry.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            columnGap: Wp(10),
            alignItems: 'center',
          }}
        >
          <Image
            source={AppImages.userGoal}
            style={{
              width: ms(45),
              height: ms(45),
              borderRadius: ms(20),
              borderWidth: 2,
              borderColor: '#E0E0E0',
              resizeMode: 'contain',
            }}
          />
          <View>
            <AppText>Reminded By </AppText>
            <AppText
              size="md"
              style={{
                color: Colors.primary,
              }}
            >
              Dr. Philip
            </AppText>
          </View>
        </View>
      </BaseCard>
    </TouchableOpacity>
  );
};

export default JournalEntryCard;

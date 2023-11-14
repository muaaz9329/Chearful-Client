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
            marginTop: 'auto',
          }}
        >
          {!entry.assignedBy ? (
            <AppText>Self Assigned</AppText>
          ) : (
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
                  borderWidth: 1,
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
                  {entry.assignedBy.title}
                </AppText>
              </View>
            </View>
          )}
        </View>
      </BaseCard>
    </TouchableOpacity>
  );
};

export default JournalEntryCard;

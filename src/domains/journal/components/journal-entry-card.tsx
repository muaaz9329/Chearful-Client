import { Image, TouchableOpacity, View } from 'react-native';
import { AppText, BaseCard, Heading } from '@app/components';
import { ListJournalEntry } from '../types';
import { Wp } from '@app/utils';
import { AppImages } from '@app/assets/images';
import { ms, mvs } from 'react-native-size-matters';
import { Colors } from '@app/constants';

interface Props {
  entry: ListJournalEntry;
  onPress?: () => void;
  kind: 'own' | 'assigned';
}

const JournalEntryCard = ({ entry, kind, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <BaseCard
        style={{
          minWidth: mvs(200),
          backgroundColor:
            entry.journal_status === 'pending'
              ? Colors.redDim
              : Colors.greenDim,
        }}
      >
        <View>
          {kind === 'own' ? (
            <Heading size="sm">
              {new Date(entry.attempted_time).toLocaleDateString('en-US', {
                timeStyle: 'short',
              })}
            </Heading>
          ) : (
            <Heading size="sm">{entry.attempted_time + ' Entry'}</Heading>
          )}
          {/* <AppText>
            {new Date(entry.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </AppText> */}
        </View>

        <View
          style={{
            marginTop: 'auto',
          }}
        >
          {kind === 'own' ? (
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
                {/* <AppText
                  size="md"
                  style={{
                    color: Colors.primary,
                  }}
                >
                </AppText> */}
              </View>
            </View>
          )}
        </View>
      </BaseCard>
    </TouchableOpacity>
  );
};

export default JournalEntryCard;

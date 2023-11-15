import globalStyles from '@app/assets/global-styles';
import { AppText, Heading, MyButton, ProgressBar } from '@app/components';
import { Colors } from '@app/constants';
import { NavigationHelpers } from '@react-navigation/native';
import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconArrowRight, IconX } from 'tabler-icons-react-native';
import { journalEntries } from '../data/journal-data';
import { ms } from 'react-native-size-matters';

export default function ScreenAddJournalEntry({
  navigation,
  route,
}: {
  navigation: NavigationHelpers<any, any>;
  route: any;
}) {
  const entryQuestions = journalEntries.filter(
    (e) => e.type.id === route.params?.journalType?.id,
  )[0].data;

  const [progress, setProgress] = useState(0);
  const [currQuestionIdx, setCurrQuestionIdx] = useState(0);

  return (
    <SafeAreaView style={globalStyles.bodyWrapper}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Heading>{route.params?.journalType?.title} Journal</Heading>
          <AppText size="md">{'Morning'} Entry</AppText>
        </View>
        <TouchableOpacity>
          <IconX size={30} color={Colors.muted} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: ms(30),
        }}
      >
        <ProgressBar showSnail={false} progress={progress} />
      </View>

      <View
        style={{
          marginTop: ms(30),
        }}
      >
        <AppText style={{ textAlign: 'center' }}>
          {currQuestionIdx + 1}/{entryQuestions.length}
        </AppText>

        <View style={{ marginTop: ms(20), rowGap: ms(10) }}>
          {entryQuestions[currQuestionIdx].type === 'question' ? (
            <>
              <Heading>{entryQuestions[currQuestionIdx].title}</Heading>
              <TextInput
                multiline
                style={{
                  height: ms(180),
                  backgroundColor: Colors.light,
                  borderRadius: ms(10),
                  borderWidth: 1,
                  borderColor: Colors.muted,
                  padding: ms(20),
                }}
              />
            </>
          ) : (
            <></>
          )}
        </View>
      </View>

      <View style={{ marginTop: 'auto' }}>
        <MyButton
          title=""
          display="inline-center"
          icon={<IconArrowRight size={ms(25)} color={Colors.light} />}
          style={{
            borderRadius: 40,
            padding: ms(15),
          }}
        />
      </View>
    </SafeAreaView>
  );
}

import { AppText, Heading } from '@app/components';
import { Colors } from '@app/constants';
import { ScrollView, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { JournalEntrySingleAnswer } from '../types';

type Props = {
  question: string;
  answers: JournalEntrySingleAnswer[];
  type: 'short_answer' | 'single_answer' | 'multiple_answer';
  style?: any;
  answerStyle?: any;
};

const JournalEntryAnswer = ({
  type,
  question,
  answers,
  style = {},
  answerStyle,
}: Props) => {
  console.log('answers', answers);

  return (
    <View
      style={[
        {
          rowGap: ms(8),
          marginVertical: ms(10),
        },
        style,
      ]}
    >
      <Heading size="md">{question}</Heading>

      {type === 'multiple_answer' ? (
        <></>
      ) : (
        <View
          style={[
            {
              backgroundColor: Colors.light,
              borderRadius: ms(10),
              borderWidth: 1,
              borderColor: Colors.muted,
              padding: ms(10),
              textAlignVertical: 'top',
              minHeight: type === 'short_answer' ? ms(100) : 'auto',
              maxHeight: type === 'short_answer' ? ms(200) : 'auto',
            },
            answerStyle,
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <AppText>
              {
                {
                  short_answer:
                    answers?.[0]?.text_answer || 'No Answer Provided',
                  single_answer:
                    answers?.[0]?.option_title || 'No Answer Provided',
                }[type]
              }
            </AppText>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default JournalEntryAnswer;

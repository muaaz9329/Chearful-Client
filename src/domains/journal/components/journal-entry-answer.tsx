import { AppText, Heading } from '@app/components';
import { Colors } from '@app/constants';
import { ScrollView, View } from 'react-native';
import { ms } from 'react-native-size-matters';

type Props = {
  question: string;
  answer: string;
  type?: 'question' | 'option' | 'rate';
  style?: any;
  answerStyle?: any;
};

const JournalEntryAnswer = ({
  type,
  question,
  answer,
  style = {},
  answerStyle,
}: Props) => {
  return (
    <View
      style={[
        {
          rowGap: ms(8),
        },
        style,
      ]}
    >
      <Heading size="md">{question}</Heading>
      {type !== 'rate' && (
        <View
          style={[
            {
              backgroundColor: Colors.light,
              borderRadius: ms(10),
              borderWidth: 1,
              borderColor: Colors.muted,
              padding: ms(10),
              textAlignVertical: 'top',
              minHeight: type === 'question' ? ms(100) : 'auto',
              maxHeight: type === 'question' ? ms(200) : 'auto',
            },
            answerStyle,
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <AppText>{answer}</AppText>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default JournalEntryAnswer;

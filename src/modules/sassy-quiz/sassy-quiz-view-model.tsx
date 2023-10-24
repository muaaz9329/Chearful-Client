import { useState } from 'react';
import { SassyQuizProps, SassyQuizSelectedOption } from '.';
import Toast from 'react-native-toast-message';

export type SassyQuizViewProps = SassyQuizProps & {
  selectedOptions: SassyQuizSelectedOption[];
  questionNo: number;
  onOptionPress: (qId: string | number, value: string | number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  onSubmit: () => void;
};

export default function SassyQuizViewModel({
  children,
  onNextPress,
  onPrevPress,
  onSubmit: onQuizSubmit,
  callOnNextOnSubmit = false,
  ...props
}: SassyQuizProps & {
  children: (args: SassyQuizViewProps) => JSX.Element;
}) {
  const [questionNo, setQuestionNo] = useState(1);
  const [thisAnswer, setThisAnswer] = useState<SassyQuizSelectedOption>();
  const [selectedOptions, setSelectedOptions] = useState<
    SassyQuizSelectedOption[]
  >([]);

  const checkIsAnswered = () =>
    thisAnswer ||
    selectedOptions?.find((item) => item.qId === props.data[questionNo - 1].id);

  const nextQuestion = () => {
    const chosenAnswer = checkIsAnswered();

    if (chosenAnswer) {
      onNextPress?.(chosenAnswer);
      setThisAnswer(undefined);
      setQuestionNo((prev) =>
        prev < props.data.length ? prev + 1 : props.data.length,
      );
    } else Toast.show({ type: 'error', text1: 'Please select an option' });
  };

  const prevQuestion = () => {
    if (questionNo === 1) return;

    onPrevPress?.();
    setQuestionNo((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const onOptionPress = (qId: string | number, value: string | number) => {
    setThisAnswer({ qId, value });
    setSelectedOptions((prev) => {
      if (prev) {
        const index = prev.findIndex((item) => item.qId === qId);

        if (index !== -1) {
          prev[index].value = value;
          return [...prev];
        } else {
          return [...prev, { qId, value }];
        }
      } else {
        return [{ qId, value }];
      }
    });
  };

  const onSubmit = () => {
    // Duplicated. Can be simplified
    const chosenAnswer = checkIsAnswered();

    if (chosenAnswer) {
      if (callOnNextOnSubmit) onNextPress?.(chosenAnswer);
    } else {
      Toast.show({ type: 'error', text1: 'Please select an option' });
      return;
    }

    onQuizSubmit?.(selectedOptions);
  };

  return children({
    selectedOptions,
    questionNo,
    onOptionPress,
    nextQuestion,
    prevQuestion,
    onSubmit,
    ...props,
  });
}

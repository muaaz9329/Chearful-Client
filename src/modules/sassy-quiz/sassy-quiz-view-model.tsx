import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { SassyQuizProps, SassyQuizSelectedOption } from '.';

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
  variant = 'single',
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
    props?.onOptionPress?.(qId, value);

    setThisAnswer({ qId, value });
    setSelectedOptions((prev) => {
      if (prev) {
        // If this is single variant, then we need to remove the previous answer
        // and add the new one
        if (variant === 'single') {
          return prev.filter((item) => item.qId !== qId).concat({ qId, value });
        }

        // if this is multiple variant, then we need to add the new answer
        // with the previous answers for this question id

        if (variant === 'multiple') {
          // @ts-ignore - cause we are sure that value id gonna be array
          if (prev.find((a) => a.qId === qId)?.value.includes(value)) {
            const newAnswers = prev.filter((a) => a.qId !== qId);
            newAnswers.push({
              qId,
              value: prev
                .find((a) => a.qId === qId)
                // @ts-ignore - cause we are sure that value id gonna be array
                ?.value.filter((a) => a !== value),
            });

            return newAnswers;
          } else {
            const newAnswers = prev.filter((a) => a.qId !== qId);
            newAnswers.push({
              qId,
              value: [
                ...((prev.find((a) => a.qId === qId)?.value as string[]) || []),
                value,
              ],
            });

            return newAnswers;
          }
        }

        return [
          ...prev.filter((item) => item.qId !== qId),
          {
            qId,
            value: [
              ...((prev.find((item) => item.qId === qId)?.value as string[]) ||
                []),
              value,
            ],
          },
        ];
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
    ...props,
    selectedOptions,
    questionNo,
    onOptionPress,
    nextQuestion,
    prevQuestion,
    variant,
    onSubmit,
  });
}

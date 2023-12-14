import { HeadingProps } from '@app/components/ui/heading';
import { TouchableOpacityProps, ViewProps, ViewStyle } from 'react-native';

export { default as SassyQuiz } from './sassy-quiz';

export type SassyQuizSelectedOption = {
  qId: string | number;
  value: (string | number) | (string | number)[];
};

export type SassyQuizViewProps = SassyQuizProps & {
  selectedOptions?: SassyQuizSelectedOption[];
  onOptionPress: (qId: string | number, value: string | number) => void;
};

export type SassyQuizOption = {
  text: string;
  value: string | number;
};

export type SassyQuizData = {
  id: string | number;
  question: string;
  options: SassyQuizOption[];
}[];

export type SassyQuizProps = {
  data: SassyQuizData;
  style?: ViewStyle;
  title?: string;
  showQuestionTxt?: boolean;
  showSubmitBtn?: boolean;
  titleProps?: Partial<HeadingProps>;
  questionProps?: Partial<HeadingProps>;
  optionStyles?: TouchableOpacityProps['style'];
  footerProps?: Partial<ViewProps>;
  callOnNextOnSubmit?: boolean;
  variant?: 'single' | 'multiple';

  onOptionPress?: (qId: string | number, value: string | number) => void;
  onNextPress?: (thisAnswer: SassyQuizSelectedOption) => void;
  onPrevPress?: () => void;
  onSubmit?: (selectedOptions: SassyQuizSelectedOption[]) => void;
};

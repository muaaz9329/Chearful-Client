import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { SassyQuizProps } from '.';
import SassyQuizViewModel, {
  SassyQuizViewProps,
} from './sassy-quiz-view-model';
import { AppText, Heading, MyButton } from '@app/components';
import globalStyles from '@app/assets/global-styles';
import { Colors } from '@app/constants';

/**
 * A sassy quiz component for sassy developers
 * @description This quiz component provides a simple way to create a question and answer quiz.
 * It has many extended functionalities like the ability to control all elements stylings using props,
 * hooking into the next and previous button presses, provides the current selected option when the next button is pressed
 * that can be used to store the answer in a database or something. Provides a list of all selected options at the end on the submit press
 * that can be used to store the answers in a database or something.
 *
 * @author Abdullah-Sajjad026
 * @version 0.0.1 - Initial Release
 * @see 'FitnessAssessment Component in the ThirtyXThirty'
 */

export default function SassyQuiz(props: SassyQuizProps) {
  return (
    <SassyQuizViewModel {...props}>
      {({
        titleProps,
        style = {},
        data,
        showQuestionTxt = true,
        showSubmitBtn = true,
        questionProps,
        selectedOptions,
        questionNo,
        onOptionPress,
        nextQuestion,
        prevQuestion,
        ...props
      }: SassyQuizViewProps) => {
        // Defining some helpers for this view
        const currentQuestion = data[questionNo - 1];
        const hasNextQuestion = questionNo < data.length;
        const hasPreviousQuestion = questionNo > 1;

        return (
          <View
            style={[
              {
                // Going to put some default styles here
              },
              style,
            ]}
          >
            {/* A title over the quiz */}
            {props.title && (
              <Heading size="lg" {...titleProps}>
                {props.title}
              </Heading>
            )}

            <View>
              {/* Question  */}

              {showQuestionTxt && (
                <Heading
                  size="md"
                  style={[globalStyles.textCenter, questionProps?.style || {}]}
                >
                  {currentQuestion.question}
                </Heading>
              )}

              {/* Options */}
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  style={[
                    {
                      backgroundColor: 'white',
                      padding: 12,
                      marginVertical: 10,
                      borderRadius: 15,
                      borderWidth: 2,

                      borderColor: selectedOptions?.find(
                        (o) =>
                          o.qId === currentQuestion.id &&
                          o.value === option.value,
                      )
                        ? Colors.brandGreen
                        : Colors.light,
                    },
                    props.optionStyles || {},
                  ]}
                  onPress={() =>
                    onOptionPress(currentQuestion.id, option.value)
                  }
                  key={index}
                >
                  <AppText
                    size="md"
                    style={{
                      textAlign: 'center',
                      color: Colors.brandGreen,
                    }}
                  >
                    {option.text}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>

            {/* Footer */}
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 20,
                },
                props.footerProps?.style || {},
              ]}
              {...props.footerProps}
            >
              {/* To add styles and props passing to these buttons too */}
              {hasPreviousQuestion && (
                <MyButton title="Previous" onPress={() => prevQuestion()} />
              )}

              {hasNextQuestion && (
                <MyButton
                  title="Next"
                  onPress={() => {
                    nextQuestion();
                  }}
                />
              )}

              {
                // If there are no more questions then show the submit button
                !hasNextQuestion && showSubmitBtn && (
                  <MyButton
                    title="Submit"
                    onPress={() => {
                      props.onSubmit?.();
                    }}
                  />
                )
              }
            </View>
          </View>
        );
      }}
    </SassyQuizViewModel>
  );
}

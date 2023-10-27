import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AdaptedForumQuestion } from '../types';
import { IsTablet, Nunito, Wp, wp } from '@app/utils';
import globalStyles from '@app/assets/global-styles';
import ReadMore from '@app/components/read-more';
import { Colors } from '@app/constants';
import Badge from '@app/components/ui/badge';
import QuestionMetaData from './question-metadata';

export type ForumQuestionProps = {
  question: AdaptedForumQuestion;
  style?: any;
  variant?: 'default' | 'home-preview';
  onPress: () => void;
};

export default function ForumQuestion({
  question,
  style,
  onPress,
  variant = 'default',
}: ForumQuestionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, IsTablet ? styles.card__tablet : {}, style]}
    >
      <Text
        style={[styles.title, IsTablet && globalStyles.fs_10]}
        numberOfLines={variant === 'home-preview' ? 1 : undefined}
      >
        {question.questionTitle}
      </Text>
      <View>
        <Badge text={question.category.title} />
      </View>

      <View style={[globalStyles.my_8]}>
        <ReadMore
          text={question.questionDescription}
          charsLimit={80}
          style={[IsTablet && globalStyles.fs_8, globalStyles.mulish_400]}
        />
      </View>

      <QuestionMetaData question={question} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Wp(16),
    marginVertical: Wp(10),
    borderRadius: Wp(12),
    backgroundColor: Colors.light,
  },

  card__tablet: {
    width: wp(70),
  },

  title: {
    fontSize: Wp(16),
    fontFamily: Nunito(700),
    color: Colors.primary,
    marginBottom: Wp(6),
  },
});

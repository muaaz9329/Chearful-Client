import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AdaptedForumQuestion } from '../types';
import { IsTablet, Wp } from '@app/utils';
import globalStyles from '@app/assets/global-styles';
import { Colors } from '@app/constants';

export default function QuestionMetaData({
  question,
  color = 'primary',
}: {
  question: AdaptedForumQuestion;
  color?: 'primary' | 'muted';
}) {
  return (
    <View style={styles.metaWrapper}>
      <Text
        style={[
          styles.metaText,
          color === 'muted' ? globalStyles.textMuted : {},
          IsTablet ? styles.metaText__tablet : {},
        ]}
      >
        {question.noOfAnswers} Answers
      </Text>
      <View
        style={[globalStyles.stone, IsTablet && globalStyles.stone__tablet]}
      />
      <Text
        style={[
          styles.metaText,
          color === 'muted' ? globalStyles.textMuted : {},
          IsTablet ? styles.metaText__tablet : {},
        ]}
      >
        {new Date(question.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // App Styles
  metaWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  metaText: {
    color: Colors.primary,
    fontSize: Wp(12),
  },

  metaText__tablet: {
    fontSize: Wp(8),
  },

  stone: {
    width: Wp(5),
    height: Wp(5),
    borderRadius: Wp(5),
    marginHorizontal: Wp(5),
    backgroundColor: Colors.primary,
  },
});

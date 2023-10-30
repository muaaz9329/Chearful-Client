/**
 * A component that gives the functionality of Read More with customizable action.
 * @description User chooses how many words to show and what to do when the user clicks on Read More, either show all text or call a function.
 *
 */

import { Colors } from '@app/constants';
import { Wp, decodeHTML } from '@app/utils';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

type ReadMoreProps = {
  text: string;
  charsLimit: number;

  style?: any;
  onPress?: () => void;
};

export default function ReadMore({
  text,
  charsLimit,
  style = {},
  onPress,
}: ReadMoreProps) {
  const [showAll, setShowAll] = useState(false);

  const truncatedText = text.slice(0, charsLimit);

  return (
    <Text style={[styles.text, style]}>
      {decodeHTML(
        showAll
          ? `${text} `
          : `${truncatedText}${
              // If the text is less than the limit, don't show the action
              text.length > charsLimit && '... '
            }`,
      )}

      {text.length > charsLimit && (
        <Text
          onPress={onPress ? onPress : () => setShowAll(!showAll)}
          style={styles.actionText}
        >
          {showAll ? 'Read Less' : 'Read More'}
        </Text>
      )}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: Wp(14),
    lineHeight: Wp(18),
    color: Colors.black,
  },
  actionText: {
    color: Colors.primary,
    fontSize: Wp(13),
    textDecorationLine: 'underline',
  },
});

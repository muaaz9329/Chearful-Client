/**
 * A component that gives the functionality of Read More with customizable action.
 * @description User chooses how many words to show and what to do when the user clicks on Read More, either show all text or call a function.
 *
 */

import { Colors } from '@app/constants';
import { Wp, decodeHTML } from '@app/utils';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { AppText } from './ui';
import ms from '@app/assets/master-styles';

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
    <AppText style={[style]}>
      {decodeHTML(
        showAll
          ? `${text} `
          : `${truncatedText}${
              // If the text is less than the limit, don't show the action
              text.length > charsLimit && '... '
            }`,
      )}

      {text.length > charsLimit && (
        <AppText
          onPress={onPress ? onPress : () => setShowAll(!showAll)}
          style={{
            color: Colors.primary,
            textDecorationLine: 'underline',
          }}
        >
          {showAll ? 'Read Less' : 'Read More'}
        </AppText>
      )}
    </AppText>
  );
}

// const styles = StyleSheet.create({
//   text: {
//     fontSize: Wp(14),
//     lineHeight: Wp(18),
//     color: Colors.black,
//   },

// });

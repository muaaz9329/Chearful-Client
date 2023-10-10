import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ForumAnswer as ForumAnswerT } from '../types';
import { SvgUri } from 'react-native-svg';
import { IsTablet, Wp } from '@app/utils';
import ReadMore from '@app/components/read-more';
import { Colors } from '@app/constants';
import globalStyles from '@app/assets/global-styles';

export default function ForumAnswer(props: ForumAnswerT) {
  return (
    <View style={[globalStyles.pb_14, styles.borderBottom]}>
      <View
        style={[
          globalStyles.flexRow,
          globalStyles.alignCenter,
          globalStyles.mb_14,
        ]}
      >
        <View style={styles.mr_10}>
          <SvgUri uri={props.user.avatar} width={Wp(40)} height={Wp(40)} />
        </View>

        <View>
          <Text
            style={[
              globalStyles.textPrimary,
              globalStyles.fs_16,
              globalStyles.nunito_700,
              IsTablet && globalStyles.fs_11,
            ]}
          >{`${props.user.first_name} ${props.user.last_name}`}</Text>
          {props.created_at && (
            <Text>{new Date(props.created_at).toLocaleDateString()}</Text>
          )}
        </View>
      </View>

      <View>
        <ReadMore
          text={props.answer}
          charsLimit={130}
          style={[globalStyles.fs_14, globalStyles.mulish_400]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: Colors.contrast,
  },
  mr_10: {
    marginRight: Wp(10),
  },
});

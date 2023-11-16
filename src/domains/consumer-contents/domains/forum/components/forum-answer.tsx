import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ForumAnswer as ForumAnswerT } from '../types';
import { SvgUri } from 'react-native-svg';
import { IsTablet, Wp, isSvg } from '@app/utils';
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
          {isSvg(props.user.avatar) ? (
            <SvgUri uri={props.user.avatar} width={Wp(40)} height={Wp(40)} />
          ) : (
            <Image
              source={{ uri: props.user.avatar }}
              style={styles.avatarImage}
            />
          )}
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
        <ReadMore text={props.answer} charsLimit={130} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarImage: {
    width: Wp(40),
    height: Wp(40),
    borderRadius: Wp(40 / 2),
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: Colors.contrast,
  },
  mr_10: {
    marginRight: Wp(10),
  },
});

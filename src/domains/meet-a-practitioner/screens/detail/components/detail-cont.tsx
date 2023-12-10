import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Wp } from '@app/utils';
import { Colors } from '@app/constants';
import ms from '@app/assets/master-styles';
import { AppText } from '@app/components';

type Props = {};

const DetailBox = ({
  Icon,
  title,
  subTitle,
}: {
  Icon: React.FC<{
    size: number;
    color: string;
  }>;
  title: string;
  subTitle: string;
}) => {
  return (
    <View style={ms(['alignCenter'])}>
      <Icon size={Wp(25)} color={Colors.brandGreen} />
      <AppText
        size="base"
        style={ms(['nunito_700', 'textCenter', 'mt:5', 'textPrimary'])}
      >
        {title}
      </AppText>
      <AppText
        size="base"
        style={ms(['textMuted', 'nunito_700', 'textCenter'])}
      >
        {subTitle}
      </AppText>
    </View>
  );
};

export default DetailBox;

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AppText, Badge } from '@app/components';
import ms from '@app/assets/master-styles';
import { Nunito, Wp } from '@app/utils';
import { Divider } from 'react-native-paper';

type Props = {};

const TagsCont = ({
  title = ' Speciality',
  data = [
    'addiction',
    'anxiety',
    'depression',
    'stress',
    'addiction',
    'addiction',
    'addiction',
  ],
}: {
  title?: string;
  data?: string[];
}) => {
  return (
    <>
      <View style={ms(['topMargin', 'mb_10'])}>
        <AppText size="md" style={ms(['nunito_700', 'mb_10', 'textPrimary'])}>
          {title}
        </AppText>
        <View style={ms(['flexRow', 'flexWrap', 'justifyStart'])}>
          {data.map((item, index) => {
            return (
              <Badge
                key={index}
                text={item}
                style={ms([`bg:${'#EAEAEA'}`, 'bw:0', 'mb:5', 'mr:3', 'br:16'])}
                textStyle={{
                  fontSize: Wp(13),
                  color: '#4A5959',
                  fontFamily: Nunito(500),
                }}
              />
            );
          })}
        </View>
      </View>
      <Divider style={{ height: 1 }} />
    </>
  );
};

export default TagsCont;

const styles = StyleSheet.create({});

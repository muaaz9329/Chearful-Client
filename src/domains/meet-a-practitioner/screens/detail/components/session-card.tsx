import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ms from '@app/assets/master-styles';
import { AppText, Heading } from '@app/components';
import { IconClock } from 'tabler-icons-react-native';
import { Wp } from '@app/utils';
import { Colors } from '@app/constants';

type Props = {};

const SessionCard = ({
  price = '5 USD/ Session',
  time = '15 mins',
  title = 'Intro Session',
  subTitle = 'To Consult & discuss about your treatment plan',
}: {
  title?: string;
  subTitle?: string;
  time?: string;
  price?: string;
}) => {
  return (
    <View style={ms(['px:10', 'py:10', 'rounded-2', `bg:${'#FAFAFA'}`,'my_10'])}>
      <View style={ms(['flexRow', 'justifyBetween'])}>
        <View style={{
            width:'70%'
        }}>
          <Heading>{title}</Heading>
          <AppText size="base">
           {
              subTitle

           }
          </AppText>
        </View>

        <View
          style={ms([
            'flexRow',
            'justifyBetween',
            'alignCenter',
            'alignSelfStart',
          ])}
        >
          <IconClock size={Wp(20)} color={Colors.primary} />
          <Heading>{time}</Heading>
        </View>
      </View>

      <Pressable
        style={ms([
          'bg_primary',
          'px_15',
          'py_15',
          'rounded-5',
          'flexRow',
          'alignCenter',
          'justifyBetween',
          'mt_10',
        ])}
      >
        <Heading size="sm" style={ms(['textWhite'])}>
          {price}
        </Heading>
        <Heading size="md" style={ms(['textWhite'])}>
          Book a Session
        </Heading>
      </Pressable>
    </View>
  );
};

export default SessionCard;

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PractitionerImage from '@app/domains/meet-a-practitioner/components/practitioner-image';
import ms from '@app/assets/master-styles';
import { AppText, Badge, Heading } from '@app/components';
import { Nunito, Wp, colorWithOpacity } from '@app/utils';
import RecommendedTag from './rec-tag';
import { IconBriefcase, IconHeart, IconStar } from 'tabler-icons-react-native';
import { Colors } from '@app/constants';

type Props = {};

const PractitionerCard = (props: Props) => {
  return (
    <View
      style={ms([
        'bg_cont',
        'rounded-4',
        {
          overflow: 'hidden',
        },
      ])}
    >
      <View style={ms(['flexRow', 'alignCenter', 'px_10', 'pt_10'])}>
        <PractitionerImage />
        <View style={ms(['flex1', 'mb_10', 'ml:10'])}>
          <View style={ms(['flexRow', 'alignCenter'])}>
            <Heading size="md">Mr. Forrest Cuddy </Heading>
            <RecommendedTag />
          </View>

          <AppText size="md" style={ms([`textMuted`])}>
            English, Hindi, Gujarati
          </AppText>
        </View>
      </View>
      <View style={ms(['topMargin', 'px_10', 'mb_10'])}>
        <AppText size="md" style={ms(['textMuted', 'nunito_700', 'mb_10'])}>
          Speciality
        </AppText>
        <View style={ms(['flexRow', 'flexWrap', 'justifyStart'])}>
          {[
            'addiction',
            'anxiety',
            'depression',
            'stress',
            'addiction',
            'addiction',
            'addiction',
          ].map((item, index) => {
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
      <View
        style={ms([
          'justifyBetween',
          'alignCenter',
          `bg:${'#F3F8F4'}`,
          'flexRowReverse',
          'py:4',
        ])}
      >
        <View style={ms(['mr:10'])}>
          <Heading
            size="md"
            style={{
              textAlign: 'right',
            }}
          >
            AED 15
          </Heading>
          <AppText size="base" style={ms(['textMuted', 'nunito_700', 'mb_10'])}>
            Per Session
          </AppText>
        </View>
        <View style={ms(['flexRow', 'justifyAround', 'alignCenter', 'px:5'])}>
          <View style={ms(['flexRow', 'alignCenter', 'px:5'])}>
            <IconHeart size={Wp(20)} color={Colors.dim} />
            <AppText
              size="base"
              style={ms(['nunito_700', 'ml:5', `text:${Colors.dim}`])}
            >
              100 Ppl
            </AppText>
          </View>

          <View
            style={ms([
              'flexRow',
              'alignCenter',
              styles.containerDivider,
              'px:8',
            ])}
          >
            <IconBriefcase size={Wp(20)} color={Colors.dim} />
            <AppText
              size="base"
              style={ms(['nunito_700', 'ml:5', `text:${Colors.dim}`])}
            >
              4+ Yrs
            </AppText>
          </View>

          <View style={ms(['flexRow', 'alignCenter', 'px:5'])}>
            <IconStar size={Wp(20)} color={Colors.dim} />
            <AppText
              size="base"
              style={ms(['nunito_700', 'ml:5', `text:${Colors.dim}`])}
            >
              4.5/5
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PractitionerCard;

const styles = StyleSheet.create({
  containerDivider: {
    borderLeftWidth: 1,
    borderLeftColor: colorWithOpacity(Colors.dim, 0.2),
    borderRightWidth: 1,
    borderRightColor: colorWithOpacity(Colors.dim, 0.2),
  },
});

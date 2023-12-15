import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import PractitionerImage from '@app/domains/meet-a-practitioner/components/practitioner-image';
import ms from '@app/assets/master-styles';
import { AppText, Badge, Heading } from '@app/components';
import { Nunito, Wp, colorWithOpacity } from '@app/utils';
import RecommendedTag from './rec-tag';
import { IconBriefcase, IconHeart, IconStar } from 'tabler-icons-react-native';
import { Colors } from '@app/constants';
import {
  Practitioner,
  PractitionerData,
} from '@app/domains/meet-a-practitioner/types';

const PractitionerCard = ({
  first_name,
  last_name,
  languages,
  avatar,
  user_tags,
  years_of_practice,
  rating,
  service_price,

  appointments_count,
  slug,
  
  handlePress,
}: Practitioner & {
  handlePress: (slug: string) => void;
}) => {
  const tags = user_tags.split(',');
  let tempTags;
  if (tags.length > 6) {
    tempTags = tags.slice(0, 6);
    tempTags.push('+' + (tags.length - 6));
  } else {
    tempTags = tags;
  }

  const langArray = languages.split(',');
  let tempLangs;
  if (langArray.length > 3) {
    tempLangs = langArray.slice(0, 3);
    tempLangs.push('+' + (langArray.length - 3));
  } else {
    tempLangs = langArray;
  }
  return (
    <TouchableOpacity
      style={ms([
        'bg_cont',
        'rounded-4',
        {
          overflow: 'hidden',
        },
        'mb_10',
      ])}
      onPress={() => {
        handlePress(slug);
      }}
    >
      <View style={ms(['flexRow', 'alignCenter', 'px_10', 'pt_10'])}>
        <PractitionerImage source={avatar} />
        <View style={ms(['flex1', 'mb_10', 'ml:10'])}>
          <View style={ms(['flexRow', 'alignCenter'])}>
            <Heading size="md">
              {(first_name + ' ' + last_name).slice(0, 15)}{' '}
            </Heading>
            <RecommendedTag />
          </View>

          <AppText size="md" style={ms([`textMuted`])}>
            {tempLangs.join(', ')}
          </AppText>
        </View>
      </View>
      <View style={ms(['topMargin', 'px_10', 'mb_10'])}>
        <AppText size="md" style={ms(['textMuted', 'nunito_700', 'mb_10'])}>
          Speciality
        </AppText>
        <View style={ms(['flexRow', 'flexWrap', 'justifyStart'])}>
          {tempTags.map((item, index) => {
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
            AED {service_price}
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
              {appointments_count} Ppl
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
              {years_of_practice}+ Yrs
            </AppText>
          </View>

          <View style={ms(['flexRow', 'alignCenter', 'px:5'])}>
            <IconStar size={Wp(20)} color={Colors.dim} />
            <AppText
              size="base"
              style={ms(['nunito_700', 'ml:5', `text:${Colors.dim}`])}
            >
              {Number(rating).toString().slice(0, 4) || 0}/5
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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

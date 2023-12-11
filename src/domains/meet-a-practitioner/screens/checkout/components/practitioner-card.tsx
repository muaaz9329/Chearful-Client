import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ms from '@app/assets/master-styles';
import PractitionerImage from '@app/domains/meet-a-practitioner/components/practitioner-image';
import { Divider } from 'react-native-paper';
import { AppText, Heading } from '@app/components';
import {
  IconBriefcase,
  IconCalendar,
  IconClock,
  IconStar,
} from 'tabler-icons-react-native';
import { Wp, colorWithOpacity } from '@app/utils';
import { Colors } from '@app/constants';

const PractitionerCard = () => {
  return (
    <View style={ms(['px_10', 'py_10', `bg:${'#F3F8F4'}`, 'br:15'])}>
      <View style={ms(['flexRow', 'py:8', 'justifyBetween', 'alignCenter'])}>
        <View style={ms(['flexRow', 'alignCenter'])}>
          <View style={ms(['mr:10'])}>
            <PractitionerImage size="xs" />
          </View>

          <View>
            <Heading size="sm">Mr. Forest Cuddy</Heading>
            <View style={ms(['flexRow', 'alignCenter', 'mt:4'])}>
              <View style={ms(['flexRow', 'alignCenter', 'mr:8'])}>
                <IconStar
                  size={Wp(15)}
                  color={Colors.brandGreen}
                  fill={Colors.brandGreen}
                />
                <AppText size="sm"> 4.5/5</AppText>
              </View>
              <View
                style={ms([
                  'flexRow',
                  'alignCenter',
                  'px:5',
                  {
                    borderLeftWidth: 1,
                    borderLeftColor: colorWithOpacity(Colors.brandGreen, 0.5),
                  },
                ])}
              >
                <IconBriefcase size={Wp(15)} color={Colors.brandGreen} />
                <AppText size="sm"> 4+ Yrs</AppText>
              </View>
            </View>
          </View>
        </View>

        <View>
          <AppText size="sm" style={ms(['textMuted'])}>
            Online Session
          </AppText>
          <View style={ms(['flexRow', 'alignCenter', 'justifyCenter'])}>
            <IconClock size={Wp(13)} color={Colors.brandGreen} />
            <AppText size="md"> 60 min</AppText>
          </View>
        </View>
      </View>
      <Divider
        style={{ height: 1, backgroundColor: '#D8D8D8', marginVertical: Wp(5) }}
      />
      <View style={ms(['flexRow', 'justifyBetween'])}>
        <View>
          <AppText size="sm" style={ms(['textMuted', 'mb:5'])}>
            Times & Date
          </AppText>
          <View style={ms(['flexRow', 'alignCenter', 'mb:5'])}>
            <IconClock
              size={Wp(15)}
              color={colorWithOpacity(Colors.black, 0.2)}
            />
            <AppText size="sm" style={ms(['ml:5'])}>
              02:00 PM - 03:00 PM
            </AppText>
          </View>
          <View style={ms(['flexRow', 'alignCenter'])}>
            <IconCalendar
              size={Wp(15)}
              color={colorWithOpacity(Colors.black, 0.2)}
            />
            <AppText size="sm" style={ms(['ml:5'])}>
              Mon, 29, Dec 2020
            </AppText>
          </View>
        </View>
        <View style={ms(['alignSelfEnd'])}>
            <AppText size="base" style={ms(['textMuted'])}>
                For
            </AppText>
            <AppText size="base" style={ms(['textMuted'])}>
                My Self
            </AppText>
        </View>
      </View>
    </View>
  );
};

export default PractitionerCard;

const styles = StyleSheet.create({});

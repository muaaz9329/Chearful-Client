import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ms from '@app/assets/master-styles';
import { Header, Heading } from '@app/components';
import { ChevronLeft } from '@app/assets/svgs';
import { IconComponent } from '@app/types';
import {
  IconBriefcase,
  IconCalendar,
  IconClock,
  IconStar,
} from 'tabler-icons-react-native';
import AppText from '../../../../components/ui/app-text';
import { Divider } from 'react-native-paper';
import { Colors } from '@app/constants';
import { Wp, colorWithOpacity } from '@app/utils';
import PractitionerImage from '../../components/practitioner-image';

type Props = {};

const CheckIn = (props: Props) => {
  return (
    <SafeAreaView style={ms(['Wrapper'])}>
      <Header headerType="New" Icon={ChevronLeft as IconComponent} pram="back">
        <Heading>Check In</Heading>
      </Header>
      <View
        style={ms(['px_10', 'py_10', `bg:${'#F3F8F4'}`, 'br:15', 'topMargin'])}
      >
        <View style={ms(['flexRow', 'py:8', 'justifyBetween', 'alignCenter'])}>
          <View style={ms(['flexRow', 'alignCenter'])}>
            <View style={ms(['mr:10'])}>
              <PractitionerImage size="xs" />
            </View>

            <View>
              <Heading size="sm">Mr. Forest Cuddy</Heading>
              <View style={ms(['flexRow', 'alignCenter', 'mt:4'])}>
                <AppText style={ms(['textMuted'])} size="sm">
                  English, Urdu, Arabic
                </AppText>
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
          style={{
            height: 1,
            backgroundColor: '#D8D8D8',
            marginVertical: Wp(5),
          }}
        />
      </View>
      <View style={ms(['topMargin','flex1', 'flexRow'])}>
        <View
          style={ms([
            'bg_cont',
            'py_10',
            'px_10',
            'alignSelfStart',
            'flex1',
            'rounded-3',
          ])}
        ></View>
      </View>
      
    </SafeAreaView>
  );
};

export default CheckIn;

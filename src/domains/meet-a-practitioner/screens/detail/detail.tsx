import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@app/constants';
import ms from '@app/assets/master-styles';
import {
  IconBriefcase,
  IconChevronLeft,
  IconHeart,
  IconStar,
} from 'tabler-icons-react-native';
import AppText from '../../../../components/ui/app-text';
import { Badge, Heading } from '@app/components';
import { Nunito, Wp, colorWithOpacity } from '@app/utils';
import PractitionerImage from '../../components/practitioner-image';
import { Divider } from 'react-native-paper';

type Props = {};

const Detail = (props: Props) => {
  return (
    <SafeAreaView
      style={ms([`bg:${Colors.DarkGreen}`, 'pt:15', 'flex1'])}
      edges={['top', 'right', 'left']}
    >
    <ScrollView style={ms(['flex1'])} showsVerticalScrollIndicator={false}>
        
      <StatusBar backgroundColor={Colors.DarkGreen} />
      <View style={ms(['flexRow', 'alignCenter', 'px:18'])}>
        <IconChevronLeft color="white" size={30} />
        <Heading size="lg" style={ms(['textWhite', 'ml:20'])}>
          Mr. Forrest Cuddy
        </Heading>
      </View>

      <View
        style={ms([
          'flex1',
          `bg_white`,
          'mt:80',
          styles.containerBorderRadius,
          'px:18',
        ])}
      >
        <View style={styles.userAvatar}>
          <PractitionerImage size="md" />
        </View>
        <View style={ms(['px:20', 'py:20', 'mt:50', 'alignSelfCenter'])}>
          <Heading size="lg">Mr. Forrest Cuddy</Heading>
          <AppText
            size="md"
            style={ms(['textMuted', 'nunito_700', 'textCenter', 'mt:5'])}
          >
            Master's/Graduate
          </AppText>
        </View>

          {/**
           *
           *Practitioner Info Container
           */}

        <View
          style={ms([
            'flexRow',
            'topMargin',
            `bg:${Colors.veryLightGreen}`,
            'alignCenter',
            'justifyBetween',
            'px_10',
            'py_10',
            'rounded-3',
          ])}
        >
          <View style={ms(['alignCenter'])}>
            <IconHeart size={Wp(25)} color={Colors.brandGreen} />
            <AppText
              size="base"
              style={ms(['nunito_700', 'textCenter', 'mt:5', 'textPrimary'])}
            >
              2038 Ppl
            </AppText>
            <AppText
              size="base"
              style={ms(['textMuted', 'nunito_700', 'textCenter'])}
            >
              Lives Impacted
            </AppText>
          </View>
          <View style={ms(['alignCenter', 'px:20', styles.containerDivider])}>
            <IconStar size={Wp(25)} color={Colors.brandGreen} />
            <AppText
              size="base"
              style={ms(['nunito_700', 'textCenter', 'mt:5', 'textPrimary'])}
            >
              4.5/5
            </AppText>
            <AppText
              size="base"
              style={ms(['textMuted', 'nunito_700', 'textCenter'])}
            >
              Review Score
            </AppText>
          </View>
          <View style={ms(['alignCenter'])}>
            <IconBriefcase size={Wp(25)} color={Colors.brandGreen} />
            <AppText
              size="base"
              style={ms(['nunito_700', 'textCenter', 'mt:5', 'textPrimary'])}
            >
              4+ Yrs
            </AppText>
            <AppText
              size="base"
              style={ms(['textMuted', 'nunito_700', 'textCenter'])}
            >
              Experience
            </AppText>
          </View>
        </View>
        <View style={ms(['topMargin', 'mb_10'])}>
         <AppText size="md" style={ms([ 'nunito_700', 'mb_10','textPrimary'])}>
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
      <Divider style={{height:1}}/>
      <View style={ms(['topMargin', 'mb_10'])}>
         <AppText size="md" style={ms([ 'nunito_700', 'mb_10','textPrimary'])}>
          Approach
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
      <Divider style={{height:1}}/>
      <View style={ms(['topMargin', 'mb_10'])}>
         <AppText size="md" style={ms([ 'nunito_700', 'mb_10','textPrimary'])}>
          Speaks
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
      <Divider style={{height:1}}/>
      <View style={ms(['topMargin', 'mb_10'])}>
      <AppText size="md" style={ms([ 'nunito_700', 'mb_10','textPrimary'])}>
          About
        </AppText>
        <AppText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas aut corporis sint perferendis, pariatur odit earum? Similique esse quisquam, totam hic quasi aperiam porro consequatur provident numquam consequuntur, unde ratione?
        </AppText>
      </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  containerBorderRadius: {
    borderTopLeftRadius: Wp(40),
    borderTopRightRadius: Wp(40),
  },
  userAvatar: {
    position: 'absolute',
    top: -Wp(45),
    alignSelf: 'center',
  },
  containerDivider: {
    borderLeftWidth: 1,
    borderLeftColor: 'white',
    borderRightWidth: 1,
    borderRightColor: 'white',
  },
});

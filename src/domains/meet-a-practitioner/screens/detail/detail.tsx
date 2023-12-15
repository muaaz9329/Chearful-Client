import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@app/constants';
import ms from '@app/assets/master-styles';
import {
  IconBriefcase,
  IconChevronLeft,
  IconClock,
  IconHeart,
  IconStar,
} from 'tabler-icons-react-native';
import AppText from '../../../../components/ui/app-text';
import { Badge, Heading, MyButton } from '@app/components';
import { Nunito, Wp, colorWithOpacity } from '@app/utils';
import PractitionerImage from '../../components/practitioner-image';
import { Divider } from 'react-native-paper';
import DetailBox from './components/detail-cont';
import SessionCard from './components/session-card';
import TagsCont from './components/tags-cont';
import { RoutesParam } from '@app/types';
import { useNavigation } from '@react-navigation/native';
import useApi from './hooks/use-api';
import RoundLoading from '@app/components/round-loading';
import RequestFailure from '@app/components/request-failure';
import { processArray } from '../../adapters';

type Props = {};

const Detail = ({
  route,
}: RoutesParam<{
  slug: string;
}>) => {
  const navigation = useNavigation();
  const { data, loading, reloadScreen, success } = useApi(
    route?.params?.slug as string,
  );

  console.log(route?.params?.slug)
  return (
    <RoundLoading loading={loading}>
      <RequestFailure success={success as boolean} reload={reloadScreen}>
        <SafeAreaView
          style={ms([`bg:${Colors.DarkGreen}`, 'pt:15', 'flex1'])}
          edges={['top', 'right', 'left']}
        >
          <ScrollView
            style={ms(['flex1'])}
            showsVerticalScrollIndicator={false}
          >
            <StatusBar backgroundColor={Colors.DarkGreen} />
            <View style={ms(['flexRow', 'alignCenter', 'px:18'])}>
              <IconChevronLeft color="white" size={30} />
              <Heading size="lg" style={ms(['textWhite', 'ml:20'])}>
                {data?.gender_title + ' ' + data?.userOBJ.first_name}
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
                <PractitionerImage size="md" source={data?.user_meta.avatar} />
              </View>
              <View style={ms(['px:20', 'py:20', 'mt:50', 'alignSelfCenter','textCenter'])}>
                <Heading size="lg">{data?.gender_title + ' ' + data?.userOBJ.first_name}</Heading>
                <AppText
                  size="md"
                  style={ms(['textMuted', 'nunito_700', 'textCenter', 'mt:5'])}
                >
                  {data?.education.title}
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
                  {
                    width: '70%',
                    alignSelf: 'center',
                  }
                ])}
              >
                
                <View
                  style={ms(['alignCenter'])}
                >
                  <IconStar size={Wp(25)} color={Colors.brandGreen} />
                  <AppText
                    size="base"
                    style={ms([
                      'nunito_700',
                      'textCenter',
                      'mt:5',
                      'textPrimary',
                    ])}
                  >
                    {data?.avg_rating}/5
                  </AppText>
                  <AppText
                    size="base"
                    style={ms(['textMuted', 'nunito_700', 'textCenter'])}
                  >
                    Review Score
                  </AppText>
                </View>
                <DetailBox
                  Icon={IconBriefcase}
                  title={data?.experiance + ' Yrs'}
                  subTitle="Experience"
                />
              </View>
              

              <TagsCont title="Approach" data={ data?.approach_tags && processArray(data?.approach_tags as string[],5)}/>

          

             { data?.short_desc && <View style={ms(['topMargin', 'mb_10'])}>
                <AppText
                  size="md"
                  style={ms(['nunito_700', 'mb_10', 'textPrimary'])}
                >
                  About
                </AppText>
                <AppText>
                  {
                    data?.short_desc
                  }
                </AppText>
              </View>}
              <Divider style={{ height: 1 }} />
              <View style={ms(['topMargin', 'mb_10'])}>
                <AppText
                  size="md"
                  style={ms(['nunito_700', 'mb_10', 'textPrimary'])}
                >
                  Sessions
                </AppText>
                {
                  data?.services.map((item , index)=>{
                    return (
                      <SessionCard key={index} time={item.duration.toString() + " mins"} price={item.price.toString() + " AED / Session"} />
                    )
                  })
                }
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </RequestFailure>
    </RoundLoading>
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

import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ms from '@app/assets/master-styles';
import { Badge, Header, Heading } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from '@app/assets/svgs';
import { IsTablet, Wp } from '@app/utils';
import MoodBox from '../../components/mood-box';
import { IconComponent } from '@app/types';
import useApi from './hooks/use-api';
import RoundLoading from '@app/components/round-loading';

function formatDate(inputDate: string) {
  const date = new Date(inputDate);

  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  // @ts-ignore
  return date.toLocaleString('en-US', options);
}
const ViewMood = ({
  route,
}: {
  route: {
    params: {
      id: number;
    };
  };
}) => {
  const navigation = useNavigation();

  console.log(route.params.id);
  const { data, loading } = useApi(route.params.id);
  return (
    <RoundLoading loading={loading}>
    <SafeAreaView edges={['top']} style={ms(['bg_cont', 'flex1'])}>
      
        <View style={ms(['px_16', 'mt_10'])}>
          <Header
            pram={'back'}
            navigation={navigation}
            Icon={ChevronLeft as IconComponent}
            headerType="New"
          />
        </View>

        <View style={ms(['flex1', 'flexColumn', 'flexColumnReverse'])}>
          <View style={ms([styles.bottomCont, 'bg_white'])}>
            <MoodBox mood={data?.title.toLocaleLowerCase() as MoodTypes} />

            <View style={ms(['mt:60', 'alignCenter'])}>
              <Heading size="sm" style={ms(['nunito_500', 'my_12'])}>
                {formatDate(data?.created_at as string)}
              </Heading>
              <View style={ms(['mt_20', 'alignCenter'])}>
                <Heading size="md" style={ms(['nunito_500'])}>
                  Tell us how strongly you feel
                </Heading>
                <Heading size="xxl" style={ms(['nunito_500', 'my_12'])}>
                  {data?.score}/10
                </Heading>
              </View>

              <Heading size="md" style={ms(['nunito_500', 'my_10'])}>
                Describe how you feel{' '}
              </Heading>
              <View style={ms([styles.BadgeCont, 'mb_15'])}>
                {data?.HowYouFeel.map((item, index) => {
                  return (
                    <Badge
                      key={index}
                      text={item}
                      style={ms([
                        'rounded-3',
                        'my:2',
                        'mx:2',
                        'px_12',
                        IsTablet && ['px_8', 'py_4', 'my:2', 'mx:1'],
                      ])}
                      //@ts-ignore
                      textStyle={ms([
                        'nunito_500',
                        'fs_13',
                        IsTablet && ['fs_10'],
                      ])}
                    />
                  );
                })}
              </View>
              <Heading size="md" style={ms(['nunito_500', 'my_10'])}>
                What made you feel this way?
              </Heading>
              <View style={styles.BadgeCont}>
                {data?.MadeYouFeel.map((item, index) => {
                  return (
                    <Badge
                      key={index}
                      text={item}
                      style={ms([
                        'rounded-3',
                        'my:2',
                        'mx:2',
                        'px_12',
                        IsTablet && ['px_8', 'py_4', 'my:2', 'mx:1'],
                      ])}
                      //@ts-ignore
                      textStyle={ms([
                        'nunito_500',
                        'fs_13',
                        IsTablet && ['fs_10'],
                      ])}
                    />
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      
    </SafeAreaView>
    </RoundLoading>
  );
};

export default ViewMood;

const styles = StyleSheet.create({
  BadgeCont: {
    width: '70%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomCont: {
    flex: 0.89,
    borderTopLeftRadius: Wp(26),
    borderTopRightRadius: Wp(26),
  },
});

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LearnAndGrowCardType } from '../types';
import useResourcesStore from '../hooks/use-resources-store';
import { NavigationProp } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import globalStyles from '@app/assets/global-styles';
import { IsTablet, Wp, wp } from '@app/utils';
import { Colors } from '@app/constants';

const LearnAndGrowCard = ({
  data,
  navigation,
}: {
  data: LearnAndGrowCardType;
  navigation: NavigationProp<any, any>;
}) => {
  const { setResources } = useResourcesStore();
  return (
    <Pressable
      style={[
        styles.Cont,
        globalStyles.flexRow,
        globalStyles.alignCenter,
        globalStyles.justifyBetween,
        globalStyles.mb_16,
        IsTablet && styles.Cont_tablet,
      ]}
      onPress={() => {
        setResources(data);
        // navigation?.navigate('LEARN-GROW-DETAIL')
        navigation?.navigate('content-stack', {
          screen: 'LEARN-GROW',
          params: { screen: 'LEARN-GROW-DETAIL' },
        });
      }}
    >
      <View style={[styles.TextCont, IsTablet && styles.TextCont_tablet]}>
        <Text
          style={[
            globalStyles.fs_18,
            globalStyles.nunito_700,
            globalStyles.textPrimary,
            IsTablet && globalStyles.fs_10,
          ]}
        >
          {data.title.length > 20
            ? data.title.slice(0, 20) + '...'
            : data.title}
        </Text>
        <Text
          style={[
            globalStyles.mulish_400,
            globalStyles.fs_14,
            globalStyles.textPrimary,
            styles.Subtitle,
            IsTablet && {
              ...globalStyles.fs_8,
              marginTop: Wp(2),
            },
          ]}
        >
          {data.desc.length > 50 ? data.desc.slice(0, 50) + '...' : data.desc}
        </Text>
      </View>
      <View style={[styles.img, IsTablet && styles.img_tablet]}>
        <SvgUri
          uri={data.icon}
          width={IsTablet ? Wp(60) : Wp(100)}
          height={IsTablet ? Wp(60) : Wp(100)}
          preserveAspectRatio="xMinYMin slice"
        />
      </View>
    </Pressable>
  );
};

export default LearnAndGrowCard;

const styles = StyleSheet.create({
  img_tablet: {
    width: Wp(60),
    height: Wp(60),
  },
  TextCont_tablet: {
    marginVertical: Wp(10),
  },
  Cont_tablet: {
    width: wp(55),
    alignSelf: 'center',
  },
  img: {
    width: Wp(100),
    height: Wp(100),
    marginTop: Wp(8),
  },
  Subtitle: {
    opacity: 0.7,
    marginTop: Wp(4),
  },
  TextCont: {
    flex: 1,
    marginVertical: Wp(18),
  },
  Cont: {
    paddingHorizontal: Wp(12),
    borderRadius: Wp(12),
    backgroundColor: Colors.light,
    width: wp(90),
    marginRight: Wp(10),
  },
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
import SlideLoader from './slider-loader';
import globalStyles, { globalStylesFunc } from '@app/assets/global-styles';
import { IsTablet, Wp } from '@app/utils';
import { IconDiamond } from 'tabler-icons-react-native';
import { Colors } from '@app/constants';
import { Heading } from '@app/components';

const ScoreLoader = ({ score }: { score: number }) => {
  const scorePercentage = (score / 30000) * 100;
  return (
    <SlideLoader
      percentage={scorePercentage}
      bgColor="#FFD58C"
      loaderColor="#FFA200"
      height={10}
    />
  );
};

const Scoreboard = ({
  earnedPoints,
  pointsToBeEarned,
}: {
  earnedPoints: number;

  percentageCompletion: number;
  pointsToBeEarned: number;
}) => {
  return (
    <View
      style={[
        globalStyles.px_10,
        globalStyles.py_10,
        globalStylesFunc.bg('#F5F5F5'),
        globalStylesFunc.br(24),
        globalStyles.my_15,
      ]}
    >
      <View
        style={[
          globalStyles.alignSelfCenter,
          globalStyles.flexRow,
          globalStyles.alignCenter,
          globalStyles.justifyCenter,
        ]}
      >
        <IconDiamond
          size={IsTablet ? Wp(15) : Wp(24)}
          color={Colors.primary}
          style={{ marginRight: IsTablet ? Wp(3) : Wp(6) }}
        />
        <Heading size="sm" style={styles.UnderlineStyles}>
          Your Points Wallet
        </Heading>
      </View>
      <View style={globalStyles.my_10}>
        <ScoreLoader score={earnedPoints} />
      </View>
      <View style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
        <View
          style={{
            flex: IsTablet ? 0.5 : 0.3,
          }}
        >
          <Heading size="sm">{earnedPoints} points Earned</Heading>
        </View>
        <View
          style={{
            flex: IsTablet ? 0.5 : 0.3,
          }}
        >
          <Heading size="sm">
            {pointsToBeEarned} points Yet To be Earned
          </Heading>
        </View>
      </View>
    </View>
  );
};

export default Scoreboard;

const styles = StyleSheet.create({
  UnderlineStyles: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
});

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ms from '@app/assets/master-styles';
import { PieChart } from 'react-native-chart-kit';
import { Wp, capitalizeFirstLetter } from '@app/utils';
import { AppText, Heading } from '@app/components';
import { convertObjectToArray } from '@app/domains/mood-dairy/adapters/adapter-function';

const ColorScheme = {
  happy: '#FCE3A7',
  angry: '#FCC0B1',
  peaceful: '#8AEBAF',
  sad: '#C2C5FF',
};

const makeChartData = (
  convertedData: { name: string; percentage: number }[],
) => {
  const chartData = convertedData.map((item) => {
    return {
      name: item.name,
      population: item.percentage,
      //@ts-ignore
      color: ColorScheme[item.name.toLowerCase()],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    };
  });

  return chartData;
};
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
};

const Overview = ({ incomingData }: { incomingData: AddedMoodPercentage }) => {
  const ChartData = convertObjectToArray(incomingData);

  return (
    <View
      style={ms([
        'topMargin',
        'flexRow',
        'alignCenter',
        'mt:20',
        'mb:20',
        'alignSelfCenter',
      ])}
    >
      <PieChart
        data={makeChartData(ChartData)}
        width={Wp(160)}
        height={Wp(180)}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={String(Wp(15))}
        center={[Wp(20), 0]}
        hasLegend={false}
        absolute
      />
      <View
        style={{
          height: Wp(150),
          marginLeft: Wp(10),
        }}
      >
        <Heading size="md">Overview</Heading>
        <View style={ms([])}>
          {ChartData.map((item, i) => {
            return (
              <View key={i} style={ms(['flexRow', 'alignCenter', 'mt:5'])}>
                <View
                  style={ms([
                    'px_10',
                    'py_10',
                    // @ts-ignore
                    `bg:${ColorScheme[item.name.toLowerCase()]}`,
                    'alignSelfStart',
                    'br:4',
                  ])}
                ></View>
                <AppText size="base" style={ms(['ml:5'])}>
                  {item.percentage}%
                </AppText>
                <AppText size="base" style={ms(['ml:5'])}>
                  {item.name}
                </AppText>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({});

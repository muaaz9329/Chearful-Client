import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import apiService from '@app/services/api-service/api-service';
import {
  IsTablet,
  Wp,
  colorWithOpacity,
  getAuthHeaders,
  mergeStyles,
} from '@app/utils';
import globalStyles, { globalStylesFunc } from '@app/assets/global-styles';
import { IconLock } from 'tabler-icons-react-native';
import { Heading } from '@app/components';
import SlideLoader from './slider-loader';

const assessmentColors = {
  upcoming: '#FFDE6B',
  level1: '#FCB2AA',
  level2: '#F9A49A',
  level3: '#F69388',
  level4: '#F48477',
  level5: '#F17668',
  missed: '#FFDE6D',
};

const assessmentStrings = {
  upcoming: 'Assessment',
  level1: 'Level - 01',
  level2: 'Level - 02',
  level3: 'Level - 03',
  level4: 'Level - 04',
  level5: 'Level - 05',
  missed: 'Assessment',
};

// const assessmentPercentage = {
//   upcoming: 0,
//   level1: 20,
//   level2: 40,
//   level3: 60,
//   level4: 80,
//   level5: 100,
//   missed: 0,
// };

// const percentage = {
//   level1: 20,
//   level2: 40,
//   level3: 60,
//   level4: 80,
//   level5: 100,
// };

const PercentageToLevel = (percentage: number) => {
  if (percentage <= 20) {
    return 'level1';
  } else if (percentage <= 40) {
    return 'level2';
  } else if (percentage <= 60) {
    return 'level3';
  } else if (percentage <= 80) {
    return 'level4';
  } else if (percentage <= 100) {
    return 'level5';
  }
};

const AssessmentBox = ({
  conditon = 'submit',
  onPress,
  assessmentId,
  userAssementId,
}: {
  conditon: 'upcoming' | 'missed' | 'submit' | 'today';

  onPress: () => void;
  assessmentId: number;
  userAssementId: number;
}) => {
  const [assessment, setAssessment] = useState<{
    description: string;
    percentage: number;
  }>();
  const handleApi = () => {
    getAuthHeaders().then((headers) => {
      apiService.get({
        url: `/website/assessments/getAssessmentScore/${assessmentId}/${userAssementId}`,
        headers,
        onSuccess: ({ data, ...extras }) => {
          //@ts-ignore
          setAssessment(extras);
        },
        onFailure: ({ error }) => {
          console.log(error);
        },
      });
    });
  };
  useEffect(() => {
    if (conditon === 'submit') {
      handleApi();
    }
  }, []);

  return (
    <Pressable
      onPress={onPress}
      disabled={!(conditon === 'today')}
      style={[
        globalStylesFunc.W(140),
        globalStylesFunc.H(140),
        globalStylesFunc.br(12),

        globalStyles.flexColumn,
        globalStyles.py_10,

        globalStyles.px_10,
        IsTablet &&
          mergeStyles(
            globalStylesFunc.W(90),
            globalStylesFunc.H(90),
            globalStylesFunc.br(10),
            globalStylesFunc.px(8),

            globalStylesFunc.py(8),
          ),

        conditon === 'upcoming' &&
          globalStylesFunc.bg(assessmentColors.upcoming),
        conditon === 'missed' && globalStylesFunc.bg(assessmentColors.missed),
        conditon === 'submit' &&
          globalStylesFunc.bg(
            //@ts-ignore
            assessmentColors[PercentageToLevel(assessment?.percentage || 0)],
          ),
        (conditon === 'upcoming' ||
          conditon === 'missed' ||
          conditon === 'today') &&
          mergeStyles(globalStyles.justifyCenter, globalStyles.alignCenter),
        conditon === 'today' && globalStylesFunc.bg(assessmentColors.missed),
      ]}
    >
      <View
        style={
          conditon !== 'upcoming' &&
          conditon !== 'missed' &&
          styles.notUpcomingCont
        }
      >
        {conditon === 'upcoming' && (
          <View style={[globalStyles.alignSelfCenter, globalStyles.mb_10]}>
            <IconLock size={Wp(30)} color={colorWithOpacity('#000', 0.5)} />
          </View>
        )}
        <Heading
          size="sm"
          style={[
            globalStylesFunc.px(8),
            globalStyles.textCenter,
            globalStylesFunc.text(colorWithOpacity('#000', 0.5)),
            globalStyles.nunito_600,
          ]}
        >
          {conditon === 'upcoming' || conditon === 'missed'
            ? 'Assessment Day'
            : 'Assessment Result'}
        </Heading>
        {conditon !== 'upcoming' &&
          conditon !== 'missed' &&
          conditon !== 'today' && (
            <View>
              <Heading
                size="sm"
                style={[
                  globalStylesFunc.px(8),
                  globalStylesFunc.text(colorWithOpacity('#000', 0.5)),
                  globalStyles.textCenter,
                ]}
              >
                {assessment?.description}
              </Heading>

              <View>
                <SlideLoader
                  percentage={(assessment?.percentage as number) || 0}
                />
              </View>
            </View>
          )}
      </View>
    </Pressable>
  );
};

export default AssessmentBox;

const styles = StyleSheet.create({
  notUpcomingCont: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  },
});

import { StyleSheet, View } from 'react-native';
import globalStyles, {
  globalStylesFunc as ms,
} from '@app/assets/global-styles';
import { IsTablet } from '@app/utils';
import { mergeStyles } from '@app/utils';

const SlideLoader = ({
  percentage,
  bgColor = '#F17668',
  loaderColor = '#ffffff',
  height = 6,
}: {
  percentage: number;
  bgColor?: string;
  loaderColor?: string;
  height?: number;
}) => {
  return (
    <View
      style={[
        globalStyles.mt_10,

        ms.br(10),
        IsTablet && mergeStyles(ms.br(8), ms.mt(7)),
        ms.bg(bgColor),
        {
          width: '100%',
        },
      ]}
    >
      <View
        style={[
          ms.py(height),
          ms.br(10),
          IsTablet && mergeStyles(ms.py(height * 0.667), ms.br(8)),
          ms.bg(loaderColor),
          {
            width: `${percentage}%`,
          },
        ]}
      />
    </View>
  );
};

export default SlideLoader;

const styles = StyleSheet.create({});

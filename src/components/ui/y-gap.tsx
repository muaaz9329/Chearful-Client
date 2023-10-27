import { Wp } from '@app/utils';
import { View } from 'react-native';

const YGap = ({ gap = 10 }: { gap: number }) => {
  return <View style={{ height: Wp(gap) }} />;
};

export default YGap;

import { View } from 'react-native';
import { Wp } from '@app/utils';

const XGap = ({ gap = 10 }: { gap?: number }) => {
  return <View style={{ width: Wp(gap) }} />;
};

export default XGap;

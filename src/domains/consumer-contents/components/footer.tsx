import { View } from 'react-native-animatable';
import { ListingAndDetailLoadingType } from '../types';
import { Loader } from '@app/components';
import { Pressable, StyleSheet } from 'react-native';
import { IconArrowDown } from 'tabler-icons-react-native';
import { IsPhone, Wp } from '@app/utils';
import { Colors } from '@app/constants';

function FooterComponent(
  loading: ListingAndDetailLoadingType,
  LoadNextBatch: () => void,
): React.ReactElement<any, any> | null {
  return (
    <View style={styles.NextArrow}>
      {loading.nextBatch ? (
        <Loader size="small" />
      ) : (
        loading.hidingNextBtn || (
          <Pressable onPress={LoadNextBatch}>
            <IconArrowDown
              size={IsPhone ? Wp(30) : Wp(15)}
              color={Colors.primary}
            />
          </Pressable>
        )
      )}
    </View>
  );
}

export default FooterComponent;

const styles = StyleSheet.create({
  NextArrow: {
    marginVertical: Wp(10),
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

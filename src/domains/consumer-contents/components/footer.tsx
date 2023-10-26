import { View } from "react-native-animatable";
import Loader from "../../../common/components/loader";
import { Pressable, StyleSheet } from "react-native";
import { IconArrowDown } from "tabler-icons-react-native";
import { DeviceType } from "@app/context/Device-Type/DeviceTypeProvider";
import { Wp } from "@app/helper/CustomResponsive";
import { AppColors } from "@app/constants/app-colors";

function FooterComponent(
  loading: ListingAndDetailLoadingType,
  LoadNextBatch: () => void,
  deviceType?: DeviceType
): React.ReactElement<any, any> | null {
  return (
    <View style={styles.NextArrow}>
      {loading.nextBatch ? (
        <Loader size="small" />
      ) : (
        loading.hidingNextBtn || (
          <Pressable onPress={LoadNextBatch}>
            <IconArrowDown
              size={deviceType === "mobile" ? Wp(30) : Wp(15)}
              color={AppColors.Primary}
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
    alignSelf: "center",
    justifyContent: "center",
  },
});

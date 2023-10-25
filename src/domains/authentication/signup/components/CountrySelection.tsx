import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import FormLabel from "@app/common/components/Inputs/FormLabel";
import { Image } from "react-native-animatable";
import { Hp, Wp } from "@app/helper/CustomResponsive";
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { AppColors } from "@app/constants/app-colors";
import Country from "./countryInput/Country-Selection/Country";
import ActionSheet from "react-native-actions-sheet";
import { ICountrySelection } from "../Views/MobileView";
import { countries } from "./countryInput/countries";
import { Mulish } from "@app/helper/FontWeight";
import { DeviceType } from "@app/context/Device-Type/DeviceTypeProvider";
import ModelLayout from "@app/common/Models/Model-Layout";

type Props = {
  handleForm: (text: string, name: string) => void;
  deviceType?: DeviceType;
};

const CountrySelection = ({ handleForm, deviceType = "mobile" }: Props) => {
  const ActionSheetRef = useRef(null);
  const [countryFlag, setcountryFlag] = useState<ICountrySelection>(
    countries[0]
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // @ts-ignore
    handleForm(countryFlag.id, "countryName");
  }, [countryFlag]);

  const bottomSheetClose = () => {
    //@ts-ignore
    ActionSheetRef.current?.hide();
  };

  return (
    <>
      <FormLabel label="Select Country" deviceType={deviceType}>
        <Pressable
          style={[
            styles.countryCont,
            deviceType === "tablet" && {
              paddingHorizontal: Wp(3),
              backgroundColor: AppColors.InputBg,
              width: wp(30),
              borderRadius: Wp(7),
            },
          ]}
          onPress={() => {
            deviceType === "mobile"
              ? //@ts-ignore
                ActionSheetRef.current?.show()
              : setVisible(true);
          }}
        >
          <View
            style={[
              styles.itemContainer,
              deviceType === "tablet" && {
                paddingVertical: Wp(8),
                paddingHorizontal: Wp(6),
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image // @ts-ignore
                source={countryFlag.flag}
                style={[
                  styles.FlagImgDesign,
                  deviceType === "tablet" && {
                    width: Wp(18),
                    height: Wp(12),
                    borderRadius: Wp(1.3),
                  },
                ]}
              />
              <Text
                style={[
                  styles.itemText,
                  deviceType === "tablet" && {
                    marginLeft: Wp(10),
                    fontSize: Wp(6),
                  },
                ]}
              >
                {countryFlag.name}
              </Text>
            </View>
          </View>
        </Pressable>
      </FormLabel>

      {deviceType === "mobile" && (
        <ActionSheet
          containerStyle={{
            height: heightPercentageToDP(50),
            paddingVertical: Wp(20),
            borderTopRightRadius: Wp(20),
            borderTopLeftRadius: Wp(20),
          }}
          ref={ActionSheetRef}
        >
          <Country
            setFlag={setcountryFlag}
            sheetClose={bottomSheetClose}
            showDialCode={false}
            deviceType={"mobile"}
          />
        </ActionSheet>
      )}
      {deviceType === "tablet" && (
        <ModelLayout visible={visible} setVisible={setVisible}>
          <Country
            setFlag={setcountryFlag}
            sheetClose={() => setVisible(false)}
            showDialCode={false}
            deviceType={"tablet"}
          />
        </ModelLayout>
      )}
    </>
  );
};

export default CountrySelection;

const styles = StyleSheet.create({
  countryCont: {
    paddingHorizontal: Wp(5),
    backgroundColor: AppColors.InputBg,
    width: wp(85),
    borderRadius: Wp(12),
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: Wp(20),
    paddingHorizontal: Wp(15),
    alignItems: "center",
    justifyContent: "space-between",
  },
  FlagImgDesign: {
    width: Wp(28),
    height: Wp(20),
    borderRadius: Wp(1.3),
  },
  itemText: {
    marginLeft: Wp(20),
    fontSize: Wp(14),
    fontFamily: Mulish(700),
    color: AppColors.Primary,
  },
});

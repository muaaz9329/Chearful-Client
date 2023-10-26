import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Nunito } from "@app/helper/FontWeight";
import { Wp } from "@app/helper/CustomResponsive";
import { AppColors as NoteAppcolor } from "@app/constants/app-colors";
import { DeviceContext } from "@app/context/Device-Type/DeviceTypeProvider";
import { useNavigation } from "@react-navigation/native";
import { IconArrowRight } from "tabler-icons-react-native";



const MenuTitle = ({ children , path}: { children: React.ReactNode , path:string}) => {
  const { deviceType } = useContext(DeviceContext);
  const navigation = useNavigation()

  const handleNavigation = () => {
    // @ts-ignore
    // navigation.navigate(path)
    navigation?.navigate("content-stack", {
      screen: path,
      // Pass the id as a parameter
    })
  }
  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <Text
        style={[
          styles.titleTextStyles,
          deviceType === "tablet" && {
            fontSize: Wp(12),
          },
        ]}
      >
        {children}
      </Text>
      <Pressable onPress={handleNavigation}>
      <IconArrowRight color={NoteAppcolor.Primary} size={deviceType==='mobile'?Wp(23):Wp(16)}  />

      </Pressable>
    </View>
  );
};

export default MenuTitle;

const styles = StyleSheet.create({
  titleTextStyles: {
    fontFamily: Nunito(400),
    fontSize: Wp(18),
    color: NoteAppcolor.Primary,
  },
});

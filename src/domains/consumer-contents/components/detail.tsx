import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Children, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Wp, wp } from "@app/helper/CustomResponsive";
import { Mulish, Nunito } from "@app/helper/FontWeight";
import { AppColors as NoteAppcolor } from "@app/constants/app-colors";
import AuthorCont from "@app/common/components/author-cont";
import { IconEye, IconLink } from "tabler-icons-react-native";
import RenderHtml from "react-native-render-html";
import {
  colorWithOpacity,
  DateConstrctor,
  decodeHTML,
  stripHTML,
} from "@app/helper/customFunction";
import useSocialShare from "../hooks/use.social-share";
import {
  DeviceContext,
  DeviceType,
} from "@app/context/Device-Type/DeviceTypeProvider";
import SocialBtns from "@app/screens/Main-Screen/components/social-btn";
import ChipTags from "@app/screens/Main-Screen/components/chip-tags";

const Detail = ({
  AuthorName,
  date,
  description,
  categories,
  title,
  views,
  link,
  authorImg,
  children,
}: {
  title?: string;
  description?: string;
  AuthorName?: string;
  date?: string;

  categories?: any[];
  views?: number;
  link?: string;
  authorImg?: string;
  children?: React.ReactNode;
}) => {
  const { shareOnFacebook, shareOnInstagram, shareOnLinkedIn, shareLink } =
    useSocialShare(link!);
  const { deviceType } = useContext(DeviceContext);
  return (
    <SafeAreaView
      style={[
        styles.SafeAreaStyles,
        deviceType === "tablet" && styles.safeAreaStyles_tablet,
      ]}
    >
      {children ? (
        children
      ) : (
        <>
          <View style={styles.MarginTop}>
            <Text
              style={[
                styles.TitlesStyles,
                deviceType === "tablet" && styles.TitleStyles_tablet,
              ]}
            >
              {decodeHTML(title!)}
            </Text>
          </View>
          <View style={styles.MarginTop}>
            <View style={styles.warpFlex}>
              {categories!.map((item, index) => {
                return (
                  <ChipTags
                    key={index}
                    value={item.title}
                    deviceType={deviceType}
                  />
                );
              })}
            </View>
          </View>
          <View
            style={[
              styles.MarginTop,
              deviceType === "tablet" && styles.MarginTop_tablet,
            ]}
          >
            <AuthorCont
              name={AuthorName}
              date={DateConstrctor(new Date(date!)).Date}
              image={{ uri: authorImg }}
            />
          </View>
          <View
            style={[
              styles.MarginTop,
              deviceType === "tablet" && styles.MarginTop_tablet,
            ]}
          >
            <View style={styles.SocialCont}>
              <View style={styles.flexRow}>
                <IconEye
                  size={deviceType === "mobile" ? Wp(18) : Wp(12)}
                  color={colorWithOpacity("#000", 0.7)}
                />
                <Text
                  style={[
                    styles.ViewsTextStyles,
                    deviceType === "tablet" && styles.ViewTestStyles_tablet,
                  ]}
                >
                  {views} views
                </Text>
              </View>

              <View style={styles.flexRow}>
                <SocialBtns
                  img={require("../imgs/linkedin.png")}
                  onPress={() => {
                    shareOnLinkedIn();
                  }}
                  width={deviceType === "mobile" ? 20 : 15}
                  height={deviceType === "mobile" ? 20 : 15}
                  deviceType={deviceType}
                />

                <SocialBtns
                  img={require("../imgs/facebook.png")}
                  onPress={() => {
                    shareOnFacebook();
                  }}
                  width={deviceType === "mobile" ? 20 : 15}
                  height={deviceType === "mobile" ? 20 : 15}
                  deviceType={deviceType}
                />

                <TouchableOpacity
                  onPress={() => {
                    shareLink();
                  }}
                  style={{
                    marginHorizontal: deviceType === "mobile" ? Wp(10) : Wp(5),
                  }}
                >
                  <IconLink
                    size={deviceType === "mobile" ? Wp(20) : Wp(15)}
                    color={colorWithOpacity("#000", 0.7)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.MarginTop,
              deviceType === "tablet" && styles.MarginTop_tablet,
            ]}
          >
            <Text
              style={[
                styles.descriptionStyles,
                deviceType === "tablet" && styles.descriptionStyles_tablet,
              ]}
            >
              {deviceType === "tablet" ? (
                decodeHTML(stripHTML(description!))
              ) : (
                <RenderHtml
                  source={{ html: description! }}
                  contentWidth={wp(90)}
                />
              )}
            </Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  safeAreaStyles_tablet: {
    width: "70%",
  },
  descriptionStyles_tablet: {
    fontSize: Wp(10),
  },
  ViewTestStyles_tablet: {
    fontSize: Wp(10),
    marginLeft: Wp(2.5),
  },

  TitleStyles_tablet: {
    fontSize: Wp(15),
    textAlign: "center",
  },
  SafeAreaStyles: {
    paddingHorizontal: Wp(20),
  },

  descriptionStyles: {
    fontFamily: Mulish(400),
    fontSize: Wp(14),
    color: "#000",
  },
  ViewsTextStyles: {
    fontFamily: Mulish(400),
    fontSize: Wp(14),
    marginLeft: Wp(5),
    color: colorWithOpacity("#000", 0.7),
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  SocialCont: {
    borderTopColor: "#E5E5E5",
    borderTopWidth: 1,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    paddingVertical: Wp(10),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  warpFlex: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  TitlesStyles: {
    fontFamily: Nunito(700),
    fontSize: Wp(20),
    color: NoteAppcolor.Primary,
  },
  MarginTop: {
    marginTop: Wp(10),
  },
  MarginTop_tablet: {
    marginTop: Wp(5),
  },
});

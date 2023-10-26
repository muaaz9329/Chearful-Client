import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Wp, hp, wp } from "@app/helper/CustomResponsive";
import { SvgUri } from "react-native-svg";
import { IconPlayerPlay } from "tabler-icons-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppColors } from "@app/constants/app-colors";
import YoutubeIframe from "react-native-youtube-iframe";
import Header from "@app/common/components/Header";
import { NavigationHelpers } from "@react-navigation/native";
import { ChevronLeft } from "@app/svgs/Index";
import { IconComponent } from "@app/types";
import AuthorCont from "@app/common/components/author-cont";
import { Mulish, Nunito } from "@app/helper/FontWeight";
import BottomSheet from "../../components/bottom-sheet";

import {
  DateConstrctor,
  decodeHTML,
  getYouTubeVideoId,
} from "@app/helper/customFunction";
import ContentService from "@app/services/content-services";
import LoadingScreen from "@app/common/Module/Loading-Screen/LoadingScreen";
import useSoundbitesDetail from "./hooks/use-soundbites-detail";
import { DeviceContext } from "../../../../context/Device-Type/DeviceTypeProvider";
import { isSvg } from "../components/helpers";
import SubDetail from "../../components/sub-detail";
import Detail from "../../components/detail";

type routeData = {
  params: {
    id: number;
  };
};

const SoundBitesDetail = ({
  navigation,
  route,
}: {
  navigation?: NavigationHelpers<any, any>;
  route?: routeData;
}) => {
  const [playing, setPlaying] = useState(false);
  const SheetRef = useRef<BottomSheetRef>(null);
  const { id } = route!.params;
  const [loading, setLoading] = useState<boolean>(false);
  const { data } = useSoundbitesDetail(id, setLoading);
  const { deviceType } = useContext(DeviceContext);
  console.log(data.author_name);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={styles.body}>
          <Header
            pram="back"
            navigation={navigation}
            Icon={ChevronLeft as IconComponent}
            headerType="New"
          />
          {playing ? (
            <View style={styles.YoutubeFrame}>
              <YoutubeIframe
                play={playing}
                videoId={getYouTubeVideoId(data?.video_link) as string}
                height={Wp(400)}
                width={wp(100)}
                onChangeState={(e) => {
                  if (e === "ended") {
                    setPlaying(false);
                  }
                }}
              />
            </View>
          ) : (
            
            <>
            <View style={{
            
             height:deviceType==='tablet'?hp(65):hp(60),
             alignItems:'center',
              justifyContent:'center',
              overflow:'hidden',
              marginTop:deviceType==='tablet'?Wp(8):Wp(10),
            }}>
              {isSvg(data?.image as string) ? (
               

                
                <SvgUri
                  width={wp(90)}
                  height={deviceType === "tablet" ? hp(60) : hp(55)}
                  uri={data?.image}
                  style={{
                    alignSelf: "center",
                    marginTop: deviceType === "tablet" ? Wp(10) : 0,
                    
                  }}
                />
               
              ) : (
                <Image
                  source={{ uri: data?.image }}
                  style={{
                    width: wp(100),
                    height: deviceType === "tablet" ? hp(60) : hp(55),
                    alignSelf: "center",
                    marginTop: deviceType === "tablet" ? Wp(10) : Wp(10),
                  }}
                />
              )}
              </View>
              <Pressable
                style={styles.PlayBtnStyles}
                onPress={() => {
                  setPlaying(true);
                }}
              >
                <IconPlayerPlay
                  size={Wp(20)}
                  fill="black"
                  color={AppColors.MenuText}
                />
              </Pressable>
            </>
          )}
          <SubDetail
            AuthorName={
              data.author_name
                ? data.author_name
                : `${data.author.first_name} ${data.author.last_name}`
            }
            date={data.created_at}
            description={data.excerpt}
            deviceType={deviceType}
            title={data.title}
            openBottomSheet={() => SheetRef.current?.OpenDetail()}
            authorImg={data.author.avatar as string}
          />
          <BottomSheet ref={SheetRef}>
            <Detail
              AuthorName={
                data.author_name ? data.author_name : `chearful Admin`
              }
              date={data.created_at}
              title={data.title}
              description={data.description}
              categories={data.categories}
              views={data.views}
              link={data.webpage}
              authorImg={data.author.avatar as string}
            />
          </BottomSheet>
        </SafeAreaView>
      )}
    </>
  );
};

export default SoundBitesDetail;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    paddingHorizontal: Wp(20),
    paddingVertical: Wp(16),
  },
  PlayBtnStyles: {
    position: "absolute",
    zIndex: 10,
    justifyContent: "center",
    bottom: "60%",
    alignSelf: "center",
    padding: Wp(10),
    backgroundColor: "#E3E3E3",
    borderRadius: Wp(50),
  },
  marginTop_Tablet: {
    marginTop: Wp(6),
  },
  YoutubeFrame: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
  },
});

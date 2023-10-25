import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import Toast from "react-native-toast-message";
import { serializeMedia } from "../../../adapters/thirty-x-thirty";

type Props = {};

const useUploadImage = (type: "image" | "video" | "text" | "challenge_accepted") => {
  const [data, setData] = useState<{
    base64String: string;
    type?: "image" | "video" | "text";
  }>();
  const [singleFile, setSingleFile] = useState<{
    uri: string;
    name: string;
    type: string;
  }>({
    name: "",
    type: "",
    uri: "",
  });
  const uploadMedia = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: type === "image" ? "photo" : "video",
      });
      const obj = {
        // @ts-ignore
        uri: res.assets[0].uri,
        // @ts-ignore
        name: res.assets[0].fileName,
        // @ts-ignore
        type: res.assets[0].type,
      };
      // @ts-ignore
      //if file size is greater than 4mb
      if (type === "image" && res.assets[0].fileSize > 2000000) {
        Toast.show({
          type: "WarningToast",
          text1: `You have selected a ${type} greater than 2mb`,
        });
        return;
      }
      // @ts-ignore
      else if (type === "video" && res.assets[0].fileSize > 4000000) {
        Toast.show({
          type: "WarningToast",
          text1: `You have selected a ${type} greater than 4mb`,
        });
        return;
      } else {
        // @ts-ignore
        setSingleFile(obj);
      }
    } catch (err) {
      Toast.show({
        type: "WarningToast",
        text1: `You have not selected any ${"photo"}`,
        text2: "Error Code : Pr-02",
      });
    }
  };

  useEffect(() => {
    if (singleFile.uri) {
     
      serializeMedia(singleFile.uri).then((base64Media) => {
        setData({
          base64String: String(`data:${singleFile.type};base64,${base64Media}`),
          type: type as "image" | "video" | "text"
        });
      });
    }
  }, [singleFile]);

  return {
    uploadMedia,
    data,
    singleFile,
  };
};

export default useUploadImage;

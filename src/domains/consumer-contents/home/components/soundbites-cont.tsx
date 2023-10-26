import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SoundbitesCard } from "@app/common/components/Cards";
import { SafeAreaView } from "react-native-safe-area-context";
import ContentService from "@app/services/content-services";
import { ScrollView } from "react-native-gesture-handler";

type Props = {};

const SoundbitesCont = ({ setLoading }: { setLoading: any }) => {
  const [soundbites, setSoundbites] = useState<ISoundBitesDetail[]>([]);
  useEffect(() => {
    ContentService.getSoundBites({
      onSuccess: (res) => {
        setSoundbites(res.data.soundbites);
      },
      onFailure: (err) => {
        console.log(err);
      },
      data: [
        {
          key: "page",
          value: 1,
        },
        {
          key: "limit",
          value: 5,
        },
      ],
    });
  }, []);

  return (
  
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {soundbites.map((item, index) => (
          <SoundbitesCard key={index} data={item} style="Home Design" />
        ))}
      </ScrollView>
  
  );
};

export default SoundbitesCont;

const styles = StyleSheet.create({});

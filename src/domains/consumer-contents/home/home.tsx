import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "@app/assets/styles/global-styles";
import { ChearfulLogo } from "@app/svgs/Index";
import { AppColors as NoteAppcolor } from "@app/constants/app-colors";
import { Wp } from "@app/helper/CustomResponsive";
import MenuTitle from "./components/menu-title";
import SoundbitesCont from "./components/soundbites-cont";
import ArticleCont from "./components/article-cont";
import HomeForumCont from "./components/forum-cont";
import { NavigationHelpers } from "@react-navigation/native";
import LearnAndGrowCont from "./components/learn-grow-cont";
import { IconUserCircle } from "tabler-icons-react-native";
import ProfileModel from "@app/common/Models/profile-model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThirtyXThirtyModel from "./components/thirty-x-thirty";
import useAppState from "@app/hooks/use-app-state";
import ThirtyXThirtyCont from "./components/thirty-x-thirty-cont";

const Home = ({ navigation }: { navigation: NavigationHelpers<any, any> }) => {
  const [visible, setVisible] = React.useState(false);
  const { isUserLoggedIn } = useAppState();

  const handleUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      navigation.navigate(
        "THIRTY-X-THIRTY-MODULE"
        // From here the user will be redirected if he/she is logged in

        // , {
        //   screen: "CHALLENGE-HOME",
        // }
      );
    } else {
      // From here the user will be redirected to login or sign up if he/she is not logged in

      setVisible(true);
    }
  };
  const [thirtyModel, setThirtyModel] = useState<boolean>(false);

  useEffect(() => {
    if (!isUserLoggedIn) {
      setVisible(true);
    }
  }, []);
  return (
    <SafeAreaView style={[globalStyles.bodyWrapper]} edges={["top"]}>
      <ThirtyXThirtyModel
        visible={thirtyModel}
        setVisible={setThirtyModel}
        navigation={navigation}
      />
      <ProfileModel
        visible={visible}
        setVisible={setVisible}
        navigation={navigation}
      />
      <View style={styles.cont}>
        <ChearfulLogo color={NoteAppcolor.Primary} width={110} height={50} />
        <Pressable onPress={handleUser}>
          <IconUserCircle color={NoteAppcolor.Primary} size={Wp(30)} />
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.flex1}
      >
        <View style={globalStyles.topMargin}>
          <ThirtyXThirtyCont/>

        </View>
        <View style={globalStyles.topMargin}>
          <MenuTitle path="sound-bites">Soundbites</MenuTitle>
          <View
            style={{
              marginTop: Wp(10),
            }}
          >
            <SoundbitesCont setLoading={null} />
          </View>
        </View>
        <View style={globalStyles.topMargin}>
          <MenuTitle path="article">Articles</MenuTitle>
          <View
            style={{
              marginTop: Wp(10),
            }}
          >
            <ArticleCont setLoading={null} />
          </View>
        </View>
        <View style={globalStyles.topMargin}>
          <MenuTitle path="LEARN-GROW">Learn & Grow </MenuTitle>

          <View
            style={{
              marginTop: Wp(10),
            }}
          >
            <LearnAndGrowCont setLoading={null} />
          </View>
        </View>

        <View style={globalStyles.topMargin}>
          <MenuTitle path="FORUM">Forum</MenuTitle>
          <View>
            <HomeForumCont {...{ navigation }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

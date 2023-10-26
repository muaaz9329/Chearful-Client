import { FlatList, Pressable, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@app/common/components/Inputs/search-input";
import Header from "@app/common/components/Header";
import { ChevronLeft } from "@app/svgs/Index";
import { NavigationHelpers } from "@react-navigation/native";
import { IconComponent } from "@app/types";
import { Wp } from "@app/helper/CustomResponsive";
import { AppColors } from "@app/constants/app-colors";
import { SoundbitesCard } from "@app/common/components/Cards";
import NoSoundBites from "./components/no-sound-bites";
import LoadingScreen from "@app/common/Module/Loading-Screen/LoadingScreen";
import Loader from "../../../../common/components/loader";
import TitleText from "../../components/title-text";
import CategoryFilter from "@app/common/components/category-filter";
import { DeviceContext } from "@app/context/Device-Type/DeviceTypeProvider";
import FooterComponent from "../../components/footer";
import useListing from "../../hooks/use-listing";
import HirePrac from "../../components/hire-prac";

const SoundBiteListing = ({
  navigation,
}: {
  navigation?: NavigationHelpers<any, any>;
}) => {
  const [loading, setLoading] = useState<ListingAndDetailLoadingType>({
    categories: true,
    listing: true,
    nextBatch: false,
    hidingNextBtn: false,
  }); // for showing loader on listing screen and conditionally hiding load more button
  const {
    data,
    setSearchTitle,
    categories,
    setSelectedCategory,
    onSubmitTitleSearch,
    LoadNextBatch,
  } = useListing(setLoading,'getSoundBites','soundbites' , 'soundbite');

  const { deviceType } = useContext(DeviceContext);

  return (
    <>
      {loading.categories && loading.listing ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={styles.body} edges={["top"]}>
          <Header
            Icon={ChevronLeft as IconComponent}
            pram="back"
            navigation={navigation}
            headerType="New"
          >
            <View>
              <TitleText>Soundbites</TitleText>
            </View>
          </Header>
          <View style={styles.TopMargin}>
            <SearchInput
              placeholder="Search Soundbites"
              onChangeText={(text) => {
                setSearchTitle(text);
              }}
              onSubmitEvent={onSubmitTitleSearch}
            />
          </View>
          <View style={styles.TopMargin}>
            <CategoryFilter
              onChangeTag={setSelectedCategory}
              tags={categories}
              showImg={false}
            />
          </View>
          {
            /* loading will appear as soon as new category is selected or new title is searched */
            loading?.listing ? (
              <Loader size="small" style={styles.TopMargin} />
            ) : // @ts-ignore
            data?.length > 0 ? (
              <>
                <FlatList
                  style={styles.TopMargin}
                  data={data}
                  contentContainerStyle={[
                    deviceType === "tablet" && { alignItems: "center" },
                    {
                      paddingBottom: Wp(70),
                    }
                  ]}
                  renderItem={({ item }) => <SoundbitesCard data={item} />}
                  keyExtractor={(item) => item.id}
                  ListFooterComponent={() => {
                    return FooterComponent(loading, LoadNextBatch, deviceType);
                  }}
                  showsVerticalScrollIndicator={false}
                />
              </>
            ) : (
              <NoSoundBites />
            )
          }
          <HirePrac/>
        </SafeAreaView>
      )}
    </>
  );
};

export default SoundBiteListing;

const styles = StyleSheet.create({
  smallLoader: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: Wp(20),
  },
  body: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: Wp(20),
    paddingVertical: Wp(16),
  },

  TopMargin: {
    marginTop: Wp(15),
  },
});

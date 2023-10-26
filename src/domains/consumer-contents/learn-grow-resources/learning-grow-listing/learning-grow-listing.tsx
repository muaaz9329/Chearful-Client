import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import LearnAndGrowCard from "../components/learn-grow-card";
import { SafeAreaView } from "react-native-safe-area-context";
import useListing from "../../hooks/use-listing";
import globalStyles from "@app/assets/styles/global-styles";
import { useNavigation } from "@react-navigation/native";
import Header from "@app/common/components/Header";
import { ChevronLeft } from "@app/svgs/Index";
import { IconComponent } from "@app/types";
import TitleText from "../../components/title-text";
import SearchInput from "@app/common/components/Inputs/search-input";
import HirePrac from "../../components/hire-prac";
import FooterComponent from "../../components/footer";
import { Wp } from "@app/helper/CustomResponsive";
import Loader from "@app/common/components/loader";
import { DeviceContext } from "@app/context/Device-Type/DeviceTypeProvider";
import LoadingScreen from "@app/common/Module/Loading-Screen/LoadingScreen";

type Props = {};

const LearnAndGrowListing = (props: Props) => {
  const [loading, setloading] = useState<ListingAndDetailLoadingType>({
    categories: true,
    listing: true,
    nextBatch: false,
    hidingNextBtn: false,
  });
  const navigation = useNavigation();
  const { deviceType } = useContext(DeviceContext);
  const {
    LoadNextBatch,
    // categories,
    data,
    onSubmitTitleSearch,
    setSearchTitle,
    // setSelectedCategory,
  } = useListing(setloading, "getResources", "ailments", "all");

  return (
    <>
      {loading.categories && loading.listing ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={globalStyles.bodyWrapper}>
          <Header
            Icon={ChevronLeft as IconComponent}
            navigation={navigation}
            pram="back"
            headerType="New"
          >
            <TitleText>Learn & Grow</TitleText>
          </Header>
          <View style={globalStyles.topMargin}>
            <SearchInput
              placeholder="Search Articles"
              onChangeText={setSearchTitle}
              onSubmitEvent={onSubmitTitleSearch}
            />
          </View>

          {loading?.listing ? (
            <Loader size="small" style={globalStyles.topMargin} />
          ) : (
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <LearnAndGrowCard data={item} navigation={navigation} />
              )}
              style={[globalStyles.topMargin]}
              contentContainerStyle={[
                {
                  paddingBottom: Wp(70),
                },
              ]}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => {
                return FooterComponent(loading, LoadNextBatch, deviceType);
              }}
            />
          )}
          <HirePrac />
        </SafeAreaView>
      )}
    </>
  );
};

export default LearnAndGrowListing;
const styles = StyleSheet.create({});

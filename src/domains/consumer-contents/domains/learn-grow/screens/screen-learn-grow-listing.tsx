import { FlatList, View } from 'react-native';
import React, { useState } from 'react';
import LearnAndGrowCard from '../components/learn-grow-card';
import { SafeAreaView } from 'react-native-safe-area-context';
import useListing from '../../../hooks/use-listing';
import { useNavigation } from '@react-navigation/native';
import TitleText from '../../../components/title-text';
import HirePrac from '../../../components/hire-prac';
import FooterComponent from '../../../components/footer';
import { ListingAndDetailLoadingType } from '../../../types';
import LoadingScreen from '@app/modules/loading-screen';
import globalStyles from '@app/assets/global-styles';
import { Header, Loader, SearchInput } from '@app/components';
import { Wp } from '@app/utils';

const LearnAndGrowListing = () => {
  const [loading, setloading] = useState<ListingAndDetailLoadingType>({
    categories: true,
    listing: true,
    nextBatch: false,
    hidingNextBtn: false,
  });
  const navigation = useNavigation();
  const {
    LoadNextBatch,
    // categories,
    data,
    onSubmitTitleSearch,
    setSearchTitle,
    // setSelectedCategory,
  } = useListing(setloading, 'getResources', 'ailments', 'all');

  return (
    <>
      {loading.categories && loading.listing ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={globalStyles.bodyWrapper}>
          <Header navigation={navigation} pram="back" headerType="New">
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
                return FooterComponent(loading, LoadNextBatch);
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

import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHelpers } from '@react-navigation/native';
import { ListingAndDetailLoadingType } from '@app/domains/consumer-contents/types';
import useListing from '@app/domains/consumer-contents/hooks/use-listing';
import LoadingScreen from '@app/modules/loading-screen';
import { CategoryFilter, Header, Loader, SearchInput } from '@app/components';
import TitleText from '@app/domains/consumer-contents/components/title-text';
import { IsTablet, Wp } from '@app/utils';
import FooterComponent from '@app/domains/consumer-contents/components/footer';
import NoSoundBites from '../components/no-sound-bites';
import HirePrac from '@app/domains/consumer-contents/components/hire-prac';
import SoundBitesCard from '../components/sound-bite-card';

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
  } = useListing(setLoading, 'getSoundBites', 'soundbites', 'soundbite');

  return (
    <>
      {loading.categories && loading.listing ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={styles.body} edges={['top']}>
          <Header pram="back" navigation={navigation} headerType="New">
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
                    IsTablet && { alignItems: 'center' },
                    {
                      paddingBottom: Wp(70),
                    },
                  ]}
                  renderItem={({ item }) => <SoundBitesCard data={item} />}
                  keyExtractor={(item) => item.id}
                  ListFooterComponent={() => {
                    return FooterComponent(loading, LoadNextBatch);
                  }}
                  showsVerticalScrollIndicator={false}
                />
              </>
            ) : (
              <NoSoundBites />
            )
          }
          <HirePrac />
        </SafeAreaView>
      )}
    </>
  );
};

export default SoundBiteListing;

const styles = StyleSheet.create({
  smallLoader: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: Wp(20),
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: Wp(20),
    paddingVertical: Wp(16),
  },

  TopMargin: {
    marginTop: Wp(15),
  },
});

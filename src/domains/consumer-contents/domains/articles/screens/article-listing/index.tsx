import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TitleText from '../../../../components/title-text';
import FooterComponent from '../../../../components/footer';
import useListing from '../../../../hooks/use-listing';
import NoArticle from './components/no-article';
import HirePrac from '../../../../components/hire-prac';
import LoadingScreen from '@app/modules/loading-screen';
import globalStyles from '@app/assets/global-styles';
import { CategoryFilter, Header, Loader, SearchInput } from '@app/components';
import ArticleCard from '../../components/article-card';
import { Wp } from '@app/utils';
import { ListingAndDetailLoadingType } from '@app/domains/consumer-contents/types';

const ArticleListing = () => {
  const [loading, setLoading] = useState<ListingAndDetailLoadingType>({
    categories: true,
    listing: true,
    nextBatch: false,
    hidingNextBtn: false,
  });

  const {
    LoadNextBatch,
    categories,
    data,
    onSubmitTitleSearch,
    setSearchTitle,
    setSelectedCategory,
  } = useListing(setLoading, 'getArticles', 'articles', 'article');

  return (
    <>
      {loading.categories && loading.listing ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={globalStyles.bodyWrapper}>
          <Header pram="back" headerType="New">
            <View>
              <TitleText>Articles</TitleText>
            </View>
          </Header>

          <View style={globalStyles.topMargin}>
            <SearchInput
              placeholder="Search Articles"
              onChangeText={setSearchTitle}
              onSubmitEvent={onSubmitTitleSearch}
            />
          </View>

          <View style={globalStyles.topMargin}>
            <CategoryFilter
              tags={categories}
              onChangeTag={setSelectedCategory}
              showImg={true}
            />
          </View>

          {loading?.listing ? (
            <Loader size="small" style={globalStyles.topMargin} />
          ) : data!.length > 0 ? (
            <FlatList
              data={data}
              renderItem={({ item, index }) => <ArticleCard Data={item} />}
              style={[styles.MarginTop]}
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
          ) : (
            <NoArticle />
          )}
          <HirePrac />
        </SafeAreaView>
      )}
    </>
  );
};

export default ArticleListing;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: Wp(20),
    paddingVertical: Wp(16),
  },
  MarginTop: {
    marginTop: Wp(15),
  },
});

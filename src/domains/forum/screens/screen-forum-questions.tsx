/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import useBatchLoaderHelpers from '@app/hooks/use-batch-loader-helpers';
import { Category } from '@app/types';
import { NavigationHelpers } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import useForumStore from '../hooks/use-forum-store';
import ForumService from '../forum-service';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { Mulish, Wp } from '@app/utils';
import globalStyles from '@app/assets/global-styles';
import Loader from '@app/components/loader';
import ForumQuestionsList from '../components/forum-questions-list';
import ListNextBatchFooter from '@app/components/list-next-batch-footer';
import { Colors } from '@app/constants';
import SearchInput from '@app/components/search-input';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CategoryFilter from '@app/components/category-filter';
import { ForumNavigator } from '../navigation/forum-navigation-stack';

export default function ForumQuestionsScreen({
  navigation,
}: {
  navigation: NavigationHelpers<any, any>;
}) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  /*
  In the next batch loader, we want to merge the next batch of questions with the old one.
  For that we can pass an optional options object to setForumQuestions with a merge flag and next batch
  as the service provides us the next batch of questions.
  We want to be able to only allow merging in the batch loader call and not in other calls like search and category change.
  */
  const {
    page,
    trigger,
    triggerer,
    mergeNextBatch,
    makingNewCall,
    makingBatchCall,
    batchLoadState,
    callSuccess,
    callFailure,
  } = useBatchLoaderHelpers();

  const {
    forumQuestions,
    setForumQuestions,
    questionsCategories,
    setQuestionsCategories,
  } = useForumStore();

  // Our main player
  const getQuestions = () =>
    ForumService.getQuestions({
      page,
      search: searchText,
      category: selectedCategory?.slug,
      onSuccess: ({ data }) => {
        callSuccess();

        setForumQuestions(
          {
            state: 'loaded',
            totalPages: data.totalPages,
            data: data.questions,
          },
          {
            merge: mergeNextBatch,
          },
        );
      },
      onFailure: ({ message }) => {
        callFailure();

        setForumQuestions({
          state: 'erred',
        });
      },
    });

  //TODO:
  const retryFetch = () => {
    setForumQuestions({ state: 'loading' });
    getQuestions();
  };

  useEffect(() => {
    // Fetching categories if not already fetched
    questionsCategories.state === 'loaded' ||
      ForumService.getCategories({
        onSuccess: ({ data }) =>
          setQuestionsCategories({
            state: 'loaded',
            data,
          }),
        onFailure: ({ message }) =>
          setQuestionsCategories({
            state: 'erred',
          }),
      });
  }, []);

  useEffect(() => {
    getQuestions();
  }, [triggerer]);

  return (
    <SafeAreaView style={globalStyles.bodyWrapper}>
      {/* <Header headerType="New" pram="back" navigation={navigation}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={styles.title}>Forum</Text>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.Primary,
              paddingHorizontal: deviceType == 'tablet' ? Wp(8) : Wp(12),
              borderRadius: deviceType == 'tablet' ? Wp(8) : Wp(10),
              paddingVertical: deviceType == 'mobile' ? Wp(14) : Wp(8),
            }}
            onPress={() => {
              LinkingText('https://chearful.com/community');
            }}
          >
            <Text
              style={{
                color: Colors.White,

                fontFamily: Mulish(700),
                fontSize: deviceType == 'tablet' ? Wp(10) : Wp(16),
              }}
            >
              Ask a Question
            </Text>
          </Pressable>
        </View>
      </Header> */}

      {/* Search Component */}
      <View style={styles.searchBox}>
        <SearchInput
          placeholder="Search Forum"
          onSubmitEvent={() => {
            // Resetting page to 1 and fetching questions on search because
            // search is not a filter, it is a new query
            makingNewCall();
            setForumQuestions({ state: 'loading' });
            trigger();
          }}
          onChangeText={(text: string) => {
            setSearchText(text);
          }}
        />
      </View>

      <View style={styles.sectionTopMargin}>
        {questionsCategories.state === 'loading' ? (
          <Loader />
        ) : (
          questionsCategories.state === 'loaded' && (
            <Animated.View entering={FadeInDown.duration(1000).springify()}>
              <CategoryFilter
                onChangeTag={(cat) => {
                  // Resetting page to 1 and fetching questions on category change because
                  // category is not a filter, it is a new query
                  makingNewCall();
                  setSelectedCategory(cat);
                  setForumQuestions({ state: 'loading' });
                  trigger();
                }}
                tags={[
                  {
                    id: 0,
                    title: 'All',
                    slug: '',
                  },
                  ...questionsCategories.data,
                ]}
              />
            </Animated.View>
          )
        )}
      </View>

      <View style={[styles.sectionTopMargin, globalStyles.flex1]}>
        <ForumQuestionsList
          state={forumQuestions.state}
          data={forumQuestions.data}
          onRetry={retryFetch}
          onQuestionPress={(item) => {
            navigation.navigate(ForumNavigator.ScreenAnswer, {
              question: item,
            });
            // navigation?.navigate('content-stack', {
            //   screen: 'FORUM',
            //   params: {
            //     screen: 'FORUM-ANSWER',
            //     params: {
            //       question: item,
            //     },
            //   }, // Pass the id as a parameter
            // });
          }}
          listProps={{
            ListFooterComponent: (
              // Showing next batch footer only if there are more pages to load
              <ListNextBatchFooter
                totalPages={forumQuestions.totalPages}
                currentPage={page}
                status={batchLoadState}
                onLoadNextBatch={() => {
                  makingBatchCall();
                  trigger();
                }}
              />
            ),
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: Wp(20),
    paddingVertical: Wp(16),
  },
  title: {
    fontSize: Wp(20),
    fontFamily: Mulish(700),
    color: Colors.primary,
  },

  searchBox: {
    marginTop: Wp(15),
  },
  sectionTopMargin: {
    marginTop: Wp(20),
  },
});

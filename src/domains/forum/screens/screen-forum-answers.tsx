/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import useBatchLoaderHelpers from '@app/hooks/use-batch-loader-helpers';
import { RequestState } from '@app/services/api-service';
import { NavigationHelpers } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import ForumService from '../forum-service';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Text, View } from 'react-native';
import globalStyles from '@app/assets/global-styles';
import ListNextBatchFooter from '@app/components/list-next-batch-footer';
import ForumAnswer from '../components/forum-answer';
import { IsTablet } from '@app/utils';
import QuestionMetaData from '../components/question-metadata';
import Loader from '@app/components/loader';
import ErrorRetry from '@app/components/error-retry';
import type { ForumAnswer as ForumAnswerT } from '../types';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function ForumAnswersScreen({
  route,
}: {
  navigation: NavigationHelpers<any, any>;
  route: any;
}) {
  const { question } = route.params;

  const [{ state, data }, setViewState] = useState<{
    state: RequestState;
    data: {
      answers: ForumAnswerT[];
      total_pages: number;
    };
  }>({
    state: 'loading',
    data: {
      answers: [],
      total_pages: 0,
    },
  });

  const {
    page,
    makingBatchCall,
    trigger,
    triggerer,
    mergeNextBatch,
    batchLoadState,
    callSuccess,
    callFailure,
  } = useBatchLoaderHelpers();

  const getAnswers = () => {
    ForumService.getAnswers({
      questionId: question.id,
      page,
      onSuccess: ({ data: resData }) => {
        callSuccess();
        // If needs to merge, then merge

        setViewState({
          state: 'loaded',
          data: {
            total_pages: resData.total_pages,
            answers: mergeNextBatch
              ? [...data.answers, ...resData.answers]
              : resData.answers,
          },
        });
      },
      onFailure: () => {
        callFailure();
        setViewState({ state: 'erred', data: data });
      },
    });
  };

  useEffect(() => {
    question.noOfAnswers > 0 && getAnswers();
  }, [triggerer]);

  return (
    <SafeAreaView style={globalStyles.bodyWrapper}>
      {/* <Header pram="back" headerType="New" navigation={navigation}>
        <View>
          <TitleText>Answer</TitleText>
        </View>
      </Header> */}

      <View style={globalStyles.mt_18}>
        <Text
          style={[
            globalStyles.fs_20,
            globalStyles.textPrimary,
            globalStyles.mulish_700,
            IsTablet && globalStyles.fs_14,
          ]}
        >
          {question.questionTitle}
        </Text>

        <View style={globalStyles.my_10}>
          <QuestionMetaData question={question} color="muted" />
        </View>
      </View>

      <View style={[globalStyles.my_20, globalStyles.flex1]}>
        {question.noOfAnswers === 0 ||
        (state === 'loaded' && data.answers.length === 0) ? (
          <Text
            style={[
              globalStyles.textCenter,
              globalStyles.fs_14,
              IsTablet && globalStyles.fs_10,
            ]}
          >
            No answers yet
          </Text>
        ) : state === 'loading' ? (
          <Loader />
        ) : state === 'erred' ? (
          <ErrorRetry onRetry={() => {}} />
        ) : (
          state === 'loaded' &&
          data.answers.length > 0 && (
            <Animated.FlatList
              entering={FadeInDown.delay(200).springify()}
              data={data.answers}
              renderItem={({ item }) => (
                <View style={globalStyles.mb_20}>
                  <ForumAnswer {...item} />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              ListFooterComponent={
                <ListNextBatchFooter
                  currentPage={page}
                  totalPages={data.total_pages}
                  status={batchLoadState}
                  onLoadNextBatch={() => {
                    makingBatchCall();
                    trigger();
                  }}
                />
              }
            />
          )
        )}
      </View>
    </SafeAreaView>
  );
}

import React from 'react';
import { RequestState } from '@app/services/api-service';
import { AdaptedForumQuestion } from '../types';
import { FlatListProps, Text } from 'react-native';
import ForumQuestion, { ForumQuestionProps } from './forum-question';
import globalStyles from '@app/assets/global-styles';
import { IsTablet } from '@app/utils';
import ErrorRetry from '@app/components/error-retry';
import Loader from '@app/components/loader';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ForumQuestionsList({
  state,
  data,
  listProps,
  itemProps,
  onRetry,
  onQuestionPress,
}: {
  state: RequestState;
  data: AdaptedForumQuestion[];
  listProps?: Omit<FlatListProps<any>, 'data' | 'renderItem'>;
  itemProps?: Partial<ForumQuestionProps>;
  onRetry?: () => void;
  onQuestionPress: (question: AdaptedForumQuestion) => void;
}) {
  return state === 'erred' ? (
    <ErrorRetry onRetry={() => onRetry?.()} />
  ) : state === 'loading' ? (
    <Loader />
  ) : data.length === 0 ? (
    <Text style={globalStyles.textCenter}>No Results Found</Text>
  ) : (
    <Animated.FlatList
      entering={FadeInDown.delay(200).springify()}
      {...listProps}
      data={data}
      keyExtractor={(item) => `${item.id} ${item.slug}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[IsTablet && { alignItems: 'center' }]}
      renderItem={({ item }) => (
        <ForumQuestion
          {...itemProps}
          question={item}
          onPress={() => onQuestionPress?.(item)}
        />
      )}
    />
  );
}

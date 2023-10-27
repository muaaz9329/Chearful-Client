import ForumQuestionsList from '@app/domains/forum/components/forum-questions-list';
import ForumService from '@app/domains/forum/forum-service';
import { AdaptedForumQuestion } from '@app/domains/forum/types';
import { RequestState } from '@app/services/api-service';
import { Wp, wp } from '@app/utils';
import { NavigationHelpers } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const HomeForumCont = ({
  navigation,
}: {
  navigation: NavigationHelpers<any, any>;
}) => {
  const [{ state, data }, setState] = useState({
    state: 'loading' as RequestState,
    data: [] as AdaptedForumQuestion[],
  });

  const getData = () =>
    ForumService.getQuestions({
      limit: 5,
      onSuccess: ({ data }) => {
        setState({
          state: 'loaded',
          data: data.questions,
        });
      },
      onFailure: (err) => {
        setState({
          state: 'erred',
          data: [],
        });
      },
    });

  useEffect(() => {
    getData();
  }, []);

  return (
    <ForumQuestionsList
      state={state}
      data={data}
      onRetry={() => {
        setState({
          state: 'loading',
          data: [],
        });
        getData();
      }}
      itemProps={{
        style: { width: wp(55) },
        variant: 'home-preview',
      }}
      listProps={{
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        ItemSeparatorComponent: () => <View style={{ width: Wp(10) }} />,
      }}
      onQuestionPress={(question) => {
        navigation?.navigate('content-stack', {
          screen: 'FORUM',
          params: {
            screen: 'FORUM-ANSWER',
            params: {
              question: question,
            },
          }, // Pass the id as a parameter
        });
      }}
    />
  );
};

export default HomeForumCont;

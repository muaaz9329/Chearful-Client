import { XGap } from '@app/components';
import ForumQuestionsList from '@app/domains/consumer-contents/domains/forum/components/forum-questions-list';
import ForumService from '@app/domains/consumer-contents/domains/forum/forum-service';
import { AdaptedForumQuestion } from '@app/domains/consumer-contents/domains/forum/types';
import { AppNavigator } from '@app/navigation';
import { RequestState } from '@app/services/api-service';
import { wp } from '@app/utils';
import { NavigationHelpers } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ConsumerContentsNavigator } from '../../../navigation/consumer-contents-navigation';
import { ForumNavigator } from '../../forum';

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

  const gapper = () => <XGap />;

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
        ItemSeparatorComponent: gapper,
      }}
      onQuestionPress={(question) => {
        navigation?.navigate(AppNavigator.ConsumerContents, {
          screen: ConsumerContentsNavigator.Forum,
          params: {
            screen: ForumNavigator.ScreenAnswer,
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

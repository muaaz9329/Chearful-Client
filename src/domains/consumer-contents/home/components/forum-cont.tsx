import ErrorRetry from "@app/common/components/error-retry";
import Loader from "@app/common/components/loader";
import { Wp, wp } from "@app/helper/CustomResponsive";
import ForumQuestion from "@app/screens/forum/components/forum-question";
import ForumQuestionsList from "@app/screens/forum/components/forum-questions-list";
import ForumService from "@app/screens/forum/forum-service";
import ForumQuestionsScreen from "@app/screens/forum/screens/screen-forum-questions";
import { AdaptedForumQuestion } from "@app/screens/forum/types";
import { RequestState } from "@app/services/api-service";
import { NavigationHelpers, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

const HomeForumCont = ({
  navigation,
}: {
  navigation: NavigationHelpers<any, any>;
}) => {
  const [{ state, data }, setState] = useState({
    state: "loading" as RequestState,
    data: [] as AdaptedForumQuestion[],
  });

  const getData = () =>
    ForumService.getQuestions({
      limit: 5,
      onSuccess: ({ data }) => {
        setState({
          state: "loaded",
          data: data.questions,
        });
      },
      onFailure: (err) => {
        setState({
          state: "erred",
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
          state: "loading",
          data: [],
        });
        getData();
      }}
      itemProps={{
        style: { width: wp(55) },
        variant: "home-preview",
      }}
      listProps={{
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        ItemSeparatorComponent: () => <View style={{ width: Wp(10) }} />,
      }}
      onQuestionPress={(question) => {
        navigation?.navigate("content-stack", {
          screen: "FORUM",
          params: { screen:'FORUM-ANSWER' , params:{
            question: question,
          } }, // Pass the id as a parameter
        });
      }}
    />
  );
};

export default HomeForumCont;

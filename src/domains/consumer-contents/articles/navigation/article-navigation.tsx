import { createStackNavigator } from '@react-navigation/stack';
import ScreenArticleListing from '../screens/article-listing';
import ScreenArticleDetail from '../screens/article-detail';

export const enum ContentArticlesNavigator {
  ArticlesListing = 'ArticlesListing',
  ArticleDetail = 'ArticleDetail',
}

const ContentArticlesNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={ContentArticlesNavigator.ArticlesListing}
        component={ScreenArticleListing}
      />
      <Stack.Screen
        name={ContentArticlesNavigator.ArticleDetail}
        component={ScreenArticleDetail}
      />
    </Stack.Navigator>
  );
};

export default ContentArticlesNavigation;

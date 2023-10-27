import { createStackNavigator } from '@react-navigation/stack';
import ContentArticlesNavigation from '../domains/articles/navigation/article-navigation';
import ContentForumNavigation from '../domains/forum/navigation/forum-navigation';

export const enum ConsumerContentsNavigator {
  Articles = 'Articles',
  SoundBites = 'SoundBites',
  LearnAndGrow = 'LearnAndGrow',
  Forum = 'Forum',
}

export default function ConsumerContentsNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={ConsumerContentsNavigator.Articles}
        component={ContentArticlesNavigation}
      />
      {/* <Stack.Screen
        name={ConsumerContentsNavigator.SoundBites}
        component={ContentSoundBitesNavigation}
      /> */}
      {/* <Stack.Screen
        name={ConsumerContentsNavigator.LearnAndGrow}
        component={ContentLearnAndGrowNavigation}
      /> */}
      <Stack.Screen
        name={ConsumerContentsNavigator.Forum}
        component={ContentForumNavigation}
      />
    </Stack.Navigator>
  );
}

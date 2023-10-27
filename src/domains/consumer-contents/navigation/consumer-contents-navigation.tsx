import { createStackNavigator } from '@react-navigation/stack';
import ContentArticlesNavigation from '../domains/articles/navigation/article-navigation';
import ContentForumNavigation from '../domains/forum/navigation/forum-navigation';
import ContentLearnGrowNavigation from '../domains/learn-grow/navigation/learn-grow-navigation';
import ContentSoundbitesNavigation from '../domains/sound-bites/navigation/soundbites-navigation-stack';

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
      <Stack.Screen
        name={ConsumerContentsNavigator.SoundBites}
        component={ContentSoundbitesNavigation}
      />
      <Stack.Screen
        name={ConsumerContentsNavigator.LearnAndGrow}
        component={ContentLearnGrowNavigation}
      />
      <Stack.Screen
        name={ConsumerContentsNavigator.Forum}
        component={ContentForumNavigation}
      />
    </Stack.Navigator>
  );
}

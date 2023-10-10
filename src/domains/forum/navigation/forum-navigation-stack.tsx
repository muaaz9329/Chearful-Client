import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ForumQuestionsScreen from '../screens/screen-forum-questions';
import ForumAnswersScreen from '../screens/screen-forum-answers';
import ForumInquiry from '../screens/screen-forum-inquiry';

export default function ForumNavigationStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ForumQuestions"
    >
      <Stack.Screen name="ForumQuestions" component={ForumQuestionsScreen} />
      <Stack.Screen name="ForumAnswer" component={ForumAnswersScreen} />
      <Stack.Screen name="ForumInquiry" component={ForumInquiry} />
    </Stack.Navigator>
  );
}

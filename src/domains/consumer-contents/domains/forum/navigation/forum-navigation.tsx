import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ForumQuestionsScreen from '../screens/screen-forum-questions';
import ForumAnswersScreen from '../screens/screen-forum-answers';
import ForumInquiry from '../screens/screen-forum-inquiry';

export const enum ForumNavigator {
  ScreenQuestions = 'ForumQuestions',
  ScreenAnswer = 'ForumAnswer',
  ScreenInquiry = 'ForumInquiry',
}

export default function ForumNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ForumNavigator.ScreenQuestions}
    >
      <Stack.Screen
        name={ForumNavigator.ScreenQuestions}
        component={ForumQuestionsScreen}
      />
      <Stack.Screen
        name={ForumNavigator.ScreenAnswer}
        component={ForumAnswersScreen}
      />
      <Stack.Screen
        name={ForumNavigator.ScreenInquiry}
        component={ForumInquiry}
      />
    </Stack.Navigator>
  );
}

import LearnAndGrowListing from '../screens/screen-learn-grow-listing';
import LearningAndGrowDetail from '../screens/screen-learn-grow-detail';
import { createStackNavigator } from '@react-navigation/stack';

export const enum LearnGrowNavigator {
  LearnGrowListing = 'LEARN-GROW-LISTING',
  LearnGrowDetail = 'LEARN-GROW-DETAIL',
}

const ContentLearnGrowNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={LearnGrowNavigator.LearnGrowListing}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={LearnGrowNavigator.LearnGrowListing}
        component={LearnAndGrowListing}
      />
      <Stack.Screen
        name={LearnGrowNavigator.LearnGrowDetail}
        component={LearningAndGrowDetail}
      />
    </Stack.Navigator>
  );
};

export default ContentLearnGrowNavigation;

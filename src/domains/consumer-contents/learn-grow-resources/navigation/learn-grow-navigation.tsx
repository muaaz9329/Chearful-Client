import LearnAndGrowListing from "../learning-grow-listing/learning-grow-listing";
import LearningAndGrowDetail from "../learning-grow-detail/learning-grow-detail";
import { createStackNavigator } from "@react-navigation/stack";

const LearnAndGrowStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="LEARN-GROW-LISTING"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LEARN-GROW-LISTING" component={LearnAndGrowListing} />
      <Stack.Screen
        name="LEARN-GROW-DETAIL"
        component={LearningAndGrowDetail}
      />
    </Stack.Navigator>
  );
};

export default LearnAndGrowStack;

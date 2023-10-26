import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../home";

const HomeNavigationStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={Home} name="home" />
    </Stack.Navigator>
  );
};

export default HomeNavigationStack;

const styles = StyleSheet.create({});

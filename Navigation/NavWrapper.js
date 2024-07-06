import React from "react";
// import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "../Screens/HomeScreen";
// import SettingsScreen from "../Screens/SettingsScreen";

export const NavWrapper = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerShown: false,
    // }}
    >
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
};

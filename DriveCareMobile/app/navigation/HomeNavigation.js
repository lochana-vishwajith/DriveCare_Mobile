import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HandOverVehicle from "../components/HandOverVehicle";
import Home from "../components/Home";

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTransparent: true, title: "" }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerTintColor: "#343b24",
          headerStyle: { backgroundColor: "#d4f0c0" },
        }}
      />
      <Stack.Screen
        name="HandOverVehicle"
        component={HandOverVehicle}
        options={{
          title: "Hand-Over Details",
          headerTintColor: "#343b24",
          headerStyle: { backgroundColor: "#d4f0c0" },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});

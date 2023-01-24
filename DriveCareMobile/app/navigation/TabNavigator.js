import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Violations from "../components/Violations";
import Profile from "../components/Profile";
import TabBar from "../components/TabBar";
import ProfileNavigation from "./ProfileNavigation";
import HomeNavigation from "./HomeNavigation";

//invoke navigation function. it will return a component
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        initialParams={{ icon: "home" }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Violations"
        component={Violations}
        initialParams={{ icon: "upload" }}
      />
      <Tab.Screen
        name="Alerts"
        component={ProfileNavigation}
        initialParams={{ icon: "exclamationcircle" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

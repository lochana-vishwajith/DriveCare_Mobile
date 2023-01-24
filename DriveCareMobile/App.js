import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./app/navigation/TabNavigator";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
const Stack = createNativeStackNavigator();
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./app/store/index";
import Login from "./app/components/LoginScreen";
import Registration from "./app/components/Registration";
import AuthReducers from "./app/store/reducers";
import VehicleDetails from "./app/components/VehicleDetails";
import AccountTypeSelection from "./app/components/AccountTypeSelection";
import PoliceOfficerLogin from "./app/components/PoliceOfficerLogin";

const MyStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        options={{ headerShown: false }}
        component={AccountTypeSelection}
        name="AccountTypeSelection"
      />
      <Stack.Screen
        options={{ headerShown: false }}
        component={Login}
        name="Login"
      />
      <Stack.Screen
        options={{ headerShown: false }}
        component={PoliceOfficerLogin}
        name="PoliceOfficerLogin"
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="register"
        component={Registration}
      />
      <Stack.Screen
        name="tabNavigator"
        options={{ headerShown: false }}
        component={TabNavigator}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        component={AccountTypeSelection}
        name="AccountTypeSelection"
      />
      <Stack.Screen
        options={{ headerShown: false }}
        component={Login}
        name="Login"
      />
      <Stack.Screen
        options={{ headerShown: false }}
        component={PoliceOfficerLogin}
        name="PoliceOfficerLogin"
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="register"
        component={Registration}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="vehicleRegister"
        component={VehicleDetails}
      />
      <Stack.Screen
        name="tabNavigator"
        options={{ headerShown: false }}
        component={TabNavigator}
      />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  const token = useSelector((state) => state.AuthReducers.authToken);
  console.log("authToken", token);

  // const dispatch = useDispatch();

  // const init = async () => {
  //   dispatch(Init());
  // };

  // useEffect(() => {
  //   init();
  //   // CrowdModalIterate();
  // }, []);

  // let count = 0;

  // setInterval(() => {
  //   dispatch(showLiveUpdateModal());
  //   count = count + 1;
  //   console.log(count, " POPUP Test ");
  // }, 36000000);

  return (
    <NavigationContainer>
      {token === null ? <AuthStack /> : <MyStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}

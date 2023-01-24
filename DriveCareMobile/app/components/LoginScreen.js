import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { Login } from "../store/actions";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { height, width } = Dimensions.get("window");

export default function LoginScreen({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const submit = async () => {
    navigation.navigate("tabNavigator");
    // const unpw = {
    //   email: username,
    //   password: password,
    // };
    // await axios
    //   .post("192.168.137.1:5000/user/login", unpw)
    //   .then(async (loginDetails) => {
    //     console.log("loging details : ", loginDetails.status);
    //     if (loginDetails) {
    //       await AsyncStorage.setItem(
    //         "token",
    //         loginDetails.data.user.tokens[0].token
    //       );
    //       const userData = {
    //         token: loginDetails.data.user.tokens[0].token,
    //         userDetails: loginDetails.data.user,
    //       };
    //       dispatch(Login(userData));

    //       if (userData.token) {
    //         console.log("eeee");
    //         navigation.navigate("tabNavigator");
    //       }
    //     } else {
    //       Alert.alert(
    //         "User Loging Failed",
    //         "Please check the username & password again!",
    //         [{ text: "OK" }]
    //       );
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);

    //     Alert.alert(
    //       "User Loging Failed",
    //       "Please check the username & password again!",
    //       [{ text: "OK" }]
    //     );
    //   });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textStyleHeader}>Sign in as a</Text>
      <Text style={styles.textStyleHeaderType}>Driver</Text>
      <View style={styles.textInputContainer}>
        <View style={styles.inputboxCon}>
          <View style={styles.labelCon}>
            <Text style={styles.labelName}>Username </Text>
          </View>
          <View style={styles.inputFieldCon}>
            <TextInput
              label="name"
              mode="outlined"
              style={styles.textInputStyle}
              onChangeText={(val) => setUsername(val)}
            />
          </View>
        </View>
        <View style={styles.inputboxCon}>
          <View style={styles.labelCon}>
            <Text style={styles.labelName}>Password </Text>
          </View>
          <View style={styles.inputFieldCon}>
            <TextInput
              label="name"
              mode="outlined"
              style={styles.textInputStyle}
              onChangeText={(val) => setPassword(val)}
            />
          </View>
        </View>
      </View>

      <View style={styles.touchableOpacityView}>
        <TouchableOpacity
          mode="contained"
          onPress={submit}
          style={styles.touchableOpacityStyle}
        >
          <Text style={styles.touchableTextStyle}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.needAcctxt}>Need an Account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("register");
          }}
        >
          <Text>Register Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: width / 17,
    paddingBottom: height / 13,
  },
  textInputContainer: {
    width: "100%",
    height: "20%",
    marginTop: "10%",
  },
  usernameContainer: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
  },
  passwordContainer: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
  },
  textInputStyle: {
    width: "100%",
    height: "55%",
    borderRadius: 9,
    borderWidth: 1,
  },
  iconStyles: {
    width: "10%",
    height: "100%",
  },
  textInputViewStyle: {
    width: "90%",
    marginLeft: "2%",
  },
  textStyleHeader: {
    fontSize: 25,
    fontWeight: "bold",
    color: "gray",
  },
  textStyleHeaderType: {
    fontSize: 80,
    marginBottom: "19%",
    fontWeight: "bold",
    color: "gray",
  },
  touchableOpacityStyle: {
    width: "100%",
    height: "22%",
    borderColor: "#f25284",
    borderRadius: 9,
    borderWidth: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  touchableOpacityView: {
    width: "100%",
    alignItems: "center",
  },
  touchableTextStyle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  inputboxCon: {
    width: "100%",
    height: "35%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "4%",
  },
  labelCon: {
    width: "30%",
    backgroundColor: "#f25284",
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  inputFieldCon: {
    width: "70%",
  },
  labelName: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  textInputStyle: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    borderWidth: 1,
    borderColor: "#f25284",
  },
  needAcctxt: {
    marginTop: "8%",
  },
});

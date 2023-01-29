import {
  Alert,
  Dimensions,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useState } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

const { height, width } = Dimensions.get("window");

const items = [
  //name key is must.It is to show the text in front
  { id: 1, name: "angellist" },
  { id: 2, name: "codepen" },
  { id: 3, name: "envelope" },
  { id: 4, name: "etsy" },
  { id: 5, name: "facebook" },
  { id: 6, name: "foursquare" },
  { id: 7, name: "github-alt" },
  { id: 8, name: "github" },
  { id: 9, name: "gitlab" },
  { id: 10, name: "instagram" },
];

const HandOverVehicle = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [nic, setNIC] = useState(null);
  const [handedPerson, setHandedPerson] = useState(null);

  const userDetails = useSelector((state) => state.AuthReducers.userDetails);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const searchNic = async () => {
    console.log("nic", nic);
    await axios
      .get(`https://drivecare.herokuapp.com/user/getUserDetails/${nic}`)
      .then((res) => {
        console.log(res.data);
        setHandedPerson(res.data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(
          "Searching Failed",
          "Error occured in searching. Please try again!",
          [{ text: "OK" }]
        );
      });
  };

  const saveHandOverPerson = () => console.log(nic);

  return (
    <View style={styles.container}>
      <Text style={styles.handoverTopic}>Hand over person details</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.findDriverCon}>
          <View style={styles.handOverTxtCon}>
            <Text style={styles.handOverTxt}>Do you hand-over</Text>
          </View>
          <View style={styles.yesNoCon}>
            <Text style={styles.NoTxt}>No</Text>
          </View>
          <View style={styles.handOverSwitch}>
            <Switch
              trackColor={{ false: "gray", true: "black" }}
              thumbColor={isEnabled ? "gray" : "black"}
              ios_backgroundColor="gray"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.yesNoCon}>
            <Text style={styles.yesTxt}>yes</Text>
          </View>
        </View>
        <View style={styles.findDriverConNic}>
          <View style={styles.nicTxt}>
            <Text style={styles.handOverTxt}>Driver NIC</Text>
          </View>
          <View style={styles.nicTxtEnter}>
            <TextInput
              style={styles.nicSearch}
              placeholder="Driver NIC"
              onChangeText={(val) => setNIC(val)}
            />
          </View>
        </View>
        <View style={styles.btnCon}>
          <TouchableOpacity
            mode="contained"
            onPress={searchNic}
            style={styles.touchableOpacityStyle}
          >
            <Text style={styles.touchableTextStyle}>Search Driver</Text>
          </TouchableOpacity>
        </View>
        {handedPerson === null ? null : (
          <>
            <View style={styles.displyCon}>
              <Avatar.Image
                source={
                  handedPerson?.image
                    ? { uri: handedPerson.Image }
                    : require("../images/login1.png")
                }
                size={120}
              />
              <Text style={styles.nameTxt}>{handedPerson.fullName}</Text>
              <Text style={styles.ageTxt}>
                {moment(Date.now()).diff(handedPerson.DOB, "years") + " years"}
              </Text>
            </View>
            <View style={styles.btnCon}>
              <TouchableOpacity
                mode="contained"
                onPress={saveHandOverPerson}
                style={styles.touchableOpacityStyle}
              >
                <Text style={styles.touchableTextStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default HandOverVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 7,
  },
  handoverTopic: {
    fontWeight: "bold",
    fontSize: 17,
  },
  findDriverCon: {
    flexDirection: "row",
    width: "100%",
    height: "24%",
  },
  findDriverConNic: {
    flexDirection: "row",
    width: "100%",
    height: "40%",
    marginTop: "2%",
  },
  handOverTxtCon: {
    width: "63%",
    justifyContent: "center",
  },
  handOverTxt: {
    fontSize: 17,
  },
  handOverSwitch: {
    width: "17%",
    justifyContent: "center",
  },
  yesNoCon: {
    justifyContent: "center",
    width: "10%",
  },
  NoTxt: {
    textAlign: "right",
  },
  nicSearch: {
    borderRadius: 9,
    borderWidth: 1,
    paddingHorizontal: 5,
    height: "40%",
    width: "100%",
    zIndex: 1,
  },
  nicTxt: {
    width: "45%",
  },
  nicTxtEnter: {
    width: "55%",
  },
  detailsContainer: {
    width: "100%",
    height: "30%",
  },
  touchableOpacityStyle: {
    width: "100%",
    height: "100%",
    borderColor: "#f25284",
    borderRadius: 9,
    borderWidth: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  touchableTextStyle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  btnCon: {
    width: "100%",
    height: "20%",
  },
  displyCon: {
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
    alignItems: "center",
    marginTop: "10%",
    justifyContent: "center",
    borderRadius: 9,
    marginBottom: "8%",
  },
  nameTxt: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

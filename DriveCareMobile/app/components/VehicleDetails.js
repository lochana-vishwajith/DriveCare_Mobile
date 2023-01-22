import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import app from "../../firebase";
import { useSelector } from "react-redux";

const { height, width } = Dimensions.get("window");

const VehicleDetails = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [yom, setYom] = useState(null);
  const [noofairbags, setNoofairbags] = useState(null);
  const [registrationNo, setRegistrationNo] = useState(null);

  const userDetails = useSelector(
    (state) => state.AuthReducers.registerDetails
  );

  // if (!Firebase.apps.length) {
  //   Firebase.initializeApp(firebaseConfig);
  // }

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    setImage(result.assets[0].uri);

    uploadToFirebase();
  };

  const uploadToFirebase = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const ref = Firebase.storage().ref().child(new Date().toString());
    const snapshot = ref.put(blob);

    snapshot.on(
      Firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log("error - ", error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("Download url - ", url);
          setDownloadURL(url);
          setImageUploaded(true);
          blob.close();
          return url;
        });
      }
    );
  };

  const registerUser = () => {
    userDetails["image"] = downloadURL;
    const details = {
      userDetails: userDetails,
      vehicleDetails: {
        yom,
        noofairbags,
        registrationNo,
      },
    };

    console.log("user Details", userDetails);
    // navigation.navigate("Login")
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profilePicCon}>
        <Text style={styles.topic}>Profile Picture</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={uploadImage}>
          <Avatar.Image
            size={190}
            source={
              image === null ? require("../images/login1.png") : { uri: image }
            }
          />
        </TouchableOpacity>
        <Text style={styles.intruc}>
          To select a picture from your phone, touch the icon.
        </Text>
      </View>

      <Text style={styles.topic}>Vehicle Details</Text>
      <View style={styles.personalConatiner}>
        <View style={styles.inputboxCon}>
          <View style={styles.labelCon}>
            <Text style={styles.labelName}>Year of {"\n"} Manufacture </Text>
          </View>
          <View style={styles.inputFieldCon}>
            <TextInput
              label="name"
              mode="outlined"
              style={styles.textInputStyle}
              onChangeText={(val) => setYom(val)}
            />
          </View>
        </View>
        <View style={styles.inputboxCon}>
          <View style={styles.labelCon}>
            <Text style={styles.labelName}>No of Air Bags </Text>
          </View>
          <View style={styles.inputFieldCon}>
            <TextInput
              label="name"
              mode="outlined"
              style={styles.textInputStyle}
              onChangeText={(val) => setNoofairbags(val)}
            />
          </View>
        </View>
        <View style={styles.inputboxCon}>
          <View style={styles.labelCon}>
            <Text style={styles.labelName}> Registration Number </Text>
          </View>
          <View style={styles.inputFieldCon}>
            <TextInput
              label="name"
              mode="outlined"
              style={styles.textInputStyle}
              onChangeText={(val) => setRegistrationNo(val)}
            />
          </View>
        </View>
      </View>
      <View style={styles.nextTxtCon}>
        <TouchableOpacity onPress={() => registerUser()}>
          <Text style={styles.nextTxt}>Finish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VehicleDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 17,
    paddingBottom: height / 13,
    marginTop: height / 28,
  },
  topic: {
    fontSize: 30,
    fontWeight: "bold",
    color: "gray",
    marginBottom: "7%",
  },
  inputboxCon: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "4%",
  },
  labelCon: {
    width: "40%",
    backgroundColor: "#f25284",
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  inputFieldCon: {
    width: "60%",
  },
  labelName: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  personalConatiner: {
    width: "100%",
    height: "37%",
  },
  textInputStyle: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    borderWidth: 1,
    borderColor: "#f25284",
  },
  imagePicker: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "3%",
  },
  intruc: {
    textAlign: "center",
    fontSize: 17,
    marginBottom: "8%",
  },
  nextTxt: {
    textAlign: "right",
    fontSize: 30,
    fontWeight: "bold",
    color: "gray",
  },
  nextTxtCon: {
    width: "100%",
  },
  profilePicCon: {
    width: "100%",
    height: "50%",
  },
});

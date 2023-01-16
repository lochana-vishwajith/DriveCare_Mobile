import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textAcc}>Any Accident Happened To You ?</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.sosBtn}
          onPress={() => {
            console.log("Accident happened");
          }}
        >
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.handoverContainer}>
        <TouchableOpacity
          style={styles.handOverBtn}
          onPress={() => {
            console.log("To be hand overed");
          }}
        >
          <Text style={styles.handOverText}>Hand Over Your Vehicle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reportAccBtn}
          onPress={() => {
            console.log("To be reported an accident");
          }}
        >
          <Text style={styles.reportAccText}>report an Accident</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.reportAccContainer}>
        <TouchableOpacity
          style={styles.reportAccBtn}
          onPress={() => {
            console.log("To be reported an accident");
          }}
        >
          <Text style={styles.reportAccText}>report an Accident</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "3%",
    paddingTop: "3%",
  },
  btnContainer: {
    height: "52%",
    width: "100%",
  },
  sosBtn: {
    height: "100%",
    width: "100%",
    backgroundColor: "red",
    borderRadius: 190,
    justifyContent: "center",
    // overflow: "hidden",
    shadowColor: "black", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 10, // IOS
    shadowRadius: 10, //IOS
    elevation: 20, // Android
  },
  sosText: {
    color: "white",
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
  },
  textAcc: {
    fontSize: 19,
    marginBottom: "5%",
  },
  handoverContainer: {
    marginTop: "20%",
    height: "100%",
    width: "100%",
    marginBottom: "5%",
  },
  handOverBtn: {
    height: 50,
    width: "100%",
    borderRadius: 20,
    borderWidth: 3,
    justifyContent: "center",
    marginBottom: "5%",
    borderColor: "#343b24",
  },
  handOverText: {
    textTransform: "uppercase",
    color: "black",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  reportAccContainer: {
    // marginTop: "10%",
    height: "100%",
    width: "100%",
  },
  reportAccBtn: {
    height: 50,
    width: "100%",
    borderRadius: 20,
    borderWidth: 3,
    justifyContent: "center",
    borderColor: "#343b24",
  },
  reportAccText: {
    textTransform: "uppercase",
    color: "black",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;

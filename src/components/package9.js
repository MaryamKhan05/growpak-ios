import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import COLORS from "../../assets/colors/colors";

const PackageNine = () => {
  const handlerPress = () => {
    Alert.alert("You Clicked Me!");
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Package 9</Text>
      <TouchableOpacity
        onPress={() => Linking.openURL("tel:+923213234980")}
        style={styles.btn}
      >
        <Text>Click me </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    alignItems: "center",
    backgroundColor: COLORS.green,
    margin: 10,
  },
});

export default PackageNine;

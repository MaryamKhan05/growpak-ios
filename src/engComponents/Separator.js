import React from "react";
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Separator = () => {
  return (
    <View style={{ backgroundColor: "#e4e8eb", padding: hp(0.05) }}/>
  );
};

const styles = StyleSheet.create({});

export default Separator;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../assets/colors/colors";
import { Separator } from "./index";

const FarmReportDetails = (props) => {
  return (
    <View >
      <View style={styles.container}>
        <Text>{props.text}</Text>
        <Text style={styles.heading}>{props.heading} </Text>
      </View>
      <Separator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  heading: {
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "NotoSemi",
    color: COLORS.textgrey,
  },
});

export default FarmReportDetails;

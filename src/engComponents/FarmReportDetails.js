import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../assets/colors/colors";
import { Separator } from "./Index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const FarmReportDetails = (props) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.heading}>{props.heading}</Text>
        <Text
          style={{
            fontFamily: "PoppinsRegular",
            fontSize: 12,
            textAlign: "center",
            width: wp(40),
          }}
        >
          {props.text}
        </Text>
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
    fontSize: 14,
    fontFamily: "PoppinsSemi",
    color: COLORS.textgrey,
  },
});

export default FarmReportDetails;

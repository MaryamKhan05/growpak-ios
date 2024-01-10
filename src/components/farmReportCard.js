import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../assets/colors/colors";

const FarmReportCard = (props) => {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={styles.title}>{props.label}</Text>
        <Image
          source={{ uri: props.img }}
          style={{ height: hp(5), width: wp(10) }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          backgroundColor: "#e4e8eb",
          padding: hp(0.05),
          width: "100%",
          margin: hp(2),
          alignSelf: "center",
        }}
      />
      <View style={styles.row}>
        <Text style={styles.boldText}> {props.stage} </Text>
        <Text style={styles.text}>فصل کی نشوونما کا مرحلہ </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>{props.date}</Text>
        <Text style={styles.text}>تجزیہ کی تاریخ </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    alignItems: "flex-end",
    borderRadius: 12,
    padding: 16,
    width: wp(92),
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  boldText: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    color: COLORS.textgrey,
    width: hp(18),
    textAlign: "right",
    paddingTop: 5,
  },
});

export default FarmReportCard;

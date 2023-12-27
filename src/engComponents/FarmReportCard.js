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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: props.img }}
          style={{ height: hp(5), width: wp(8), marginHorizontal: wp(1) }}
          resizeMode="contain"
        />
        <Text style={styles.title}>{props.label}</Text>
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
        <Text style={styles.text}>Crop Growth Stage</Text>
        <Text style={styles.boldText}>{props.stage}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Analysis Date</Text>
        <Text style={styles.boldText}>{props.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    width: wp(92),
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  title: {
    fontSize: 14,
    fontFamily: "PoppinsSemi",
  },
  boldText: {
    fontSize: 14,
    fontFamily: "PoppinsSemi",
  },
  text: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: COLORS.textgrey,
    width: hp(20),
  },
});

export default FarmReportCard;

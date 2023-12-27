import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
//internal imports
import COLORS from "../../assets/colors/colors";

const SubCard = (props) => {
  return (
    <View style={styles.card}>
      <Image source={props.image} style={styles.image} resizeMode="contain" />
      {props.heading ? (
        <Text style={styles.heading}>{props.heading} </Text>
      ) : null}
      <Text style={styles.caption}>{props.caption} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: hp(2),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    width: wp(90),
    alignSelf: "center",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    margin:hp(2)
  },

  heading: {
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
  caption: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
    marginTop: hp(1),
    width:wp(65)
  },
  image: {
    height: hp(10),
    width: wp(15),
  },
});

export default SubCard;

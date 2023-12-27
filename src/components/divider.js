import React from "react";
import { View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../assets/colors/colors";
const Divider = () => {
  return (
    <View
      style={{
        width: wp("100"),
        padding: hp("0.1"),
        backgroundColor: COLORS.disableGrey,
        alignSelf: "center",
        margin:hp('2')
      }}
    />
  );
};

export default Divider;

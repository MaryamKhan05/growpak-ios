import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import COLORS from "../../assets/colors/colors";

const FarmBackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Home")}
      style={{ paddin: 10 ,marginRight:hp(4)}}
    >
      <FontAwesome5 name="arrow-right" size={20} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default FarmBackButton;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../assets/colors/colors";
import { ActiveButton } from "../engComponents/Index";
const Info = () => {
    const navigation= useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          alignSelf: "center",
          margin: hp("3"),
          resizeMode: "contain",
          width: wp(50),
          height: hp(50),
        }}
        source={require("../../assets/info.png")}
      />
      <Text style={styles.heading}>
        For registration, we would need some Information
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: COLORS.textgrey,
          fontFamily: "PoppinsMedium",
          margin: hp("1"),
          textAlign: "center",
        }}
      >
        This Information would help us to open your account.
      </Text>

      <Text
        style={{
          fontSize: 12,
          fontFamily: "PoppinsMedium",
          color: COLORS.textgrey,
          marginTop: hp("7"),
          marginBottom: hp("1"),
        }}
      >
        This will only take a few minutes
      </Text>
      <TouchableOpacity
        onPress={()=>{navigation.navigate('PersonalInfo')}}
      >
        <ActiveButton text="Get Started" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    width: wp("85"),
  },
});
export default Info;

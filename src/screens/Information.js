import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import COLORS from "../../assets/colors/colors";
import { ActiveButton } from "../components/index";
const Info = () => {
  const navigation= useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{ alignSelf: "center", margin: hp("3"), resizeMode: "contain" ,width: wp(50),
        height: hp(50),}}
        source={require("../../assets/info.png")}
      />
      <Text style={styles.heading}>
        رجسٹریشن کے لئے ہمیں کچھ معلومات کی ضرورت ہو گی{" "}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "400",
          color: COLORS.textgrey,
          fontFamily: "CustomFont",
          margin: hp("1"),
          textAlign:'center'
        }}
      >
        یہ معلومات ہمیں آپ کا اکاؤنٹ کھولنے میں مدد کرے گی
      </Text>

      <Text
        style={{
          fontSize: 18,
          fontFamily: "CustomFont",
          fontWeight: "400",
          color: COLORS.textgrey,
          marginTop: hp("7"),
          marginBottom: hp("1"),
        }}
      >
        اس میں صرف 2 منٹ لگیں گے
      </Text>
      <TouchableOpacity onPress={()=>{navigation.navigate('PersonalInfo')}}>

      <ActiveButton text="ٹھیک ہے " />
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
    fontWeight: "400",
    fontSize: 32,
    fontFamily: "CustomFont",
    textAlign: "center",
    width: wp("85"),
  },
});
export default Info;

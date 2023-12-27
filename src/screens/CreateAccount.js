import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../assets/colors/colors";
import { ActiveButton, BorderButton } from "../components/index";
const CreateAccount = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={{resizeMode:'cover', width:wp('100'), height:hp('45') }} source={require("../../assets/map.png")} />
      <Text style={styles.heading}> آئیے آپ کا پہلا فارم بنائیں </Text>
      <Text style={styles.text}>
        اپنےفارم کی سرگرمیوں کو ٹریک کرنے کے لیے، آپ کو صرف اپنے کھیتوں کے حدود
        کو نشان زد کرنے کی ضرورت ہے
      </Text>
      <TouchableOpacity style={{marginVertical:hp('1')}}>
        <ActiveButton text="نیا فارم بنائیں " />
      </TouchableOpacity>
      <TouchableOpacity>
        <BorderButton
          text="میں بعد میں کروں گا"
          color={COLORS.green}
          border={COLORS.grey}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems:'center'
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    fontFamily: "CustomFont",
    textAlign: "center",
    marginTop:10
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    marginVertical: hp("1.5"),
    color: COLORS.textgrey,
    textAlign: "center",
    width:wp('80')
  },
});

export default CreateAccount;

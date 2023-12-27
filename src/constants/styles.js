import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const STYLES = StyleSheet.create({
  title: {
    fontFamily: "CustomFont",
    fontSize: 32,
    fontWeight: "400",
    letterSpacing: -4,
    marginTop:hp(5)
  },
  swiperTitle: {
    fontFamily: "CustomFont",
    fontSize: 32,
    fontWeight: "400",
    letterSpacing: -4,
    marginTop:hp('5')
  },
  text:{
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    letterSpacing:-3
  }


});

export default STYLES;

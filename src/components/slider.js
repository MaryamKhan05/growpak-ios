import { View, Text, StyleSheet, Image, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../assets/colors/colors";

const Slider = (props) => {
  const heading =
    Platform.OS == "android" ? styles.androidHeading : styles.iosHeading;
  const text = Platform.OS == "android" ? styles.androidText : styles.iosText;
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: wp("90%"),
        height: hp("60%"),
        alignSelf: "center",
      }}
    >
      <Image
        style={{ height: hp(30), width: wp(70) }}
        source={props.src}
        resizeMode="contain"
      />
      <Text style={heading}>{props.heading} </Text>
      <View
        style={{
          width: wp("90"),
        }}
      >
        <Text style={text}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  androidHeading: {
    fontFamily: "CustomFont",
    fontSize: 32,
    fontWeight: "400",
    marginTop: hp("3"),
    margin: hp("2"),
    letterSpacing: -3,
  },
  iosHeading: {
    fontFamily: "CustomFont",
    fontSize: 32,
    fontWeight: "400",
    marginTop: hp("3"),
    margin: hp("2"),
  },
  androidText: {
    fontFamily: "CustomFont",
    fontSize: 24,
    fontWeight: "400",
    color: COLORS.textgrey,
    textAlign: "center",
    letterSpacing: -4,
    marginTop: 3,
  },
  iosText: {
    fontFamily: "CustomFont",
    fontSize: 24,
    fontWeight: "400",
    color: COLORS.textgrey,
    textAlign: "center",
    marginTop: 3,
  },
});

export default Slider;

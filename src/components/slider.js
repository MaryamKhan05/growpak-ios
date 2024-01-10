import { View, Text, StyleSheet, Image, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../assets/colors/colors";

const Slider = (props) => {
  const heading = styles.iosHeading;
  const text = styles.iosText;
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
      <Text style={heading}>{props.heading}</Text>
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
  iosHeading: {
    fontFamily: "CustomFont",
    fontSize: 32,
    fontWeight: "400",
    paddingTop: hp("3"),
    margin: hp("2"),
  },
  iosText: {
    fontFamily: "CustomFont",
    fontSize: 24,
    fontWeight: "400",
    color: COLORS.textgrey,
    textAlign: "center",
    paddingTop: 3,
  },
});

export default Slider;

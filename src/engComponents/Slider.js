import { View, Text, StyleSheet, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../assets/colors/colors";

const Slider = (props) => {
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
      <Text style={styles.heading}>{props.heading} </Text>
      <View
        style={{
          width: wp("90"),
        }}
      >
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    marginTop: hp("3"),
    margin: hp("2"),
    fontFamily: "PoppinsBold",
  },
  text: {
    fontSize: 16,
    color: COLORS.textgrey,
    textAlign: "center",
    marginTop: 3,
    fontFamily: "PoppinsRegular",
  },
});

export default Slider;

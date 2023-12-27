import {
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../assets/colors/colors";
const ActiveButton = (props) => {
  const textStyle =
    Platform.OS == "android" ? styles.androidText : styles.iosText;
  return (
    <View
      style={{
        backgroundColor: COLORS.green,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        padding: hp("1"),
        borderRadius: 50,
        width: props.width ? props.width : wp("90%"),
      }}
    >
      <Text style={textStyle}>{props.text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  androidText: {
    color: COLORS.white,
    fontWeight: "400",
    fontSize: 21,
    fontFamily: "CustomFont",
    letterSpacing: -3,
  },
  iosText: {
    color: COLORS.white,
    fontWeight: "400",
    fontSize: 21,
    fontFamily: "CustomFont",
  },
});
export default ActiveButton;

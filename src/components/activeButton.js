import { Platform, StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../assets/colors/colors";
const ActiveButton = (props) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.green,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: props.width ? props.width : wp("90%"),
      }}
    >
      <Text style={styles.iosText}>{props.text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  iosText: {
    color: COLORS.white,
    fontWeight: "400",
    fontSize: 21,
    fontFamily: "CustomFont",
    padding: 10,
  },
});
export default ActiveButton;

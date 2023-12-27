import {
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
      <Text style={styles.textStyle}>{props.text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: COLORS.white,
    fontFamily:"PoppinsMedium",
    fontSize:14
  },
});
export default ActiveButton;

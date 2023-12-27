import {
  Text,
  View,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../assets/colors/colors";
const BorderButton = (props) => {
  const textStyle =
    Platform.OS == "android" ? styles.androidText : styles.iosText;
  return (
    <View
      style={{
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        padding: hp("1"),
        borderRadius: 50,
        width: wp("90%"),
        borderWidth: 1,
        borderColor: props.border,
        flexDirection: props.source ? "row" : null,
        margin: 5,
      }}
    >
      <Text
        style={[
          textStyle,
          {
            color: props.color,
            textAlign: props.source ? "right" : null,
            width: props.source ? "60%" : null,
          },
        ]}
      >
        {props.text}
      </Text>
      {props.source ? (
        <Image
          source={props.source}
          style={{ width: "20%", height: hp(3), marginLeft: 15 }}
          resizeMode="contain"
        />
      ) : null}
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

export default BorderButton;

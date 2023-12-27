import {
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../assets/colors/colors";
const BorderButton = (props) => {
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
        {props.source ? (
        <Image
          source={props.source}
          style={{ width: "20%", height: hp(3), marginRight: 15 }}
          resizeMode="contain"
        />
      ) : null}
      <Text
        style={[
          styles.text,
          {
            color: props.color,
            textAlign: props.source ? "left" : null,
            width: props.source ? "60%" : null,
          },
        ]}
      >
        {props.text}
      </Text>
    
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
    fontFamily:"PoppinsMedium"
  },
});

export default BorderButton;

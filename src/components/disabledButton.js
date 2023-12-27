import { Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../assets/colors/colors";
const DisabledButton = (props) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.disableGrey,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        padding: hp("1"),
        borderRadius: 50,
        width: wp("90%"),
      }}
    >
      <Text
        style={{
          color: COLORS.disableBlack,
          fontWeight: "400",
          fontSize: 18,
          fontFamily: "CustomFont",
        }}
      >
        {props.text}
      </Text>
    </View>
  );
};

export default DisabledButton;

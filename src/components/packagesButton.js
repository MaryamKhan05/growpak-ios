import { Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
const PkgButton = (props) => {
    const navigation=useNavigation()
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        padding: hp("0.8"),
        borderRadius: 50,
        width: wp("15%"),
        borderWidth: props.width,
        borderColor: props.border,
        backgroundColor: props.backgroundColor,
      }}
      onPress={()=>navigation.navigate("Packages")}
    >
      <Text
        style={{
          color: props.color,
          fontWeight: "400",
          fontSize: 14,
        }}
      >
        پیکیجز 
      </Text>
    </TouchableOpacity>
  );
};

export default PkgButton;

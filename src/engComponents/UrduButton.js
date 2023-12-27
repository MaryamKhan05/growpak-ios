import { Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useToast } from "react-native-toast-notifications";
const UrduButton = (props) => {
  const toast = useToast();
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 50,
        borderWidth: props.width,
        borderColor: props.border,
        backgroundColor: props.backgroundColor,
        height: hp(5),
        width: wp(20),
      }}
      onPress={() =>
        toast.show("We're working on it !", {
          type: "warning",
          placement: "bottom",
          duration: 2000,
          offset: 30,
          animationType: "zoom-in",
          swipeEnabled: true,
        })
      }
    >
      <Text
        style={{
          color: props.color,
          fontWeight: "400",
          fontSize: 18,
          fontFamily: "NotoRegular",
          textAlign: "center",
        }}
      >
        اردو
      </Text>
    </TouchableOpacity>
  );
};

export default UrduButton;

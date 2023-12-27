import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useToast } from "react-native-toast-notifications";
import COLORS from "../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { notifications } from "../redux/action";

const Card = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const text = Platform.OS == "android" ? styles.andText : styles.iosText;
  const headingText =
    Platform.OS == "android" ? styles.andHeading : styles.iosHeading;

  const handlePress = () => {
    if (props.url) {
      navigation.navigate("ElementsView", {
        url: props.url,
        title: props.heading,
      });
    } else if (props.onPress) {
      if (props.heading === "خبریں") {
        dispatch(notifications());
        navigation.navigate(props.onPress);
      } else {
        navigation.navigate(props.onPress);
      }
    } else {
      toast.show("We're working on it !", {
        type: "warning",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        resizeMode="contain"
        source={props.image}
        style={{ height: hp("5"), width: wp("10") }}
      />
      <Text style={headingText}>{props.heading}</Text>
      {props.number ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.disableGrey,
              borderRadius: 20,
              width: wp("7.5"),
              height: hp("3.5"),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{}}>{props.number}</Text>
          </View>

          <Text style={text}>{props.caption}</Text>
        </View>
      ) : (
        <Text style={text}>{props.caption}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    height: hp("22"),
    width: wp("45"),
    borderRadius: 20,
    alignItems: "flex-end",
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.disableGrey,
    margin: 5,
  },
  andText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "NotoRegular",
    color: COLORS.disableBlack,
    textAlign: "right",
    letterSpacing: -2,
  },
  iosText: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "NotoRegular",
    color: COLORS.disableBlack,
    textAlign: "right",
  },
  andHeading: {
    fontSize: 24,
    fontWeight: "400",
    fontFamily: "CustomFont",
    marginTop: hp("3"),
    letterSpacing: -3,
  },
  iosHeading: {
    fontSize: 24,
    fontWeight: "400",
    fontFamily: "CustomFont",
    marginTop: hp("5"),
  },
});

export default Card;

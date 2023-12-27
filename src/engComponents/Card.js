import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
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

  const handlePress = () => {
    if (props.url) {
      navigation.navigate("ElementsView", {
        url: props.url,
        title: props.heading,
      });
    } else if (props.onPress) {
      if (props.heading === "News") {
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
        style={{ height: hp(6), width: wp(11), alignSelf: "flex-end" }}
      />
      <Text style={styles.heading}>{props.heading}</Text>
      {props.number ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>{props.caption}</Text>
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
        </View>
      ) : (
        <Text style={styles.text}>{props.caption}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    height: hp(22),
    width: wp("45"),
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.disableGrey,
    margin: 5,
  },
  text: {
    fontSize: 11,
    fontFamily: "PoppinsRegular",
    color: COLORS.disableBlack,
  },
  heading: {
    fontSize: 13,
    fontFamily: "PoppinsSemi",
    marginTop: hp(5),
  },
});

export default Card;

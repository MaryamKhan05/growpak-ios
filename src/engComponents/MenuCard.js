import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

import COLORS from "../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

const MenuCard = (props) => {
  const toast = useToast();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        props.url
          ? Linking.openURL(props.url)
          : props.onPress
          ? navigation.navigate(props.onPress)
          : toast.show("We're working on it !", {
              type: "warning",
              placement: "bottom",
              duration: 2000,
              offset: 30,
              animationType: "zoom-in",
              swipeEnabled: true,
            })
      }
    >
      <Image source={props.image} resizeMode="contain" style={styles.image} />
      <Text style={styles.text}> {props.text}</Text>
      {props.chevron == true ? (
        <Entypo
          name="chevron-small-right"
          style={styles.icon}
          size={20}
          color={COLORS.textgrey}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    width: "95%",
    height: 48,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.disableGrey,
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    textAlign: "left",
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: COLORS.disableBlack,
    width: "72%",
  },
  image: {
    height: 20,
    width: 20,
    marginHorizontal: 20,
  },
  icon: {
    justifyContent: "flex-start",
  },
});

export default MenuCard;

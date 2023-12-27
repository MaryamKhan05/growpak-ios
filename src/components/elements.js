import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../assets/colors/colors";
import { useToast } from "react-native-toast-notifications";

const Elements = (props) => {
  const toast = useToast();
  const navigation = useNavigation();
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: hp(3),
      }}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          props.press
            ? navigation.navigate(props.press, {
                url: props.url,
                title: props.text,
              })
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
        <Image source={props.image} style={styles.image} resizeMode="contain" />
      </TouchableOpacity>
      <Text style={styles.text}>{props.text} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.disableGrey,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: wp(20),
    height: hp(3),
  },
  text: {
    fontFamily: "CustomFont",
    fontSize: 20,
    fontWeight: "400",
  },
});

export default Elements;

import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
//internal imports
import { ActiveButton, BorderButton } from "../engComponents/Index";
import COLORS from "../../assets/colors/colors";
import { tokenWithoutId } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EngButton } from "../components";
const Prelogin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);


  

  const video = React.useRef(null);
  useEffect(() => {
    if (video) {
      video.current.playAsync();
    }
  }, [video]);

  return (
    <>
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{ uri: "https://growpak.store/pictures/growtechsplash.mp4" }}
          isLooping
          resizeMode="cover"
        />
      </View>
      <View style={styles.containerSub}>
        {notification ? (
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 20,
              position: "absolute",
              width: wp(92),
              alignItems: "center",
            }}
          >
            <Text>{notification}</Text>
          </View>
        ) : null}
        <View
          style={{
            alignItems: "flex-end",
            justifyContent:"flex-end",
            width: "100%",
            margin:hp(5),
            right:10
          }}
        >
          <EngButton backgroundColor={"white"} />
        </View>
        <View
          style={{
            height: hp(40),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              height: hp("10"),
              width: wp("25"),
              resizeMode: "contain",
              margin: hp("3"),
            }}
            source={require("../../assets/gplogo.png")}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "PoppinsBold",
              color: COLORS.white,
              margin: 5,
            }}
          >
            Welcome in GrowPak
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "PoppinsRegular",
              color: COLORS.white,
              margin: 5,
              textAlign: "center",
              width: wp(90),
            }}
          >
            Digital Agricultural Services, Financing and Supply Chain
          </Text>
        </View>

        <View
          style={{
            marginTop: hp(15),
          }}
        >
          <TouchableOpacity
            style={{ marginVertical: hp("1") }}
            onPress={() => navigation.navigate("Login")}
          >
            <ActiveButton text="Login" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Onboarding")}>
            <BorderButton
              text="Sign Up"
              color={COLORS.white}
              border={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    flexDirection: "column",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  containerSub: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    alignItems: "center",
  },
});

export default Prelogin;

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
//internal imports
import { BorderButton } from "../components/index";
import COLORS from "../../assets/colors/colors";
import {
  clearLoginErrorMessage,
  clearLoginSuccessMessage,
  login,
  saveToken,
} from "../redux/action";

const Loginpin = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  const route = useRoute();
  const [loader, setLoader] = useState(false);

  let loginData = useSelector((state) => state.api.login?.data?.data);
  console.log(loginData, "login data on Loginpin");
  const loginresponse = useSelector(
    (state) => state.api.login?.data?.data?.data
  );
  const PIN_INPUT_COUNT = 4;
  const [calledOnce, setCalledOnce] = useState(false);


  const loginSuccess = useSelector((state) => state.api?.login?.successMessage);
  const loginFailed = useSelector((state) => state.api?.login?.errorMessage);


  useEffect(() => {
    if (loginresponse) {
      let token = loginresponse?.token;
      console.log(token, "token in login pin screen");
      dispatch(saveToken(token));
    }
  }, [loginresponse]);


  useEffect(() => {
    if (loginSuccess) {
      setLoader(false);
      toast.show(loginSuccess, {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      dispatch(clearLoginSuccessMessage());
    }
    if (loginFailed) {
      setLoader(false);
      toast.show(loginFailed, {
        type: "danger",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      dispatch(clearLoginErrorMessage());
    }
  }, [loginSuccess, loginFailed]);

  const pinInputs = Array(PIN_INPUT_COUNT).fill(0); // Initialize an array for inputs
  const [pin, setPin] = useState(""); // State to store the entered PIN
  const inputRefs = useRef(pinInputs.map(() => React.createRef())); // Refs for input fields
  const focusNextInput = (currentIndex) => {
    if (currentIndex < PIN_INPUT_COUNT - 1) {
      inputRefs.current[currentIndex + 1].current.focus();
    }
  };

  const focusPreviousInput = (currentIndex) => {
    if (currentIndex > 0) {
      inputRefs.current[currentIndex - 1].current.focus();
    }
  };

  const handleTextInput = (text, currentIndex) => {
    const newPin =
      pin.substring(0, currentIndex) + text + pin.substring(currentIndex + 1);
    setPin(newPin);

    if (text !== "") {
      focusNextInput(currentIndex);
    } else {
      focusPreviousInput(currentIndex);
    }
  };

  const loginHandler = async () => {
    setLoader(true);
    let mobile = "+92" + route.params?.phone;

    dispatch(login({ mobile, pin }));
  };

  const text = Platform.OS == "android" ? styles.andText : styles.iosText;
  const headingText =
    Platform.OS == "android" ? styles.andHeading : styles.iosHeading;

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.green,
        flex: 1,
      }}
    >
      <LinearGradient
        colors={["#01844D", "#009657"]}
        style={styles.background}
      />
      <Text style={headingText}>خوش آمدید</Text>
      <Text style={text}>اپنی لاگ ان پن درج کریں </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "70%",
          alignSelf: "center",
          marginVertical: hp("5"),
        }}
      >
        {pinInputs.map((_, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={pin[index] || ""}
            ref={inputRefs.current[index]}
            onChangeText={(text) => handleTextInput(text, index)}
            secureTextEntry={true}
          />
        ))}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={[text, { textDecorationLine: "underline" }]}>
          پن بھول گئے؟
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: hp(10) }} onPress={loginHandler}>
        <BorderButton
          text=" لاگ اِن کریں "
          color={COLORS.white}
          border={COLORS.white}
        />
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={loader}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.overlay,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={COLORS.green} />
        </View>
      </Modal>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  andHeading: {
    fontSize: 32,
    fontWeight: "400",
    fontFamily: "CustomFont",
    textAlign: "center",
    color: COLORS.white,
    marginTop: hp("10"),
    letterSpacing: -7,
  },

  iosHeading: {
    fontSize: 32,
    fontWeight: "400",
    fontFamily: "CustomFont",
    textAlign: "center",
    color: COLORS.white,
    marginTop: hp("10"),
  },

  iosText: {
    fontWeight: "400",
    fontFamily: "CustomFont",
    fontSize: 20,
    textAlign: "center",
    color: COLORS.white,
  },
  andText: {
    fontWeight: "400",
    fontFamily: "CustomFont",
    fontSize: 20,
    textAlign: "center",
    color: COLORS.white,
    letterSpacing: -3,
  },
  input: {
    width: wp("15"),
    height: hp("7"),
    backgroundColor: COLORS.transparentblack,
    borderRadius: 10,
    color: COLORS.white,
    textAlign: "center",
    fontSize: hp("4"),
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: hp("100%"),
  },
});

export default Loginpin;

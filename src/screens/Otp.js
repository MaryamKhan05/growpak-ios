import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { useRoute } from "@react-navigation/native";
//internal imports
import { ActiveButton, DisabledButton } from "../components/index";
import COLORS from "../../assets/colors/colors";
import {
  clearOtpErrorMessage,
  clearOtpSuccessMessage,
  getOtp,
} from "../redux/action";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Otp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const route = useRoute();
  const phone = route.params.phone;
  const otp = useSelector((state) => state.api.otp?.data?.data?.otp);
  console.log(otp, "this is otp");

  const PIN_INPUT_COUNT = 6; // Update the count to 6
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

  const getOtpHandler = async () => {
    const mobilenumber = await AsyncStorage.getItem("Phone");
    dispatch(getOtp(mobilenumber));
  };
  useEffect(() => {
    if (otp) {
      toast.show("OTP is: " + otp, {
        type: "success",
        placement: "top",
        duration: 8000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
    }
  }, [otp]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.arrowbg,
          borderRadius: 50,
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "flex-end",
          marginRight: hp("3"),
          marginBottom: hp("4"),
          marginTop: hp("2"),
        }}
        onPress={() => [
          navigation.goBack(),
          dispatch(clearOtpSuccessMessage(), dispatch(clearOtpErrorMessage())),
        ]}
      >
        <AntDesign name="arrowright" size={hp("3")} />
      </TouchableOpacity>

      <Text style={[styles.heading, styles.alignRight]}>کوڈ کی تصدیق کریں</Text>
      <Text style={[styles.caption, styles.text, styles.alignRight]}>
        آپکے نمبر پر کوڈ بھیجا گیا ہے{" "}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
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

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={getOtpHandler}>
          <Text
            style={[
              styles.text,
              { textDecorationLine: "underline", color: COLORS.green },
            ]}
          >
            کوڈ دوبارہ بھیجیں
          </Text>
        </TouchableOpacity>
        <Text style={[styles.text]}> کوڈ موصول نہیں ہوا؟</Text>
      </View>

      {pin !== "" && pin == otp ? (
        <TouchableOpacity
          style={{
            marginTop: hp("2"),
            marginBottom: hp("10"),
          }}
          onPress={() => [
            navigation.navigate("Info", { phone }),
            dispatch(
              clearOtpSuccessMessage(),
              dispatch(clearOtpErrorMessage())
            ),
          ]}
        >
          <ActiveButton text="تصدیق کریں " />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            marginTop: hp("2"),
            marginBottom: hp("10"),
          }}
        >
          <DisabledButton text="تصدیق کریں " />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  caption: {
    color: COLORS.textgrey,
  },
  alignRight: {
    alignSelf: "flex-end",
    marginRight: hp("3"),
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    marginVertical: hp("1"),
  },
  input: {
    width: wp("13"),
    height: hp("6"),
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
    color: "black",
    textAlign: "center",
    fontSize: 16,
    fontSize: hp("4"),
  },
});

export default Otp;

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
import { ActiveButton, DisabledButton } from "../../engComponents/Index";
import COLORS from "../../../assets/colors/colors";
import {
  clearOtpErrorMessage,
  clearOtpSuccessMessage,
  getOtp,
} from "../../redux/action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const Otp = () => {
    const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
    const route = useRoute();
    const phone = route.params.phone;
  const otp = useSelector((state) => state.api.otp?.data?.data?.otp);
  console.log(otp, "this is otp");

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CELL_COUNT = 6;


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
          alignSelf: "flex-start",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: hp(3),
          marginBottom: hp(5),
          marginTop: hp(8),
        }}
        onPress={() => [
            navigation.goBack(),
          dispatch(clearOtpSuccessMessage(), dispatch(clearOtpErrorMessage())),
        ]}
      >
        <AntDesign name="arrowleft" size={hp("3")} />
      </TouchableOpacity>

      <Text style={[styles.heading]}>Verification</Text>
      <Text style={[styles.caption, styles.text]}>
        A code has been sent to your number
      </Text>


      <View style={styles.root}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || isFocused ? value[index] : null}
            </Text>
          )}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={getOtpHandler}>
          <Text
            style={[
              styles.text,
              { textDecorationLine: "underline", color: COLORS.green },
            ]}
          >
            Resend Code?
          </Text>
        </TouchableOpacity>
      </View>

      {value !== "" && value == otp ? (
        <TouchableOpacity
          style={{
            marginTop: hp("2"),
            marginBottom: hp("10"),
          }}
          onPress={() => [
            navigation.navigate("Information", { phone }),
            dispatch(
              clearOtpSuccessMessage(),
              dispatch(clearOtpErrorMessage())
            ),
          ]}
        >
          <ActiveButton text="Verify" />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            marginTop: hp("2"),
            marginBottom: hp("10"),
          }}
        >
          <DisabledButton text="Verify" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { marginVertical: hp(5) },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: wp(14),
    height: hp(6.5),
    lineHeight: 50,
    fontSize: 24,
    textAlign: "center",
    borderRadius: 10,
    margin: 2,
    borderWidth: 1,
    borderColor: COLORS.grey,
  },
  focusCell: {
    borderColor: COLORS.green,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
  },
  caption: {
    color: COLORS.textgrey,
  },
  alignRight: {
    alignSelf: "flex-end",
    marginRight: hp("3"),
  },
  text: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
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

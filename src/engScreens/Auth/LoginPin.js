import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../../assets/colors/colors";
import { StatusBar } from "expo-status-bar";
import { ActiveButton, BorderButton } from "../../engComponents/Index";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLoginErrorMessage,
  clearLoginSuccessMessage,
  login,
  saveToken,
} from "../../redux/action";
import { useToast } from "react-native-toast-notifications";

const LoginPin = () => {
  const [value, setValue] = useState("");
  const [loader, setLoader] = useState(false);
  const route = useRoute();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CELL_COUNT = 4;
  const loginresponse = useSelector(
    (state) => state.api.login?.data?.data?.data
  );
  const loginSuccess = useSelector((state) => state.api?.login?.successMessage);
  const loginFailed = useSelector((state) => state.api?.login?.errorMessage);
  const loginHandler = async () => {
    setLoader(true);
    let mobile = "+92" + route.params?.phone;

    dispatch(login({ mobile, pin: value }));
  };

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
  useEffect(() => {
    if (loginresponse) {
      let token = loginresponse?.token;
      dispatch(saveToken(token));
    }
  }, [loginresponse]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.green,
      }}
    >
      <LinearGradient
        colors={["#01844D", "#009657"]}
        style={styles.background}
      />
      <Text style={styles.title}>Welcome </Text>
      <Text style={styles.text}> Enter Your Login Pin</Text>
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
              {symbol ? "*" : isFocused ? null : null}
            </Text>
          )}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
        <Text style={styles.text}>Forgot Pin?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: hp(10) }} onPress={loginHandler}>
        <BorderButton text="Login" color={COLORS.white} border={COLORS.white} />
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
  root: { paddingHorizontal: 60, paddingVertical: 20, marginTop: hp(5) },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: wp(15),
    height: hp(7),
    lineHeight: 55,
    fontSize: 24,
    textAlign: "center",
    backgroundColor: COLORS.transparentblack,
    color: "white",
    borderRadius: 10,
  },
  focusCell: {
    borderColor: "#000",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: hp("100%"),
  },
  title: {
    color: "white",
    fontFamily: "PoppinsBold",
    fontSize: 22,
    marginTop: hp(15),
    textAlign: "center",
  },
  text: {
    fontFamily: "PoppinsRegular",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
export default LoginPin;

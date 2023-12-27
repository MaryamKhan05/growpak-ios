import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import Swiper from "react-native-swiper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import DropDownPicker from "react-native-dropdown-picker";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//internal imports
import COLORS from "../../assets/colors/colors";
import {
  ActiveButton,
  DisabledButton,
  BorderButton,
} from "../components/index";

import {
  getOtp,
  getCountryCode,
  clearOtpSuccessMessage,
  clearOtpErrorMessage,
  forgetPassword,
  clearForgetErrorMessage,
  clearForgetSuccessMessage,
  clearOtpS,
  clearOtpE,
  saveToken,
} from "../redux/action";
import STYLES from "../constants/styles";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  const swiperRef = React.createRef();
  const [currentIndex, setCurrentIndex] = useState(3);
  const [pin, setPin] = useState("");
  const [calledOnce, setCalledOnce] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpCalledOnce, setOtpCalledOnce] = useState(false);

  const codeArray = [{ code: "", len: "" }];
  const [codeOpen, setCodeOpen] = useState(false);
  const [codeLabel, setCodeLabel] = useState([]);
  const [codeItems, setCodeItems] = useState([{ name: "", id: "" }]);
  const [codeid, setCodeId] = useState("");
  const [selectedCode, setSelectedCode] = useState();
  const [phonelen, setPhoneLen] = useState();
  const otp = useSelector((state) => state.api.otp?.data?.data?.otp);

  const [code, setCode] = useState();

  const coderesponse = useSelector(
    (state) => state.api.code?.data?.countryPhoneData
  );

  const successMessage = useSelector((state) => state.api?.otp.successMessage);
  const errorMessage = useSelector((state) => state.api?.otp?.errorMessage);

  const forgetSuccess = useSelector(
    (state) => state.api?.forget?.successMessage
  );

  const forgetFailed = useSelector((state) => state.api?.forget?.errorMessage);
  const forgetResponse = useSelector(
    (state) => state.api.forget?.data?.data?.data
  );

  useEffect(() => {
    if (forgetResponse) {
      let token = forgetResponse?.token;
      console.log(token, "llll");
      dispatch(saveToken(token));
    }
  }, [forgetResponse]);
  useEffect(() => {
    if (forgetFailed) {
      toast.show(forgetFailed, {
        type: "danger",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });

      dispatch(clearForgetErrorMessage());
    }
    if (forgetSuccess) {
      toast.show(forgetSuccess, {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      dispatch(clearForgetSuccessMessage());
    }
  }, [forgetSuccess, forgetFailed]);

  useEffect(() => {
    if (!calledOnce) {
      setCalledOnce(true);
      getCountryCodeHandler();
    }
    if (coderesponse) {
      for (let i = 0; i < coderesponse.length; i++) {
        codeArray.push({
          name: coderesponse[i].country,
          id: coderesponse[i].phoneLength,
        });
      }
      codeArray.shift();

      setCodeItems(codeArray);
    }
  }, [coderesponse]);

  useEffect(() => {
    if (selectedCode) {
      setPhone("");
      setPhoneLen(codeItems.filter((x) => x.name == selectedCode)[0].id);
    }
  }, [selectedCode]);

  const getCountryCodeHandler = () => {
    dispatch(getCountryCode());
  };

  const getOtpHandler = async () => {
    try {
      await AsyncStorage.setItem(
        "Phone",
        `${selectedCode.substring(
          selectedCode.indexOf("+"),
          selectedCode.length - 1
        )}${phone}`
      );
      console.log("successfully saved phone to storage");
    } catch (e) {
      console.log("err saving phone number", e);
    }
    dispatch(
      getOtp(
        `${selectedCode.substring(
          selectedCode.indexOf("+"),
          selectedCode.length - 1
        )}${phone}`
      )
    );
  };

  useEffect(() => {
    if (successMessage) {
      toast.show("OTP is: " + otp, {
        type: "success",
        placement: "top",
        duration: 6000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      dispatch(clearOtpS());
    }
    if (errorMessage) {
      toast.show("Error getting OTP, Try again later", {
        type: "success",
        placement: "top",
        duration: 6000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      dispatch(clearOtpE());
    }
  }, [otp]);

  const PIN_INPUT_COUNT = 4;
  const pinInputs = Array(PIN_INPUT_COUNT).fill(0); // Initialize an array for inputs
  // State to store the entered PIN
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

  const handleNext = () => {
    if (swiperRef.current && currentIndex > 0) {
      const nextIndex = currentIndex - 1; // Decrement the index
      swiperRef.current.scrollBy(-1); // Move to the previous slide
      setCurrentIndex(nextIndex);
    }
  };

  const dotStyle =
    Platform.OS == "android" ? styles.androidDotStyle : styles.iosDotStyle;
  const headingText =
    Platform.OS == "android" ? STYLES.swiperTitle : styles.heading;
  const text = Platform.OS == "android" ? STYLES.text : styles.text;

  const OTP_PIN_INPUT_COUNT = 6; // Update the count to 6
  const pinOtpInputs = Array(OTP_PIN_INPUT_COUNT).fill(0); // Initialize an array for inputs
  const [otpPin, setOtpPin] = useState(""); // State to store the entered PIN
  const otpInputRefs = useRef(pinOtpInputs.map(() => React.createRef())); // Refs for input fields

  const focusNextOtpInput = (otpCurrentIndex) => {
    if (otpCurrentIndex < OTP_PIN_INPUT_COUNT - 1) {
      otpInputRefs.current[otpCurrentIndex + 1].current.focus();
    }
  };

  const focusPreviousOtpInput = (otpCurrentIndex) => {
    if (otpCurrentIndex > 0) {
      otpInputRefs.current[otpCurrentIndex - 1].current.focus();
    }
  };

  const handleOtpTextInput = (text, otpCurrentIndex) => {
    const newPin =
      otpPin.substring(0, otpCurrentIndex) +
      text +
      otpPin.substring(otpCurrentIndex + 1);
    setOtpPin(newPin);

    if (text !== "") {
      focusNextOtpInput(otpCurrentIndex);
    } else {
      focusPreviousOtpInput(otpCurrentIndex);
    }
  };

  const loginHandler = () => {
    dispatch(forgetPassword({ pin, otp, phone }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Swiper
        ref={swiperRef}
        loop={false}
        index={2}
        onIndexChanged={(index) => setCurrentIndex(index)}
        dotStyle={dotStyle}
        activeDotColor={COLORS.orange}
        activeDotStyle={dotStyle}
      >
        {/** step 3  */}
        <View
          style={{
            alignItems: "center",
            marginTop: hp(10),
          }}
        >
          <Text style={headingText}>اپنا نیا لاگ ان پن درج کریں </Text>
          <Text
            style={[
              text,
              { color: COLORS.textgrey, textAlign: "center", width: wp("80") },
            ]}
          >
            آپ اپنےگروپاک اکاؤنٹ میں لاگ ان کرنے کے لیے ان 4 ہندسوں کا لاگ ان پن
            استعمال کریں گے
          </Text>
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
                style={{
                  width: wp("15"),
                  height: hp("7"),
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLORS.grey,
                  color: COLORS.black,
                  textAlign: "center",
                  fontSize: hp("4"),
                }}
                keyboardType="number-pad"
                maxLength={1}
                value={pin[index] || ""}
                ref={inputRefs.current[index]}
                onChangeText={(text) => handleTextInput(text, index)}
                secureTextEntry={true}
              />
            ))}
          </View>
          {pin !== "" ? (
            <TouchableOpacity onPress={loginHandler}>
              <ActiveButton text="آگے بڑھیں   " />
            </TouchableOpacity>
          ) : (
            <View
              style={{
                marginTop: hp("2"),
                marginBottom: hp("10"),
              }}
            >
              <DisabledButton text="آگے بڑھیں   " />
            </View>
          )}
        </View>

        {/** step 2 */}
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginTop: hp(5),
            }}
          >
            {Platform.OS == "android" ? (
              <Text style={[STYLES.title, styles.alignRight]}>
                کوڈ کی تصدیق کریں{" "}
              </Text>
            ) : (
              <Text
                style={[
                  { fontFamily: "CustomFont", fontSize: 32, fontWeight: "400" },
                  styles.alignRight,
                ]}
              >
                کوڈ کی تصدیق کریں{" "}
              </Text>
            )}
          </View>
          <Text
            style={[
              styles.caption,
              styles.text,
              styles.alignRight,
              { marginRight: 10 },
            ]}
          >
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
            {pinOtpInputs.map((_, index) => (
              <TextInput
                key={index}
                style={styles.pinInput}
                keyboardType="number-pad"
                maxLength={1}
                value={otpPin[index] || ""}
                ref={otpInputRefs.current[index]}
                onChangeText={(text) => handleOtpTextInput(text, index)}
                secureTextEntry={true}
              />
            ))}
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => [setOtpPin(""), getOtpHandler()]}>
              <Text
                style={[
                  styles.text,
                  { textDecorationLine: "underline", color: COLORS.green },
                ]}
              >
                کوڈ دوبارہ بھیجیں{" "}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.text]}> کوڈ موصول نہیں ہوا؟</Text>
          </View>

          {otpPin == otp ? (
            <TouchableOpacity
              style={{
                marginTop: hp("2"),
                marginBottom: hp("10"),
              }}
              onPress={handleNext}
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

        {/** step 1 */}
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            alignItems: "center",
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginTop: hp(5),
              }}
            >
              {Platform.OS == "android" ? (
                <Text style={[STYLES.title, styles.alignRight]}>
                  لاگ ان پن تبدیل کریں
                </Text>
              ) : (
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont",
                      fontSize: 32,
                      fontWeight: "400",
                    },
                    styles.alignRight,
                  ]}
                >
                  لاگ ان پن تبدیل کریں
                </Text>
              )}

              <Text
                style={[
                  {
                    color: COLORS.textgrey,
                  },
                  styles.alignRight,
                  text,
                ]}
              >
                آگے بڑھنے کے لیئے اپنا موبائل نمبر درج کریں
              </Text>
            </View>
            <View style={styles.inputparentcontainer}>
              <Text style={text}>ملک</Text>
              <DropDownPicker
                style={styles.dropdown}
                textStyle={{
                  fontFamily: "CustomFont",
                  color: COLORS.disableBlack,
                  fontSize: 18,
                  textAlign: "right",
                }}
                showArrowIcon={false}
                listMode="MODAL"
                placeholder="ملک"
                open={codeOpen}
                value={codeLabel}
                items={codeItems.map((index) => ({
                  label: index.name,
                  value: index.name,
                }))}
                setOpen={setCodeOpen}
                setValue={setCodeLabel}
                onSelectItem={(item) => {
                  setSelectedCode(item.label);
                }}
                searchable={true}
                searchPlaceholder="Search.."
              />
            </View>
            <View style={styles.inputparentcontainer}>
              <Text style={text}>موبائل نمبر</Text>
              <TextInput
                placeholder=""
                placeholderTextColor="black"
                style={styles.input}
                value={phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType="number-pad"
                maxLength={phonelen}
              />
            </View>

            {phone.length == phonelen ? (
              <TouchableOpacity
                style={{
                  marginTop: hp("2"),
                  marginBottom: hp("10"),
                }}
                onPress={() => [handleNext(), getOtpHandler()]}
              >
                <ActiveButton text="موبائل نمبر کی تصدیق کریں " />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  marginTop: hp("2"),
                  marginBottom: hp("10"),
                }}
              >
                <DisabledButton text="موبائل نمبر کی تصدیق کریں " />
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infocontainer: {
    marginTop: hp("5"),
    alignSelf: "center",
    width: wp("94"),
    alignItems: "flex-end",
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    marginVertical: hp("1"),
  },
  radiotext: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: hp("1.5"),
    width: wp("90"),
    borderRadius: 8,
    textAlign: "right",
    fontWeight: "400",
    fontSize: 16,
    marginBottom: hp("1"),
    fontFamily: "CustomFont",
    marginVertical: 5,
  },
  optionContainer: {
    borderWidth: 1,
    borderRadius: hp("5"),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: wp("50"),
  },
  genderContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  icon: {
    marginLeft: hp("1.2"),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: hp("1.5"),
    width: wp("90"),
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationinput: {
    textAlign: "right",
    fontWeight: "400",
    fontSize: 16,
    fontFamily: "CustomFont",
  },
  avatarContainer: {
    alignSelf: "center",
    borderRadius: 50,
    backgroundColor: COLORS.grey,
    padding: hp("0.3"),
    width: wp("23"),
    height: hp("11"),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  dropdown: {
    borderColor: COLORS.grey,
    width: wp("90"),
    alignSelf: "center",
    alignItems: "center",
  },
  androidDotStyle: {
    width: wp("12"),
    marginTop: hp("-176"),
    // marginBottom:hp(10)
  },
  iosDotStyle: {
    width: wp("12"),
    marginTop: hp("-168"),
  },
  alignRight: {
    // alignSelf: "flex-end",
    alignSelf: "center",
  },
  inputparentcontainer: {
    marginVertical: hp("1"),
    marginBottom: 10,
    alignItems: "flex-end",
    marginRight: hp("1"),
  },
  pinInput: {
    width: wp("13"),
    height: hp("6"),
    // padding: hp('3'),
    // backgroundColor: COLORS.transparentblack,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
    color: "black",
    textAlign: "center",
    fontSize: 16,
    // fontWeight: 400,
    fontSize: hp("4"),
  },
  caption: {
    color: COLORS.textgrey,
  },
});

export default ForgotPassword;

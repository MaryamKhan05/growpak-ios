import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

//internal imports
import {
  ActiveButton,
  BorderButton,
  DisabledButton,
} from "../components/index";
import COLORS from "../../assets/colors/colors";
import STYLES from "../constants/styles";
import { getOtp, getCountryCode } from "../redux/action";

const Signup = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const otp = useSelector((state) => state.api.otp.data);
  const coderesponse = useSelector(
    (state) => state.api.code?.data?.countryPhoneData
  );

  let otpMessage = useSelector((state) => state.api.otp?.successMessage);
  const navigation = useNavigation();

  const [phone, setPhone] = useState("");
  const [calledOnce, setCalledOnce] = useState(false);

  const codeArray = [{ code: "", len: "" }];
  const [codeOpen, setCodeOpen] = useState(false);
  const [codeLabel, setCodeLabel] = useState([]);
  const [codeItems, setCodeItems] = useState([{ name: "", id: "" }]);
  const [selectedCode, setSelectedCode] = useState();
  const [phonelen, setPhoneLen] = useState();
  const [toastShow, setToastShow] = useState(false);

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
    navigation.navigate("Otp", { phone });
  };

  useEffect(() => {
    if (otpMessage && !toastShow) {
      console.log("hello",otpMessage)
      setToastShow(true);
      toast.show(otpMessage, {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
     
    }
  }, [otp]);

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
  const getCountryCodeHandler = async () => {
    dispatch(getCountryCode());
  };

  const text = Platform.OS == "android" ? styles.androidText : styles.iosText;
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          margin: hp("4"),
          width: wp(95),
        }}
      >
        <Image
          style={[
            styles.alignRight,
            {
              height: 20,
              width: 30,
              marginHorizontal: 5,
            },
          ]}
          source={require("../../assets/logo03.png")}
        />
        <Text style={{ fontSize: 16, fontWeight: "700", color: COLORS.green }}>
          GROWPAK
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {Platform.OS == "android" ? (
          <Text style={[STYLES.title, styles.alignRight]}>
            گروٹیک میں خوش آمدید
          </Text>
        ) : (
          <Text
            style={[
              { fontFamily: "CustomFont", fontSize: 32, fontWeight: "400" },
              styles.alignRight,
            ]}
          >
            گروٹیک میں خوش آمدید
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
          اکاؤنٹ رجسٹر کرنے کے لیئے اپنا موبائل نمبر درج کریں
        </Text>

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
            searchable={true} // Enable search
            searchPlaceholder="Search.."
            searchError="Country not found"
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
            onPress={getOtpHandler}
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

        <Text style={[text, { marginBottom: hp(1) }]}>
          آپ کے پاس پہلے سے اکاونٹ ہے؟{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <BorderButton
            text="لاگ ان کریں "
            color={COLORS.green}
            border={COLORS.grey}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  alignRight: {
    alignSelf: "flex-end",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: hp("1.5"),
    width: wp("91"),
    borderRadius: 8,
    textAlign: "right",
    fontWeight: "400",
    fontSize: 16,
    marginVertical: hp("0.5"),
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
  inputparentcontainer: {
    marginVertical: hp("1"),
    marginBottom: 10,
    alignItems: "flex-end",
    marginRight: hp("1"),
  },
  dropdown: {
    borderColor: COLORS.grey,
    width: wp("91"),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp("0.5"),
  },
  androidText: {
    fontSize: 21,
    fontWeight: "400",
    fontFamily: "CustomFont",
    textAlign: "center",
    letterSpacing: -3,
  },
  iosText: {
    fontSize: 21,
    fontWeight: "400",
    fontFamily: "CustomFont",
    textAlign: "center",
  },
});

export default Signup;

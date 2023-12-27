import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import DropDownPicker from "react-native-dropdown-picker";

//internal imports
import {
  ActiveButton,
  BorderButton,
  DisabledButton,
} from "../../engComponents/Index";
import COLORS from "../../../assets/colors/colors";
import {  getCountryCode } from "../../redux/action";

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const coderesponse = useSelector(
    (state) => state.api.code?.data?.countryPhoneData
  );

  const [phone, setPhone] = useState("");
  const [calledOnce, setCalledOnce] = useState(false);

  const codeArray = [{ code: "", len: "" }];
  const [codeOpen, setCodeOpen] = useState(false);
  const [codeLabel, setCodeLabel] = useState([]);
  const [codeItems, setCodeItems] = useState([{ name: "", id: "" }]);
  const [selectedCode, setSelectedCode] = useState();
  const [phonelen, setPhoneLen] = useState();

  let loginData = useSelector((state) => state.api.login?.data?.data);
  console.log(loginData, "login data on Login");
  
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

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: hp("4"),
          width: wp(95),
        }}
      >
        <Image
          style={[
            {
              height: 20,
              width: 30,
              marginHorizontal: 5,
            },
          ]}
          source={require("../../../assets/logo03.png")}
        />
        <Text
          style={{
            fontSize: 16,
            color: COLORS.green,
            fontFamily: "PoppinsBold",
          }}
        >
          GROWPAK
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Welcome</Text>

        <Text
          style={[
            {
              color: COLORS.textgrey,
            },
            styles.text,
          ]}
        >
          To Move Forward Enter Your Mobile Number
        </Text>
        <View style={{ marginTop: hp(5) }}>
          <View style={styles.inputparentcontainer}>
            <Text style={styles.text}>Country</Text>
            <DropDownPicker
              style={styles.dropdown}
              textStyle={{
                fontFamily: "PoppinsRegular",
                color: COLORS.disableBlack,
                fontSize: 12,
              }}
              showArrowIcon={false}
              listMode="MODAL"
              placeholder="Country"
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
              searchError="Country not found"
            />
          </View>
          <View style={styles.inputparentcontainer}>
            <Text style={styles.text}>Mobile Number</Text>
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
        </View>
        {phone.length == phonelen ? (
          <TouchableOpacity
            style={{
              marginTop: hp(5),
              marginBottom: hp("10"),
            }}
            onPress={() => navigation.navigate("LoginPin", { phone })}
          >
            <ActiveButton text="Next" />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              marginTop: hp(5),
              marginBottom: hp("10"),
            }}
          >
            <DisabledButton text="Next" />
          </View>
        )}

        <Text
          style={[
            styles.text,
            { marginBottom: hp(1), textAlign: "center", marginTop: hp(10) },
          ]}
        >
          Already Have an Account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <BorderButton
            text="Sign Up"
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
    paddingVertical: hp(2),
  },
  alignRight: {
    alignSelf: "flex-end",
  },
  text: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: hp("1.5"),
    width: wp("91"),
    borderRadius: 8,
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
  },
  inputparentcontainer: {
    marginVertical: hp("1"),
    marginBottom: 10,
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

  title: {
    fontFamily: "PoppinsBold",
    fontSize: 20,
  },
});

export default Login;

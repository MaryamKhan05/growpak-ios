import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../../assets/colors/colors";
import { ActiveButton, DisabledButton } from "../../engComponents/Index";
import { useDispatch, useSelector } from "react-redux";
import {
  clearJazzcashResponse,
  jazzcash,
  postJazzcashResponse,
} from "../../redux/action";
import { useToast } from "react-native-toast-notifications";
const JAZZCASH = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const toast = useToast();
  const navigation = useNavigation();

  const [phone, setPhone] = useState();
  const [cnic, setCnic] = useState();
  const [loading, setLoading] = useState(false);
  const response = useSelector((state) => state.api.jazzcash?.data);

  const paymentHandler = () => {
    setLoading(true);
    let a = route.params?.amount;
    dispatch(jazzcash({ cnic, phone, a }));
  };
  useEffect(() => {
    if (response?.pp_ResponseCode === "156") {
      setLoading(false);
      toast.show(response?.pp_ResponseMessage, {
        type: "danger",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      dispatch(clearJazzcashResponse());
      navigation.navigate("Farm");
    }
    if (response?.pp_ResponseCode === "000") {
      setLoading(false);
      toast.show(response?.pp_ResponseMessage, {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      let amount = response?.pp_Amount;
      let billRef = response?.pp_BillReference;
      let cnic = response?.pp_CNIC;
      let lan = response?.pp_Language;
      let merchantId = response?.pp_MerchantID;
      let resCode = response?.pp_ResponseCode;
      let resMsg = response?.pp_ResponseMessage;
      let retRefNo = response?.pp_RetreivalReferenceNo;
      let secureHash = response?.pp_SecureHash;
      let tDateTime = response?.pp_TxnDateTime;
      let tRefNo = response?.pp_TxnRefNo;
      let tCurr = response?.pp_TxnCurrency;
      let tType = response?.pp_TxnType;
      let pId = route.params?.pid;
      let fId = route.params?.farmId;
      dispatch(
        postJazzcashResponse({
          amount,
          billRef,
          lan,
          merchantId,
          resCode,
          resMsg,
          retRefNo,
          secureHash,
          tType,
          pId,
          fId,
          tDateTime,
          tRefNo,
          tCurr,
          cnic,
        })
      );
      navigation.navigate("Success");
    }
  }, [response]);

  if (loading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size={"large"} color={COLORS.green} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.inputparentcontainer}>
        <Text style={styles.text}>Mobile Number</Text>
        <TextInput
          placeholder=""
          placeholderTextColor="black"
          style={styles.input}
          value={phone}
          onChangeText={(text) => setPhone(text)}
          keyboardType="number-pad"
          maxLength={11}
        />
      </View>
      <View style={styles.inputparentcontainer}>
        <Text style={styles.text}>Last 6 digits of CNIC</Text>
        <TextInput
          placeholder=""
          placeholderTextColor="black"
          style={styles.input}
          value={cnic}
          onChangeText={(text) => setCnic(text)}
          keyboardType="number-pad"
          maxLength={6}
        />
      </View>
      <View style={{ marginTop: hp(5) }}>
        {phone && phone.length == 11 && cnic && cnic.length == 6 ? (
          <TouchableOpacity onPress={paymentHandler}>
            <ActiveButton text="Next" />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              marginBottom: hp("10"),
            }}
          >
            <DisabledButton text="Next" />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputparentcontainer: {
    marginVertical: hp("1"),
    marginBottom: 10,
    marginLeft: hp("1"),
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: hp("1.5"),
    width: wp(95),
    borderRadius: 8,
    fontWeight: "400",
    fontSize: 14,
    marginVertical: hp("0.5"),
  },
  text: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    textAlign: "left",
  },
});
export default JAZZCASH;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import COLORS from "../../../assets/colors/colors";
import { ActiveButton } from "../../components/index";
import { useNavigation } from "@react-navigation/native";
import { clearJazzcashResponse } from "../../redux/action";
const JazzcashSuccess = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const response = useSelector((state) => state.api.jazzcash?.data);
  const inputString = response?.pp_TxnDateTime;

  const year = inputString?.substring(0, 4);
  const month = inputString?.substring(4, 6);
  const day = inputString?.substring(6, 8);
  const hour = inputString?.substring(8, 10);
  const minute = inputString?.substring(10, 12);
  const second = inputString?.substring(12, 14);

  const dateString = `${year}-${month}-${day}`;
  const timeString = `${hour}:${minute}:${second}`;

  let amountPaid = response?.pp_Amount.slice(0, -2);
  console.log(amountPaid, "amount paid");

  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome5
        name="check-circle"
        color={COLORS.green}
        size={hp(10)}
        style={{ marginTop: hp(20) }}
      />
      <Text style={styles.heading}>Transaction Successful</Text>
      <Text>{response?.pp_TxnRefNo}</Text>
      <Text>
        On {dateString} at {timeString}{" "}
      </Text>
      <Text style={styles.amount}>Rs. {amountPaid}</Text>
      <View
        style={{
          width: wp(80),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.row}>
          <Text style={styles.text}>To: </Text>
          <Text style={styles.receiver}>Growtech Services Pvt Ltd</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>From: </Text>
          <Text style={styles.receiver}>{response?.pp_MobileNumber}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={{ marginTop: hp(2) }}
        onPress={() => [
          navigation.navigate("Home"),
          dispatch(clearJazzcashResponse()),
        ]}
      >
        <ActiveButton text="ہو گیا"></ActiveButton>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "900",
    margin: hp(2),
  },
  amount: {
    fontSize: 32,
    fontWeight: "900",
    margin: hp(5),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: hp(1),
  },
  receiver: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.green,
    width: wp(60),
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    width: wp(20),
  },
});

export default JazzcashSuccess;

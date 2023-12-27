import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useToast } from "react-native-toast-notifications";
import COLORS from "../../../assets/colors/colors";
import { BorderButton } from "../../engComponents/Index";
import { useSelector } from "react-redux";

const BuyPackages = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const toast = useToast();

  const response = useSelector((state) => state.api.farmbyid?.data?.data[0]);

  let p = response?.area * route.params?.price;
  let totalPrice = parseInt(p);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <ImageBackground
          source={{ uri: route.params?.img }}
          style={{
            width: wp(100),
            borderRadius: 40,
            overflow: "hidden",
            alignSelf: "center",
            top: 5,
            height: hp(27),
            justifyContent:"center"
          }}
          resizeMode="stretch"
        >
          <Text style={styles.title}>{route.params?.title}</Text>
          <Text style={styles.caption}>{route.params?.caption}</Text>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginTop: hp(3),
              alignItems: "center",
            }}
          >
            <Text style={styles.priceText}>Total </Text>
            <Text style={styles.price}> Rs {totalPrice}</Text>
          </View>
        </ImageBackground>

        <View style={styles.detailsContainer}>
          <Text style={[styles.title, { textAlign: "left" }]}>
            Package Details
          </Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Farm Name</Text>
            <Text style={styles.responseText}>{response?.farm_name}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Crop </Text>
            <Text style={styles.responseText}>{response?.crop_name}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Sowing Date </Text>
            <Text style={styles.responseText}>{response?.sow_date}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Total Acre</Text>
            <Text style={styles.responseText}>{response?.area} </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Price per acre </Text>
            <Text style={styles.responseText}>Rs {route.params?.price}/-</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Total Price</Text>
            <Text style={styles.responseText}>Rs {totalPrice} /-</Text>
          </View>
          <View style={{ marginTop: hp(2) }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("JazzCash", {
                  amount: totalPrice,
                  farmId: route.params?.fid,
                  pid: route.params?.pid,
                })
              }
            >
              <BorderButton
                border={COLORS.grey}
                text="Pay by Card or JazzCash"
                color={COLORS.green}
                source={require("../../../assets/grp4.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                toast.show("We're working on it !", {
                  type: "warning",
                  placement: "bottom",
                  duration: 2000,
                  offset: 30,
                  animationType: "zoom-in",
                  swipeEnabled: true,
                })
              }
            >
              <BorderButton
                border={COLORS.grey}
                color={COLORS.green}
                text="One Link Voucher"
                source={require("../../../assets/1link.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    marginTop: 10,
  },
  caption: {
    fontSize: 16,
    fontFamily: "PoppinsSemi",
    textAlign: "center",
    color: COLORS.textgrey,
  },
  priceText: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    color: COLORS.textgrey,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    color: COLORS.green,
    fontFamily: "PoppinsBold",
  },
  text: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: COLORS.disableBlack,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 1,
  },
  titleContainer: {
    backgroundColor: "#D09F56C9",
    borderRadius: 18,
    width: wp(90),
    alignSelf: "center",
    alignItems: "center",
    marginTop: hp(2),
    height: hp(25),
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  detailsContainer: {
    backgroundColor: COLORS.white,
    height: "100%",
    marginTop: 5,
    padding: hp(1),
    paddingHorizontal: hp(2),
  },
  responseText: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
  },
});

export default BuyPackages;

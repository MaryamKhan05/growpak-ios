import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
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
import { BorderButton } from "../../components/index";
import { useSelector } from "react-redux";

const BuyPackages = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const toast = useToast();
  // console.log(route.params,'akakakakakkakkakak')

  const response = useSelector((state) => state.api.farmbyid?.data?.data[0]);

  let p = response?.area * route.params?.price;
  let totalPrice = parseInt(p);
  const packageResponse = useSelector(
    (state) => state.api?.packages?.data?.data
  );

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
            <Text style={styles.priceText}>کل قیمت</Text>
            <Text style={styles.price}> Rs {totalPrice}</Text>
          </View>
        </ImageBackground>

        <View style={styles.detailsContainer}>
          <Text style={[styles.title, { textAlign: "right" }]}>
            پیکیج کی تفصیلات
          </Text>
          <View style={styles.textContainer}>
            <Text>{response?.farm_name}</Text>
            <Text style={styles.text}>فارم کا نام:</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>{response?.crop_name}</Text>
            <Text style={styles.text}> فصل کا نام: </Text>
          </View>
          <View style={styles.textContainer}>
            <Text>{response?.sow_date}</Text>
            <Text style={styles.text}>بوائی کی تاریخ: </Text>
          </View>
          <View style={styles.textContainer}>
            <Text>{response?.area} </Text>
            <Text style={styles.text}>کل ایکڑ: </Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Rs {route.params?.price}/-</Text>
            <Text style={styles.text}>قیمت فی ایکڑ: </Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Rs {totalPrice} /-</Text>
            <Text style={styles.text}>کل قیمت: </Text>
          </View>
          <View style={{ marginTop: hp(2) }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Jazzcash", {
                  amount: totalPrice,
                  farmId: route.params?.fid,
                  pid: route.params?.pid,
                })
              }
            >
              <BorderButton
                border={COLORS.grey}
                text=" کارڈ یا جیز کیش سے ادائیگی کریں"
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
                text="1-بل واؤچر بنائیں  "
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
    fontWeight: "400",
    fontSize: 32,
    fontFamily: "CustomFont",
    textAlign: "center",
  },
  caption: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    textAlign: "center",
    color: COLORS.textgrey,
  },
  priceText: {
    fontSize: 24,
    fontWeight: "400",
    fontFamily: "CustomFont",
    color: COLORS.textgrey,
    textAlign: "center",
  },
  price: {
    fontWeight: "600",
    fontSize: 24,
    color: COLORS.green,
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    textAlign: "right",
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
});

export default BuyPackages;

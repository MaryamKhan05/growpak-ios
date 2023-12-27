import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import COLORS from "../../assets/colors/colors";
import { ActiveButton, AudioPlayer } from "../components/index";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getFarmsById } from "../redux/action";
const TabViewComponent = (props) => {
  const size = hp(2.4);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let title = props.title;
  let caption = props.caption;
  let farmId = props.farmId;
  let price = props.price;

  const purchaseHandler = () => {
    dispatch(getFarmsById(farmId));
    navigation.navigate("BuyPackages", {
      title,
      caption,
      price,
      pid: props?.id,
      fid: props?.farmId,
      img:props?.img
    });
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        width: wp(90),
        alignSelf: "center",
        borderRadius: 12,
        marginTop: hp(2),
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <ImageBackground
        source={{ uri: props.img }}
        style={{
          width: wp(90),
          borderRadius: 25,
          overflow: "hidden",
          alignSelf: "center",
          top: 5,
        }}
      >
        {/* header view */}
        <View style={{ height: hp(22), padding: 15 }}>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[styles.text, { color: COLORS.textgrey }]}>
              Rs. {props.price} فی ایکڑ
            </Text>
            <Text style={styles.heading}>{props.title} </Text>
          </View>
          <Text
            style={[
              styles.text,
              {
                color: COLORS.textgrey,
                textAlign: "right",
                marginVertical: 10,
              },
            ]}
          >
            {props.caption}
          </Text>
        </View>
      </ImageBackground>
      <AudioPlayer url={props.url} />
      {/* options container view */}
      <View style={{ }}>
        {/* option row 1  */}
        <View style={styles.optionRowParent}>
          <Text
            style={[
              styles.optionsText,
              { color: props.first ? COLORS.disableBlack : COLORS.grey },
            ]}
          >
            1 رپورٹ
          </Text>
          <View style={styles.miniRow}>
            <Text
              style={[
                styles.optionsText,
                { color: props.first ? COLORS.disableBlack : COLORS.grey },
              ]}
            >
              نامیاتی مادہ کا تجزیہ{" "}
            </Text>
            {props.first ? (
              <Ionicons
                name="checkmark-circle"
                size={size}
                color={COLORS.green}
                style={styles.icon}
              />
            ) : (
              <MaterialIcons
                name="cancel"
                size={size}
                color={COLORS.textgrey}
                style={styles.icon}
              />
            )}
          </View>
        </View>

        {/* option row 2 */}
        <View style={styles.optionRowParent}>
          <Text
            style={[
              styles.optionsText,
              { color: props.second ? COLORS.disableBlack : COLORS.grey },
            ]}
          >
            1 رپورٹ
          </Text>
          <View style={styles.miniRow}>
            <Text
              style={[
                styles.optionsText,
                { color: props.second ? COLORS.disableBlack : COLORS.grey },
              ]}
            >
              {" "}
              زمین میں موجود نائٹروجن کا تجزیہ{" "}
            </Text>
            {props.second ? (
              <Ionicons
                name="checkmark-circle"
                size={size}
                color={COLORS.green}
                style={styles.icon}
              />
            ) : (
              <MaterialIcons
                name="cancel"
                size={size}
                color={COLORS.textgrey}
                style={styles.icon}
              />
            )}
          </View>
        </View>

        {/* option row 4 */}
        <View style={styles.optionRowParent}>
          <Text
            style={[
              styles.optionsText,
              { color: props.fourth ? COLORS.disableBlack : COLORS.grey },
            ]}
          >
            ہر 8 سے 10 دن
          </Text>
          <View style={styles.miniRow}>
            <Text
              style={[
                styles.optionsText,
                { color: props.fourth ? COLORS.disableBlack : COLORS.grey },
              ]}
            >
              {" "}
              پودوں کی صحت کا تجزیہ{" "}
            </Text>
            {props.fourth ? (
              <Ionicons
                name="checkmark-circle"
                size={size}
                color={COLORS.green}
                style={styles.icon}
              />
            ) : (
              <MaterialIcons
                name="cancel"
                size={size}
                color={COLORS.textgrey}
                style={styles.icon}
              />
            )}
          </View>
        </View>

        {/* option row 5  */}
        <View style={styles.optionRowParent}>
          <Text
            style={[
              styles.optionsText,
              { color: props.fifth ? COLORS.disableBlack : COLORS.grey },
            ]}
          >
            ہر 8 سے 10 دن
          </Text>
          <View style={styles.miniRow}>
            <Text
              style={[
                styles.optionsText,
                { color: props.fifth ? COLORS.disableBlack : COLORS.grey },
              ]}
            >
              {" "}
              پانی کی دستیابی کا تجزیہ{" "}
            </Text>
            {props.fifth ? (
              <Ionicons
                name="checkmark-circle"
                size={size}
                color={COLORS.green}
                style={styles.icon}
              />
            ) : (
              <MaterialIcons
                name="cancel"
                size={size}
                color={COLORS.textgrey}
                style={styles.icon}
              />
            )}
          </View>
        </View>

        {/* option row 6 */}
        <View style={styles.optionRowParent}>
          <Text
            style={[
              styles.optionsText,
              { color: props.sixth ? COLORS.disableBlack : COLORS.grey },
            ]}
          ></Text>
          <View style={styles.miniRow}>
            <Text
              style={[
                styles.optionsText,
                { color: props.sixth ? COLORS.disableBlack : COLORS.grey },
              ]}
            >
              {" "}
              مینیجمنٹ زونز{" "}
            </Text>
            {props.sixth ? (
              <Ionicons
                name="checkmark-circle"
                size={size}
                color={COLORS.green}
                style={styles.icon}
              />
            ) : (
              <MaterialIcons
                name="cancel"
                size={size}
                color={COLORS.textgrey}
                style={styles.icon}
              />
            )}
          </View>
        </View>

        {/* option row 7 */}
        <View style={styles.optionRowParent}>
          <Text
            style={[
              styles.optionsText,
              { color: props.seventh ? COLORS.grey : COLORS.disableBlack },
            ]}
          ></Text>
          <View style={styles.miniRow}>
            <Text
              style={[
                styles.optionsText,
                { color: props.seventh ? COLORS.grey : COLORS.disableBlack },
              ]}
            >
              {" "}
              کھیت کی بیسٹ ایگری پریکٹسز{" "}
            </Text>
            {props.seventh ? (
              <MaterialIcons
                name="cancel"
                size={size}
                color={COLORS.textgrey}
                style={styles.icon}
              />
            ) : (
              <Ionicons
                name="checkmark-circle"
                size={size}
                color={COLORS.green}
                style={styles.icon}
              />
            )}
          </View>
        </View>

      </View>
      <Text style={styles.terms}>{props.terms}</Text>
      <TouchableOpacity
        style={{ marginVertical: hp(2) }}
        onPress={purchaseHandler}
      >
        <ActiveButton text="پیکیج خریدیں" width={wp("80%")} />
      </TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "400",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  optionsText: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "CustomFont",
    color: COLORS.disableBlack,
  },
  icon: {
    marginLeft: 10,
  },
  optionRowParent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: hp(2),
  },
  miniRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  terms:{
    fontFamily:"CustomFont",
    fontSize:18,
    color:"red",
    margin:5,
    textAlign:"right"
  }
});

export default TabViewComponent;

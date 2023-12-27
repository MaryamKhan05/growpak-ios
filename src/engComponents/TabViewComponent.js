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
import { AudioPlayer } from "../components/index";
import { ActiveButton } from "../engComponents/Index";

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
    navigation.navigate("BuyPackage", {
      title,
      caption,
      price,
      pid: props?.id,
      fid: props?.farmId,
      img: props?.img,
    });
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        width: wp(90),
        alignSelf: "center",
        borderRadius: 12,
        marginTop: hp(1),
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
          width: wp(88),
          borderRadius: 30,
          overflow: "hidden",
          alignSelf: "center",
          top: 5,
        }}
      >
        {/* header view */}
        <View style={{ height: hp(18), padding: 15 }}>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.heading}>{props.title} </Text>
            <Text style={[styles.text, { color: COLORS.textgrey }]}>
              Rs. {props.price} Per Acre
            </Text>
          </View>
          <Text
            style={[
              styles.text,
              {
                color: COLORS.textgrey,
                textAlign: "left",
                marginVertical: 10,
                fontFamily: "PoppinsSemi",
              },
            ]}
          >
            {props.caption}
          </Text>
        </View>
      </ImageBackground>
      <AudioPlayer url={props.url} />
      {/* options container view */}
      <View style={{}}>
        {/* option row 1  */}
        <View style={styles.optionRowParent}>
          <View style={styles.miniRow}>
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
            <Text
              style={[
                styles.optionsText,
                { color: props.first ? COLORS.disableBlack : COLORS.grey },
              ]}
            >
              Soil Organic Carbon Analysis
            </Text>
          </View>
          <Text
            style={[
              styles.optionsText,
              { color: props.first ? COLORS.disableBlack : COLORS.grey },
            ]}
          >
            1 Report
          </Text>
        </View>

        {/* option row 2 */}
        <View style={styles.optionRowParent}>
          <View style={styles.miniRow}>
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
            <Text
              style={[
                styles.optionsText,
                { color: props.second ? COLORS.disableBlack : COLORS.grey },
              ]}
            >
              Nitrogen Analysis
            </Text>
          </View>
          <Text
            style={[
              styles.optionsText,
              { color: props.second ? COLORS.disableBlack : COLORS.grey },
            ]}
          >
            1 Report
          </Text>
        </View>

     
        {/* option row 4 */}
        <View style={styles.optionRowParent}>
          <View style={styles.miniRow}>
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
            <Text
              style={[
                styles.optionsText,
                { color: props.fourth ? COLORS.disableBlack : COLORS.grey },
              ]}
            >
              Plant Health Analysis
            </Text>
          </View>
          <Text
            style={[
              styles.optionsText,
              { color: props.fourth ? COLORS.disableBlack : COLORS.grey },
            ]}
          >
            Every 8-10 day
          </Text>
        </View>
        {/* option row 5  */}
        <View style={styles.optionRowParent}>
          <View style={styles.miniRow}>
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
            <Text
              style={[
                styles.optionsText,
                { color: props.fifth ? COLORS.disableBlack : COLORS.grey },
              ]}
            >
              Water Stress Analysis
            </Text>
          </View>
          <Text
            style={[
              styles.optionsText,
              { color: props.fifth ? COLORS.disableBlack : COLORS.grey },
            ]}
          >
            Every 8-10 day
          </Text>
        </View>
        {/* option row 6 */}
        <View style={styles.optionRowParent}>
          <View style={styles.miniRow}>
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
            <Text
              style={[
                styles.optionsText,
                {
                  color: props.sixth ? COLORS.disableBlack : COLORS.grey,
                  textAlign: "left",
                },
              ]}
            >
              Management Zones
            </Text>
          </View>
          <Text
            style={[
              styles.optionsText,
              { color: props.sixth ? COLORS.disableBlack : COLORS.grey },
            ]}
          ></Text>
        </View>
        {/* option row 7 */}
        <View style={styles.optionRowParent}>
          <View style={styles.miniRow}>
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
            <Text
              style={[
                styles.optionsText,
                { color: props.seventh ? COLORS.grey : COLORS.disableBlack },
              ]}
            >
              Best Agricultural Practices
            </Text>
          </View>
          <Text
            style={[
              styles.optionsText,
              { color: props.seventh ? COLORS.grey : COLORS.disableBlack },
            ]}
          ></Text>
        </View>
      </View>
      <Text style={styles.terms}>{props.terms}</Text>
      <TouchableOpacity
        style={{ marginVertical: hp(2) }}
        onPress={purchaseHandler}
      >
        <ActiveButton text="Buy Package" width={wp("80%")} />
      </TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontFamily: "PoppinsSemi",
  },
  text: {
    fontSize: 14,
    fontFamily: "PoppinsSemi",
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
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: COLORS.disableBlack,
  },
  icon: {
    marginRight: 10,
  },
  optionRowParent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: hp(0.5),
    marginHorizontal: hp(2),
  },
  miniRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  terms: {
    fontFamily: "PoppinsRegular",
    color: "red",
    margin: 10,
  },
});

export default TabViewComponent;

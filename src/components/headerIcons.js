import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//inernal imports
import COLORS from "../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const HeaderIcons = () => {
  const navigation = useNavigation();
  const [dotsModal, setDotsModal] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [video, setVideo] = useState(false);
  let lang = useSelector((state) => state.api.appLang?.data);
  const openMessagingApp = () => {
    Linking.openURL("sms:+923213234980");
  };
  const openCallApp = () => {
    Linking.openURL("tel:+923213234980");
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => setDotsModal(true)}>
        <FontAwesome5
          name="headset"
          size={hp(2.5)}
          color={COLORS.white}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("YoutubeScreen")}>
        <Foundation
          name="play-video"
          size={hp(3)}
          color={COLORS.white}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/*  customer service modal  */}
      <Modal animationType="fade" transparent={true} visible={dotsModal}>
        <View style={styles.dotCenteredView}>
          <View style={styles.dotModalView}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: wp(80),
                alignSelf: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => setDotsModal(false)}
                style={styles.dotCrossContainer}
              >
                <Entypo name="cross" size={hp(2)} color={COLORS.white} />
              </TouchableOpacity>
              {lang == "eng" ? (
                <Text style={styles.engmodalText}>Customer Support</Text>
              ) : (
                <Text style={styles.modalText}>کسٹمر سپورٹ </Text>
              )}
            </View>
            <View
              style={{
                padding: hp(0.1),
                backgroundColor: COLORS.disableGrey,
                margin: hp(2),
                width: "100%",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "70%",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.dotIconContainer}
                  onPress={openCallApp}
                >
                  <Feather name="phone" size={hp(3)} color={COLORS.green} />
                </TouchableOpacity>
                {lang == "eng" ? (
                  <Text style={styles.engmodalText}>Call</Text>
                ) : (
                  <Text style={styles.modalText}>ایجنٹ کو کال ملائیں </Text>
                )}
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.dotIconContainer}
                  onPress={openMessagingApp}
                >
                  <FontAwesome
                    name="commenting-o"
                    size={hp(3)}
                    color={COLORS.green}
                  />
                </TouchableOpacity>
                {lang == "eng" ? (
                  <Text style={styles.engmodalText}>Message</Text>
                ) : (
                  <Text style={styles.modalText}> ماہر سے پوچھیں </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/*dots modal */}
      <Modal animationType="fade" transparent={true} visible={serviceModal}>
        <TouchableWithoutFeedback onPress={() => setServiceModal(false)}>
          <View style={styles.serviceCenteredView}>
            <View style={styles.serviceModalView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  width: "70%",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity style={styles.serviceIconContainer}>
                    <Feather name="copy" size={hp(3)} color={COLORS.black} />
                  </TouchableOpacity>
                  <Text style={styles.modalText}> کاپی کریں </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity style={styles.serviceIconContainer}>
                    <Feather name="trash-2" size={hp(3)} color="red" />
                  </TouchableOpacity>
                  <Text style={[styles.modalText, { color: "red" }]}>
                    ڈلیٹ کریں
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: hp(1),
  },
  serviceCenteredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  dotCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  dotModalView: {
    backgroundColor: "white",
    paddingVertical: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    borderRadius: 15,
  },
  serviceModalView: {
    backgroundColor: "white",
    paddingVertical: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    borderRadius: 15,
  },
  dotCrossContainer: {
    backgroundColor: COLORS.textgrey,
    borderRadius: 50,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalheading: {
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: "CustomFont",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    textAlign: "center",
  },
  engmodalText: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    textAlign: "center",
  },
  dotIconContainer: {
    borderWidth: 1,
    borderColor: COLORS.disableGrey,
    borderRadius: 50,
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp(1),
  },
  serviceIconContainer: {
    borderWidth: 1,
    borderColor: COLORS.disableGrey,
    borderRadius: 50,
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp(1),
  },
});

export default HeaderIcons;

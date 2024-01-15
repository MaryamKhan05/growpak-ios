import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Entypo from "react-native-vector-icons/Entypo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import { MenuHeading, MenuCard } from "../engComponents/Index";
import COLORS from "../../assets/colors/colors";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useToast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDeleteData,
  clearLoginData,
  deleteAccount,
  deleteToken,
  getUserById,
} from "../redux/action";

const Menu = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [deleteAccontModal, setDeleteAccountModal] = useState(false);
  const [loading, setLoading] = useState(false);
  let loginresponse = useSelector((state) => state.api.login?.data?.data?.data);
  const deleteSuccess = useSelector(
    (state) => state.api.deleteAccount?.successMessage
  );

  const deleteFailed = useSelector(
    (state) => state.api.deleteAccount?.errorMessage
  );
  console.log(deleteFailed, "deleteFailed");
  console.log(deleteSuccess, "deleteSuccess");

  useEffect(() => {
    dispatch(getUserById());
  }, []);

  let userByIdResponse = useSelector(
    (state) => state.api.userById?.data?.data[0]
  );
  console.log(userByIdResponse, "userByIdResponse");
  useEffect(() => {
    if (userByIdResponse) {
      let n = userByIdResponse?.name;
      let t = userByIdResponse?.utype;
      setName(n);
      setType(t);
    }
  }, [userByIdResponse]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.show(deleteSuccess, {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      deleteAccount();
    }
    if (deleteFailed) {
      toast.show(deleteFailed, {
        type: "danger",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
    }
  }, [deleteFailed, deleteSuccess]);

  const deleteHandler = async () => {
    let phone = await AsyncStorage.getItem("Phone");
    let token = await AsyncStorage.getItem("token");
    console.log(phone, "before clearing", token);

    try {
      await AsyncStorage.clear();
      await AsyncStorage.removeItem("token");
      console.log("cleared storage");
      dispatch(clearLoginData());
      dispatch(clearDeleteData());
      dispatch(deleteToken());
    } catch (e) {
      console.log("errror clearing storage", e);
    }
    console.log(token, "token after");
  };

  const logoutHandler = async () => {
    setLoader(true);
    let phone = await AsyncStorage.getItem("Phone");
    let token = await AsyncStorage.getItem("token");
    console.log(phone, "before clearing", token);
    try {
      await AsyncStorage.clear();
      await AsyncStorage.removeItem("token");
      console.log("cleared storage");

      dispatch(clearLoginData());
      dispatch(deleteToken());
    } catch (e) {
      console.log("errror clearing storage", e);
    }
    console.log(token, "token after");
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MenuHeading text="My Profile" />

          {/* name card */}
          <View style={[styles.nameCard]}>
            <View
              style={{
                backgroundColor: COLORS.lightgrey,
                borderRadius: 50,
                marginHorizontal: 10,
                height: 40,
                width: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="user" size={15} color={COLORS.textgrey} />
            </View>

            <View style={styles.nameContainer}>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 14,
                  fontFamily: "PoppinsMedium",
                }}
              >
                {name}
              </Text>
              <Text style={styles.agent}>{type}</Text>
            </View>
          </View>

          <MenuHeading text="Manage" />
          <MenuCard
            text="Livestock"
            image={require("../../assets/cow.png")}
            chevron={true}
          />
          <MenuCard
            text="Machinery"
            image={require("../../assets/tractor.png")}
            chevron={true}
          />
          <MenuCard
            text="Documents"
            image={require("../../assets/doc.png")}
            chevron={true}
          />

          <MenuHeading text="General" />

          <MenuCard
            text="Transactions"
            image={require("../../assets/ledger.png")}
            chevron={true}
          />
          <MenuCard
            text="FAQ"
            image={require("../../assets/query.png")}
            chevron={true}
          />
          <MenuCard
            text="Feedback"
            image={require("../../assets/feedback.png")}
            chevron={true}
          />
          <MenuCard
            text="Data"
            image={require("../../assets/data.png")}
            chevron={true}
          />
          <MenuCard
            text="Vouchers"
            image={require("../../assets/vouchers.png")}
            chevron={true}
          />

          <MenuHeading text="Follow Us" />
          <MenuCard
            text="Youtube"
            image={require("../../assets/youtube.png")}
            url="https://www.youtube.com/channel/UCBh8hcmVMD3hws-NMfzG1fQ"
          />
          <MenuCard
            text="Facebook"
            image={require("../../assets/fb.png")}
            url="https://www.facebook.com/growtechsol/"
          />
          <MenuCard
            text="Linkedin"
            image={require("../../assets/linkedin.png")}
            url="https://www.linkedin.com/company/growtechsol/"
          />
          <View style={{ margin: 10 }} />
       {/* delete account */}

          <TouchableOpacity
            style={styles.card}
            onPress={() => setDeleteAccountModal(true)}
          >
            <AntDesign
              name="deleteuser"
              size={20}
              style={{ marginHorizontal: 20 }}
              color={COLORS.disableBlack}
            />
            <Text
              style={{
                textAlign: "left",
                fontSize: 14,
                fontFamily: "PoppinsRegular",
                color: COLORS.disableBlack,
                width: "72%",
              }}
            >
              Delete Account
            </Text>
            <Entypo
              name="chevron-small-right"
              style={styles.icon}
              size={20}
              color={COLORS.textgrey}
            />
          </TouchableOpacity>


   {/* logout button */}

          <TouchableOpacity style={styles.card} onPress={() => setLoader(true)}>
            <Image
              source={require("../../assets/logout.png")}
              resizeMode="contain"
              style={styles.image}
            />
            <Text
              style={{
                textAlign: "left",
                fontSize: 14,
                fontFamily: "PoppinsRegular",
                color: COLORS.disableBlack,
                width: "72%",
              }}
            >
              Logout
            </Text>
            <Entypo
              name="chevron-small-right"
              style={styles.icon}
              size={20}
              color={COLORS.textgrey}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* delete account modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteAccontModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.overlay,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: hp(4),
              alignItems: "center",
              width: wp(80),
              borderRadius: 20,
            }}
          >
            <Text style={styles.deleteHeading}>Delete Account</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                fontFamily: "PoppinsRegular",
                marginVertical: 15,
                textAlign: "center",
              }}
            >
              Are you sure you want to delete your Account? This will
              permanently erase your account from GrowPak App.
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => [
                  deleteHandler(),
                  setDeleteAccountModal(false),
                  dispatch(deleteAccount()),
                ]}
                style={styles.button}
              >
                <Text style={styles.yes}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDeleteAccountModal(false)}
                style={styles.button}
              >
                <Text style={styles.no}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* logout modal  */}
      <Modal animationType="fade" transparent={true} visible={loader}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.overlay,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              alignItems: "center",
              width: wp(80),
              borderRadius: 10,
              height: hp(30),
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                fontFamily: "PoppinsMedium",
                marginTop: 20,
              }}
            >
              Exit App
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                fontFamily: "PoppinsRegular",
                marginBottom: 20,
              }}
            >
              Are you sure you want to logout?
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => [logoutHandler(), setLoader(false)]}
                style={styles.button}
              >
                <Text style={styles.yes}>Yes </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLoader(false)}
                style={styles.button}
              >
                <Text style={styles.no}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* loading modal */}
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.overlay,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator style="large" color={COLORS.green} />
        </View>
      </Modal>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "flex-end",
  },
  text: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
  nameCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "95%",
    height: 64,
    alignSelf: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.disableGrey,
    justifyContent: "space-evenly",
  },
  agent: {
    fontSize: 12,
    color: COLORS.secondary,
    fontFamily: "PoppinsRegular",
  },
  nameContainer: {
    width: wp(65),
  },
  card: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    width: "95%",
    height: 48,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.disableGrey,
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    color: COLORS.disableBlack,
    width: "74%",
  },
  image: {
    height: 20,
    width: 20,
    marginHorizontal: 20,
  },
  icon: {
    justifyContent: "flex-start",
  },
  yes: {
    fontSize: 14,
    color: COLORS.green,
    fontFamily: "PoppinsMedium",
  },
  no: {
    fontSize: 14,
    color: "red",
    fontFamily: "PoppinsMedium",
  },
  button: {
    backgroundColor: COLORS.disableGrey,
    padding: 15,
    borderRadius: 10,
    width: wp(30),
    alignItems: "center",
  },
  deleteHeading: {
    fontFamily: "PoppinsSemi",
    fontSize: 16,
  },
});

export default Menu;

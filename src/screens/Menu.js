import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Entypo from "react-native-vector-icons/Entypo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { MenuHeading, MenuCard } from "../components/index";
import COLORS from "../../assets/colors/colors";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import {
  clearDeleteData,
  clearForgetSuccessMessage,
  clearLoginData,
  clearLoginSuccessMessage,
  clearSignupSuccessMessage,
  deleteAccount,
  deleteToken,
  getUserById,
  logout,
} from "../redux/action";

const Menu = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteAccontModal, setDeleteAccountModal] = useState(false);

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
      let t = userByIdResponse?.utype_u;
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
    // setLoading(true);
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
          <MenuHeading text="میری پروفائل" />

          {/* name card */}
          <View style={[styles.nameCard]}>
            <View style={styles.nameContainer}>
              <Text style={{ fontWeight: "400", fontSize: 16 }}>{name}</Text>
              <Text style={styles.agent}> {type} </Text>
            </View>
            <View
              style={{
                backgroundColor: COLORS.lightgrey,
                padding: 12,
                borderRadius: 50,
                marginHorizontal: 10,
              }}
            >
              <AntDesign name="user" size={15} color={COLORS.textgrey} />
            </View>
          </View>

          <MenuHeading text="مینیج کریں" />
          <MenuCard
            text="مال مویشی"
            image={require("../../assets/cow.png")}
            chevron={true}
          />
          <MenuCard
            text="مشینری"
            image={require("../../assets/tractor.png")}
            chevron={true}
          />
          <MenuCard
            text="دستاویزات"
            image={require("../../assets/doc.png")}
            chevron={true}
          />

          <MenuHeading text="جنرل" />

          <MenuCard
            text="لین دین"
            image={require("../../assets/ledger.png")}
            chevron={true}
          />
          <MenuCard
            text="عمومی سوالات"
            image={require("../../assets/query.png")}
            chevron={true}
          />
          <MenuCard
            text="آپکی رائے"
            image={require("../../assets/feedback.png")}
            chevron={true}
          />
          <MenuCard
            text="ڈیٹا"
            image={require("../../assets/data.png")}
            chevron={true}
          />
          <MenuCard
            text="واؤچرز"
            image={require("../../assets/vouchers.png")}
            chevron={true}
          />

          <MenuHeading text="فولو کریں" />
          <MenuCard
            text="یو ٹیوب"
            image={require("../../assets/youtube.png")}
            url="https://www.youtube.com/channel/UCBh8hcmVMD3hws-NMfzG1fQ"
          />
          <MenuCard
            text="فیس بک"
            image={require("../../assets/fb.png")}
            url="https://www.facebook.com/growtechsol/"
          />
          <MenuCard
            text="لنکڈان"
            image={require("../../assets/linkedin.png")}
            url="https://www.linkedin.com/company/growtechsol/"
          />
          {/* logout button */}
          <View style={{ margin: 10 }} />

          <TouchableOpacity
            style={styles.card}
            onPress={() => setDeleteAccountModal(true)}
          >
            <Entypo
              name="chevron-small-left"
              style={styles.icon}
              size={20}
              color={COLORS.textgrey}
            />
            <Text style={styles.text}> ڈیلیٹ اکاؤنٹ </Text>
            <AntDesign
              name="deleteuser"
              size={20}
              style={{ marginHorizontal: 20 }}
              color={COLORS.disableBlack}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => setLoader(true)}>
            <Entypo
              name="chevron-small-left"
              style={styles.icon}
              size={20}
              color={COLORS.textgrey}
            />
            <Text style={styles.text}> لاگ آوٹ </Text>
            <Image
              source={require("../../assets/logout.png")}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* logout modal */}
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
              padding: hp(4),
              alignItems: "center",
              width: wp(70),
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                fontFamily: "CustomFont",
              }}
            >
              ایپ سے باہر نکلیں؟
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                padding: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => [logoutHandler(), setLoader(false)]}
                style={{ margin: 10 }}
              >
                <Text style={styles.yes}>جی ہاں</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLoader(false)}
                style={{ margin: 10 }}
              >
                <Text style={styles.no}>نہیں</Text>
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
            <Text style={styles.deleteHeading}> ڈیلیٹ اکاؤنٹ </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                fontFamily: "CustomFont",
                marginVertical: 15,
                textAlign: "center",
              }}
            >
              کیا آپ واقعی اپنا اکاؤنٹ ڈیلیٹ کرنا چاہتے ہیں؟
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
                <Text style={styles.yes}>جی ہاں</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDeleteAccountModal(false)}
                style={styles.button}
              >
                <Text style={styles.no}>نہیں</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    fontFamily: "NotoMedium",
    fontSize: 14,
    fontWeight: "400",
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
  },
  agent: {
    textAlign: "right",
    backgroundColor: COLORS.white,
    fontWeight: "400",
    fontSize: 14,
    fontFamily: "NotoSemi",
    color: COLORS.secondary,
  },
  nameContainer: {
    width: wp(65),
    alignItems: "flex-end",
    justifyContent: "flex-end",
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
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  text: {
    textAlign: "right",
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
    fontSize: 18,
    fontWeight: "400",
    color: COLORS.green,
    fontFamily: "CustomFont",
  },
  no: {
    fontSize: 18,
    fontWeight: "400",
    color: "red",
    fontFamily: "CustomFont",
  },
  deleteHeading: {
    fontFamily: "CustomFont",
    fontSize: 20,
    fontWeight: "900",
  },
});

export default Menu;

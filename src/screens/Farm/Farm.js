import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Linking,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

//internal imports
import COLORS from "../../../assets/colors/colors";
import { ActiveButton } from "../../components/index";
import {
  getFarmByAgentId,
  getFarmsById,
  getAllPackages,
  getReportsByFarmId,
  saveFarmId,
  clearCarbonImages,
  clearNitrogenImages,
  clearPlantHealthImages,
  clearWaterImages,
} from "../../redux/action";

const Farm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [farmId, setFarmId] = useState();
  const [farmers, setFarmers] = useState();
  const [type, setType] = useState("");
  let farmdetailsresponse = useSelector(
    (state) => state.api.newFarm?.data?.data?.farm_id
  );

  const farmdata = useSelector((state) => state.api.farms?.data?.data);
  const deleteFarmCreatedHandler = async () => {
    try {
      await AsyncStorage.removeItem("farmCreated");
    } catch (e) {
      console.log("err deleting farm created", e);
    }
  };

  const countResponse = useSelector((state) => state.api.homeCount?.data);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getFarmByAgentId());
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (farmdetailsresponse) {
      deleteFarmCreatedHandler();
    }
  }, [farmdetailsresponse]);

  const openWhatsapp = () => {
    const phoneNumber = "+923213234980";
    const message = "";

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp opened:", data);
      })
      .catch(() => {
        console.error("Unable to open WhatsApp");
      });
  };

  const getTypeHandler = async () => {
    try {
      const usertype = await AsyncStorage.getItem("type");
      const typ = JSON.parse(usertype);
      setType(typ);
    } catch (e) {
      console.log("error getting type from storage on home", e);
    }
  };

  useEffect(() => {
    getTypeHandler();
  }, []);

  const handleNavAndParams = (id, name, area) => {
    const maxNameLength = 10;
    let formattedName =
      name.length > maxNameLength ? `${name.slice(0, maxNameLength)}...` : name;
    dispatch(getFarmsById(id));
    dispatch(getReportsByFarmId(id));
    dispatch(saveFarmId({ id, name, area }));
    navigation.navigate("SubscribedFarm", {
      name: formattedName,
      area: area,
    });
  };
  const newFarmHandler = () => {
    let farmerCount = countResponse?.data[0].count;
    setFarmers(farmerCount);
    if (farmerCount < 1 && type == "3") {
      alert("پہلے کم از کم ایک کسان شامل کریں");
    } else {
      navigation.navigate("NewFarm");
    }
  };
  useEffect(() => {
    dispatch(getAllPackages());
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("clear handler");
      dispatch(clearCarbonImages());
      dispatch(clearNitrogenImages());
      dispatch(clearPlantHealthImages());
      dispatch(clearWaterImages());
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.itemCard,
          {
            borderWidth: item.subscribed == true ? 1 : 0,
            borderColor: COLORS.orange,
          },
        ]}
        onPress={() => handleNavAndParams(item.fid, item.farm_name, item.area)}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{
              uri: item.img,
            }}
            style={{
              height: hp(20),
              width: wp(28),
              borderRadius: 10,
              alignSelf: "flex-start",
            }}
          />
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.itemCardRow}>
              <Text
                style={[
                  styles.value,
                  {
                    width: "50%",
                    textAlign: "right",
                  },
                ]}
              >
                {item.farm_name}
              </Text>
              <Text style={styles.key}>کھیت </Text>
            </View>
            <View style={styles.itemCardRow}>
              <Text style={styles.value}>{item.crop_uname}</Text>
              <Text style={styles.key}>فصل </Text>
            </View>
            <View style={styles.itemCardRow}>
              <Text
                style={[styles.value, { width: "50%", textAlign: "right" }]}
              >
                {item.farmer_name}
              </Text>
              <Text style={styles.key}>کسان </Text>
            </View>
            <View style={styles.itemCardRow}>
              <Text style={styles.value}>{item.city}</Text>
              <Text style={styles.key}>شہر </Text>
            </View>
            <View style={styles.itemCardRow}>
              <Text style={styles.value}>{item.area}</Text>
              <Text style={styles.key}>رقبہ </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: hp(0.05),
            backgroundColor: COLORS.disableGrey,
            marginTop: hp(2),
          }}
        />
        {item.is_activated == false ? (
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => [setModalVisible(true), setFarmId(item.fid)]}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  fontFamily: "NotoSemi",
                  color: COLORS.green,
                }}
              >
                مزید جانیے
              </Text>
            </TouchableOpacity>
            <Text style={[styles.subText, { marginRight: hp(-4) }]}>
              یہ کھیت سبسکرائیب نہیں ہے
            </Text>
            <AntDesign
              name="exclamationcircle"
              size={hp(2)}
              color={COLORS.textgrey}
            />
          </View>
        ) : (
          <View style={[styles.subView, { alignContent: "center" }]}>
            <Text style={styles.subText}>سسبکرایبڈ کھیت </Text>
            <AntDesign name="checkcircle" size={hp(2)} color={COLORS.orange} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.egcard}>
          <LinearGradient
            colors={["#FFFAF2", "#FFF2DFC9"]}
            style={styles.background}
          />

          <Image
            source={require("../../../assets/farm.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{ right: 10 }}>
            <Text style={[styles.text]}> یہ ایک فرضی فارم ہے</Text>
            <Text style={[styles.text]}> اس میں سارےفیچر زموجود ہیں</Text>
            <TouchableOpacity
              onPress={() => [
                dispatch(getReportsByFarmId(22)),
                navigation.navigate("FarmExample"),
              ]}
            >
              <Text
                style={{
                  fontFamily: "NotoSemi",
                  textAlign: "right",
                  color: COLORS.green,
                  fontSize: 14,
                  top: 15,
                }}
              >
                دیکھنے کے لیئے کلک کریں
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {farmdata?.length > 0 ? (
          <View style={{ width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginTop: hp(5),
              }}
            >
              <Text>کل کھیت: {farmdata?.length}</Text>
            </View>

            <FlatList
              data={farmdata}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: hp(10),
            }}
          >
            <Text style={styles.heading}>آپ نے ابھی تک کھیت نہیں بنایا</Text>
            <Text
              style={[
                styles.text,
                { color: COLORS.textgrey, textAlign: "center", width: "100%" },
              ]}
            >
              اپنا پہلا کھیت بنانے کے لیئے نیچے دیئے گئے بٹن کو دبائیں
            </Text>
            <TouchableOpacity style={styles.button} onPress={newFarmHandler}>
              <Entypo
                name="plus"
                size={hp(2)}
                color={COLORS.white}
                style={{ marginRight: hp(1) }}
              />
              <Text style={[styles.text, { color: COLORS.white }]}>
                نیا کھیت{" "}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <StatusBar style="light" />
      </ScrollView>
      {farmdata?.length > 0 ? (
        <TouchableOpacity
          style={[
            styles.button,
            {
              position: "absolute",
              alignSelf: "flex-end",
              top: hp(68),
              right: hp(2),
            },
          ]}
          onPress={() => navigation.navigate("NewFarm")}
        >
          <Entypo
            name="plus"
            size={hp(2)}
            color={COLORS.white}
            style={{ marginRight: hp(1) }}
          />
          <Text style={[styles.text, { color: COLORS.white }]}>نیا کھیت </Text>
        </TouchableOpacity>
      ) : null}

      {/* modal */}

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalheading}>کھیت سبسکرائب نہیں ہے</Text>
              <View
                style={{
                  padding: hp(0.1),
                  backgroundColor: COLORS.disableGrey,
                  margin: hp(2),
                  width: "100%",
                }}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "400",
                  fontFamily: "CustomFont",
                  textAlign: "center",
                  width: wp(70),
                  paddingVertical: 10,
                }}
                numberOfLines={2}
              >
                سبسکرائب کیے گئے کھیت کی پیداوار عام کھیت کے بدلے %15 زیادہ ہو
                سکتی ہے
              </Text>
              <TouchableOpacity
                onPress={() => [
                  navigation.navigate("PackageDetails", { id: farmId }),
                  setModalVisible(false),
                ]}
              >
                <ActiveButton text="پیکیجز دیکھیں " />
              </TouchableOpacity>

              <View
                style={{
                  borderWidth: 1,
                  paddingVertical: hp(2),
                  marginVertical: 10,
                  borderColor: COLORS.disableGrey,
                  borderRadius: 12,
                  width: hp(40),
                  height: hp(15),
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("SubBenefits")}
                >
                  <Text style={styles.modalText}>
                    سبسکرائب کیے گئے کھیت کے فیچرز جانیئے
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    padding: hp(0.1),
                    backgroundColor: COLORS.disableGrey,
                    margin: hp(2),
                    width: "100%",
                  }}
                />
                <TouchableOpacity onPress={openWhatsapp}>
                  <Text
                    style={
                      Platform.OS == "android"
                        ? [styles.modalText, { letterSpacing: -3 }]
                        : styles.modalText
                    }
                  >
                    ایجنٹ کو واٹس ایپ کریں
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <StatusBar style="dark" />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000099",
  },
  modalView: {
    backgroundColor: "white",
    paddingVertical: 35,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  egcard: {
    flexDirection: "row",
    width: "91%",
    alignSelf: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.careem,
    backgroundColor: "#fdf6eb",
    padding: hp(1),
    marginTop: 20,
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    textAlign: "right",
    fontFamily: "CustomFont",
    fontSize: 20,
    fontWeight: "400",
    marginVertical: 2,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: hp("11%"),
    borderRadius: 15,
  },
  heading: {
    fontFamily: "CustomFont",
    fontSize: 24,
    fontWeight: "400",
  },
  button: {
    backgroundColor: COLORS.green,
    paddingHorizontal: hp(3),
    paddingVertical: hp(1),
    borderRadius: 50,
    margin: hp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  itemCard: {
    backgroundColor: COLORS.white,
    margin: hp(2),
    borderRadius: 12,
    padding: hp(2),
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  key: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    color: COLORS.textgrey,
    width: wp(15),
    textAlign: "right",
    padding: 5,
  },
  value: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  itemCardRow: {
    flexDirection: "row",
  },
  subText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
    fontFamily: "NotoSemi",
    marginRight: 5,
  },
  subView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: hp(2),
  },
  modalheading: {
    fontSize: 32,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: "CustomFont",
  },
  modalText: {
    fontSize: 21,
    fontWeight: "400",
    fontFamily: "CustomFont",
    textAlign: "center",
    color: COLORS.green,
  },
});

export default Farm;

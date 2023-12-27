import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  FlatList,
  Modal,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../../../assets/colors/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { getFarmsById } from "../../redux/action";
import { ActiveButton, TabViewComponent } from "../../engComponents/Index";
const PackageDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [p1, setP1] = useState(true);
  const [p2, setP2] = useState(false);
  const [p5, setP5] = useState(false);
  const [p8, setP8] = useState(false);
  const [p9, setP9] = useState(false);
  const [p8Data, setP8Data] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  let i = route.params?.id; //farm id

  const packageResponse = useSelector(
    (state) => state.api?.packages?.data?.data
  );

  console.log(
    packageResponse,
    "packageResponsepackageResponsepackageResponsepackageResponsepackageResponse"
  );

  const farmResponse = useSelector(
    (state) => state.api.farmbyid?.data?.data[0]
  );
  console.log(farmResponse);

  useEffect(() => {
    dispatch(getFarmsById(i));
  }, []);

  useEffect(() => {
    if (packageResponse) {
      let p8 = packageResponse?.filter((item) => item.pname === "P8");
      setP8Data(p8);
    }
  }, [packageResponse]);

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

  const openCallApp = () => {
    Linking.openURL("tel:+923213234980");
  };

  const purchaseHandler = (caption, title, img) => {
    let data = packageResponse?.filter((item) => item.pname === "P8");
    let area = farmResponse?.area;
    for (let obj of data) {
      if (area >= obj.min_acre && area <= obj.max_acre) {
        let price = obj.price;
        navigation.navigate("BuyPackage", { title, caption, price, i, img });
        break;
      }
      if (area <= obj.min_acre && area <= obj.max_acre) {
        setModalVisible(true);
      }
    }
  };
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: wp(3),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: wp(30),
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "PoppinsRegular",
              fontSize: 12,
            }}
          >
            Acre
          </Text>
          <Text style={styles.p8Text}>
            {item.min_acre}- {item.max_acre}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginRight: wp(2),
            width: wp(50),
          }}
        >
          <View style={styles.column}>
            <Text style={styles.colHeading}>GrowPak</Text>
            <Text style={styles.p8Text}>{item.gprice}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.colHeading}>Drone</Text>
            <Text style={styles.p8Text}>{item.dprice} </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.colHeading}>Total</Text>
            <Text style={styles.p8Text}>{item.price} </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {/* top buttons */}
      <View style={styles.topButtonContainer}>
        <TouchableOpacity
          style={[
            styles.topButton,
            { backgroundColor: p1 ? "#00000042" : "transparent" },
          ]}
          onPress={() => [
            setP2(false),
            setP5(false),
            setP8(false),
            setP9(false),
            setP1(true),
          ]}
        >
          <Text style={styles.topButtonText}>P1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.topButton,
            { backgroundColor: p2 ? "#00000042" : "transparent" },
          ]}
          onPress={() => [
            setP2(true),
            setP5(false),
            setP8(false),
            setP9(false),
            setP1(false),
          ]}
        >
          <Text style={styles.topButtonText}>P5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.topButton,
            { backgroundColor: p5 ? "#00000042" : "transparent" },
          ]}
          onPress={() => [
            setP2(false),
            setP5(true),
            setP8(false),
            setP9(false),
            setP1(false),
          ]}
        >
          <Text style={styles.topButtonText}>P7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.topButton,
            { backgroundColor: p8 ? "#00000042" : "transparent" },
          ]}
          onPress={() => [
            setP2(false),
            setP5(false),
            setP8(true),
            setP9(false),
            setP1(false),
          ]}
        >
          <Text style={styles.topButtonText}>P8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.topButton,
            { backgroundColor: p9 ? "#00000042" : "transparent" },
          ]}
          onPress={() => [
            setP2(false),
            setP5(false),
            setP8(false),
            setP9(true),
            setP1(false),
          ]}
        >
          <Text style={styles.topButtonText}>P9</Text>
        </TouchableOpacity>
      </View>

      {p1 && (
        <TabViewComponent
          img={packageResponse && packageResponse[0]?.img}
          first={packageResponse && packageResponse[0]?.soc}
          second={packageResponse && packageResponse[0]?.zones}
          third={true}
          fourth={packageResponse && packageResponse[0]?.plant_health}
          fifth={packageResponse && packageResponse[0]?.water_stress}
          sixth={packageResponse && packageResponse[0]?.zones}
          price={packageResponse && packageResponse[0]?.price}
          title={packageResponse && packageResponse[0]?.puname}
          caption={packageResponse && packageResponse[0]?.description}
          id={packageResponse && packageResponse[0]?.pid}
          farmId={route.params && route.params?.id}
          url={packageResponse && packageResponse[0]?.audio}
          terms={packageResponse && packageResponse[0]?.t_c_e}
        />
      )}
      {/* this is p5 */}
      {p2 && (
        <TabViewComponent
          img={packageResponse && packageResponse[1]?.img}
          first={packageResponse && packageResponse[1]?.soc}
          second={packageResponse && packageResponse[1]?.zones}
          third={true}
          fourth={packageResponse && packageResponse[1]?.plant_health}
          fifth={packageResponse && packageResponse[1]?.water_stress}
          sixth={packageResponse && packageResponse[1]?.zones}
          price={packageResponse && packageResponse[1]?.price}
          title={packageResponse && packageResponse[1]?.puname}
          caption={packageResponse && packageResponse[1]?.description}
          id={packageResponse && packageResponse[1]?.pid}
          farmId={route.params && route.params?.id}
          url={packageResponse && packageResponse[1]?.audio}
          terms={packageResponse && packageResponse[1]?.t_c_e}
        />
      )}
      {/* this is p7 */}
      {p5 && (
        <TabViewComponent
          img={packageResponse && packageResponse[2]?.img}
          first={packageResponse && packageResponse[2]?.soc}
          second={packageResponse && packageResponse[2]?.zones}
          third={true}
          fourth={packageResponse && packageResponse[2]?.plant_health}
          fifth={packageResponse && packageResponse[2]?.water_stress}
          sixth={packageResponse && packageResponse[2]?.zones}
          price={packageResponse && packageResponse[2]?.price}
          title={packageResponse && packageResponse[2]?.puname}
          caption={packageResponse && packageResponse[2]?.description}
          id={packageResponse && packageResponse[2]?.pid}
          farmId={route.params && route.params?.id}
          url={packageResponse && packageResponse[2]?.audio}
          terms={packageResponse && packageResponse[2]?.t_c_e}
        />
      )}
      {p8 && (
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
          {/* header view */}
          <ImageBackground
            source={{ uri: packageResponse && packageResponse[3]?.img }}
            style={{
              width: wp(90),
              borderRadius: 25,
              overflow: "hidden",
              alignSelf: "center",
              top: 5,
            }}
          >
            <View style={{ height: hp(18), padding: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.heading}>
                  {packageResponse && packageResponse[3]?.puname}
                </Text>
                <Text
                  style={[
                    styles.text,
                    { color: COLORS.textgrey, fontFamily: "PoppinsSemi" },
                  ]}
                >
                  {" "}
                  Rs. {packageResponse && packageResponse[3]?.price} Per Acre
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
                {packageResponse && packageResponse[3]?.description}
              </Text>
            </View>
          </ImageBackground>
          <View>
            <FlatList
              data={p8Data}
              keyExtractor={(item) => item.pid}
              renderItem={renderItem}
            />
          </View>

          <View style={{ marginTop: hp(3) }}></View>
          <Text style={styles.terms}>{ packageResponse && packageResponse[3]?.t_c_e}</Text>
          <TouchableOpacity
            style={{ marginVertical: hp(2) }}
            onPress={() =>
              purchaseHandler(
                packageResponse && packageResponse[3]?.udescription,
                packageResponse && packageResponse[3]?.puname,
                packageResponse && packageResponse[3]?.img
              )
            }
          >
            <ActiveButton text="Buy Package" width={wp("80%")} />
          </TouchableOpacity>

          <Modal animationType="fade" transparent={true} visible={modalVisible}>
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
                  <Text style={styles.modalText}>Customer Support</Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.dotCrossContainer}
                  >
                    <Entypo name="cross" size={hp(2)} color={COLORS.white} />
                  </TouchableOpacity>
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
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={openCallApp}
                    >
                      <Text style={[styles.modalText, { color: COLORS.green }]}>
                        Call Agent
                      </Text>
                      <Feather
                        name="phone"
                        size={hp(3)}
                        color={COLORS.green}
                        style={{ marginHorizontal: 5 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          <StatusBar style="light" />
        </View>
      )}
      {p9 && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "PoppinsBold",
            }}
          >
            Contact Growtech Team
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View>
              <TouchableOpacity
                onPress={openCallApp}
                style={styles.iconContainer}
              >
                <Feather
                  name="phone"
                  size={20}
                  color={COLORS.green}
                  style={{ margin: 10 }}
                />
              </TouchableOpacity>
              <Text style={styles.text}>Call</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={openWhatsapp}
                style={styles.iconContainer}
              >
                <FontAwesome
                  name="whatsapp"
                  size={20}
                  color={COLORS.green}
                  style={{ margin: 10 }}
                />
              </TouchableOpacity>
              <Text style={styles.text}>WhatsApp</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topButtonContainer: {
    backgroundColor: COLORS.green,
    height: hp(7),
    flexDirection: "row",
    alignItems: "center",
  },
  topButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  topButton: {
    padding: 8,
    borderRadius: 8,
    width: wp(20),
    alignItems: "center",
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: COLORS.disableGrey,
    borderRadius: 50,
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    margin: hp(2),
  },
  text: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
  },
  p8Text: {
    textAlign: "center",
    fontFamily: "PoppinsRegular",
    padding: 5,
    fontSize: 12,
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
  heading: {
    fontSize: 18,
    fontFamily: "PoppinsSemi",
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
  dotCrossContainer: {
    backgroundColor: COLORS.textgrey,
    borderRadius: 50,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
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
  colHeading: {
    color: COLORS.green,
    fontFamily: "PoppinsRegular",
    margin: 5,
    textAlign: "center",
    fontSize: 12,
  },
  column: {
    width: wp(18),
  },
  terms: {
    fontFamily: "PoppinsRegular",
    color: "red",
    margin: 10,
  },
});

export default PackageDetails;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
  Linking,
  Modal,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import { TabViewComponent } from "../../components/index";
import { getAllPackages, getFarmsById } from "../../redux/action";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../../../assets/colors/colors";
import { ActiveButton, AudioPlayer } from "../../components/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PackageNine from "../../components/package9";

const Packages = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [p8Data, setP8Data] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const packageResponse = useSelector(
    (state) => state.api?.packages?.data?.data
  );
  console.log(packageResponse, "package response::::::::");
  const farmResponse = useSelector(
    (state) => state.api.farmbyid?.data?.data[0]
  );
  let i = route.params?.id;

  useEffect(() => {
    dispatch(getFarmsById(i));
  }, []);

  const purchaseHandler = (caption, title) => {
    let data = packageResponse?.filter((item) => item.pname === "P8");
    let area = farmResponse?.area;
    for (let obj of data) {
      if (area >= obj.min_acre && area <= obj.max_acre) {
        let price = obj.price;
        navigation.navigate("BuyPackages", { title, caption, price, i });
        break;
      }
      if (area <= obj.min_acre && area <= obj.max_acre) {
        setModalVisible(true);
      }
    }
  };
  useEffect(() => {
    if (packageResponse) {
      let p8 = packageResponse?.filter((item) => item.pname === "P8");
      setP8Data(p8);
    }
  }, [packageResponse]);

  const openWhatsapp = () => {
    const phoneNumber = "+923213234980";
    Linking.openURL(`http://api.whatsapp.com/send?phone=${phoneNumber}`);
  };

  const openCallApp = () => {
    Linking.openURL("tel:+923213234980");
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
            alignItems: "flex-start",
            // backgroundColor: "pink",
            marginLeft: 5,
          }}
        >
          <View style={styles.column}>
            <Text style={styles.colHeading}>کل قیمت</Text>
            <Text style={styles.p8Text}>{item.price} </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.colHeading}>ڈرون</Text>
            <Text style={styles.p8Text}>{item.dprice} </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.colHeading}>گروپاک</Text>
            <Text style={styles.p8Text}>{item.gprice}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            // width: wp(50),
            alignItems: "center",
            justifyContent: "flex-end",
            marginRight: wp(5),
            // backgroundColor: "yellow",
          }}
        >
          <Text style={styles.p8Text}>
            {item.min_acre}- {item.max_acre}
          </Text>

          <Text
            style={{
              fontFamily: "CustomFont",
              fontSize: 20,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            ایکڑ
          </Text>
        </View>
      </View>
    );
  };
  // first route is our last route
  const FirstRoute = () => {
    // return (
    //   <View
    //     style={{
    //       flex: 1,
    //       alignItems: "center",
    //       justifyContent: "center",
    //       backgroundColor: "white",
    //     }}
    //   >
    //     <Text style={styles.p9Text}> گروٹیک ٹیم سے رابطہ کریں</Text>
    //     <View style={{ flexDirection: "row" }}>
    //       <View style={{ alignItems: "center", margin: 10 }}>
    //         <TouchableOpacity
    //           // style={styles.iconContainer}
    //           style={{ flexDirection: "row", alignItems: "center" }}
    //           onPress={() => openCallApp()}
    //         >
    //           <Feather
    //             name="phone"
    //             size={20}
    //             color={COLORS.green}
    //             style={{ margin: 10 }}
    //           />
    //           <Text style={[styles.modalText]}>کال ملائیں</Text>
    //         </TouchableOpacity>
    //       </View>
    //       <View style={{ alignItems: "center", margin: 10 }}>
    //         <TouchableOpacity
    //           onPress={() => openWhatsapp()}
    //           // style={styles.iconContainer}
    //           style={{ flexDirection: "row", alignItems: "center" }}
    //         >
    //           <FontAwesome
    //             name="whatsapp"
    //             size={20}
    //             color={COLORS.green}
    //             style={{ margin: 10 }}
    //           />
    //           <Text style={[styles.modalText]}>واٹس ایپ کریں</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </View>
    // );

    return <PackageNine />;
  };

  const SecondRoute = () => {
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
        {/* header view */}
        <View style={{ height: hp(22), padding: 15 }}>
          <LinearGradient
            colors={["#FFFAF2", "#FFF2DFC9"]}
            style={styles.background}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.text, { color: COLORS.textgrey }]}>
              {" "}
              Rs. {packageResponse && packageResponse[3]?.price} فی ایکڑ
            </Text>
            <Text style={styles.heading}>
              {packageResponse && packageResponse[3]?.puname}
            </Text>
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
            {packageResponse && packageResponse[3]?.udescription}
          </Text>
        </View>
        <View>
          <FlatList
            data={p8Data}
            keyExtractor={(item) => item.pid}
            renderItem={renderItem}
          />
        </View>

        <View style={{ marginTop: hp(3) }}></View>
        <TouchableOpacity
          style={{ marginVertical: hp(2) }}
          onPress={() =>
            purchaseHandler(
              packageResponse && packageResponse[3]?.udescription,
              packageResponse && packageResponse[3]?.puname
            )
          }
        >
          <ActiveButton text="پیکیج خریدیں" width={wp("80%")} />
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
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.dotCrossContainer}
                >
                  <Entypo name="cross" size={hp(2)} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.modalText}>کسٹمر سپورٹ </Text>
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
                    <Feather
                      name="phone"
                      size={hp(3)}
                      color={COLORS.green}
                      style={{ marginHorizontal: 5 }}
                    />
                    <Text style={[styles.modalText, { color: COLORS.green }]}>
                      ایجنٹ کو کال ملائیں{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <View style={{ alignItems: "center" }}>
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
                  <Text style={styles.modalText}> ماہر سے پوچھیں </Text>
                </View> */}
              </View>
            </View>
          </View>
        </Modal>

        <StatusBar style="light" />
      </View>
    );
  };
  const ThirdRoute = () => {
    return (
      <TabViewComponent
        first={packageResponse && packageResponse[2]?.soc}
        second={packageResponse && packageResponse[2]?.zones}
        third={true}
        fourth={packageResponse && packageResponse[2]?.plant_health}
        fifth={packageResponse && packageResponse[2]?.water_stress}
        sixth={packageResponse && packageResponse[2]?.zones}
        price={packageResponse && packageResponse[2]?.price}
        title={packageResponse && packageResponse[2]?.puname}
        caption={packageResponse && packageResponse[2]?.udescription}
        id={packageResponse && packageResponse[2]?.pid}
        farmId={route.params && route.params?.id}
        url={packageResponse && packageResponse[2]?.audio}
      />
    );
  };
  const FouthRoute = () => {
    return (
      <TabViewComponent
        first={packageResponse && packageResponse[1]?.soc}
        second={packageResponse && packageResponse[1]?.zones}
        third={true}
        fourth={packageResponse && packageResponse[1]?.plant_health}
        fifth={packageResponse && packageResponse[1]?.water_stress}
        sixth={packageResponse && packageResponse[1]?.zones}
        price={packageResponse && packageResponse[1]?.price}
        title={packageResponse && packageResponse[1]?.puname}
        caption={packageResponse && packageResponse[1]?.udescription}
        id={packageResponse && packageResponse[1]?.pid}
        farmId={route.params && route.params?.id}
        url={packageResponse && packageResponse[1]?.audio}
      />
    );
  };
  const FifthRoute = () => {
    return (
      <TabViewComponent
        first={packageResponse && packageResponse[0]?.soc}
        second={packageResponse && packageResponse[0]?.zones}
        third={true}
        fourth={packageResponse && packageResponse[0]?.plant_health}
        fifth={packageResponse && packageResponse[0]?.water_stress}
        sixth={packageResponse && packageResponse[0]?.zones}
        price={packageResponse && packageResponse[0]?.price}
        title={packageResponse && packageResponse[0]?.puname}
        caption={packageResponse && packageResponse[0]?.udescription}
        id={packageResponse && packageResponse[0]?.pid}
        farmId={route.params && route.params?.id}
        url={packageResponse && packageResponse[0]?.audio}
      />
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FouthRoute,
    fifth: FifthRoute,
  });

  const [index, setIndex] = useState(2);
  const [routes] = useState([
    { key: "first", title: packageResponse && packageResponse[4]?.puname }, //last
    { key: "second", title: packageResponse && packageResponse[3]?.puname },
    { key: "third", title: packageResponse && packageResponse[2]?.puname },
    { key: "fourth", title: packageResponse && packageResponse[1]?.puname },
    { key: "fifth", title: packageResponse && packageResponse[0]?.puname }, //first
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: "100%" }}
      indi
      renderTabBar={(props) => (
        <TabBar
          {...props}
          renderLabel={({ focused, route }) => {
            return (
              <Text
                style={
                  (Platform.OS = "android"
                    ? {
                        fontSize: 14,
                        fontWeight: "400",
                        textAlign: "center",
                        color: focused ? COLORS.green : COLORS.textgrey,
                      }
                    : {
                        fontSize: 14,
                        fontWeight: "400",
                        textAlign: "center",
                        color: focused ? COLORS.green : COLORS.textgrey,
                      })
                }
              >
                {route.title}
              </Text>
            );
          }}
          indicatorStyle={{ backgroundColor: COLORS.green }}
          style={{ backgroundColor: "white" }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
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
    fontSize: 22,
    fontWeight: "400",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  p8Text: {
    // width: wp(15),
    // backgroundColor: "pink",
    textAlign: "center",
    padding: 5,
  },
  column: {
    // marginHorizontal: wp(3),
    // height:hp(4),
    alignItems: "center",
    marginHorizontal: wp(1),
  },
  colHeading: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "CustomFont",
    color: COLORS.green,
  },
  p9Text: {
    fontSize: 24,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: COLORS.disableGrey,
    borderRadius: 50,
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp(1),
  },
  modalText: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "CustomFont",
    textAlign: "center",
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
});

export default Packages;

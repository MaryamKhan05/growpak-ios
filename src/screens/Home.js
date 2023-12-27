import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  Linking,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import * as _ from "lodash";
//internal imports
import COLORS from "../../assets/colors/colors";
import { Elements, Card, ActiveButton } from "../components/index";
import {
  getAllBanners,
  getForecast,
  getUserById,
  getWeather,
  homeCount,
  notifications,
} from "../redux/action";
import { useNavigation } from "@react-navigation/native";
const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [bannerData, setBannerData] = useState();
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedItem, setSelectedItem] = useState();
  const [farmers, setfarmers] = useState(0);
  const [farms, setFarms] = useState(0);
  const [updateModal, setUpdateModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const weatherResponse = useSelector((state) => state.api.weather?.data);
  const bannerResponse = useSelector((state) => state.api.banners?.data?.data);
  let userByIdResponse = useSelector(
    (state) => state.api.userById?.data?.data[0]
  );
  const countResponse = useSelector((state) => state.api.homeCount?.data);
  const token = useSelector((state) => state.api.token);

  useEffect(() => {
    dispatch(getUserById());
  }, []);

  useEffect(() => {
    if (userByIdResponse) {
      // console.log(userByIdResponse, "pppppppp");
      let n = userByIdResponse?.name;
      let t = userByIdResponse?.type;
      // console.log(t, "tttttttttttttttttttttttttt");
      // setName(n);
      setType(t);
    }
  }, [userByIdResponse]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getLocationHandler();
    });

    return unsubscribe;
  }, [navigation]);

  const getLocationHandler = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log(location, "location");
    let lat = location.coords.latitude;
    // console.log(lat, "latitude");
    setLocation(location);
    let lon = location.coords.longitude;
    setLongitude(lon);
    setLatitude(lat);
  };

  useEffect(() => {
    if (bannerResponse) {
      setBannerData(bannerResponse);
    }
    if (countResponse) {
      let farmers = countResponse?.data[0].count;
      setfarmers(farmers);

      let farms = countResponse?.data[1].count;
      setFarms(farms);
      let userVersion = "2";
      let version = countResponse?.data[2].count;
      if (userVersion < version) {
        // setUpdateModal(true);
      }
    }
  }, [bannerResponse, countResponse]);

  useEffect(() => {
    dispatch(getAllBanners());
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(homeCount());
    });

    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   getTypeHandler();
  // }, []);
  // const getTypeHandler = async () => {
  //   try {
  //     const usertype = await AsyncStorage.getItem("type");
  //     const typ = JSON.parse(usertype);
  //     // console.log("........", typ);
  //     setType(typ);
  //     // setLoading(false);
  //   } catch (e) {
  //     console.log("error getting type from storage on home", e);
  //   }
  // };
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {
    if (location) {
    }
    if (latitude && longitude) {
      setLoading(false);
      getWeatherHandler(latitude, longitude);
    }
    if (type) {
      setLoading(false);
    }
  }, [location, latitude, longitude, type]);

  useEffect(() => {
    if (weatherResponse) {
    }
  }, [weatherResponse]);

  const getWeatherHandler = (lat, lon) => {
    dispatch(getWeather({ lat, lon }));
  };

  if (weatherResponse == "" || weatherResponse === "undefined") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (loading || !bannerResponse) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <ActivityIndicator size={"large"} color={COLORS.green} />
      </View>
    );
  }

  const weatherHandler = () => {
    let lat = weatherResponse?.coord?.lat;
    let long = weatherResponse?.coord?.lon;
    dispatch(getForecast({ lat, long }));
    navigation.navigate("Weather");
  };

  const openWhatsapp = (phoneNumber) => {
    const message = "";
    Linking.openURL(`http://api.whatsapp.com/send?phone=${phoneNumber}`);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => [
            navigation.navigate("Notification"),
            dispatch(notifications()),
          ]}
        >
          <Fontisto name="bell" size={hp(2)} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-end",
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 21,
              fontFamily: "NotoBold",
              color: COLORS.green,
            }}
          >
            گروپاک
          </Text>
          <Image
            style={{ height: hp(3), width: wp(12) }}
            source={require("../../assets/logo9.png")}
            resizeMode="contain"
          />
        </View>
      </View>
      {/* notificaiton bar */}
      {/* {notification ? (
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => [
            navigation.navigate("Notification"),
            dispatch(notifications()),
          ]}
        >
          <Text style={styles.notificationText}>{notification}</Text>
        </TouchableOpacity>
      ) : null} */}
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {/** image  */}
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={weatherHandler}
            >
              <ImageBackground
                style={{
                  height: hp("22"),
                  width: wp("92"),
                  borderRadius: 20,
                  overflow: "hidden",
                }}
                source={require("../../assets/greenery2.jpg")}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    flex: 1,
                    padding: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {weatherResponse && (
                      <>
                        {weatherResponse?.weather[0]?.main === "Clear" && (
                          <Fontisto name="day-sunny" size={30} color="white" />
                        )}
                        {weatherResponse?.weather[0]?.main === "Clouds" && (
                          <Fontisto name="day-cloudy" size={30} color="white" />
                        )}
                        {weatherResponse?.weather[0]?.main === "Snow" && (
                          <Fontisto name="day-cloudy" size={30} color="white" />
                        )}
                        {weatherResponse?.weather[0]?.main === "Rain" && (
                          <Fontisto name="day-rain" size={30} color="white" />
                        )}
                        {weatherResponse?.weather[0]?.main === "Mist" ||
                          weatherResponse?.weather[0]?.main === "Smoke" ||
                          weatherResponse?.weather[0]?.main === "Haze" ||
                          weatherResponse?.weather[0]?.main === "Dust" ||
                          weatherResponse?.weather[0]?.main === "Fog" ||
                          weatherResponse?.weather[0]?.main === "Sand" ||
                          weatherResponse?.weather[0]?.main === "Dust" ||
                          weatherResponse?.weather[0]?.main === "Ash" ||
                          weatherResponse?.weather[0]?.main === "Squall" ||
                          (weatherResponse?.weather[0]?.main === "Tornado" && (
                            <Fontisto name="fog" size={30} color="white" />
                          ))}
                        {weatherResponse?.weather[0]?.main === "Drizzle" && (
                          <Fontisto name="rains" size={30} color="white" />
                        )}
                        {weatherResponse?.weather[0]?.main ===
                          "Thunderstorm" && (
                          <Ionicons
                            name="thunderstorm-outline"
                            size={30}
                            color="white"
                          />
                        )}
                        {weatherResponse?.weather[0]?.main === "Snow" && (
                          <FontAwesome
                            name="snowflake-o"
                            size={30}
                            color="white"
                          />
                        )}
                      </>
                    )}
                    <Text style={styles.text}>آج کا موسم </Text>
                  </View>

                  {weatherResponse ? (
                    <View>
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: 32,
                          color: COLORS.white,
                          fontWeight: "600",
                          fontFamily: "CustomFont",
                        }}
                      >
                        {parseInt(weatherResponse?.main?.temp)}°
                      </Text>
                      <Text style={[styles.text, { marginBottom: 10 }]}>
                        {weatherResponse?.weather[0]?.description}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </ImageBackground>
            </TouchableOpacity>

            {/* swiper */}
            {bannerData ? (
              <View
                style={{
                  height: hp(25),
                  alignSelf: "center",
                  marginTop: 15,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SwiperFlatList
                  autoplay={false}
                  autoplayLoop={false}
                  index={bannerData?.length - 1}
                  showPagination
                  data={bannerData && bannerData}
                  paginationActiveColor="#FFB03B"
                  paginationStyle={{
                    columnGap: hp(-1.7),
                    height: 20,
                    width: 20,
                  }}
                  paginationStyleItem={{ height: 10, width: 10 }}
                  renderItem={({ item }) => (
                    <View
                      style={[
                        {
                          width: wp(95),
                          alignItems: "center",
                          justifyContent: "center",
                          alignSelf: "center",
                          margin: 10,
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <ImageBackground
                        source={{ uri: item.img }}
                        style={styles.bannerImage}
                        resizeMode="cover"
                      >
                        <View
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            flex: 1,
                            padding: 15,
                          }}
                        >
                          <Text style={styles.bannerSubheading}>
                            {item.sub_heading}
                          </Text>
                          <Text style={styles.bannerMainheading}>
                            {item.main_heading}
                          </Text>
                          <TouchableOpacity
                            style={styles.bannerButton}
                            onPress={() => [
                              item.whatsapp?.length > 0
                                ? openWhatsapp(item.whatsapp)
                                : navigation.navigate("LearnMore", {
                                    url: item.banner_url,
                                  }),
                            ]}
                          >
                            <Text style={{ color: COLORS.green }}>
                              مزید جانیئے
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </ImageBackground>
                      {item.flash_enabled ? (
                        <Modal
                          animationType="fade"
                          transparent={true}
                          visible={modalVisible}
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
                                width: wp(95),
                                borderRadius: 16,
                              }}
                            >
                              <View
                                style={{
                                  height: hp(30),
                                }}
                              >
                                <ImageBackground
                                  source={{ uri: item.img }}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    alignSelf: "center",
                                    borderTopRightRadius: 16,
                                    borderTopLeftRadius: 16,
                                    overflow: "hidden",
                                  }}
                                >
                                  <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={{
                                      backgroundColor: COLORS.white,
                                      borderRadius: 50,
                                      width: 30,
                                      height: 30,
                                      alignItems: "center",
                                      justifyContent: "center",
                                      alignSelf: "flex-end",
                                      top: 20,
                                      right: 20,
                                    }}
                                  >
                                    <Entypo
                                      name="cross"
                                      size={20}
                                      color={"black"}
                                    />
                                  </TouchableOpacity>
                                </ImageBackground>
                              </View>
                              <View
                                style={{
                                  padding: 20,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Text style={styles.modalSubHeading}>
                                  {item.sub_heading}
                                </Text>
                                <Text style={styles.modalMainHeading}>
                                  {item.main_heading}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => [
                                    setModalVisible(false),
                                    item.whatsapp?.length > 0
                                      ? openWhatsapp(item.whatsapp)
                                      : navigation.navigate("LearnMore", {
                                          url: item.banner_url,
                                        }),
                                  ]}
                                >
                                  <ActiveButton
                                    text="مزید جانیئے"
                                    width={wp(80)}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </Modal>
                      ) : null}
                    </View>
                  )}
                />
              </View>
            ) : null}

            {/**  first row */}
            <View style={styles.elementsContainer}>
              <Elements
                text="زرعی مرکز"
                image={require("../../assets/cart2.png")}
                press="ElementsView"
                url="https://growpak.store/"
              />
              <Elements
                text="منڈی ریٹس "
                image={require("../../assets/bar2.png")}
                press="ElementsView"
                url="https://growpak.store/mandirates/"
              />
              <Elements
                text="کمیو نیٹی"
                image={require("../../assets/community2.png")}
              />
            </View>

            {/** main content  */}
            {type == "3" ? (
              <View
                style={{
                  width: wp("92"),
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Card
                    heading="کسان"
                    caption="کل کسان"
                    number={farmers}
                    image={require("../../assets/man2.png")}
                    onPress={"AllFarmers"}
                  />
                  <Card
                    heading="کھیت"
                    caption="کل کھیت"
                    number={farms}
                    image={require("../../assets/sunset2.png")}
                    onPress={"Farm"}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Card
                    heading="آپ کی صحت"
                    caption="واؤ ہیلتھ کے تعاون سے"
                    image={require("../../assets/hosp2.png")}
                  />
                  <Card
                    heading="فارم مینجمنٹ"
                    caption=" کھیتوں کی مینجمنٹ"
                    image={require("../../assets/tools2.png")}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Card
                    heading="پیداواری منصوبہ"
                    caption="کل سفارشات"
                    // number="1"
                    image={require("../../assets/grp2.png")}
                    url="https://www.growtechsol.com/advisory_ur.html"
                  />
                  <Card
                    heading="خبریں"
                    caption="کل خبریں"
                    number=""
                    image={require("../../assets/news2.png")}
                    onPress="Notification"
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  width: wp("92"),
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Card
                    heading="کھیت "
                    caption="کل کھیت"
                    number={farms}
                    image={require("../../assets/sunset2.png")}
                    onPress={"Farm"}
                  />
                  <Card
                    heading="خبریں"
                    caption="کل خبریں"
                    number=""
                    image={require("../../assets/news2.png")}
                    onPress="Notification"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Card
                    heading="آپ کی صحت"
                    caption=" واؤ ہیلتھ کے تعاون سے"
                    image={require("../../assets/hosp2.png")}
                  />
                  <Card
                    heading="فارم مینجمنٹ"
                    caption="کھیتوں کی مینجمنٹ"
                    image={require("../../assets/tools2.png")}
                  />
                </View>
                <View>
                  <Card
                    heading="پیداواری منصوبہ"
                    caption="کل سفارشات"
                    // number="1"
                    image={require("../../assets/grp2.png")}
                    url="https://www.growtechsol.com/advisory_ur.html"
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      {/* update modal  */}

      <Modal animationType="fade" visible={updateModal} transparent={true}>
        <View
          style={{
            justifyContent: "center",
            flex: 1,
            backgroundColor: COLORS.overlay,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 25,
              padding: 10,
              height: hp(20),
              alignItems: "center",
              justifyContent: "center",
              width: wp(80),
            }}
          >
            <Text> Please Update App</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://play.google.com/store/apps/details?id=growtechsol.com&hl=en&gl=US&pli=1"
                )
              }
              style={{
                backgroundColor: COLORS.green,
                padding: 10,
                margin: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white" }}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "eef0f2",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    color: COLORS.white,
    textAlign: "right",
  },
  imageContainer: {
    borderRadius: 50,
    alignSelf: "center",
  },
  elementsContainer: {
    backgroundColor: COLORS.white,
    width: wp("92"),
    // width:'100%',
    borderRadius: 20,
    margin: hp("2"),
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("92"),
    marginTop: 10,
    marginBottom: hp("2"),
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: COLORS.disableGrey,
    borderRadius: 50,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    height: hp(25),
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImage: {
    overflow: "hidden",
    borderRadius: 20,
    height: "100%",
    width: wp(92),
    alignSelf: "center",
  },
  bannerSubheading: {
    fontWeight: "600",
    fontSize: 18,
    fontFamily: "CustomFont",
    color: COLORS.white,
    textAlign: "right",
  },
  bannerMainheading: {
    fontWeight: "400",
    fontSize: 14,
    fontFamily: "CustomFont",
    color: COLORS.white,
    textAlign: "right",
  },
  bannerButton: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    width: 135,
    height: 36,
    borderRadius: 50,
    alignSelf: "flex-end",
    marginVertical: 15,
  },
  modalMainHeading: {
    fontWeight: "400",
    fontSize: 24,
    fontFamily: "CustomFont",
    textAlign: "center",
    marginVertical: 20,
  },
  modalSubHeading: {
    fontWeight: "400",
    fontSize: 32,
    fontFamily: "CustomFont",
    textAlign: "center",
  },
  modalMainHeading: {
    fontWeight: "400",
    fontSize: 24,
    fontFamily: "CustomFont",
    textAlign: "center",
    marginVertical: 20,
  },
  modalSubHeading: {
    fontWeight: "400",
    fontSize: 32,
    fontFamily: "CustomFont",
    textAlign: "center",
  },
  notificationText: {
    fontFamily: "CustomFont",
    fontSize: 18,
    fontWeight: "400",
    color: "white",
  },
  notificationContainer: {
    backgroundColor: "black",
    alignItems: "center",
    width: wp(92),
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
});

export default Home;

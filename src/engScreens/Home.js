import React, { useState, useEffect, useRef } from "react";
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
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import * as _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
//internal imports
import COLORS from "../../assets/colors/colors";
import { Elements, Card, ActiveButton } from "../engComponents/Index";
import {
  getAllBanners,
  getForecast,
  getUserById,
  getWeather,
  homeCount,
  notifications,
  tokenWithId,
  updateUserLang,
} from "../redux/action";

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

  const [locationModal, setLocationModal] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [notificationModal, setNotificationModalVisible] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const subscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const route = response?.notification?.request?.content?.data?.type;

          if (route == "Notification") {
            dispatch(notifications());
            navigation.navigate("Notification");
          }
          if (route == "Mandi") {
            navigation.navigate("ElementsView");
          }
        });
      return () => subscription.remove();
    });

    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     checkNotificationStatus();
  //   }, 5000);
  // }, []);

  const checkNotificationStatus = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    if (existingStatus !== "granted") {
      setNotificationModalVisible(true);
    }
  };

  const requestNotificationPermission = async () => {
    setNotificationModalVisible(false);
    registerForPushNotificationsAsync().then((token) =>
      dispatch(tokenWithId({ token, platform: "ios" }))
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  };

  async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("notification token", token);

    return token;
  }

  const weatherResponse = useSelector((state) => state.api.weather?.data);
  const bannerResponse = useSelector((state) => state.api.banners?.data?.data);
  let lang = useSelector((state) => state.api.appLang?.data);
  let userByIdResponse = useSelector(
    (state) => state.api.userById?.data?.data[0]
  );
  const countResponse = useSelector((state) => state.api.homeCount?.data);

  useEffect(() => {
    dispatch(getUserById());
    getUserLang();
  }, []);
  const getUserLang = async () => {
    let x = await AsyncStorage.getItem("lang");
    dispatch(updateUserLang(x));
  };
  useEffect(() => {
    if (userByIdResponse) {
      let n = userByIdResponse?.name;
      let t = userByIdResponse?.type;
      setType(t);
    }
  }, [userByIdResponse]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     getLocationHandler();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     checkLocationPermission(); // Check permission when the component mounts
  //   }, 10000);
  // }, []);
  const checkLocationPermission = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    console.log(status, "the status of the location permissions ");
    if (status !== "granted") {
      setLocationModal(true); // Enable the modal if permission is not granted
      setErrorMsg("Permission to access location was denied");
    } else {
      let location = await Location.getCurrentPositionAsync({});
      console.log("location of the user on urdu english screen", location);
      let lat = location.coords.latitude;
      setLocation(location);
      let lon = location.coords.longitude;
      setLongitude(lon);
      setLatitude(lat);
    }
  };
  const requestLocationPermission = async () => {
    try {
      setLocationModal(false);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        // If permission is granted, proceed with getting the location
        let location = await Location.getCurrentPositionAsync({});
        let lat = location.coords.latitude;
        setLocation(location);
        let lon = location.coords.longitude;
        setLongitude(lon);
        setLatitude(lat);
      } else {
        setErrorMsg("Permission to access location was denied");
      }
    } catch (error) {
      console.error("Error getting location:", error);
      setErrorMsg("Error getting location");
    }
  };

  const getLocationHandler = async () => {
    // console.log("location handler ");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location, "location");
    let lat = location.coords.latitude;
    console.log(lat, "latitude");
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
      let farmers = countResponse?.data[0]?.count;
      setfarmers(farmers);

      let farms = countResponse?.data[1]?.count;
      setFarms(farms);
      let userVersion = "2";
      let version = countResponse?.data[2]?.count;
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{ height: hp(3), width: wp(12) }}
            source={require("../../assets/logo9.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 21,
              color: COLORS.green,
              fontFamily: "PoppinsBold",
            }}
          >
            GrowPak
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => [
            navigation.navigate("Notification"),
            dispatch(notifications()),
          ]}
        >
          <Fontisto name="bell" size={hp(2)} />
        </TouchableOpacity>
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
            {/** weather  */}
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
                    <Text
                      style={[
                        styles.text,
                        { fontFamily: "PoppinsSemi", marginVertical: 10 },
                      ]}
                    >
                      Today's Weather
                    </Text>
                    {weatherResponse && (
                      <>
                        {weatherResponse.weather[0].main === "Clear" && (
                          <Fontisto name="day-sunny" size={30} color="white" />
                        )}
                        {weatherResponse.weather[0].main === "Clouds" && (
                          <Fontisto name="day-cloudy" size={30} color="white" />
                        )}
                        {weatherResponse.weather[0].main === "Snow" && (
                          <Fontisto name="day-cloudy" size={30} color="white" />
                        )}
                        {weatherResponse.weather[0].main === "Rain" && (
                          <Fontisto name="day-rain" size={30} color="white" />
                        )}
                        {weatherResponse.weather[0].main === "Mist" ||
                          weatherResponse.weather[0].main === "Smoke" ||
                          weatherResponse.weather[0].main === "Haze" ||
                          weatherResponse.weather[0].main === "Dust" ||
                          weatherResponse.weather[0].main === "Fog" ||
                          weatherResponse.weather[0].main === "Sand" ||
                          weatherResponse.weather[0].main === "Dust" ||
                          weatherResponse.weather[0].main === "Ash" ||
                          weatherResponse.weather[0].main === "Squall" ||
                          (weatherResponse.weather[0].main === "Tornado" && (
                            <Fontisto name="fog" size={30} color="white" />
                          ))}
                        {weatherResponse.weather[0].main === "Drizzle" && (
                          <Fontisto name="rains" size={30} color="white" />
                        )}
                        {weatherResponse.weather[0].main === "Thunderstorm" && (
                          <Ionicons
                            name="thunderstorm-outline"
                            size={30}
                            color="white"
                          />
                        )}
                        {weatherResponse.weather[0].main === "Snow" && (
                          <FontAwesome
                            name="snowflake-o"
                            size={30}
                            color="white"
                          />
                        )}
                      </>
                    )}
                  </View>

                  {weatherResponse ? (
                    <View>
                      <Text
                        style={{
                          fontSize: 22,
                          color: COLORS.white,
                          fontFamily: "PoppinsBold",
                        }}
                      >
                        {parseInt(weatherResponse.main.temp)}°
                      </Text>
                      <Text style={[styles.text, { marginBottom: 10 }]}>
                        {weatherResponse.weather[0].description}
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
                  index={0}
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
                            {item.subheading_e}
                          </Text>
                          <Text style={styles.bannerMainheading}>
                            {item.mainheading_e}
                          </Text>
                          <TouchableOpacity
                            style={styles.bannerButton}
                            onPress={() => [
                              item.whatsapp?.length > 0
                                ? openWhatsapp(item.whatsapp)
                                : navigation.navigate("LearnMore", {
                                    url: item.banner_url_e,
                                  }),
                            ]}
                          >
                            <Text style={{ color: COLORS.green }}>
                              Learn More
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
                                  // resizeMode="cover"
                                >
                                  <TouchableOpacity
                                    onPress={() => [
                                      setModalVisible(false),
                                      checkLocationPermission(),
                                    ]}
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
                                  {item.subheading_e}
                                </Text>
                                <Text style={styles.modalMainHeading}>
                                  {item.mainheading_e}
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
                                    text="Learn More"
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
                text="Community"
                image={require("../../assets/community2.png")}
              />
              <Elements
                text="Mandi Rates"
                image={require("../../assets/bar2.png")}
                press="ElementsView"
                url="https://growpak.store/mandirates/"
              />
              <Elements
                text="Agri-Store"
                image={require("../../assets/cart2.png")}
                press="ElementsView"
                url="https://growpak.store/"
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
                    heading="Farmer"
                    caption="Total Farmers"
                    number={farmers}
                    image={require("../../assets/man2.png")}
                    onPress={"AllFarmers"}
                  />
                  <Card
                    heading="Farm"
                    caption="Total Farms"
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
                    heading=" Your Health"
                    caption="Powered by WOW Health"
                    image={require("../../assets/hosp2.png")}
                  />
                  <Card
                    heading="Management "
                    caption="Farm Management"
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
                    heading="Advisory"
                    caption="Total Requests"
                    // number="1"
                    image={require("../../assets/grp2.png")}
                    url="https://www.growtechsol.com/advisory.html"
                  />
                  <Card
                    heading="News"
                    caption="Total News"
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
                    heading="Farm"
                    caption="Total Farms"
                    number={farms}
                    image={require("../../assets/sunset2.png")}
                    onPress={"Farm"}
                  />
                  <Card
                    heading="News"
                    caption="Total News"
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
                    heading=" Your Health"
                    caption="Powered by WOW Health"
                    image={require("../../assets/hosp2.png")}
                  />
                  <Card
                    heading="Management"
                    caption="Farm Management"
                    image={require("../../assets/tools2.png")}
                  />
                </View>
                <View>
                  <Card
                    heading="Advisory"
                    caption="Total Requests"
                    // number="1"
                    image={require("../../assets/grp2.png")}
                    url="https://www.growtechsol.com/advisory.html"
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

      {/* location modal */}
      <Modal animationType="fade" visible={locationModal} transparent={true}>
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
              borderRadius: 10,
              padding: 10,
              // height: hp(20),
              alignItems: "center",
              justifyContent: "center",
              width: wp(80),
            }}
          >
            <Image
              source={require("../../assets/location.jpg")}
              style={styles.locationImage}
              resizeMode="contain"
            />
            <Text style={styles.locationHeading}>
              GrowPak requires your current location to show the current
              weather. Please grant location access to provide you with accurate
              weather information.
            </Text>
            <Text style={styles.locationHeading}>
              You can change this option later in the settings app
            </Text>
            <TouchableOpacity
              onPress={requestLocationPermission}
              style={styles.locationButton}
            >
              <Text style={styles.locationButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* notification modal  */}
      <Modal
        animationType="fade"
        visible={notificationModal}
        transparent={true}
      >
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
              borderRadius: 10,
              padding: 10,
              // height: hp(20),
              alignItems: "center",
              justifyContent: "center",
              width: wp(80),
            }}
          >
            <Image
              source={require("../../assets/notification.jpg")}
              style={styles.notificationImage}
              resizeMode="contain"
            />
            <Text style={styles.notificationHeading}>
              Grant GrowPak access to notifications now to ensure that you
              receive timely updates on your packages, farms, reports, weather,
              Mandi rates, and other important information. Don’t miss out on
              any crucial updates - allow GrowPak to keep you informed.
            </Text>
            <View style={styles.notificationButtonRow}>
              <TouchableOpacity
                onPress={() => [
                  setLocationModal(false),
                  requestNotificationPermission(),
                ]}
                style={styles.notificationButton}
              >
                <Text style={styles.notificationButtonText}>Allow</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setNotificationModalVisible(false)}
                style={styles.notificationButton}
              >
                <Text style={styles.notificationButtonText}>Maybe Later</Text>
              </TouchableOpacity>
            </View>
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
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    color: COLORS.white,
  },
  imageContainer: {
    borderRadius: 50,
    alignSelf: "center",
  },
  elementsContainer: {
    backgroundColor: COLORS.white,
    width: wp("92"),
    borderRadius: 20,
    margin: hp("2"),
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("92"),
    marginTop: hp(2),
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
    fontSize: 14,
    fontFamily: "PoppinsSemi",
    color: COLORS.white,
  },
  bannerMainheading: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: COLORS.white,
  },
  bannerButton: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 36,
    borderRadius: 50,
    marginVertical: 15,
  },
  modalMainHeading: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
    marginVertical: 20,
  },
  modalSubHeading: {
    fontSize: 18,
    fontFamily: "PoppinsSemi",
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
  locationButtonRow: {
    flexDirection: "row",
    gap: 10,
  },
  locationImage: {
    height: hp(30),
    width: wp(70),
    borderRadius: 10,
    overflow: "hidden",
  },
  locationHeading: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    margin: 10,
    textAlign: "center",
  },
  locationButton: {
    backgroundColor: COLORS.disableGrey,
    padding: 15,
    width: wp(70),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
  },
  locationButtonText: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
  notificationButtonRow: {
    flexDirection: "row",
    gap: 10,
  },
  notificationImage: {
    height: hp(30),
    width: wp(70),
    borderRadius: 10,
    overflow: "hidden",
  },
  notificationHeading: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    margin: 10,
    textAlign: "center",
  },
  notificationButton: {
    backgroundColor: COLORS.disableGrey,
    padding: 10,
    width: wp(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
  },
  notificationButtonText: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
});

export default Home;

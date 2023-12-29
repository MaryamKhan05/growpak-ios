import "react-native-gesture-handler";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
  Polyline,
} from "react-native-maps";
import ViewShot from "react-native-view-shot";
import Foundation from "react-native-vector-icons/Foundation";
import Entypo from "react-native-vector-icons/Entypo";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { geoLocation } from "../../redux/action";
//internal imports
import COLORS from "../../../assets/colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const INITIAL_LAT = 30.827973;
const INITIAL_LNG = 73.529506;
const INITIAL_POSITION = {
  latitude: INITIAL_LAT,
  longitude: INITIAL_LNG,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const NewFarm = () => {
  const navigation = useNavigation();
  const imageRef = useRef();
  const dispatch = useDispatch();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [name, setName] = useState("");
  const map = useRef(null);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [newFarm, setNewFarm] = useState(true);
  // const [status, requestPermission] = MediaLibrary.usePermissions();
  const [userLocation, setUserLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [locationModal, setLocationModal] = useState(false);

  // top navigation buttons state
  const [farm, setFarm] = useState(false);
  const [weather, setWeather] = useState(false);
  const [activity, setActivity] = useState(false);
  const [reports, setReports] = useState(false);
  let polygonArray = [];
  // bottom buttons state
  const [health, setHealth] = useState(false);
  const [water, setWater] = useState(false);
  const [nitrogen, setNitrogen] = useState(false);
  const [carbon, setCarbon] = useState(false);
  const [area, setArea] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [snapshotImage, setSnapshotImage] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: ` کھیت - ${area} `,
      headerTitleStyle: {
        color: COLORS.white,
        fontFamily: "CustomFont",
        fontSize: 28,
        fontWeight: "400",
      },
    });
  }, [area]);

  useEffect(() => {
    for (let j in polygonPoints) {
      polygonArray.push([
        polygonPoints[j].latitude,
        polygonPoints[j].longitude,
      ]);
    }

    savePolygonArray();
  }, [polygonPoints]);

  const savePolygonArray = async () => {
    await AsyncStorage.setItem("coords", JSON.stringify(polygonArray));
  };

  useEffect(() => {
    if (polygonPoints.length == 1) {
      dispatch(geoLocation(polygonPoints));
    }
  }, [polygonPoints]);

  useEffect(() => {
    if (polygonPoints.length < 3) {
      setArea(0);
    } else {
      calculateArea();
    }
  }, [polygonPoints]);

  const handlePlaceSelect = (data, details = null) => {
    if (details) {
      const coord = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      };

      console.log("name of location", details.name);
      setName(details.name);

      setSelectedPlace(coord);
      console.log("....", coord);

      // Move the map to the selected place
      map.current?.animateToRegion({
        ...coord,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // Dismiss the keyboard
      Keyboard.dismiss();
    }
  };

  const handleMapPress = (event) => {
    let newPoint = [];
    newPoint = {
      longitude: event.nativeEvent.coordinate.longitude,
      latitude: event.nativeEvent.coordinate.latitude,
    };
    setPolygonPoints([...polygonPoints, newPoint]);
  };
  useEffect(() => {
    setVideoModal(true);
  }, []);
  const deleteLastPolygon = () => {
    if (polygonPoints.length > 0) {
      const updatedPolygonPoints = [...polygonPoints];
      updatedPolygonPoints.pop();
      setPolygonPoints(updatedPolygonPoints);
      calculateArea();
    }
  };

  const deletePolygon = () => {
    setArea(0);
    setPolygonPoints([]);
  };

  const calculateArea = async () => {
    const numPoints = polygonPoints.length;
    if (numPoints < 3) {
      return 0;
    }
    let area = 0;
    for (let i = 0; i < numPoints; i++) {
      const p1 = polygonPoints[i];
      const p2 = polygonPoints[(i + 1) % numPoints];
      const lat1 = p1.latitude;
      const lon1 = p1.longitude;
      const lat2 = p2.latitude;
      const lon2 = p2.longitude;
      const deltaLon = lon2 - lon1;
      const deltaLat = lat2 - lat1;
      area += lat1 * lon2 - lat2 * lon1;
    }

    area = Math.abs(area) / 2;

    const latitude = polygonPoints[0].latitude; // Use latitude from a point in the polygon
    const squareDegreesToAcresAtEquator = 2300000; //2703297
    const areaInAcres =
      (area * squareDegreesToAcresAtEquator) /
      Math.cos((latitude * Math.PI) / 180);

    const finalArea = areaInAcres;

    let a = areaInAcres.toFixed(2);
    setArea(a);
    await AsyncStorage.setItem("area", JSON.stringify(finalArea));

    return finalArea;
  };

  const addFarmHandler = () => {
    if (area) {
      if (area < 3) {
        setModalVisible(true);
      } else {
        calculateArea();
        snapshot();
      }
    }
  };

  const snapshot = async () => {
    console.log("snapsot pressed");
    captureRef(imageRef, {
      format: "jpg",
      quality: 0.9,
    }).then(
      (uri) => navigation.navigate("FarmDetails", uri),
      (error) => console.log("error capturing ss", error)
    );
  };

  useEffect(() => {
    checkLocationPermission(); // Check permission when the component mounts
  }, []);

  const checkLocationPermission = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    console.log(status, "the status of the location permissions on newfarm:::::::: ");
    if (status !== "granted") {
      setLocationModal(true); // Enable the modal if permission is not granted
    }
  };
  const requestLocationPermission = async () => {
    try {
      setLocationModal(false);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        // If permission is granted, proceed with getting the location
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setLongitude(location.coords.longitude);
        setLatitude(location.coords.latitude);
       // Close the modal after granting permission
      } else {
        console.log("Permission to access location was denied");
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {newFarm == false ? (
        <View style={{ backgroundColor: COLORS.green }}>
          <View style={styles.topButtons}>
            <TouchableOpacity
              onPress={() => [
                setReports(true),
                setFarm(false),
                setActivity(false),
                setWeather(false),
              ]}
              style={[
                {
                  backgroundColor: reports ? "#00000042" : "transparent",
                },
                styles.activeButton,
              ]}
            >
              <Text style={styles.topButtonsText}>رپورٹس </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => [
                setReports(false),
                setFarm(false),
                setActivity(true),
                setWeather(false),
              ]}
              style={[
                {
                  backgroundColor: activity ? "#00000042" : "transparent",
                },
                styles.activeButton,
              ]}
            >
              <Text style={styles.topButtonsText}>سرگرمیاں</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => [
                setReports(false),
                setFarm(false),
                setActivity(false),
                setWeather(true),
              ]}
              style={[
                {
                  backgroundColor: weather ? "#00000042" : "transparent",
                },
                styles.activeButton,
              ]}
            >
              <Text style={styles.topButtonsText}> موسم</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => [
                setReports(false),
                setFarm(true),
                setActivity(false),
                setWeather(false),
              ]}
              style={[
                {
                  backgroundColor: farm ? "#00000042" : "transparent",
                  paddingHorizontal: 10,
                },
                styles.activeButton,
              ]}
            >
              <Text style={styles.topButtonsText}>میرا کھیت</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {newFarm ? (
        <View style={{ backgroundColor: COLORS.green }}>
          <View style={styles.topButtons}>
            <TouchableOpacity
              onPress={deleteLastPolygon}
              style={[
                {
                  backgroundColor: reports ? "#00000042" : "transparent",
                },
                styles.activeButton,
              ]}
            >
              <Text style={styles.topButtonsText}>آخری حذف کریں </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deletePolygon}
              style={[
                {
                  backgroundColor: activity ? "#00000042" : "transparent",
                },
                styles.activeButton,
              ]}
            >
              <Text style={styles.topButtonsText}>مکمل حذف کریں</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={addFarmHandler}
              style={[
                {
                  backgroundColor: weather ? "#00000042" : "transparent",
                },
                styles.activeButton,
              ]}
            >
              <Text style={styles.topButtonsText}> شامل کریں</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <ViewShot ref={imageRef} options={{ format: "jpg", quality: 0.9 }}>
        <MapView
          ref={map}
          provider={PROVIDER_GOOGLE}
          style={{ height: "100%", zIndex: -1, width: "100%" }}
          initialRegion={INITIAL_POSITION}
          mapType="hybrid"
          showsUserLocation={true}
          zoomTapEnabled={true}
          showsMyLocationButton={false}
          showsCompass={false}
          onPress={handleMapPress}
          minZoomLevel={16}
        >
          {selectedPlace && (
            <Marker coordinate={selectedPlace} title={name} description="" />
          )}
          {polygonPoints
            ? polygonPoints.map((point, index) => (
                <Marker
                  key={index}
                  coordinate={point}
                  title={`Point ${index}`}
                  pinColor="tomato"
                />
              ))
            : null}
          {polygonPoints
            ? polygonPoints.length >= 2 && (
                <Polyline
                  coordinates={polygonPoints}
                  strokeWidth={2}
                  lineDashPattern={[5, 5]}
                  strokeColor="red"
                />
              )
            : null}
          {polygonPoints
            ? polygonPoints.length >= 3 && (
                <Polygon
                  coordinates={polygonPoints}
                  strokeWidth={2}
                  lineDashPattern="[5,5,5]"
                  strokeColor="red"
                  fillColor="rgba(0, 0, 0, 0)"
                />
              )
            : null}
        </MapView>
      </ViewShot>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={handlePlaceSelect}
        query={{
          key: "AIzaSyDj2NyGKqea5gAgspcjnG8PfGVZ3tlcwKA",
          language: "en",
        }}
        styles={{
          container: {
            position: "absolute",
            top: hp(17),
            left: 10,
            right: 10,
          },
          textInputContainer: {
            backgroundColor: "rgba(0,0,0,0)",
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 45,
            color: "#5d5d5d",
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
      />

      {/* area modal  */}

      <Modal animationType="fade" visible={modalVisible} transparent>
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
              height: hp(20),
              // padding: 10,
              borderRadius: 25,
              // margin: 10,
              width: wp(80),
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                backgroundColor: COLORS.disableBlack,
                borderRadius: hp(10),
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-end",
                margin: 10,
              }}
            >
              <Entypo name="cross" size={20} color={"white"} />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                fontFamily: "CustomFont",
                // margin: hp(5),
                textAlign: "center",
                paddingBottom: 10,
              }}
            >
              رقبہ کم از کم 3 ایکڑ ہونا چاہیے۔
            </Text>
          </View>
        </View>
      </Modal>
      {/* video modal */}
      <Modal animationType="fade" transparent={true} visible={videoModal}>
        <TouchableWithoutFeedback onPress={() => setVideoModal(false)}>
          <View style={styles.dotCenteredView}>
            <View style={styles.dotModalView}>
              <View
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("YoutubeScreen")}
                  style={styles.dotIconContainer}
                >
                  <Foundation
                    name="play-video"
                    size={hp(3)}
                    color={COLORS.green}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <Text style={styles.modalText}>
                  راہنمائی کے لیے ویڈیو دیکھیں
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
              source={require("../../../assets/location.jpg")}
              style={styles.locationImage}
              resizeMode="contain"
            />
            <Text style={styles.locationHeading}>
              GrowPak requires your current location to show the current
              weather. Please grant location access to provide you with accurate
              weather information.
            </Text>
            <View style={styles.locationButtonRow}>
              <TouchableOpacity
                // onPress={requestLocationPermission}
                style={styles.locationButton}
              >
                <Text style={styles.locationButtonText}>Allow</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLocationModal(false)}
                style={styles.locationButton}
              >
                <Text style={styles.locationButtonText}>Maybe Later</Text>
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
  button: {
    fontSize: 18,
    fontWeight: "400",
    padding: hp(1),
    paddingHorizontal: hp(2),
    borderRadius: 10,
    marginHorizontal: 2,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.green,
    alignItems: "center",
    paddingTop: hp(8),
    justifyContent: "center",
  },
  headerText: {
    color: COLORS.white,
    width: wp(60),
    textAlign: "right",
  },
  icon: {
    marginHorizontal: hp(1),
  },
  topButtons: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "space-evenly",
    width: "100%",
    padding: 10,
    backgroundColor: "#0000001F",
  },
  topButtonsText: {
    color: COLORS.white,
    fontFamily: "CustomFont",
    fontSize: 18,
    fontWeight: "400",
  },
  activeButton: {
    padding: hp(0.5),
    borderRadius: 10,
    paddingHorizontal: hp(2),
  },
  bottomButtons: {
    backgroundColor: COLORS.black,
    padding: 10,
    borderRadius: 12,
    flexDirection: "row",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: hp(85),
  },
  bottomActiveButton: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    padding: hp(1),
    paddingHorizontal: hp(3),
    borderRadius: 10,
    marginHorizontal: 5,
  },
  bottomButtonsText: {
    fontFamily: "CustomFont",
    fontSize: 20,
    fontWeight: "400",
  },
  locationButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 50,
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
  modalText: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    textAlign: "center",
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
  },
  locationButton: {
    backgroundColor: COLORS.disableGrey,
    padding: 10,
    width: wp(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
  },
  locationButtonText: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
});
export default NewFarm;

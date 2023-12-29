import "react-native-gesture-handler";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from "react-native";
import ViewShot from "react-native-view-shot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { captureRef } from "react-native-view-shot";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
  Polyline,
} from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";
//internal imports
import COLORS from "../../../assets/colors/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { geoLocation } from "../../redux/action";

const FarmDuplication = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const imageRef = useRef();
  const route = useRoute();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [name, setName] = useState("");
  const map = useRef(null);

  const [polygonPoints, setPolygonPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState();
  const [lng, setlng] = useState();

  // bottom buttons state
  const [id, setId] = useState();
  const [farmid, setFarmId] = useState(null);
  const [bbox, setBbox] = useState();
  const [area, setArea] = useState(route.params?.area);
  const [modalVisible, setModalVisible] = useState(false);
  const [farmName, setFarmName] = useState(route.params?.name);
  let farmbyisresponse = useSelector((state) => state.api.farmbyid?.data?.data);

  useEffect(() => {
    if (farmbyisresponse !== undefined) {
      let polygonArray = farmbyisresponse[0]?.polygon_points;
      let polygonPointsArray = [];

      let farmid = farmbyisresponse[0]?.fid;
      setFarmId(farmid);

      for (let [index, value] of polygonArray.entries()) {
        if (index != 0) {
          polygonPointsArray.push({
            latitude: value[0],
            longitude: value[1],
          });
        }
      }
      setBbox(farmbyisresponse[0]?.bbox);
      setPolygonPoints(polygonPointsArray);
      const initialLat = farmbyisresponse[0]?.center[0];
      setLat(initialLat);

      const initialLng = farmbyisresponse[0]?.center[1];
      setlng(initialLng);
      const ID = farmbyisresponse[0]?.polygon_id;
      setId(ID);
    }
  }, [farmbyisresponse]);

  const INITIAL_POSITION = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    if (lat && lng && id) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [lat, lng, id]);

  const deleteLastPolygon = () => {
    if (polygonPoints.length > 0) {
      const updatedPolygonPoints = [...polygonPoints];
      updatedPolygonPoints.pop();
      setPolygonPoints(updatedPolygonPoints);
      console.log(updatedPolygonPoints, "updatedPolygonPoints");
    }
    console.log(polygonPoints.length, "polygon length");
    if (polygonPoints.length >= 2) {
      calculateArea();
    } else {
      setArea(0);
    }
  };

  useEffect(() => {
    if (polygonPoints) {
      calculateArea();
    }
  }, [polygonPoints]);

  const deletePolygon = () => {
    setArea(0);
    setPolygonPoints([]);
  };

  const calculateArea = async () => {
    const numPoints = polygonPoints.length;
    if (numPoints < 3) {
      setArea(0);
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
    // Convert square degrees to acres
    const latitude = polygonPoints[0].latitude; // Use latitude from a point in the polygon
    const squareDegreesToAcresAtEquator = 2300000; //2703297
    const areaInAcres =
      (area * squareDegreesToAcresAtEquator) /
      Math.cos((latitude * Math.PI) / 180);

    const finalArea = areaInAcres;
    let a = areaInAcres.toFixed(2);

    setArea(a);
    console.log(a, "area on farm duplicaiton screen in urdu!");
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: `${area} - ${farmName}`,
      headerTitleStyle: {
        color: COLORS.white,
        fontFamily: "CustomFont",
        fontSize: 28,
        fontWeight: "400",
      },
    });
  }, [area]);
  let polygonArray = [];

  const addFarmHandler = async () => {
    if (polygonPoints.length < 3 || area < 3) {
      setModalVisible(true);
    } else {
      dispatch(geoLocation(polygonPoints));
      for (let j in polygonPoints) {
        polygonArray.push([
          polygonPoints[j].latitude,
          polygonPoints[j].longitude,
        ]);
      }

      try {
        await AsyncStorage.setItem("coords", JSON.stringify(polygonArray));
        console.log(
          "saved coords successfully to the storage on farm duplication screeen "
        );
      } catch (e) {
        console.log(
          "error saving coords to the storage on farm duplication screen"
        );
      }
      calculateArea();
      snapshot();
    }
  };

  const snapshot = async () => {
    if (polygonPoints.length > 2) {
      captureRef(imageRef, {
        format: "jpg",
        quality: 0.9,
      }).then(
        (uri) => navigationHandler(uri),
        (error) => console.log("error capturing ss", error)
      );
    }
  };

  const navigationHandler = async (uri) => {
    try {
      console.log(
        area,
        "area before saving to storage on farm duplication urdu "
      );
      await AsyncStorage.setItem("area", area);
      navigation.navigate("FarmDetails", uri);
    } catch (e) {
      console.log(
        "Error saving area to storage on urdu farm duplication screen",
        e
      );
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

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={COLORS.green} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.green }}>
        <View style={styles.topButtons}>
          <TouchableOpacity
            onPress={deleteLastPolygon}
            style={[styles.activeButton]}
          >
            <Text style={styles.topButtonsText}>آخری حذف کریں </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={deletePolygon}
            style={[styles.activeButton]}
          >
            <Text style={styles.topButtonsText}>مکمل حذف کریں</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={addFarmHandler}
            style={[styles.activeButton]}
          >
            <Text style={styles.topButtonsText}> شامل کریں</Text>
          </TouchableOpacity>
        </View>
      </View>

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
          showsCompass={true}
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
              borderRadius: 25,
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
                textAlign: "center",
                paddingBottom: 10,
              }}
            >
              رقبہ کم از کم 3 ایکڑ ہونا چاہیے۔
            </Text>
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
    paddingHorizontal: hp(3.2),
    borderRadius: 8,
    marginHorizontal: 2,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
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
    width: "97%",
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
  qualityRowContainer: {
    position: "absolute",
    backgroundColor: "#000000CC",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    top: hp(10),
    zIndex: 1,
    alignSelf: "flex-end",
    right: 10,
    padding: hp(1),
  },
  qualityRowText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "NotoRegular",
    color: COLORS.white,
    width: wp(17),
    textAlign: "center",
  },
  colorBox: {
    height: 8,
    width: 8,
  },
  qualityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  imagery: {
    position: "absolute",
    backgroundColor: "black",
    borderRadius: 12,
    width: "95%",
    alignItems: "center",
    zIndex: 1,
    alignSelf: "center",
  },
  imageryText: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    color: COLORS.white,
  },
  flatlistItems: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
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
});
export default FarmDuplication;

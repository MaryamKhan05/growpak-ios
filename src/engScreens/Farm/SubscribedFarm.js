import "react-native-gesture-handler";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
  Polyline,
  Overlay,
} from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";
import { useQuery } from "@apollo/client";
import { useToast } from "react-native-toast-notifications";
//internal imports
import COLORS from "../../../assets/colors/colors";
import { GET_PH, GET_SOC, GET_WS } from "../../GraphQl/queries";
import { Forecast } from "../../engComponents/Index";
import { FarmReports } from "../../engComponents/Index";
import {
  cleardelFarmByFarmIdData,
  getCarbonImages,
  getLegends,
  getNitrogenImages,
  getPlantImages,
  getWaterImages,
} from "../../redux/action";
import { useNavigation, useRoute } from "@react-navigation/native";
const SubscribedFarm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const toast = useToast();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [name, setName] = useState("");
  const map = useRef(null);

  const [polygonPoints, setPolygonPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState();
  const [lng, setlng] = useState();

  // top navigation buttons state
  const [farm, setFarm] = useState(
    route.params?.isNotification ? route.params?.farm : true
  );
  const [weather, setWeather] = useState(
    route.params?.isNotification ? route.params?.weather : false
  );
  const [activity, setActivity] = useState(
    route.params?.isNotification ? route.params?.activity : false
  );
  const [reports, setReports] = useState(
    route.params?.isNotification ? route.params?.report : false
  );

  // bottom buttons state
  const [health, setHealth] = useState(false);
  const [water, setWater] = useState(false);
  const [nitrogen, setNitrogen] = useState(false);
  const [carbon, setCarbon] = useState(false);
  const [id, setId] = useState();
  const [farmid, setFarmId] = useState(null);
  const [selectedItem, setSelectedItem] = useState();
  const [isPressed, setIsPressed] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [bbox, setBbox] = useState();
  const [legendData, setLegendData] = useState();
  const [socLegend, setSocLegend] = useState();
  const [zoneLegend, setZoneLegend] = useState();
  const [waterLegend, setWaterLegend] = useState();
  const [healthLegend, setHealthLegend] = useState();
  const [subModal, setSubModal] = useState(false);
  const [endDate, setEndDate] = useState(null);
  let farmbyisresponse = useSelector((state) => state.api.farmbyid?.data?.data);

  let legends = useSelector((state) => state.api.legends?.data?.data);
  let deleteResponse = useSelector(
    (state) => state.api.delFarmByFarmId?.successMessage
  );
  let errdeleteResponse = useSelector(
    (state) => state.api.delFarmByFarmId?.errorMessage
  );

  let nitrogenData = useSelector(
    (state) => state.api.getNitrogenImages?.data?.data
  );
  let plantHealthData = useSelector(
    (state) => state.api.getPlantImages?.data?.data
  );

  let waterData = useSelector((state) => state.api.getWaterImages?.data?.data);
  let carbonData = useSelector(
    (state) => state.api.getCarbonImages?.data?.data
  );

  useEffect(() => {
    if (deleteResponse) {
      toast.show(deleteResponse, {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      dispatch(cleardelFarmByFarmIdData());
      navigation.goBack();
    }
    if (errdeleteResponse) {
      toast.show(errdeleteResponse, {
        type: "danger",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      dispatch(cleardelFarmByFarmIdData());
      navigation.goBack();
    }
  }, [deleteResponse, errdeleteResponse]);
  useEffect(() => {
    dispatch(getLegends());
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    let yyyy = today.getFullYear();

    let formattedDate = yyyy + "-" + mm + "-" + dd;
    setEndDate(formattedDate);
  }, []);

  useEffect(() => {
    if (legends) {
      setLegendData(legends);
      let carbon = legends.filter((item) => item.list_value === "soc");
      setSocLegend(carbon);

      let zones = legends.filter((item) => item.list_value === "fr");
      setZoneLegend(zones);
      let water = legends.filter((item) => item.list_value === "ws");
      setWaterLegend(water);

      let ph = legends.filter((item) => item.list_value === "ph");
      setHealthLegend(ph);
    }
  }, [legends]);

  useEffect(() => {
    if (farmbyisresponse !== undefined) {
      let polygonArray = farmbyisresponse[0]?.polygon_points;
      let polygonPointsArray = [];

      let farmid = farmbyisresponse[0]?.fid;
      setFarmId(farmid);
      dispatch(getNitrogenImages(farmid));
      dispatch(getWaterImages(farmid));
      dispatch(getPlantImages(farmid));
      dispatch(getCarbonImages(farmid));

      for (let [index, value] of polygonArray?.entries()) {
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

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <View style={[styles.flatlistItems]}>
          <TouchableOpacity
            style={{
              borderWidth: 1.5,
              borderColor: selectedItem == item.id ? "white" : null,
              borderRadius: 8,
            }}
            onPress={() => [
              setSelectedItem(item.id),
              setSelectedImage(item.image),
            ]}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                overflow: "hidden",
                borderRadius: 8,
                height: 102,
                width: 110,
              }}
              resizeMode="contain"
            />

            <View
              style={{
                backgroundColor:
                  selectedItem == item.id ? COLORS.green : "#727476",
                padding: selectedItem == item.id ? 10 : 7,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                {item.date}
              </Text>
            </View>
            {selectedItem !== item.id ? (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundColor: "#00000080",
                }}
              />
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItemForLegends = ({ item }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: item.color,
            height: 10,
            width: 10,
            margin: 5,
          }}
        />
        <Text style={styles.qualityRowText}>{item.title_e}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.green }}>
        <View style={styles.topButtons}>
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
            <Text style={styles.topButtonsText}>My Farm</Text>
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
            <Text style={styles.topButtonsText}>Weather</Text>
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
            <Text style={styles.topButtonsText}>Activities</Text>
          </TouchableOpacity>
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
            <Text style={styles.topButtonsText}>Reports</Text>
          </TouchableOpacity>
        </View>
      </View>
      {farm && (
        <View>
          <MapView
            ref={map}
            provider={PROVIDER_GOOGLE}
            style={{ height: "100%", zIndex: -1, width: "100%" }}
            initialRegion={INITIAL_POSITION}
            mapType="hybrid"
            zoomTapEnabled={true}
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
                    strokeColor="red" // Customize the polygon border color
                    fillColor="rgba(0, 0, 0, 0)" // Customize the polygon fill color
                  />
                )
              : null}
            {bbox && (
              <Overlay
                bounds={[
                  [bbox[0], bbox[1]],
                  [bbox[2], bbox[3]],
                ]}
                image={{
                  uri: selectedImage,
                }}
                opacity={1}
                style={{ transform: [{ rotate: "45deg" }] }}
              />
            )}
          </MapView>
        </View>
      )}

      {/* bottom buttons */}
      {farm && farmbyisresponse ? (
        farmbyisresponse[0]?.plant_health ||
        farmbyisresponse[0]?.water_stress ||
        farmbyisresponse[0]?.zones ||
        farmbyisresponse[0]?.soc ? (
          <View
            style={{
              backgroundColor: COLORS.black,
              height: 55,
              borderRadius: 12,
              flexDirection: "row",
              width: "95%",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              position: "absolute",
              top: hp(75),
              zIndex: 1,
            }}
          >
            {farmbyisresponse[0]?.soc && (
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: carbon ? COLORS.white : COLORS.buttonbg },
                ]}
                onPress={() => {
                  setHealth(false),
                    setWater(false),
                    setCarbon(!carbon),
                    setNitrogen(false);
                }}
              >
                <Text
                  style={[
                    styles.bottomButtonsText,
                    { color: carbon ? COLORS.black : COLORS.white },
                  ]}
                >
                  Carbon
                </Text>
              </TouchableOpacity>
            )}
            {farmbyisresponse[0]?.zones && (
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: nitrogen ? COLORS.white : COLORS.buttonbg,
                  },
                ]}
                onPress={() => {
                  setHealth(false),
                    setWater(false),
                    setCarbon(false),
                    setNitrogen(!nitrogen);
                }}
              >
                <Text
                  style={[
                    styles.bottomButtonsText,
                    { color: nitrogen ? COLORS.black : COLORS.white },
                  ]}
                >
                  Nitrogen
                </Text>
              </TouchableOpacity>
            )}
            {farmbyisresponse[0]?.water_stress && (
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: water ? COLORS.white : COLORS.buttonbg },
                ]}
                onPress={() => {
                  setHealth(false),
                    setWater(!water),
                    setCarbon(false),
                    setNitrogen(false);
                }}
              >
                <Text
                  style={[
                    styles.bottomButtonsText,
                    { color: water ? COLORS.black : COLORS.white },
                  ]}
                >
                  Water
                </Text>
              </TouchableOpacity>
            )}
            {farmbyisresponse[0]?.plant_health && (
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: health ? COLORS.white : COLORS.buttonbg },
                ]}
                onPress={() => {
                  setHealth(!health),
                    setWater(false),
                    setCarbon(false),
                    setNitrogen(false);
                }}
              >
                <Text
                  style={[
                    styles.bottomButtonsText,
                    { color: health ? COLORS.black : COLORS.white },
                  ]}
                >
                  Health
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          farm && (
            <View
              style={{
                backgroundColor: COLORS.black,
                height: 55,
                borderRadius: 12,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                position: "absolute",
                top: hp(75),
                zIndex: 1,
                padding: hp(1),
              }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: carbon ? COLORS.white : COLORS.buttonbg },
                ]}
                onPress={() => setSubModal(true)}
              >
                <Text
                  style={[
                    styles.bottomButtonsText,
                    { color: carbon ? COLORS.black : COLORS.white },
                  ]}
                >
                  Carbon
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: nitrogen ? COLORS.white : COLORS.buttonbg,
                  },
                ]}
                onPress={() => {
                  setSubModal(true);
                }}
              >
                <Text
                  style={[
                    styles.bottomButtonsText,
                    { color: nitrogen ? COLORS.black : COLORS.white },
                  ]}
                >
                  Nitrogen
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: water ? COLORS.white : COLORS.buttonbg },
                ]}
                onPress={() => {
                  setSubModal(true);
                }}
              >
                <Text
                  style={[
                    styles.bottomButtonsText,
                    { color: water ? COLORS.black : COLORS.white },
                  ]}
                >
                  Water
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: health ? COLORS.white : COLORS.buttonbg },
                ]}
                onPress={() => {
                  setSubModal(true);
                }}
              >
                <Text
                  style={[
                    styles.bottomButtonsText,
                    { color: health ? COLORS.black : COLORS.white },
                  ]}
                >
                  Health
                </Text>
              </TouchableOpacity>
            </View>
          )
        )
      ) : null}
      {/* legend container */}
      {farm ? (
        carbon || health || water || nitrogen ? (
          <View style={styles.qualityRowContainer}>
            <FlatList
              data={
                carbon
                  ? socLegend
                  : water
                  ? waterLegend
                  : health
                  ? healthLegend
                  : nitrogen
                  ? zoneLegend
                  : null
              }
              renderItem={renderItemForLegends}
              keyExtractor={(item) => item.lid}
            />
          </View>
        ) : null
      ) : null}

      {/* legend container finish */}

      {farm && nitrogen ? (
        <View style={[styles.imagery, { top: isPressed ? hp(47) : hp(68) }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text style={styles.imageryText}>Time Series</Text>
            <TouchableOpacity
              onPress={() => setIsPressed(!isPressed)}
              style={{ padding: 5 }}
            >
              {isPressed ? (
                <Entypo name="chevron-down" size={20} color={COLORS.white} />
              ) : (
                <Entypo name="chevron-up" size={20} color={COLORS.white} />
              )}
            </TouchableOpacity>
          </View>
          {isPressed ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={nitrogenData && nitrogenData?.reverse()}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          ) : null}
        </View>
      ) : null}

      {farm && carbon ? (
        <View style={[styles.imagery, { top: isPressed ? hp(47) : hp(68) }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text style={styles.imageryText}>Time Series</Text>
            <TouchableOpacity
              onPress={() => setIsPressed(!isPressed)}
              style={{ padding: 5 }}
            >
              {isPressed ? (
                <Entypo name="chevron-down" size={20} color={COLORS.white} />
              ) : (
                <Entypo name="chevron-up" size={20} color={COLORS.white} />
              )}
            </TouchableOpacity>
          </View>
          {isPressed ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={carbonData && carbonData?.reverse()}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          ) : null}
        </View>
      ) : null}

      {farm && water ? (
        <View style={[styles.imagery, { top: isPressed ? hp(47) : hp(68) }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text style={styles.imageryText}>Time Series</Text>
            <TouchableOpacity
              onPress={() => setIsPressed(!isPressed)}
              style={{ padding: 5 }}
            >
              {isPressed ? (
                <Entypo name="chevron-down" size={20} color={COLORS.white} />
              ) : (
                <Entypo name="chevron-up" size={20} color={COLORS.white} />
              )}
            </TouchableOpacity>
          </View>
          {isPressed ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={waterData && waterData?.reverse()}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          ) : null}
        </View>
      ) : null}

      {farm && health ? (
        <View style={[styles.imagery, { top: isPressed ? hp(47) : hp(68) }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text style={styles.imageryText}>Time Series</Text>
            <TouchableOpacity
              onPress={() => setIsPressed(!isPressed)}
              style={{ padding: 5 }}
            >
              {isPressed ? (
                <Entypo name="chevron-down" size={20} color={COLORS.white} />
              ) : (
                <Entypo name="chevron-up" size={20} color={COLORS.white} />
              )}
            </TouchableOpacity>
          </View>
          {isPressed ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={plantHealthData && plantHealthData?.reverse()}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          ) : null}
        </View>
      ) : null}

      {/* on weather button press */}
      {weather && <Forecast lat={lat} long={lng} />}

      {/* on reports button press  */}
      {reports && <FarmReports />}

      {/* please subscribe modal */}
      <Modal animationType="fade" transparent={true} visible={subModal}>
        <TouchableWithoutFeedback onPress={() => setSubModal(false)}>
          <View style={styles.dotCenteredView}>
            <View style={styles.dotModalView}>
              <View
                style={{
                  alignSelf: "center",
                }}
              >
                <Text style={styles.modalText}>
                  This Farm is not subscribed
                </Text>
                <TouchableOpacity
                  onPress={() => [
                    navigation.navigate("PackageDetails", { id: farmid }),
                    setSubModal(false),
                  ]}
                >
                  <Text
                    style={[
                      styles.modalText,
                      { color: COLORS.green, fontWeight: "600" },
                    ]}
                  >
                    Click Here to Subscribe
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: hp(2),
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
    fontFamily: "PoppinsMedium",
    fontSize: 13,
    textAlign: "center",
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
    fontFamily: "PoppinsSemi",
    fontSize: 12,
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
    width: wp(20),
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
    fontSize: 14,
    fontFamily: "PoppinsMedium",
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
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    textAlign: "center",
    textAlign: "center",
  },
});
export default SubscribedFarm;

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Polygon, Overlay } from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Entypo from "react-native-vector-icons/Entypo";
import COLORS from "../../../assets/colors/colors";
import { GET_PH, GET_SOC, GET_WS } from "../../GraphQl/queries";
import { useQuery } from "@apollo/client";
import { Forecast } from "../../engComponents/Index";
import { FarmReports } from "../../engComponents/Index";
import { useDispatch, useSelector } from "react-redux";
import {
  getCarbonImages,
  getLegends,
  getNitrogenImages,
  getPlantImages,
  getWaterImages,
} from "../../redux/action";

const FarmExample = () => {
  const dispatch = useDispatch();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [name, setName] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(true);
  const map = useRef(null);

  // const [polygonPoints, setPolygonPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState();
  const [lng, setlng] = useState();
  // top navigation buttons state
  const [farm, setFarm] = useState(true);
  const [weather, setWeather] = useState(false);
  const [activity, setActivity] = useState(false);
  const [reports, setReports] = useState(false);
  // bottom buttons state
  const [health, setHealth] = useState(false);
  const [water, setWater] = useState(false);
  const [nitrogen, setNitrogen] = useState(false);
  const [carbon, setCarbon] = useState(false);
  const [id, setId] = useState("61766aba0de5b75a8377285e");
  const [selectedItem, setSelectedItem] = useState();
  const [isPressed, setIsPressed] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [imagePosition, setImagePosition] = useState();
  const [nitrogenImagery, setNitrogenImagery] = useState();
  const [carbonImagery, setCarbonImagery] = useState();
  const [waterImagery, setWaterImagery] = useState();
  const [healthImagery, setHealthImagery] = useState();
  const [cropName, setCropName] = useState("Wheat");
  const [serviceType, setServiceType] = useState();
  const [legendData, setLegendData] = useState();
  const [socLegend, setSocLegend] = useState();
  const [zoneLegend, setZoneLegend] = useState();
  const [waterLegend, setWaterLegend] = useState();
  const [healthLegend, setHealthLegend] = useState();
  const [endDate, setEndDate] = useState(null);

  let legends = useSelector((state) => state.api.legends?.data?.data);
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
    dispatch(getLegends());
    dispatch(getNitrogenImages("22"));
    dispatch(getCarbonImages("22"));
    dispatch(getPlantImages("22"));
    dispatch(getWaterImages("22"));
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    let yyyy = today.getFullYear();

    let formattedDate = yyyy + "-" + mm + "-" + dd;
    setEndDate(formattedDate);
  }, []);
  // let nitData = { id, startDate: "2023-06-02", endDate: endDate };
  // let carData = { id, startDate: "2023-06-02", endDate: endDate };
  // let watData = { id, startDate: "2023-06-02", endDate: endDate };
  // let healthData = { id, startDate: "2023-06-02", endDate: endDate };

  // let { data: nitrogenData } = useQuery(GET_PH(nitData));
  // let { data: carbonData } = useQuery(GET_SOC(carData));
  // let { data: waterData } = useQuery(GET_WS(watData));
  // let { data: plantHealthData } = useQuery(GET_PH(healthData));

  // console.log(carbonData, "carbon data");
  // console.log(waterData, "water data");
  // console.log(plantHealthData, "plant health daata");

  const INITIAL_POSITION = {
    latitude: 30.822666371442427,
    longitude: 73.43708371127535,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  let polygonPoints = [
    { latitude: 30.823047235121873, longitude: 73.4367323666811 },
    { latitude: 30.82306451030035, longitude: 73.43741867691278 },
    { latitude: 30.822278774454574, longitude: 73.4374273940921 },
    { latitude: 30.82226984887303, longitude: 73.43675415962934 },
  ];

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
  // useEffect(() => {
  //   if (nitrogenData) {
  //     const image = nitrogenData?.retrievePlantHealth?.Result?.bbox;
  //     setImagePosition(image);
  //     const d = nitrogenData?.retrievePlantHealth?.Result?.png;

  //     const newArray = d?.map((image, index) => {
  //       const urlParts = image.split("/");
  //       const filename = urlParts[urlParts.length - 1].replace(".png", "");
  //       const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
  //       const date = dateMatch ? dateMatch[0] : null;

  //       return {
  //         id: `${index + 1}`,
  //         image,
  //         date,
  //       };
  //     });
  //     setNitrogenImagery(newArray?.reverse());
  //   }
  // }, [nitrogenData]);

  // useEffect(() => {
  //   if (carbonData) {
  //     const image = carbonData?.retrieveSoilOrganicCarbon?.Result?.bbox;
  //     setImagePosition(image);
  //     const d = carbonData?.retrieveSoilOrganicCarbon?.Result?.png;

  //     const newArray = d?.map((image, index) => {
  //       const urlParts = image?.split("/");
  //       const filename = urlParts[urlParts.length - 1].replace(".png", "");
  //       const dateMatch = filename.match(/(\d{4})/);
  //       const date = dateMatch ? dateMatch[0] : null;

  //       return {
  //         id: `${index + 1}`,
  //         image,
  //         date,
  //       };
  //     });
  //     setCarbonImagery(newArray?.reverse());
  //   }
  // }, [carbonData]);

  // useEffect(() => {
  //   if (waterData) {
  //     const image = waterData?.retrieveWaterStress?.Result?.bbox;
  //     setImagePosition(image);
  //     const d = waterData?.retrieveWaterStress?.Result?.png;
  //     const newArray = d?.map((image, index) => {
  //       const urlParts = image?.split("/");
  //       const filename = urlParts[urlParts.length - 1].replace(".png", "");
  //       const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
  //       const date = dateMatch ? dateMatch[0] : null;

  //       return {
  //         id: `${index + 1}`,
  //         image,
  //         date,
  //       };
  //     });
  //     setWaterImagery(newArray?.reverse());
  //   }
  // }, [waterData]);

  // useEffect(() => {
  //   if (plantHealthData) {
  //     const image = plantHealthData?.retrievePlantHealth?.Result?.bbox;
  //     setImagePosition(image);
  //     const d = plantHealthData?.retrievePlantHealth?.Result?.png;
  //     // console.log(d,'dddddddddddddd')

  //     const newArray = d?.map((image, index) => {
  //       const urlParts = image?.split("/");
  //       const filename = urlParts[urlParts.length - 1].replace(".png", "");
  //       const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
  //       const date = dateMatch ? dateMatch[0] : null;

  //       return {
  //         id: `${index + 1}`,
  //         image,
  //         date,
  //       };
  //     });
  //     setHealthImagery(newArray?.reverse());
  //   }
  // }, [plantHealthData]);

  useEffect(() => {
    if ((plantHealthData, waterData, carbonData, nitrogenData)) {
      setLoading(false);
    }
  }, [plantHealthData, waterData, carbonData, nitrogenData]);
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
    console.log("jsjsjsjsjjsjsjsjsjs", item);
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
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
                height: 102,
                width: 110,
              }}
              // resizeMode="contain"
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
            <Text style={styles.topButtonsText}>Reports </Text>
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
            minZoomLevel={18}
          >
            {/* <Marker coordinate={polygonPoints} title={name} description="" /> */}

            <Polygon
              coordinates={polygonPoints}
              strokeWidth={2}
              lineDashPattern="[5,5,5]"
              strokeColor="red"
              fillColor="rgba(0, 0, 0, 0)"
            />

            <Overlay
              bounds={[
                [30.82226984887303, 73.4367323666811],
                [30.82306451030035, 73.4374273940921],
              ]}
              image={{
                uri: selectedImage ? selectedImage : null,
              }}
              opacity={1}
            />
          </MapView>
        </View>
      )}

      {/* bottom buttons */}
      {farm ? (
        isSubscribed ? (
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
            {/* carbon button */}
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
                setServiceType(4);
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
            {/* nitrogen button */}
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: nitrogen ? COLORS.white : COLORS.buttonbg },
              ]}
              onPress={() => {
                setHealth(false),
                  setWater(false),
                  setCarbon(false),
                  setNitrogen(!nitrogen);
                setServiceType(2);
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
            {/* water button */}
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
                setServiceType(7);
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
            {/* health button */}
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
                setServiceType(1);
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
        ) : (
          <View
            style={{
              position: "absolute",
              justifyContent: "flex-end",
              alignSelf: "baseline",
              bottom: 0,
              width: windowWidth,
              alignSelf: "center",
              backgroundColor: COLORS.black,
              height: Platform.OS == "android" ? 56 : 75,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  color: "white",
                  left: 20,
                  bottom: Platform.OS == "android" ? 0 : 6,
                  fontFamily: "NotoRegular",
                  textDecorationLine: "underline",
                }}
              >
                Learn More
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                fontFamily: "CustomFont",
                color: COLORS.white,
                right: Platform.OS == "android" ? 10 : 15,
                bottom: Platform.OS == "android" ? 0 : 6,
              }}
            >
              This Farm is not Subscribed
            </Text>
          </View>
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
        <View
          style={[
            styles.imagery,
            {
              top: isPressed
                ? Platform.OS == "android"
                  ? hp(43)
                  : hp(48.5)
                : Platform.OS == "android"
                ? hp(66)
                : hp(68),
            },
          ]}
        >
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
        <View
          style={[
            styles.imagery,
            {
              top: isPressed
                ? Platform.OS == "android"
                  ? hp(43)
                  : hp(48.5)
                : Platform.OS == "android"
                ? hp(66)
                : hp(68),
            },
          ]}
        >
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
        <View
          style={[
            styles.imagery,
            {
              top: isPressed
                ? Platform.OS == "android"
                  ? hp(43)
                  : hp(48.5)
                : Platform.OS == "android"
                ? hp(66)
                : hp(68),
            },
          ]}
        >
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
        <View
          style={[
            styles.imagery,
            {
              top: isPressed
                ? Platform.OS == "android"
                  ? hp(43)
                  : hp(48.5)
                : Platform.OS == "android"
                ? hp(66)
                : hp(68),
            },
          ]}
        >
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

      {weather && (
        <Forecast lat="30.822666371442427" long="73.43708371127535" />
      )}

      {reports && <FarmReports />}
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
    // height: 108,
    borderRadius: 12,
    // width: 73,
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
});
export default FarmExample;

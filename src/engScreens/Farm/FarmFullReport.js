import * as Speech from "expo-speech";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../../assets/colors/colors";
import { FarmReportDetails } from "../../engComponents/Index";
import { getLegends, savePdfLink } from "../../redux/action";

const FarmFullReport = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [play, setPlay] = useState(false);
  const [waterPlay, setWaterPlay] = useState(false);
  const [discPlay, setDiscPlay] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [ureaData, setUreaData] = useState([]);
  const [dapData, setDapData] = useState([]);
  const [sopData, setSopData] = useState([]);
  const [plantZonesData, setPlantZonesData] = useState([]);
  const [waterZonesData, setWaterZonesData] = useState([]);
  let zonesArray = [];
  let waterZonesArray = [];
  let wsCount = 0;
  let zCount = 0;
  let z1 = 0;
  let z2 = 0;
  let z3 = 0;
  let z4 = 0;
  let count = 0;
  let pointCount = 0;
  let zwCount = 0;

  const response = useSelector(
    (state) => state.api?.reportByReport?.data?.data[0]
  );
  // console.log(response, "ressspppoonnnseee");

  const legends = useSelector((state) => state.api?.legends?.data?.data);

  let weather = useSelector(
    (state) => state.api.reportByReport?.data?.data[0]?.weather
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getLegends());
    });

    return unsubscribe;
  }, [navigation]);

  //text-to-speech
  const speak = async () => {
    setPlay(!play);

    if (play) {
      Speech.stop();
      clearInterval(intervalId);
    } else {
      const thingToSay = response?.analysis_e;
      // const thingToSay = "Hello Maryam, how are you doing";
      Speech.speak(thingToSay, {
        language: "en-US",
        onDone: () => setPlay(false),
      });
    }
  };

  //water audio
  const waterAudio = async () => {
    setWaterPlay(!waterPlay);

    if (waterPlay) {
      Speech.stop();
    } else {
      const thingToSay = response?.analysis_w_e;
      // const thingToSay = "hello there";
      Speech.speak(thingToSay, {
        language: "en-US",
        onDone: () => setWaterPlay(false),
      });
    }
  };

  useEffect(() => {
    if (legends && response) {
      setLoading(false);

      let l = legends?.filter((item) => item.list_value === "ph");
      let w = legends?.filter((item) => item.list_value === "ws");
      if (response?.z1 > 0) {
        zCount = zCount + 1;
        console.log("inside ", response?.z1);
        zonesArray.push({
          ["z" + zCount]: response?.z1,
          value: `Zone ${zCount}`,
          color: l[0]?.color,
          area: response?.z1,
          id: zCount,
        });
      }
      if (response?.z2 > 0) {
        zCount = zCount + 1;
        console.log("inside ", response?.z2);
        zonesArray.push({
          ["z" + zCount]: response?.z2,
          value: `Zone ${zCount}`,
          color: l[1]?.color,
          area: response?.z2,
          id: zCount,
        });
      }
      if (response?.z3 > 0) {
        console.log("inside ", response?.z3);
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z3,
          value: `Zone ${zCount}`,
          color: l[2]?.color,
          area: response?.z3,
          id: zCount,
        });
      }
      if (response?.z4 > 0) {
        console.log("inside ", response?.z4);
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z4,
          value: `Zone ${zCount}`,
          color: l[3]?.color,
          area: response?.z4,
          id: zCount,
        });
      }
      if (response?.z5 > 0) {
        console.log("inside ", response?.z5);
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z5,
          value: `Zone ${zCount}`,
          color: l[4]?.color,
          area: response?.z5,
          id: zCount,
        });
      }
      if (response?.z6 > 0) {
        zCount = zCount + 1;
        console.log("inside ", response?.z6);
        zonesArray.push({
          ["z" + zCount]: response?.z6,
          value: `Zone ${zCount}`,
          color: l[5]?.color,
          area: response?.z6,
          id: zCount,
        });
      }
      if (response?.z7 > 0) {
        zCount = zCount + 1;
        console.log("inside ", response?.z7);
        zonesArray.push({
          ["z" + zCount]: response?.z7,
          value: `Zone ${zCount}`,
          color: l[6]?.color,
          area: response?.z7,
          id: zCount,
        });
      }
      if (response?.z8 > 0) {
        console.log("inside ", response?.z8);
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z8,
          value: `Zone ${zCount}`,
          color: l[7]?.color,
          area: response?.z8,
          id: zCount,
        });
      }
      if (response?.z9 > 0) {
        console.log("inside ", response?.z9);
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z9,
          value: `Zone ${zCount}`,
          color: l[8]?.color,
          area: response?.z9,
          id: zCount,
        });
      }
      if (response?.z10 > 0) {
        console.log("inside ", response?.z10);
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z10,
          value: `Zone ${zCount}`,
          color: l[9]?.color,
          area: response?.z10,
          id: zCount,
        });
      }
      console.log(zonesArray, "zones array");
      setPlantZonesData(zonesArray);

      if (response?.z1w > 0) {
        wsCount = wsCount + 1;
        console.log("inside ", response?.z1w);
        waterZonesArray.push({
          ["z" + wsCount]: response?.z1w,
          value: `Zone ${wsCount}`,
          color: w[0]?.color,
          area: response?.z1w,
          id: wsCount,
        });
      }
      if (response?.z2w > 0) {
        wsCount = wsCount + 1;
        console.log("inside ", response?.z2);
        waterZonesArray.push({
          ["z" + wsCount]: response?.z1,
          value: `Zone ${wsCount}`,
          color: w[1]?.color,
          area: response?.z2w,
          id: wsCount,
        });
      }
      if (response?.z3w > 0) {
        console.log("inside ", response?.z3);
        wsCount = wsCount + 1;
        waterZonesArray.push({
          ["z" + wsCount]: response?.z1,
          value: `Zone ${wsCount}`,
          color: w[2]?.color,
          area: response?.z3w,
          id: wsCount,
        });
      }
      if (response?.z4w > 0) {
        console.log("inside ", response?.z4);
        wsCount = wsCount + 1;
        waterZonesArray.push({
          ["z" + wsCount]: response?.z1,
          value: `Zone ${wsCount}`,
          color: w[3]?.color,
          area: response?.z4w,
          id: wsCount,
        });
      }
      if (response?.z5w > 0) {
        console.log("inside ", response?.z5);
        wsCount = wsCount + 1;
        waterZonesArray.push({
          ["z" + wsCount]: response?.z1,
          value: `Zone ${wsCount}`,
          color: w[4]?.color,
          area: response?.z5w,
          id: wsCount,
        });
      }
      if (response?.z6w > 0) {
        wsCount = wsCount + 1;
        console.log("inside ", response?.z6);
        waterZonesArray.push({
          ["z" + wsCount]: response?.z1,
          value: `Zone ${wsCount}`,
          color: w[5]?.color,
          area: response?.z6w,
          id: wsCount,
        });
      }
      setWaterZonesData(waterZonesArray);
    }

    if (response) {
      let pdf = response?.pdf;
      dispatch(savePdfLink(pdf));
    }
    if (response) {
      let data = response;
      const urea = {};
      const dap = {};
      const sop = {};

      for (let key in data) {
        if (key.endsWith("urea")) {
          urea[key] = data[key];
          setUreaData(urea);
        } else if (key.endsWith("dap")) {
          dap[key] = data[key];
          setDapData(dap);
        } else if (key.endsWith("sop")) {
          sop[key] = data[key];
          setSopData(sop);
        }
      }

      let a = response?.marhla;
    }
  }, [legends, response]);

  // disclaimer audio
  const discAudio = async () => {
    setDiscPlay(!discPlay);

    if (discPlay) {
      Speech.stop();
    } else {
      let t = response?.disclaimer_description_e;
      let s = t.toString();
      const thingToSay = s;
      Speech.speak(thingToSay, {
        language: "en-US",
        onDone: () => setDiscPlay(false),
      });
    }
  };
  const renderItem = ({ item }) => {
    count = count + 1;
    return (
      <View style={styles.legendsCard}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: hp(4),
              width: hp(4),
              backgroundColor: item.color,
              marginHorizontal: 10,
              borderRadius: 4,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "PoppinsMedium",
            }}
          >
            {item?.title_e}
            {/* {item.value} */}
          </Text>
        </View>
        <Text
          style={{
            width: hp(15),
            textAlign: "right",
            fontSize: 14,
            fontFamily: "PoppinsMedium",
            marginHorizontal: 5,
          }}
        >
          {response && response[`z${count}`]} Acre
          {/* {item.area} */}
        </Text>
      </View>
    );
  };
  const plantHealthRenderItem = ({ item }) => {
    count = count + 1;
    console.log("item in pkant health render item");
    return (
      <View style={styles.legendsCard}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: hp(4),
              width: hp(4),
              backgroundColor: item.color,
              marginHorizontal: 10,
              borderRadius: 4,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "PoppinsMedium",
            }}
          >
            {/* {item?.title_e} */}
            {item.value}
          </Text>
        </View>
        <Text
          style={{
            width: hp(15),
            textAlign: "right",
            fontSize: 14,
            fontFamily: "PoppinsMedium",
            marginHorizontal: 5,
          }}
        >
          {/* {response && response[`z${count}`]} Acre */}
          {item.area} Acre
        </Text>
      </View>
    );
  };

  const zwrenderItem = ({ item }) => {
    zwCount = zwCount + 1;
    console.log("bfsbsljspufkfnjfjfjjjsjsj");
    return (
      <View style={styles.legendsCard}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: hp(4),
              width: hp(4),
              backgroundColor: item.color,
              marginHorizontal: 10,
              borderRadius: 4,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "PoppinsMedium",
            }}
          >
            {/* {item?.title_e} */}
            {item.value}
          </Text>
        </View>
        <Text
          style={{
            width: hp(15),
            textAlign: "right",
            fontSize: 14,
            fontFamily: "PoppinsMedium",
            marginHorizontal: 5,
          }}
        >
          {/* {response && response[`z${zwCount}w`]} Acre */}
          {item.area} Acre
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={COLORS.green} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ width: wp(95), alignSelf: "center" }}>
          <Text style={[styles.analysisType, { marginVertical: hp(3) }]}>
            {response?.analysis_type_e}
          </Text>
          <Image
            source={{ uri: response?.img }}
            resizeMode="stretch"
            style={styles.farmImage}
          />

          <View style={{ marginVertical: hp(3) }}>
            <FarmReportDetails text={response?.name} heading="Farmer" />
            <FarmReportDetails text={response?.city} heading="Address" />
            <FarmReportDetails text={response?.crop_name} heading="Crop" />
            <FarmReportDetails text={response?.area} heading="Farm Size" />
            <FarmReportDetails
              text={response?.growth_stage}
              heading="Crop Growth Stage"
            />
            <FarmReportDetails
              text={response?.sow_date}
              heading="Sowing Date"
            />
            <FarmReportDetails
              text={response?.analysis_type_e}
              heading="Analysis Type"
            />
            <FarmReportDetails
              text={response?.analysis_date}
              heading="Analysis Date"
            />
            <FarmReportDetails
              text={response?.created_at}
              heading="Report Date"
            />
          </View>

          <Text style={styles.analysisType}>Farm Details</Text>

          <Image
            source={{ uri: response?.farm_crop_img }}
            resizeMode="stretch"
            style={styles.farmImage}
          />
          <Text style={styles.text}>
            Farm Image - Total Acre {response?.area}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={{ uri: response?.overlay_img }}
                resizeMode="stretch"
                style={styles.farmImageRow}
              />
              {/* image caption condition  */}
              {response &&
              response?.analysis_type === "زمین میں موجود نائٹروجن کا تجزیہ" ? (
                <Text
                  style={[
                    styles.satelliteText,
                    { width: wp(45), textAlign: "center" },
                  ]}
                >
                  Zoning in terms of manual fertilizer application
                </Text>
              ) : (
                <Text style={[styles.satelliteText, { width: wp(40) }]}>
                  Field inspection by analysis
                </Text>
              )}
              {/* image caption condition ends */}
            </View>
            <View>
              <Image
                source={{ uri: response?.satellite_img }}
                resizeMode="stretch"
                style={styles.farmImageRow}
              />
              <Text style={styles.satelliteText}>Satellite analysis</Text>
            </View>
          </View>
          {/* <View style={styles.spacer} /> */}

          {/* legends */}

          {legends &&
          response &&
          response?.analysis_type === "نامیاتی مادہ کا تجزیہ" ? (
            <FlatList
              data={legends?.filter((item) => item.list_value === "soc")}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          ) : null}

          {legends &&
          response &&
          response?.analysis_type === "زمین میں موجود نائٹروجن کا تجزیہ" ? (
            <FlatList
              data={legends?.filter((item) => item.list_value === "fr")}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          ) : null}

          {legends &&
          response &&
          response?.analysis_type === "پودوں کی صحت کا تجزیہ" &&
          zonesArray ? (
            <FlatList
              data={plantZonesData}
              keyExtractor={(item) => item.id}
              renderItem={plantHealthRenderItem}
            />
          ) : null}

          {/* analysis */}
          <Text style={styles.analysisType}>Analysis and recommendation</Text>
          <Image
            source={{ uri: response?.img }}
            resizeMode="stretch"
            style={styles.farmImage}
          />
          {/* play audio / tts */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ flexDirection: "row" }}></View>
            <Text
              style={[
                styles.analysisType,
                { color: COLORS.green, fontSize: 14, width: wp(80) },
              ]}
            >
              Click here to hear Analysis and recommendation
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: "center",
              }}
              onPress={speak}
            >
              {play ? (
                <AntDesign
                  name="pausecircle"
                  size={hp(5)}
                  color={COLORS.green}
                />
              ) : (
                <AntDesign name="play" size={hp(5)} color={COLORS.green} />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.analysis}>{response?.analysis_e}</Text>

          {/* water analysis */}

          {response && response?.analysis_type === "پودوں کی صحت کا تجزیہ" ? (
            <Text style={styles.analysisType}>Water Availability Analysis</Text>
          ) : null}

          {legends &&
          response &&
          response?.analysis_type === "پودوں کی صحت کا تجزیہ" ? (
            <View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Image
                    source={{ uri: response?.overlay_img_2 }}
                    resizeMode="stretch"
                    style={styles.farmImageRow}
                  />

                  {/* image caption condition */}
                  {response &&
                  response?.analysis_type ===
                    "زمین میں موجود نائٹروجن کا تجزیہ" ? (
                    <Text
                      style={[
                        styles.satelliteText,
                        { width: wp(45), textAlign: "center" },
                      ]}
                    >
                      Zoning in terms of manual fertilizer application
                    </Text>
                  ) : (
                    <Text style={[styles.satelliteText, { width: wp(40) }]}>
                      Field inspection by analysis
                    </Text>
                  )}
                  {/* image caption condition ends */}
                </View>
                <View>
                  <Image
                    source={{ uri: response?.satellite_img_2 }}
                    resizeMode="stretch"
                    style={styles.farmImageRow}
                  />
                  <Text style={styles.satelliteText}>Satellite analysis</Text>
                </View>
              </View>
              {/* water Availability legend */}
              <FlatList
                data={
                  // legends && legends?.filter((item) => item.list_value === "ws")
                  // zonesArray && zonesArray
                  waterZonesData
                }
                keyExtractor={(item) => item.id}
                renderItem={zwrenderItem}
              />
            </View>
          ) : null}

          {/*water play audio / tts */}
          {response && response?.analysis_type === "پودوں کی صحت کا تجزیہ" ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={[
                  styles.analysisType,
                  { color: COLORS.green, fontSize: 14, width: wp(50) },
                ]}
              >
                Click here to hear Water Availability Analysis
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    // padding: 20,
                    alignSelf: "center",
                  }}
                  onPress={waterAudio}
                >
                  {waterPlay ? (
                    <AntDesign
                      name="pausecircle"
                      size={hp(5)}
                      color={COLORS.green}
                    />
                  ) : (
                    <AntDesign name="play" size={hp(5)} color={COLORS.green} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          {response && response?.analysis_type === "پودوں کی صحت کا تجزیہ" ? (
            <Text style={styles.analysis}>{response?.analysis_w_e}</Text>
          ) : null}

          {/* ********************* */}
          {response &&
          response?.analysis_type === "زمین میں موجود نائٹروجن کا تجزیہ" ? (
            <View>
              <Text style={styles.analysisType}>Fertilizer recommendation</Text>
              <View>
                <View style={styles.healthTextContainer}>
                  <View>
                    <Text style={styles.healthText}>Field Discription</Text>
                    <Text style={styles.listItemText}>Extreme Low</Text>
                    <Text style={styles.listItemText}>Low</Text>
                    <Text style={styles.listItemText}>Medium</Text>
                    <Text style={styles.listItemText}>High</Text>
                  </View>
                  <View style={styles.listItems}>
                    <Text style={styles.healthText}>Urea</Text>
                    <FlatList
                      data={Object.values(ureaData)}
                      renderItem={({ item }) => {
                        return (
                          <View>
                            <Text style={styles.listItemText}>{item}</Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                  <View style={styles.listItems}>
                    <Text style={styles.healthText}>DAP</Text>
                    <FlatList
                      data={Object.values(dapData)}
                      renderItem={({ item }) => {
                        return (
                          <View>
                            <Text style={styles.listItemText}>{item}</Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                  <View style={styles.listItems}>
                    <Text style={styles.healthText}>SOP</Text>
                    <FlatList
                      data={Object.values(sopData)}
                      renderItem={({ item }) => {
                        return (
                          <View>
                            <Text style={styles.listItemText}>{item}</Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
                <View></View>
              </View>
              {/* **** **** */}
              <Text style={styles.analysisType}>
                Stages of application of fertilizers
              </Text>
              <Text
                style={[
                  styles.analysisType,
                  { backgroundColor: "grey", color: "white" },
                ]}
              >
                Extreme Low Nutrition
              </Text>
              <View style={styles.container}>
                <FlatList
                  data={response?.marhla?.z1}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    z1 = z1 + 1;
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 5,
                        }}
                      >
                        <Text style={styles.marhlaHeading}>Stage {z1} :</Text>
                        <Text style={[{ width: wp(75) }, styles.marhlaText]}>
                          {item}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <Text
                style={[
                  styles.analysisType,
                  { backgroundColor: "red", color: "white" },
                ]}
              >
                Low Nutrition
              </Text>
              <View style={styles.container}>
                <FlatList
                  data={response?.marhla?.z2}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    z2 = z2 + 1;
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 5,
                        }}
                      >
                        <Text style={styles.marhlaHeading}>Stage {z2} :</Text>
                        <Text style={[{ width: wp(75) }, styles.marhlaText]}>
                          {item}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <Text
                style={[styles.analysisType, { backgroundColor: "#ffff00" }]}
              >
                Medium Nutrition
              </Text>
              <View style={styles.container}>
                <FlatList
                  data={response?.marhla?.z3}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    z3 = z3 + 1;
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 5,
                        }}
                      >
                        <Text style={styles.marhlaHeading}>Stage {z3} :</Text>
                        <Text style={[{ width: wp(75) }, styles.marhlaText]}>
                          {item}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <Text
                style={[styles.analysisType, { backgroundColor: "#00ff00" }]}
              >
                High Nutrition
              </Text>
              <View style={styles.container}>
                <FlatList
                  data={response?.marhla?.z4}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    z4 = z4 + 1;
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 5,
                        }}
                      >
                        <Text style={styles.marhlaHeading}>Stage {z4} :</Text>
                        <Text style={[{ width: wp(75) }, styles.marhlaText]}>
                          {item}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          ) : null}

          {/* weather card */}

          {response && response?.analysis_type === "پودوں کی صحت کا تجزیہ" ? (
            <View
              style={{
                backgroundColor: COLORS.disableGrey,
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Text style={styles.analysisType}>Weekly weather forecast</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  height: hp(8),
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.weatherCardText}>Day</Text>
                  <Text></Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.weatherCardText}>Temp</Text>
                  <Text
                    style={{
                      color: COLORS.green,
                      fontFamily: "PoppinsRegular",
                    }}
                  >
                    (°C)
                  </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.weatherCardText}>Wind Speed</Text>
                  <Text
                    style={{
                      color: COLORS.green,
                      fontFamily: "PoppinsRegular",
                    }}
                  >
                    (mph)
                  </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.weatherCardText}>Rain</Text>
                  <Text
                    style={{
                      color: COLORS.green,
                      fontFamily: "PoppinsRegular",
                    }}
                  >
                    (%)
                  </Text>
                </View>
              </View>
              <View>
                <FlatList
                  data={weather && weather}
                  keyExtractor={(item) => item.wid}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          margin: hp(0.5),
                        }}
                      >
                        <Text style={styles.weatherList}>{item.date}</Text>
                        <Text style={styles.weatherList}>
                          {item.min_temp} - {item.max_temp}
                        </Text>
                        <Text style={styles.weatherList}>
                          {item.wind_speed}
                        </Text>
                        <Text style={styles.weatherList}>{item.rain_mm}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          ) : null}

          {/* disclaimer */}
          <Text style={[styles.analysisType, { color: "red" }]}>
            Important Insights
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Text
              style={[
                styles.analysisType,
                { color: COLORS.green, fontSize: 14 },
              ]}
            >
              Click here to hear Disclaimer
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                }}
                onPress={discAudio}
              >
                {discPlay ? (
                  <AntDesign
                    name="pausecircle"
                    size={hp(5)}
                    color={COLORS.green}
                  />
                ) : (
                  <AntDesign name="play" size={hp(5)} color={COLORS.green} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={response?.disclaimer_description_e}
            keyExtractor={(item) => item.rid}
            renderItem={({ item }) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontFamily: "PoppinsRegular",
                      fontSize: 14,
                      color: "red",
                      marginRight: hp(0.4),
                    }}
                  >
                    {(pointCount = pointCount + 1)}.
                  </Text>
                  <Text
                    style={[
                      {
                        width: wp(86),
                        fontFamily: "PoppinsRegular",
                        fontSize: 14,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              );
            }}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <Image
              source={{ uri: response?.crop_calendar }}
              style={{ height: hp(30), width: "100%" }}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  analysisType: {
    fontSize: 16,
    fontFamily: "PoppinsSemi",
    textAlign: "center",
    marginVertical: hp(1),
  },
  farmImage: {
    height: hp(20),
    width: wp(90),
    overflow: "hidden",
    borderRadius: 8,
    alignSelf: "center",
  },
  analysis: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    margin: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
    margin: hp(1),
  },
  farmImageRow: {
    height: hp(20),
    width: wp(42),
    margin: 10,
    overflow: "hidden",
    borderRadius: 8,
  },
  satelliteText: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
  },
  legendsCard: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.disableGrey,
    margin: 5,
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  spacer: {
    margin: hp(2),
  },
  weatherCardText: {
    width: wp(30),
    textAlign: "center",
    fontFamily: "PoppinsSemi",
    fontSize: 14,
    color: COLORS.green,
  },
  weatherList: {
    width: wp(28),
    textAlign: "center",
    marginHorizontal: 5,
    fontFamily: "PoppinsRegular",
    fontSize: 12,
  },
  marhlaText: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    width: wp(72),
  },
  marhlaHeading: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    width: wp(24),
    color: COLORS.green,
    padding: 5,
    marginVertical: 5,
    textDecorationLine: "underline",
  },
  healthTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  healthText: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: COLORS.green,
  },
  listItems: {
    alignItems: "center",
    margin: 5,
  },
  listItemText: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
  },
  container: {
    borderRadius: 10,
    marginBottom: hp(4),
  },
});

export default FarmFullReport;

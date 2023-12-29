import * as Speech from "expo-speech";
import React, { useEffect, useRef, useState } from "react";
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
import { FarmReportDetails } from "../../components/index";
import { getLegends, savePdfLink } from "../../redux/action";

const FarmFullReport = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [socLegends, setSocLegends] = useState(null);
  const [zwlegends, setZwLegends] = useState(null);
  const [HTML, sethtml] = useState("hello Maryam");
  const [sound, setSound] = useState();
  const [play, setPlay] = useState(false);
  const [waterPlay, setWaterPlay] = useState(false);
  const [discPlay, setDiscPlay] = useState(false);
  const [audioPosition, setAudioPosition] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const timerRef = useRef(null);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [ureaData, setUreaData] = useState([]);
  const [dapData, setDapData] = useState([]);
  const [sopData, setSopData] = useState([]);
  const [plantZonesData, setPlantZonesData] = useState([]);
  const [waterZonesData, setWaterZonesData] = useState([]);
  let zonesArray = [];
  let waterZonesArray = [];
  let wsCount = 0;
  let zCount = 0;

  let DATA = [
    (nutrients = [
      {
        id: 1,
        z: "22 کلو گرام ڈی اے پی ، 1 بوری یوریا اور 5 کلو گرام سلفر پھول نکلنے سے پہلے  استعمال کریں۔",
      },
      { id: 2, z: "1 بوری یوریا اگاؤ کے 25 دن کے بعد  فلڈ کریں۔" },
      {
        id: 3,
        z: "15 کلو گرام ڈی اے پی ، 1 بوری یوریا اور 2 کلو گرام سلفر پھول نکلنے سے پہلے  استعمال کریں۔",
      },
    ]),
    (sop = [
      {
        id: 1,
        z: "22 کلو گرام ڈی اے پی ، 1 بوری یوریا اور 5 کلو گرام سلفر پھول نکلنے سے پہلے  استعمال کریں۔",
      },
      { id: 2, z: "1 بوری یوریا اگاؤ کے 25 دن کے بعد  فلڈ کریں۔" },
      {
        id: 3,
        z: "15 کلو گرام ڈی اے پی ، 1 بوری یوریا اور 2 کلو گرام سلفر پھول نکلنے سے پہلے  استعمال کریں۔",
      },
    ]),
  ];
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
      // const thingToSay = response?.analysis;
      const thingToSay = "welcome to growpak";
      Speech.speak(thingToSay, {
        // language: "ur-PAK",
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
      let voices = Speech.getAvailableVoicesAsync();
      // const thingToSay = response?.analysis_w;
      const thingToSay = "زمین میں موجود نائٹروجن کا تجزیہ Maryam";
      // const thingToSay = "स्वागत";
      // const thingToSay =
      //   "Growpak mei khush amdeed";

      Speech.speak(thingToSay, {
        language: "ur-PAK",
        // language: "en-US",
        // language: "hi-IN",
        onDone: () => setWaterPlay(false),
      });
    }
  };

  // disclaimer audio
  const discAudio = async () => {
    setDiscPlay(!discPlay);

    if (discPlay) {
      Speech.stop();
    } else {
      let t = response?.disclaimer_description;
      let s = t.toString();
      const thingToSay = s;
      Speech.speak(thingToSay, {
        language: "ur-PAK",
        onDone: () => setDiscPlay(false),
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
        zonesArray.push({
          ["z" + zCount]: response?.z1,
          value: `زون ${zCount}`,
          color: l[0]?.color,
          area: response?.z1,
          id: zCount,
        });
      }
      if (response?.z2 > 0) {
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z2,
          value: `زون ${zCount}`,
          color: l[1]?.color,
          area: response?.z2,
          id: zCount,
        });
      }
      if (response?.z3 > 0) {
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z3,
          value: `زون ${zCount}`,
          color: l[2]?.color,
          area: response?.z3,
          id: zCount,
        });
      }
      if (response?.z4 > 0) {
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z4,
          value: `زون ${zCount}`,
          color: l[3]?.color,
          area: response?.z4,
          id: zCount,
        });
      }
      if (response?.z5 > 0) {
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z5,
          value: `زون ${zCount}`,
          color: l[4]?.color,
          area: response?.z5,
          id: zCount,
        });
      }
      if (response?.z6 > 0) {
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z6,
          value: `زون ${zCount}`,
          color: l[5]?.color,
          area: response?.z6,
          id: zCount,
        });
      }
      if (response?.z7 > 0) {
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z7,
          value: `زون ${zCount}`,
          color: l[6]?.color,
          area: response?.z7,
          id: zCount,
        });
      }
      if (response?.z8 > 0) {
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z8,
          value: `زون ${zCount}`,
          color: l[7]?.color,
          area: response?.z8,
          id: zCount,
        });
      }
      if (response?.z9 > 0) {
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z9,
          value: `زون ${zCount}`,
          color: l[8]?.color,
          area: response?.z9,
          id: zCount,
        });
      }
      if (response?.z10 > 0) {
        zCount = zCount + 1;
        zonesArray.push({
          ["z" + zCount]: response?.z10,
          value: `زون ${zCount}`,
          color: l[9]?.color,
          area: response?.z10,
          id: zCount,
        });
      }
      console.log(zonesArray, "zones array");
      setPlantZonesData(zonesArray);

      if (response?.z1w > 0) {
        wsCount = wsCount + 1;
        waterZonesArray.push({
          ["z" + wsCount]: response?.z1w,
          value: `زون ${wsCount}`,
          color: w[0]?.color,
          area: response?.z1w,
          id: wsCount,
        });
      }
      if (response?.z2w > 0) {
        wsCount = wsCount + 1;
        waterZonesArray.push({
          ["z" + wsCount]: response?.z1,
          value: `زون ${wsCount}`,
          color: w[1]?.color,
          area: response?.z2w,
          id: wsCount,
        });
      }
      if (response?.z3w > 0) {
        wsCount = wsCount + 1;
        waterZonesArray.push({
          ["z" + wsCount]: response?.z1,
          value: `زون ${wsCount}`,
          color: w[2]?.color,
          area: response?.z3w,
          id: wsCount,
        });
      }
      if (response?.z4w > 0) {
        wsCount = wsCount + 1;
        waterZonesArray.push({
          ["z" + wsCount]: response?.z1,
          value: `زون ${wsCount}`,
          color: w[3]?.color,
          area: response?.z4w,
          id: wsCount,
        });
      }
      if (response?.z5w > 0) {
        wsCount = wsCount + 1;
        waterZonesArray.push({
          ["z" + wsCount]: response?.z1,
          value: `زون ${wsCount}`,
          color: w[4]?.color,
          area: response?.z5w,
          id: wsCount,
        });
      }
      if (response?.z6w > 0) {
        wsCount = wsCount + 1;
        waterZonesArray.push({
          ["z" + wsCount]: response?.z1,
          value: `زون ${wsCount}`,
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
      console.log(a.z1, "aaaaaaaaaa");
    }
  }, [legends, response]);

  const plantHealthRenderItem = ({ item }) => {
    zwCount = zwCount + 1;
    return (
      <View style={styles.legendsCard}>
        <Text
          style={{
            width: hp(15),
            textAlign: "left",
            fontSize: 24,
            fontWeight: "400",
            fontFamily: "CustomFont",
            marginHorizontal: 5,
          }}
        >
          {item.area} ایکڑ
          {/* {response && response[`z${zwCount}`]} ایکڑ */}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "400",
              fontFamily: "CustomFont",
            }}
          >
            {/* {item?.title} */}
            {item.value}
          </Text>
          <View
            style={{
              height: hp(4),
              width: hp(4),
              backgroundColor: item.color,
              marginHorizontal: 10,
              borderRadius: 4,
            }}
          />
        </View>
      </View>
    );
  };
  const renderItem = ({ item }) => {
    count = count + 1;
    return (
      <View style={styles.legendsCard}>
        <Text
          style={{
            width: hp(15),
            textAlign: "left",
            fontSize: 24,
            fontWeight: "400",
            fontFamily: "CustomFont",
            marginHorizontal: 5,
          }}
        >
          {response && response[`z${count}`]} ایکڑ
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "400",
              fontFamily: "CustomFont",
            }}
          >
            {item?.title}
          </Text>
          <View
            style={{
              height: hp(4),
              width: hp(4),
              backgroundColor: item.color,
              marginHorizontal: 10,
              borderRadius: 4,
            }}
          />
        </View>
      </View>
    );
  };
  const zwrenderItem = ({ item }) => {
    zwCount = zwCount + 1;
    return (
      <View style={styles.legendsCard}>
        <Text
          style={{
            width: hp(15),
            textAlign: "left",
            fontSize: 24,
            fontWeight: "400",
            fontFamily: "CustomFont",
            marginHorizontal: 5,
          }}
        >
          {item.area} ایکڑ
          {/* {response && response[`z${zwCount}`]} ایکڑ */}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "400",
              fontFamily: "CustomFont",
            }}
          >
            {/* {item?.title} */}
            {item.value}
          </Text>
          <View
            style={{
              height: hp(4),
              width: hp(4),
              backgroundColor: item.color,
              marginHorizontal: 10,
              borderRadius: 4,
            }}
          />
        </View>
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
          <Text style={styles.analysisType}>{response?.analysis_type}</Text>
          <Image
            source={{ uri: response?.img }}
            resizeMode="stretch"
            style={styles.farmImage}
          />

          <View style={{ marginVertical: hp(3) }}>
            <FarmReportDetails text={response?.name} heading="صارف    " />
            <FarmReportDetails text={response?.city} heading="پتہ    " />
            <FarmReportDetails
              text={response?.crop_name}
              heading="فصل کا نام  "
            />
            <FarmReportDetails
              text={response?.area}
              heading=" کھیت کا سائز   "
            />
            <FarmReportDetails
              text={response?.growth_stage}
              heading=" فصل کی نشوونما کا مرحلہ "
            />
            <FarmReportDetails
              text={response?.sow_date}
              heading="کاشت کی تاریخ"
            />
            <FarmReportDetails
              text={response?.analysis_type}
              heading=" تجزیہ کی قسم"
            />
            <FarmReportDetails
              text={response?.analysis_date}
              heading="تجزیہ کی تاریخ   "
            />
            <FarmReportDetails
              text={response?.created_at}
              heading="رپورٹ کی تاریخ"
            />
          </View>

          <Text style={styles.analysisType}>کھیت کی تفصیلات</Text>

          <Image
            source={{ uri: response?.farm_crop_img }}
            resizeMode="stretch"
            style={styles.farmImage}
          />
          <Text style={styles.text}>
            کھیت سے لی گئی تصویر - {response?.area} کل ایکڑ
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={{ uri: response?.overlay_img }}
                resizeMode="stretch"
                style={styles.farmImageRow}
              />

              {response &&
              response?.analysis_type === "زمین میں موجود نائٹروجن کا تجزیہ" ? (
                <Text
                  style={[
                    styles.satelliteText,
                    { width: wp(45), textAlign: "center" },
                  ]}
                >
                  کھادوں کے Manual استعمال کے لحاظ سے زوننگ
                </Text>
              ) : (
                <Text style={styles.satelliteText}>
                  تجزیہ کے لحاظ سے کھیت کا معائنہ
                </Text>
              )}
            </View>
            <View>
              <Image
                source={{ uri: response?.satellite_img }}
                resizeMode="stretch"
                style={styles.farmImageRow}
              />
              <Text style={styles.satelliteText}>
                سیٹیلائٹ سے کیا گیا تجزیہ
              </Text>
            </View>
          </View>

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
          response?.analysis_type === "پودوں کی صحت کا تجزیہ" ? (
            <FlatList
              data={plantZonesData}
              keyExtractor={(item) => item.id}
              renderItem={plantHealthRenderItem}
            />
          ) : null}

          {/* analysis */}
          <Text style={styles.analysisType}>تجزیہ اور تجویز</Text>
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
            <View style={{ flexDirection: "row" }}>
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
            <Text
              style={[
                styles.analysisType,
                { textAlign: "right", color: COLORS.green, fontSize: 20 },
              ]}
            >
              تجزیہ اور تجویز سٌننے کے لیے یہاں کلک کریں
            </Text>
          </View>

          <Text style={styles.analysis}>{response?.analysis}</Text>

          {/* water analysis */}

          {response && response?.analysis_type === "پودوں کی صحت کا تجزیہ" ? (
            <Text style={styles.analysisType}>پانی کی دستیابی کا تجزیہ</Text>
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
                      تجزیہ کے لحاظ سے کھیت کا معائنہ
                    </Text>
                  )}
                </View>
                <View>
                  <Image
                    source={{ uri: response?.satellite_img_2 }}
                    resizeMode="stretch"
                    style={styles.farmImageRow}
                  />
                  <Text style={styles.satelliteText}>
                    سیٹیلائٹ سے کیا گیا تجزیہ
                  </Text>
                </View>
              </View>
              <FlatList
                data={waterZonesData}
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
              <Text
                style={[
                  styles.analysisType,
                  { textAlign: "right", color: COLORS.green, fontSize: 20 },
                ]}
              >
                تجزیہ اور تجویز سٌننے کے لیے یہاں کلک کریں
              </Text>
            </View>
          ) : null}
          {response && response?.analysis_type === "پودوں کی صحت کا تجزیہ" ? (
            <Text style={styles.analysis}>{response?.analysis_w}</Text>
          ) : null}

          {/* ********************* */}
          {response &&
          response?.analysis_type === "زمین میں موجود نائٹروجن کا تجزیہ" ? (
            <View>
              <Text style={styles.analysisType}>کھادوں کی سفارش</Text>
              <View>
                <View style={styles.healthTextContainer}>
                  <View style={styles.listItems}>
                    <Text style={styles.healthText}> ڈی اے پی</Text>
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
                    <Text style={styles.healthText}>ایس او پی</Text>
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
                  <View style={styles.listItems}>
                    <Text style={styles.healthText}>یوریا</Text>
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
                  <View>
                    <Text style={styles.healthText}>رقبہ کی تفصیل</Text>
                    <Text style={styles.listItemText}>انتہائی کم غذائیت</Text>
                    <Text style={styles.listItemText}>کم غذائیت</Text>
                    <Text style={styles.listItemText}>درمیائی غذائیت</Text>
                    <Text style={styles.listItemText}> بہترین غذائیت</Text>
                  </View>
                </View>
                <View></View>
              </View>
              {/* **** **** */}
              <Text style={styles.analysisType}>
                کھادوں کے استعمال کے مراحل
              </Text>
              <Text
                style={[
                  styles.analysisType,
                  { backgroundColor: "grey", color: "white" },
                ]}
              >
                {" "}
                انتہائی کم غذائیت
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
                        }}
                      >
                        <Text style={[{ width: wp(75) }, styles.marhlaText]}>
                          {item}
                        </Text>
                        <Text style={styles.marhlaHeading}>
                          مرحلہ نمبر{z1} :
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
                کم غذائیت
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
                        }}
                      >
                        <Text style={[{ width: wp(75) }, styles.marhlaText]}>
                          {item}
                        </Text>
                        <Text style={styles.marhlaHeading}>
                          مرحلہ نمبر{z2} :
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <Text
                style={[styles.analysisType, { backgroundColor: "#ffff00" }]}
              >
                درمیانی غذائیت
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
                        }}
                      >
                        <Text style={[{ width: wp(75) }, styles.marhlaText]}>
                          {item}
                        </Text>
                        <Text style={styles.marhlaHeading}>
                          مرحلہ نمبر{z3} :
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <Text
                style={[styles.analysisType, { backgroundColor: "#00ff00" }]}
              >
                بہترین غذائیت
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
                        }}
                      >
                        <Text style={[{ width: wp(75) }, styles.marhlaText]}>
                          {item}
                        </Text>
                        <Text style={styles.marhlaHeading}>
                          مرحلہ نمبر{z4} :
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
              <Text style={styles.analysisType}> ہفتہ وار موسمی صورتِحال </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  height: hp(8),
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.weatherCardText}> بارش</Text>
                  <Text style={{ color: COLORS.green }}>(%)</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.weatherCardText}>ہوا کی رفتار</Text>
                  <Text style={{ color: COLORS.green }}>(mph)</Text>
                </View>

                <View style={{ alignItems: "center" }}>
                  <Text style={styles.weatherCardText}>درجہ حرارت</Text>
                  <Text style={{ color: COLORS.green }}>(°C)</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.weatherCardText}>دن</Text>
                  <Text></Text>
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
                        <Text style={styles.weatherList}>{item.rain_mm}</Text>

                        <Text style={styles.weatherList}>
                          {item.wind_speed}
                        </Text>
                        <Text style={styles.weatherList}>
                          {item.max_temp} - {item.min_temp}
                        </Text>

                        <Text style={styles.weatherList}>{item.date}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          ) : null}

          {/* disclaimer */}
          <Text style={[styles.analysisType, { color: "red" }]}>
            اہم معلومات
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
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
            <Text
              style={[
                styles.analysisType,
                { textAlign: "right", color: COLORS.green, fontSize: 20 },
              ]}
            >
              اہم معلومات سٌننے کے لیے یہاں کلک کریں
            </Text>
          </View>
          <FlatList
            data={response?.disclaimer_description}
            keyExtractor={(item) => item.rid}
            renderItem={({ item }) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      {
                        width: wp(86),
                        fontFamily: "CustomFont",
                        fontSize: 24,
                        fontWeight: "400",
                        textAlign: "right",
                      },
                    ]}
                  >
                    {item}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "CustomFont",
                      fontSize: 24,
                      fontWeight: "400",
                      color: "red",
                    }}
                  >
                    {(pointCount = pointCount + 1)}۔
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
    fontSize: 24,
    fontWeight: "400",
    fontFamily: "CustomFont",
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
    fontSize: 24,
    fontWeight: "400",
    fontFamily: "CustomFont",
    textAlign: "right",
    margin: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
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
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
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
    fontFamily: "CustomFont",
    fontSize: 20,
    color: COLORS.green,
    fontWeight: "600",
  },
  weatherList: {
    width: wp(28),
    textAlign: "center",
    marginHorizontal: 5,
    fontFamily: "CustomFont",
    fontSize: 16,
    fontWeight: "600",
  },
  marhlaText: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    width: wp(72),
  },
  marhlaHeading: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
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
    fontFamily: "CustomFont",
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.green,
  },
  listItems: {
    alignItems: "center",
    margin: 5,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  container: {
    borderRadius: 10,
    marginBottom: hp(4),
  },
});

export default FarmFullReport;

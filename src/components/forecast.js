import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

import { getForecast } from "../redux/action";
import COLORS from "../../assets/colors/colors";
import { Separator } from "./index";

const Forecast = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(); 
  const [forecastData, setForecastData] = useState();
  const [hourSelectedItem, setHourSelectedItem] = useState(); 
  const [modalDay, setModalDay] = useState();
  const [modalTemp, setModalTemp] = useState();
  const [modalMaxTemp, setModalMaxTemp] = useState();
  const [modalMinTemp, setModalMinTemp] = useState();
  const [modalHumidity, setModalHumidity] = useState();
  const [modalIcon, setModalIcon] = useState();
  const [modalDate, setModalDate] = useState();
  const [modalIconDesc, setModalIconDesc] = useState();
  const [speed, setSpeed] = useState();
  const [rainChances, setRainChances] = useState();

  let weatherData = [];
  const [modalVisible, setModalVisible] = useState(false);

  let forecast = useSelector((state) => state.api?.forecast?.data);
  // console.log(forecast, "forecahhshhss");
  let DATA = useSelector((state) => state.api?.forecast?.data?.list);
  useEffect(() => {
    if (DATA) {
      let uniqueData = [
        ...new Set(DATA.map((obj) => obj.dt_txt.split(" ")[0])),
      ].map((age) => {
        return DATA.find((obj) => obj.dt_txt.split(" ")[0] === age);
      });
      let count = 0;
      for (let j in uniqueData) {
        count = count + 1;
        weatherData.push({
          id: count,
          record: DATA.filter(
            (x) => x.dt_txt.split(" ")[0] == uniqueData[j].dt_txt.split(" ")[0]
          ),
        });
      }
      setForecastData(weatherData);
      setLoading(false);
    }
  }, [DATA]);

  useEffect(() => {
    if (props?.lat && props.long) {
      let lat = props.lat;
      let long = props.long;
      dispatch(getForecast({ lat, long }));
    }
  }, []);

  const renderItem = ({ item }) => {
    let date = item.record[0].dt_txt;

    const [datePart, timePart] = date.split(" ");
    const [year, month, day] = datePart.split("-");

    const dateObj = new Date(year, month - 1, day);

    const dayOfWeek = dateObj?.toLocaleDateString("ur-PK", {
      weekday: "long",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    let today = dayOfWeek?.split(",");
    let temp = item.record[0].main.temp;

    const temperatureWithoutDecimal = parseInt(temp);
    let feelsLike = item.record[0].main.feels_like;
    const feelsLikeWithoutDecimal = parseInt(feelsLike);

    return (
      <View style={styles.listCard}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 5,
            alignItems: "center",
            padding: 10,
          }}
          onPress={() => setSelectedItem(item.id)}
        >
          <View>
            <Entypo name="chevron-down" size={20} color={COLORS.green} />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              width: wp(25),
              color: COLORS.green,
            }}
          >
            {today[0]}
          </Text>
        </TouchableOpacity>

        {selectedItem == item.id ? (
          <View style={{}}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.text}>درجہ حرارت (°C)</Text>
                <Text>{temperatureWithoutDecimal}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.text}>محسوس (°C)</Text>
                <Text> {feelsLikeWithoutDecimal}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.text}>نمی (%)</Text>
                <Text>{item.record[0].main.humidity}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.text}>دباؤ (hPa)</Text>
                <Text>{item.record[0].main.pressure}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.text}>رفتار (m/s)</Text>
                <Text>{item.record[0].wind.speed}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.text}>بارش کے امکانات (%)</Text>
                <Text>{item.record[0].pop}</Text>
              </View>
            </View>
          </View>
        ) : null}
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={item.record}
          keyExtractor={(item) => item.id}
          renderItem={hourlyRenderItem}
        />
      </View>
    );
  };

  const openHourlyModal = (item) => {
    setModalVisible(true);
    setHourSelectedItem(item);
    setModalIcon(item?.weather[0]?.main);
    setModalIconDesc(item?.weather[0]?.description);

    setModalHumidity(item?.main?.humidity);
    let date = item.dt_txt;
    const [datePart, timePart] = date.split(" ");
    setModalDate(datePart);
    const firstTwoDigits = timePart.substring(0, 2);
    const [year, month, day] = datePart.split("-");
    const dateObj = new Date(year, month - 1, day);

    const dayOfWeek = dateObj?.toLocaleDateString("ur-PK", { weekday: "long" });
    let today = dayOfWeek.split(",");
    setModalDay(today[0]);

    let temp = item?.main?.temp;
    const temperatureWithoutDecimal = parseInt(temp);
    setModalTemp(temperatureWithoutDecimal);
    let maxtemp = item?.main?.temp_max;
    const max = parseInt(maxtemp);
    setModalMaxTemp(max);
    let mintemp = item?.main?.temp_min;
    const min = parseInt(mintemp);
    setModalMinTemp(min);
    let speed = item?.wind?.speed;
    setSpeed(speed);
    let rainChances = item?.pop;
    setRainChances(rainChances);
    let size = 20;
    let color = COLORS.black;
  };

  const hourlyRenderItem = ({ item }) => {
    // console.log(item, "itemememmememememememmememem");
    let date = item?.dt_txt;
    const [datePart, timePart] = date?.split(" ");
    const firstTwoDigits = timePart?.substring(0, 2);
    const [year, month, day] = datePart?.split("-");
    const dateObj = new Date(year, month - 1, day);

    const dayOfWeek = dateObj?.toLocaleDateString("ur-PK", { weekday: "long" });
    let today = dayOfWeek.split(",");
    // console.log(today, "llll");

    let temp = item?.main?.temp;
    const temperatureWithoutDecimal = parseInt(temp);
    let maxtemp = item?.main?.temp_max;
    const max = parseInt(maxtemp);
    let mintemp = item?.main?.temp_min;
    const min = parseInt(mintemp);

    let size = 20;
    let color = COLORS.black;
    return (
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.disableGrey,
          padding: 10,
          margin: hp(1),
          alignItems: "center",
          borderRadius: 10,
          top: hp(1),
          width: wp(20),
        }}
        onPress={() => openHourlyModal(item)}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          {firstTwoDigits}
        </Text>
        <View style={{ margin: 10 }}>
          {item.weather[0].main === "Clear" && (
            <Fontisto name="day-sunny" size={size} color={color} />
          )}
          {item.weather[0].main === "Clouds" && (
            <Fontisto name="day-cloudy" size={size} color={color} />
          )}
          {item.weather[0].main === "Snow" && (
            <Fontisto name="day-cloudy" size={size} color={color} />
          )}
          {item.weather[0].main === "Rain" && (
            <Fontisto name="day-rain" size={size} color={color} />
          )}
          {item.weather[0].main === "Mist" ||
            item.weather[0].main === "Smoke" ||
            item.weather[0].main === "Haze" ||
            item.weather[0].main === "Dust" ||
            item.weather[0].main === "Fog" ||
            item.weather[0].main === "Sand" ||
            item.weather[0].main === "Dust" ||
            item.weather[0].main === "Ash" ||
            item.weather[0].main === "Squall" ||
            (item.weather[0].main === "Tornado" && (
              <Fontisto name="fog" size={size} color={color} />
            ))}
          {item.weather[0].main === "Drizzle" && (
            <Fontisto name="rains" size={size} color={color} />
          )}
          {item.weather[0].main === "Thunderstorm" && (
            <Ionicons name="thunderstorm-outline" size={size} color={color} />
          )}
          {item.weather[0].main === "Snow" && (
            <FontAwesome name="snowflake-o" size={size} color={color} />
          )}
        </View>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          {temperatureWithoutDecimal}°
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={COLORS.green} />
      </View>
    );
  }
  let color = COLORS.black;
  let size = 20;
  return (
    <View style={{ flex: 1, marginVertical: 10 }}>
      {/* days card */}
      <FlatList
        data={forecastData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* modal */}
      <View
        style={{ alignItems: "center", justifyContent: "flex-end", flex: 1 }}
      >
        <Modal animationType="fade" visible={modalVisible} transparent>
          <View
            style={{
              justifyContent: "flex-end",
              flex: 1,
              backgroundColor: COLORS.overlay,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                height: hp(70),
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: COLORS.disableBlack,
                  borderRadius: hp(10),
                  padding: hp(0.5),
                  marginHorizontal: hp(3),
                  top: hp(2),
                }}
              >
                <Entypo name="cross" size={20} color={"white"} />
              </TouchableOpacity>

              <View style={{ alignItems: "center", margin: hp(5) }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    textAlign: "center",
                    marginBottom: hp(2),
                  }}
                >
                  {modalDay}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 32,
                      fontWeight: "700",
                    }}
                  >
                    {modalTemp}°
                  </Text>

                  <View style={{ margin: 10 }}>
                    {modalIcon === "Clear" && (
                      <Fontisto name="day-sunny" size={size} color={color} />
                    )}
                    {modalIcon === "Clouds" && (
                      <Fontisto name="day-cloudy" size={size} color={color} />
                    )}
                    {modalIcon === "Snow" && (
                      <Fontisto name="day-cloudy" size={size} color={color} />
                    )}
                    {modalIcon === "Rain" && (
                      <Fontisto name="day-rain" size={size} color={color} />
                    )}
                    {modalIcon === "Mist" ||
                      modalIcon === "Smoke" ||
                      modalIcon === "Haze" ||
                      modalIcon === "Dust" ||
                      modalIcon === "Fog" ||
                      modalIcon === "Sand" ||
                      modalIcon === "Dust" ||
                      modalIcon === "Ash" ||
                      modalIcon === "Squall" ||
                      (modalIcon === "Tornado" && (
                        <Fontisto name="fog" size={size} color={color} />
                      ))}
                    {modalIcon === "Drizzle" && (
                      <Fontisto name="rains" size={size} color={color} />
                    )}
                    {modalIcon === "Thunderstorm" && (
                      <Ionicons
                        name="thunderstorm-outline"
                        size={size}
                        color={color}
                      />
                    )}
                    {modalIcon === "Snow" && (
                      <FontAwesome
                        name="snowflake-o"
                        size={size}
                        color="black"
                      />
                    )}
                  </View>
                </View>
                <Text style={{ fontSize: 18, fontWeight: "400" }}>
                  {modalIconDesc}
                </Text>
              </View>

              <Separator />

              <View style={styles.detailsContainer}>
                <Text style={styles.val}>{modalHumidity}</Text>
                <Text style={styles.hourlyText}>نمی (%)</Text>
              </View>
              <Separator />
              <View style={styles.detailsContainer}>
                <Text style={styles.val}>{speed}</Text>
                <Text style={styles.hourlyText}>رفتار (m/s)</Text>
              </View>
              <Separator />
              <View style={styles.detailsContainer}>
                <Text style={styles.val}>{rainChances}</Text>
                <Text style={styles.hourlyText}>بارش کے امکانات (%)</Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: wp(92),
    alignSelf: "center",
    padding: 10,
    marginTop: 5,
  },
  cardItems: {
    alignItems: "center",
  },
  listCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: wp(92),
    alignSelf: "center",
    padding: 10,
    margin: hp(1),
    marginTop: 5,
  },
  mainCardTemp: {
    fontSize: 32,
    fontWeight: "700",
  },
  mainCardText: {
    width: wp(22),
    textAlign: "center",
  },
  column: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    padding: 10,
  },
  text: {
    width: wp(30),
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    fontFamily:"CustomFont",
    color:COLORS.green
  },
  hourlyText: {
    fontSize: 16,
    fontWeight: "400",
    margin: hp(2),
    width: hp(20),
    fontFamily:"CustomFont"
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: hp(3),
    alignItems: "center",
  },
  val:{
    fontFamily:"PoppinsRegular",
    fontSize:14
  }
});

export default Forecast;

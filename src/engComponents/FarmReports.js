import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { FarmReportCard } from "./Index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLegendsData,
  getAllCategories,
  getReportsByReportId,
} from "../redux/action";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../assets/colors/colors";

const FarmReports = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [newArray, setNewArray] = useState();
  let filterArray = [];
  const [reportData, setReportData] = useState();
  const [filteredData, setFilteredData] = useState(null);

  const response = useSelector((state) => state.api.allCategories?.data);
  const reports = useSelector((state) => state.api.farmReports?.data);
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(clearLegendsData());
  }, []);

  useEffect(() => {
    if (response) {
      filterArray = response.data.filter((item) => item.list_name === "report");
      setNewArray(filterArray);
    }
  }, [response]);

  useEffect(() => {
    if (reports) {
      setReportData(reports?.data);
    }
  }, [reports]);

  const testRenderItem = ({ item }) => {
    const today = new Date();
    const dateObject = new Date(today);
    const todayYear = dateObject.getFullYear();
    const todayMonth = dateObject.getMonth() + 1;
    const Todayday = dateObject.getDate();
    let dateToday =
      todayYear +
      "-" +
      (todayMonth < 10 ? "0" : "") +
      todayMonth +
      "-" +
      (Todayday < 10 ? "0" : "") +
      Todayday;

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const year = yesterday.getFullYear();
    const month = yesterday.getMonth() + 1;
    const day = yesterday.getDate();

    const yesterdayDate =
      year +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      (day < 10 ? "0" : "") +
      day;

    return (
      <View>
        {item.date == dateToday ? (
          <ImageBackground
            source={require("../../assets/dateContainer.png")}
            style={styles.bgImage}
            resizeMode="cover"
          >
            <Text style={{ textAlign: "center" }}> Today </Text>
          </ImageBackground>
        ) : item.date == yesterdayDate ? (
          <ImageBackground
            source={require("../../assets/dateContainer.png")}
            style={styles.bgImage}
            resizeMode="cover"
          >
            <Text style={{ textAlign: "center" }}> yesterday </Text>
          </ImageBackground>
        ) : (
          <ImageBackground
            source={require("../../assets/dateContainer.png")}
            style={styles.bgImage}
            resizeMode="cover"
          >
            <Text style={{ textAlign: "center" }}> {item.date} </Text>
          </ImageBackground>
        )}

        {item.record && item.record.length > 0 ? (
          <ReportRecordList record={item.record} />
        ) : (
          <Text>No records available</Text>
        )}
      </View>
    );
  };
  const ReportRecordList = ({ record }) => {
    return (
      <FlatList
        data={record}
        keyExtractor={(item) => item.rid.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() => getFullReportHandler(item.rid)}
          >
            <FarmReportCard
              img={item.icon}
              label={item.list_label}
              date={item.analysis_date}
              stage={item.growth_stage}
            />
          </TouchableOpacity>
        )}
      />
    );
  };
  const getFullReportHandler = (id) => {
    dispatch(getReportsByReportId(id));
    navigation.navigate("FarmFullReport");
  };

  const filterDataHandler = (pressed) => {
    console.log(pressed);

    let mainArray = [];

    for (let j in reportData) {
      mainArray.push(reportData[j].record);
    }

    let f = mainArray.flat();
    if (
      pressed.list_label === "Water Stress" ||
      pressed.list_label === "Plant Health"
    ) {
      let a = f.filter(
        (item) => item.list_label === "Plant Health & Water Stress Analysis"
      );
      console.log(a, "پودوں کی صحت اور پانی کی دستیابی کا تجزیہ");
      setFilteredData(a);
    } else {
      let a = f.filter((item) => item.list_label === pressed.list_label);

      setFilteredData(a);
    }
  };

  const categoriesRenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() => filterDataHandler(item)}
      >
        <Text style={styles.categoryCardText}>{item.list_label}</Text>
      </TouchableOpacity>
    );
  };

  const filterRenderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ margin: 10 }}
          onPress={() => getFullReportHandler(item.rid)}
        >
          <FarmReportCard
            img={item.icon}
            label={item.list_label}
            date={item.analysis_date}
            stage={item.growth_stage}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, paddingVertical: 10 }}>
      <View style={{ height: hp(5) }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={newArray}
          keyExtractor={(item) => item.id}
          renderItem={categoriesRenderItem}
        />
      </View>
      {filteredData ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.rid}
          renderItem={filterRenderItem}
        />
      ) : (
        <FlatList
          data={reportData}
          renderItem={testRenderItem}
          keyExtractor={(item) => item.date.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    height: hp(5),
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: hp(3),
  },
  categoryCard: {
    paddingHorizontal: 10,
    borderRadius: 50,
    margin: 5,
    backgroundColor: COLORS.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryCardText: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
  },
});

export default FarmReports;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getFarmsById, getReportsByFarmId } from "../../redux/action";
import COLORS from "../../../assets/colors/colors";
import { StatusBar } from "expo-status-bar";

const Notification = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [notification, setNotification] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasSearchResults, setHasSearchResults] = useState(true);

  const response = useSelector(
    (state) => state.api.notifications?.data?.message
  );
  let resData = useSelector((state) => state.api.notifications?.data);

  useEffect(() => {
    if (response) {
      setNotification(response);
      setLoading(false);
      setSearchResults(response);
    }
  }, [response]);

  const notificationNavHandler = (item) => {
    if (item.path === "SubscribedFarm") {
      dispatch(getFarmsById(item.fid));
      dispatch(getReportsByFarmId(item.fid));
      navigation.navigate("SubscribedFarm", {
        area: item.area,
        name: item.farm_name,
        weather: item.weather && item.weather,
        farm: item.farm && item.farm,
        report: item.report && item.report,
        activity: item.activities && item.activities,
        isNotification: "yes",
      });
    }
    if (item.path === "mandi") {
      navigation.navigate("ElementsView", {
        url: "https://growpak.store/mandirates/",
        title: "منڈی ریٹس",
      });
    }
    if (item.path === "general") {
      navigation.navigate("GeneralNotification", { data: item });
    }
  };

  const filterNotifications = (searchText) => {
    if (!searchText) {
      setSearchResults(notification);
    } else {
      const filteredResults = notification.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
    setHasSearchResults(searchResults.length > 0);
  };

  const renderItem = ({ item }) => {
    console.log("notification body ", item.body);
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => notificationNavHandler(item)}
      >
        <View
          style={{
            margin: hp(0.5),
          }}
        >
          <View
            style={{
              alignItems: "center",
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={[styles.title]}>{item.title}</Text>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.desc} numberOfLines={2}>
            {item.body}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: COLORS.disableGrey,
            padding: hp(0.1),
            marginVertical: hp(2),
          }}
        />
        <StatusBar style="light" />
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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          alignItems: "center",
          marginTop: hp(5),
        }}
      >
        {/* search bar */}
        <View style={styles.searchBar}>
          <Feather
            name="search"
            size={hp(3)}
            style={{ paddingHorizontal: 5, alignSelf: "center" }}
            color={COLORS.disableGrey}
          />
          <TextInput
            value={text}
            onChangeText={(t) => {
              setText(t);
              filterNotifications(t);
            }}
            style={styles.input}
          />
        </View>
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.nid.toString()}
        ListEmptyComponent={
          !hasSearchResults && (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No Data Found</Text>
            </View>
          )
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    width: wp(95),
    alignSelf: "center",
  },
  image: {
    height: 50,
    width: 55,
    borderRadius: 10,
    overflow: "hidden",
    right: hp(2),
  },
  desc: {
    fontWeight: "400",
    fontSize: 16,
    width: wp(85),
    fontFamily: "CustomFont",
    marginHorizontal: 10,
    textAlign: "right",
    paddingVertical: 10,
  },
  title: {
    fontWeight: "400",
    fontSize: 21,
    fontFamily: "CustomFont",
    width: wp(70),
    textAlign: "right",
    marginHorizontal: hp(3),
    paddingVertical: 10,
  },
  time: {
    color: COLORS.textgrey,
    fontSize: 12,
    fontWeight: "400",
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "f9fafc",
    borderRadius: hp(1),
    marginBottom: hp(2),
    width: wp(90),
    borderWidth: 1,
    borderColor: COLORS.disableGrey,
    margin: 10,
  },
  barText: {
    color: COLORS.textgrey,
    fontWeight: "400",
    fontSize: 16,
  },
  input: {
    width: "85%",
    height: 40,
    alignSelf: "center",
    textAlign: "right",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Notification;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getFarmsById } from "../../redux/action";
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
  useEffect(() => {
    if (response) {
      setNotification(response);
      setLoading(false);
      setSearchResults(response);
    }
  }, [response]);

    const notificationNavHandler = (item) => {
      if (item.path === "SubscribedFarm") {
        dispatch(getFarmsById(item?.fid));
        dispatch(getReportsByFarmId(item?.fid));
        navigation.navigate("SubscribedFarm", {
          area: item?.area,
          name: item?.farm_name,
          weather: item?.weather && item?.weather,
          farm: item?.farm && item?.farm,
          report: item?.report && item?.report,
          activity: item?.activities && item?.activities,
          isNotification: "yes",
        });
      }
      if (item.path === "mandi") {
        navigation.navigate("ElementsView", {
          url: "https://growpak.store/mandirates/",
          title: "Market Rates",
        });
      }
      if (item.path === "general") {
        navigation.navigate("GeneralNotification",{data:item});
      }
    };

  const filterNotifications = (searchText) => {
    if (!searchText) {
      setSearchResults(notification);
    } else {
      const filteredResults = response?.filter((item) =>
        item.title_e.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
    setHasSearchResults(searchResults.length > 0);
  };



  const renderItem = ({ item }) => {
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
            <View style={{ alignItems:"center",width:'100%',flexDirection:"row", justifyContent:"center"}}>
            <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />
            <Text style={[styles.title]}>{item.title_e}</Text>
            </View>
            <Text style={styles.desc}>{item.body_e}</Text>
          </View>

     
        <View
          style={{ backgroundColor: COLORS.disableGrey, padding: hp(0.1),marginVertical:hp(2) }}
        />
        <StatusBar style="light" />
      </TouchableOpacity>
    );
  };

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
            // placeholder="Search.."
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
      <StatusBar style="dark"/>
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    width:wp(95),
    alignSelf:"center",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 10,
    overflow: "hidden",
    left:hp(2)
  },
  desc: {
    width: wp(85),
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    marginHorizontal:10,
    marginTop:hp(1),
  },
  title: {
    fontSize: 14,
      fontFamily: "PoppinsSemi",
    width: wp(70),
    textAlign:"left",
    marginHorizontal:hp(3)
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
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Notification;

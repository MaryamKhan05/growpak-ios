import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getFarmerByAgentId } from "../../redux/action";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import COLORS from "../../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const AllFarmers = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const farmersresponse = useSelector((state) => state.api.farmers?.data?.data);
  const totalFarmers = farmersresponse?.length;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getFarmerByAgentId());
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemCard}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image
            source={{ uri: item.image }}
            style={{
              height: hp(10),
              width: wp(20),
              borderRadius: 12,
              overflow: "hidden",
            }}
            resizeMode="cover"
          />
          <View style={{ alignItems: "flex-end" }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  styles.value,
                  {
                    width: wp(40),
                    textAlign: "right",
                  },
                ]}
              >
                {item.name}
              </Text>
              <Text style={styles.key}>نام</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.value}>{item.phone}</Text>
              <Text style={styles.key}>فون</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size={"large"} color={COLORS.green} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      {farmersresponse == null || farmersresponse?.length < 1 ? (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text style={[styles.heading]}>آپ نے ابھی تک کسان نہیں شامل کیا</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Text
            style={{
              textAlign: "right",
              fontSize: 16,
              fontWeight: "600",
              fontFamily: "NotoSemi",
              color: COLORS.textgrey,
              margin: hp(2),
              marginBottom: hp(1),
            }}
          >
            کل کسان:{totalFarmers}{" "}
          </Text>
          <FlatList
            data={farmersresponse}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => navigation.navigate("Farmer")}
      >
        <FontAwesome5
          name="plus"
          size={hp(2)}
          color={COLORS.white}
          style={{ marginRight: 10 }}
        />
        <Text
          style={[
            { color: COLORS.white, fontFamily: "CustomFont", fontSize: 20 },
          ]}
        >
          نیاکسان
        </Text>
      </TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: COLORS.white,
    margin: hp(2),
    borderRadius: 12,
    padding: hp(2),
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: wp(92),
    alignSelf: "center",
  },
  key: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    color: COLORS.textgrey,
    width: wp(12),
    textAlign: "right",
  },
  value: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  plusButton: {
    backgroundColor: COLORS.green,
    padding: hp(1.5),
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignSelf: "flex-end",
    top: hp(72),
    right: hp(4),
    position: "absolute",
    flexDirection: "row",
    paddingHorizontal: hp(3),
  },
  subText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
    fontFamily: "NotoSemi",
  },
  subView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: hp(1),
  },
  text: {
    textAlign: "right",
    fontFamily: "CustomFont",
    fontSize: 20,
    fontWeight: "400",
  },
  heading: {
    fontFamily: "CustomFont",
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
  },
});

export default AllFarmers;

import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const GeneralNotification = () => {
  const route=useRoute()
 
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.title}>
          {route.params && route.params?.data?.title_e}
          </Text>
          {route.params?.data?.image ? (
            <Image
              source={{
                uri: route.params?.data?.image,
              }}
              style={styles.image}
              resizeMode="stretch"
            />
          ) : null}

          <Text style={styles.text}>
          {route.params && route.params?.data?.body_e}
          </Text>
          <StatusBar style="light" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  image: {
    height: hp(20),
    width: wp(80),
    margin: hp(5),
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    width: wp(92),
  },
  title: {
    marginVertical:hp(2),
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
});

export default GeneralNotification;

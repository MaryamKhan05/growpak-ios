import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const GeneralNotification = () => {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: wp(95),
          }}
        >
          <Text style={styles.title}>
            {route.params && route.params?.data?.title}
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
            {route.params && route.params?.data?.body}
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
    justifyContent: "center",
  },
  image: {
    height: hp(20),
    width: wp(80),
    margin: hp(5),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "yellow",
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "CustomFont",
    width: wp(90),
    textAlign: "right",
    marginTop:hp(3)
  },
  title: {
    top: hp(2),
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "CustomFont",
  },
});

export default GeneralNotification;

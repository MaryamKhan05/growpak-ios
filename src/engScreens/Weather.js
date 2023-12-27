import React from "react";
import { View,  StyleSheet } from "react-native";
import { Forecast } from "../engComponents/Index";
import { StatusBar } from "expo-status-bar";

const Weather = () => {
  return (
    <View style={{ flex: 1 }}>
      <Forecast />
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Weather;

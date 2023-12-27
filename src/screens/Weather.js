import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Forecast } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Weather = () => {
  const [lang, setLang] = useState();
  useEffect(() => {
    checkLanguageHandler();
  }, []);

  const checkLanguageHandler = async () => {
    let x = await AsyncStorage.getItem("lang");
    setLang(x);
  };
  return (
    <View style={{ flex: 1 }}>
       <Forecast /> 
    </View>
  );
};

const styles = StyleSheet.create({});

export default Weather;

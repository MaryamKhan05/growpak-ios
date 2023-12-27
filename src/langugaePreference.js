import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import EngMain from "./navigation/EngAppNavigation";
import Main from "./navigation/AppNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguagePreference = () => {
  const [lang, setLang] = useState();
  let l = useSelector((state) => state.api.appLang?.data);
  // console.log(l,'LanguagePreferenceLanguagePreferenceLanguagePreferenceLanguagePreferenceLanguagePreferenceLanguagePreference')

  useEffect(() => {
    if (l) {
      setLang(l);
    }
  }, [l]);

  useEffect(() => {
    checkLanguage();
  }, []);
  const checkLanguage = async () => {
    try {
      let x = await AsyncStorage.getItem("lang");
      setLang(x);
    } catch (e) {
      console.log("error getting lang");
    }
  };

  return (
    <View style={{ flex: 1 }}>{lang == "eng" ? <EngMain /> : <Main />}</View>
  );
};

export default LanguagePreference;

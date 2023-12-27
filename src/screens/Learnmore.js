import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";

const LearnMore = () => {
  const route=useRoute()
  let lang = useSelector((state) => state.api.appLang?.data);
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        // source={{ uri: "https://www.growtechsol.com/farmer.html" }}
        source={{
          uri:route.params?.url
            // lang == "ur"
            //   ? "https://www.growtechsol.com/farmer_ur.html"
            //   : "https://www.growtechsol.com/farmer.html",
        }}
      />
      <StatusBar style="light" />
    </View>
  );
};
export default LearnMore;

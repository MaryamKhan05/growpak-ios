import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const ElementsView = () => {
  const route = useRoute();
  return (
    <View style={{ flex: 1 }}>
      <WebView style={{ flex: 1 }} source={{ uri: route.params?.url ?route.params?.url :"https://growpak.store/mandirates/"}} />
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ElementsView;

import React from "react";
import { View,  StyleSheet } from "react-native";

import { WebView } from "react-native-webview";
const YoutubeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{ uri: "https://www.youtube.com/watch?v=A8uH9BRbEHE&t=16s" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default YoutubeScreen;

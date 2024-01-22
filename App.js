import "react-native-gesture-handler";
//haseeb
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { ToastProvider } from "react-native-toast-notifications";
import store from "./src/redux/store";
("./src/screens/index");
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ApolloProvider } from "@apollo/client";
import client from "./src/GraphQl/graphql";
import LanguagePreference from "./src/langugaePreference";
import { ActivityIndicator, View } from "react-native";
export default function App() {
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    CustomFont: require("./assets/fonts/font/JameelNooriNastaleeqRegular.ttf"),
    NotoRegular: require("./assets/fonts/font/static/NotoNaskhArabic-Regular.ttf"),
    NotoBold: require("./assets/fonts/font/static/NotoNaskhArabic-Bold.ttf"),
    NotoMedium: require("./assets/fonts/font/static/NotoNaskhArabic-Medium.ttf"),
    NotoSemi: require("./assets/fonts/font/static/NotoNaskhArabic-SemiBold.ttf"),
    PoppinsMedium: require("./assets/engFont/Poppins/Poppins-Medium.ttf"),
    PoppinsBold: require("./assets/engFont/Poppins/Poppins-Bold.ttf"),
    PoppinsSemi: require("./assets/engFont/Poppins/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("./assets/engFont/Poppins/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);
  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator style="large" color={"red"} />
  //     </View>
  //   );
  // }
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ToastProvider>
            <LanguagePreference />
          </ToastProvider>
        </GestureHandlerRootView>
      </ApolloProvider>
    </Provider>
  );
}

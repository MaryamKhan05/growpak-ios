import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
const PdfButton = () => {
  const [selectedPrinter, setSelectedPrinter] = useState();
  const response = useSelector(
    (state) => state.api?.reportByReport?.data?.data[0]
  );
  let link = useSelector((state) => state.api.savePdfLink?.data);
  const html = response?.pdf;


  const size = hp(3);
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() => (link ? Linking.openURL(link) : null)}
        style={styles.btn}
      >
        <AntDesign name="download" size={size} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: hp(1),
  },
});

export default PdfButton;

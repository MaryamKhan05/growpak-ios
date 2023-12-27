import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../assets/colors/colors";
import { clearLegendsData } from "../redux/action";

const BackButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      dispatch(clearLegendsData());
      navigation.goBack();
    } else {
      dispatch(clearLegendsData());
      navigation.navigate("EngHomeTab");
    }
  };
  return (
    <TouchableOpacity onPress={handleGoBack} style={{ padding: 10 }}>
      <Ionicons name="arrow-back" size={20} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default BackButton;

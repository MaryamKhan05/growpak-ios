import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import COLORS from "../../assets/colors/colors";
import { useDispatch } from "react-redux";
import { clearLegendsData } from "../redux/action";

const BackButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      dispatch(clearLegendsData())
      navigation.goBack();
    } else {
      dispatch(clearLegendsData())
     navigation.navigate("HomeTab")
    }
  };
  return (
    <TouchableOpacity
      onPress={handleGoBack}
      style={{ padding: 10 }}
    >
      <FontAwesome5 name="arrow-right" size={20} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default BackButton;

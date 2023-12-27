import { Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useToast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { appLang, updateUserLang } from "../redux/action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
const EngButton = (props) => {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState(null);
  let lang = useSelector((state) => state.api.appLang?.data);

  useEffect(() => {
    if (lang) {
      setLanguage(lang);
    }
  }, [lang]);

  useEffect(() => {
    checkLangugaeHandler();
  }, []);

  const checkLangugaeHandler = async () => {
    let x = await AsyncStorage.getItem("lang");
    setLanguage(x);
  };
  const changeLanguageHandler = async (lang) => {
    dispatch(appLang(lang));
    try {
      await AsyncStorage.setItem("lang", lang);
      console.log("save lang to storage",lang);
      dispatch(updateUserLang(lang));
    } catch (e) {
      console.log("error saving lang to storage");
    }
  };

  return (
    <View>
      {language == "eng" ? (
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: hp("0.8"),
            borderRadius: 50,
            width: wp("15%"),
            borderWidth: props.width,
            borderColor: props.border,
            backgroundColor: props.backgroundColor,
          }}
          onPress={() => changeLanguageHandler("ur")}
        >
          <Text
            style={{
              color: props.color,
              fontSize: 14,
              fontFamily: "NotoSemi",
            }}
          >
            اردو
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: hp("0.8"),
            borderRadius: 50,
            width: wp("15%"),
            borderWidth: props.width,
            borderColor: props.border,
            backgroundColor: props.backgroundColor,
          }}
          onPress={() => changeLanguageHandler("eng")}
        >
          <Text
            style={{
              color: props.color,
              fontSize: 14,
              fontFamily: "PoppinsMedium",
            }}
          >
            Eng
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EngButton;

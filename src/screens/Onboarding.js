import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import Swiper from "react-native-swiper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

//internal imports
import {
  Slider,
  ActiveButton,
  BorderButton,
  EngButton,
} from "../components/index";
import COLORS from "../../assets/colors/colors";

const Onboarding = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(3);
  const swiperRef = React.createRef();

  const handleNext = () => {
    if (swiperRef.current && currentIndex > 0) {
      const nextIndex = currentIndex - 1;
      swiperRef.current.scrollBy(-1);
      setCurrentIndex(nextIndex);
    }
    if (currentIndex == 0) {
      navigation.navigate("Signup");
    }
  };
  const viewStyle =
    Platform.OS == "android" ? styles.andViewStyle : styles.iosViewStyle;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* first row */}
      <View style={viewStyle}>
        <View
          style={{
            alignSelf: "flex-start",
          }}
        >
          <EngButton color="black" width={1} border={COLORS.grey} />
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: COLORS.green,
              fontWeight: "700",
              fontSize: 21,
              marginHorizontal: hp("1"),
            }}
          >
            گروپاک
          </Text>

          <Image source={require("../../assets/Logo.png")} />
        </View>
      </View>
      <View
        style={{
          height: hp("67"),
        }}
      >
        <Swiper
          ref={swiperRef}
          loop={false}
          index={3}
          onIndexChanged={(index) => setCurrentIndex(index)}
          activeDotColor={COLORS.orange}
          activeDotStyle={{ padding: hp("0.8"), borderRadius: 50 }}
        >
          <Slider
            heading="سیٹلائٹ سے تجزیہ"
            text=" سیٹلائٹ  کےتجزیے کے ذریعے اپنے کھیت کی 
          بہتر دیکھ بھال کریں"
            src={require("../../assets/slider1.png")}
          />
          <Slider
            heading="تجزیئےسے رپورٹس"
            text="ہماری رپورٹ میں دی گئی ہدایات پر عمل کر کے اپنے کھیت کی پیداوار بڑھائیں         "
            src={require("../../assets/slider2.png")}
          />
          <Slider
            heading="اپنے کھیت کو  مینیج کریں"
            text="ہماری ایپ کے ذریعے اپنے کھیت کی سرگرمیوں کا 
          حساب  کتاب رکھیں"
            src={require("../../assets/slider3.png")}
          />

          <Slider
            heading="اپنے کھیتوں کی نگرانی کریں"
            text="دنیا میں کہیں سے بھی ریئل ٹائم مانیٹرنگ کے ذریعے اپنے کھیت کی صحت پر نظر
        رکھیں"
            src={require("../../assets/slider4.png")}
          />
        </Swiper>
      </View>

      <TouchableOpacity
        onPress={handleNext}
        style={{ alignSelf: "center", padding: 10 }}
      >
        <ActiveButton
          text={currentIndex > 0 ? "آگے بڑھیں" : "اکاؤنٹ  بنائیں"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <BorderButton
          text="میرے پاس پہلے سے اکاؤنٹ ہے"
          color={COLORS.green}
          border={COLORS.grey}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  andViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("90"),
    alignSelf: "center",
    marginTop: hp(5),
  },
  iosViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("90"),
    alignSelf: "center",
  },
});
export default Onboarding;

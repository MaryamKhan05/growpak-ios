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

//internal imports
import { Slider, ActiveButton, BorderButton } from "../engComponents/Index";
import COLORS from "../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = React.createRef();
  const navigation=useNavigation()

  const handleNext = () => {
    if (swiperRef.current && currentIndex <= 2) {
      const nextIndex = currentIndex + 1;
      swiperRef.current.scrollBy(+1);
      setCurrentIndex(nextIndex);
    }
    if (currentIndex == 3) {
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
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/logo03.png")}
            style={{ height: 30, width: 40 }}
            resizeMode="contain"
          />
          <Text
            style={{
              color: COLORS.green,
              fontSize: 21,
              marginHorizontal: hp("1"),
              fontFamily: "PoppinsBold",
            }}
          >
            GrowPak
          </Text>
        </View>
      </View>
      <View
        style={{
          height: hp("70"),
          marginTop: hp(2),
        }}
      >
        <Swiper
          ref={swiperRef}
          loop={false}
          index={0}
          onIndexChanged={(index) => setCurrentIndex(index)}
          activeDotColor={COLORS.orange}
          activeDotStyle={{ padding: hp("0.8"), borderRadius: 50 }}
        >
          <Slider
            heading="Monitor your farm"
            text="Through real time monitoring from anywhere in the world to ensure crop health"
            src={require("../../assets/slider4.png")}
          />
          <Slider
            heading="Manage your farm"
            text="Keep record of your farm activities through our mobile application"
            src={require("../../assets/slider3.png")}
          />
          <Slider
            heading="Satellite analysis"
            text="Monitor your field more effectively through our satellite analysis"
            src={require("../../assets/slider1.png")}
          />
          <Slider
            heading="Reports Analysis"
            text="Increase your crop yield by following the recommendations given in our report"
            src={require("../../assets/slider2.png")}
          />
        </Swiper>
      </View>

      <TouchableOpacity
        onPress={handleNext}
        style={{ alignSelf: "center", padding: 10 }}
      >
        <ActiveButton text={currentIndex > 2 ? "Sign Up" : "Next"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
      >
        <BorderButton
          text="Already Have an Account?"
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
    justifyContent: "",
    width: wp("90"),
    alignSelf: "center",
    marginTop: hp(5),
  },
  iosViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "",
    width: wp("90"),
    alignSelf: "center",
  },
});
export default Onboarding;

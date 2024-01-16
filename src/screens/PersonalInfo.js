import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  ActivityIndicator,
  Platform,
  Modal,
} from "react-native";
import Swiper from "react-native-swiper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import DropDownPicker from "react-native-dropdown-picker";
//internal imports
import COLORS from "../../assets/colors/colors";
import { ActiveButton, DisabledButton } from "../components/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";
import {
  signUp,
  getAllCountries,
  getProvinceByCountry,
  getDistrictByProvince,
  getCityByDistrict,
  clearSignupSuccessMessage,
  clearSignupErrorMessage,
  saveToken,
} from "../redux/action";
import STYLES from "../constants/styles";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  let countriesArray = [{ name: "", id: "" }];
  let provinceArray = [{ name: "", id: "" }];
  let districtArray = [{ name: "", id: "" }];
  let citiesArray = [{ name: "", id: "" }];
  const [currentIndex, setCurrentIndex] = useState(3);
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState(null);
  const [farmer, setFarmer] = useState(false);
  const [agent, setAgent] = useState(false);
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [date, setDate] = useState(new Date(1900, 0, 1));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [pin, setPin] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calledOnce, setCalledOnce] = useState(false);
  const [profession, setProfession] = useState("");
  const [loader, setLoader] = useState(false);
  const [imageModal, setImageModal] = useState(false);

  //country
  const [country, setCountry] = useState("");
  const [openCountry, setOpenCountry] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const [valueCountry, setValueCountry] = useState(null);
  const [itemsCountry, setItemsCountry] = useState([]);
  const [countries, setCountries] = useState([{ name: "", id: "" }]);
  const [countryid, setcountryid] = useState("");

  //province
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [provinceValue, setProvinceValue] = useState([]);
  const [provinceItems, setProvinceItems] = useState([{ name: "", id: "" }]);
  const [provinceid, setProvinceId] = useState("");
  const [selectedProvince, setSelectedProvince] = useState();

  //district
  const [districtOpen, setDistrictOpen] = useState(false);
  const [districtValue, setDistrictValue] = useState([]);
  const [districtItems, setDistrictItems] = useState([{ name: "", id: "" }]);
  const [districtid, setDistrictId] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState();

  //city
  const [cityOpen, setCityOpen] = useState(false);
  const [cityValue, setCityValue] = useState([]);
  const [cityItems, setCityItems] = useState([{ name: "", id: "" }]);
  const [selectedCity, setSelectedCity] = useState();
  const [cityid, setcityid] = useState("");

  const [nameError, setNameError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const countriesresponse = useSelector((state) => state.api.countries.data);
  const provinceresponse = useSelector(
    (state) => state.api.provinces.data?.data
  );

  const districtresponse = useSelector(
    (state) => state.api.district.data?.data
  );

  const cityresponse = useSelector((state) => state.api.city?.data?.data);
  const signupresponse = useSelector(
    (state) => state.api.signup?.data?.data?.data
  );
  // console.log(signupresponse, "res");
  const successMessage = useSelector(
    (state) => state.api.signup?.successMessage
  );

  // console.log(successMessage, "succes Message");
  const errorMessage = useSelector((state) => state.api.signup?.errorMessage);
  // console.log(errorMessage, "errormessaege signup");
  useEffect(() => {
    if (calledOnce == false) {
      getCountryHandler();
      setCalledOnce(true);
    }
    if (countriesresponse) {
      setCalledOnce(true);

      for (let i = 0; i < countriesresponse.data.length; i++) {
        countriesArray.push({
          name: countriesresponse.data[i].countryname,
          id: countriesresponse.data[i].countrycode,
        });
      }
      countriesArray.shift();

      setCountries(countriesArray);
    }
  }, [countriesresponse]);

  useEffect(() => {
    if (countryid) {
      getProvinceByCountryHandler();
    }
  }, [countryid]);

  useEffect(() => {
    if (provinceresponse) {
      for (let i = 0; i < provinceresponse.length; i++) {
        provinceArray.push({
          name: provinceresponse[i].province,
          id: provinceresponse[i].id,
        });
      }
      provinceArray.shift();

      setProvinceItems(provinceArray);
    }
  }, [provinceresponse]);

  useEffect(() => {
    if (provinceid) {
      getDistrictByProvinceHandler(provinceid);
    }
  }, [provinceid]);

  useEffect(() => {
    if (districtresponse) {
      for (let i = 0; i < districtresponse.length; i++) {
        districtArray.push({
          name: districtresponse[i].districtname,
          id: districtresponse[i].districtcode,
        });
      }
      districtArray.shift();

      setDistrictItems(districtArray);
    }
  }, [districtresponse]);

  useEffect(() => {
    if (districtid) {
      getCityByDistrictHandler(districtid);
    }
  }, [districtid]);

  useEffect(() => {
    if (cityresponse) {
      for (let i = 0; i < cityresponse.length; i++) {
        citiesArray.push({
          name: cityresponse[i].name,
          id: cityresponse[i].id,
        });
      }
      citiesArray.shift();

      setCityItems(citiesArray);
    }
  }, [cityresponse]);

  useEffect(() => {
    if (successMessage) {
      let token = signupresponse?.token;
      toast.show(successMessage, {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      dispatch(saveToken(token));
      dispatch(clearSignupSuccessMessage());
      setLoader(false);
    }
    if (errorMessage) {
      toast.show(errorMessage, {
        type: "danger",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      setLoader(false);
      dispatch(clearSignupErrorMessage());
    }
  }, [successMessage, errorMessage]);

  const getDistrictByProvinceHandler = async (id) => {
    dispatch(getDistrictByProvince(id));
  };

  const getCountryHandler = async () => {
    dispatch(getAllCountries());
  };

  const getProvinceByCountryHandler = async () => {
    dispatch(getProvinceByCountry(countryid));
  };

  const getCityByDistrictHandler = async (id) => {
    dispatch(getCityByDistrict(id));
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(currentDate);
    setShow(Platform.OS === "ios"); // Hide the picker on iOS, show it on Android
    setDate(currentDate);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add 1 because months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setDob(formattedDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  // useEffect(() => {
  //   checkImagePermission();
  // }, []);

  const checkImagePermission = async () => {
    let { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(status, "image permission status on personal info urdu screen");

    if (status !== "granted") {
      setImageModal(true);
    } else {
      pickImage();
    }
  };

  const pickImage = async () => {
    setImageModal(false);
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.3,
      base64: true,
    });
    if (!result.canceled) {
      setImage(result.uri);
      setImageBase64(result.base64);
    }
  };

  const PIN_INPUT_COUNT = 4;
  const pinInputs = Array(PIN_INPUT_COUNT).fill(0); // Initialize an array for inputs
  // State to store the entered PIN
  const inputRefs = useRef(pinInputs.map(() => React.createRef())); // Refs for input fields
  const focusNextInput = (currentIndex) => {
    if (currentIndex < PIN_INPUT_COUNT - 1) {
      inputRefs.current[currentIndex + 1].current.focus();
    }
  };

  const focusPreviousInput = (currentIndex) => {
    if (currentIndex > 0) {
      inputRefs.current[currentIndex - 1].current.focus();
    }
  };

  const handleTextInput = (text, currentIndex) => {
    const newPin =
      pin.substring(0, currentIndex) + text + pin.substring(currentIndex + 1);
    setPin(newPin);

    if (text !== "") {
      focusNextInput(currentIndex);
    } else {
      focusPreviousInput(currentIndex);
    }
  };

  const swiperRef = React.createRef();

  const handleNext = () => {
    if (swiperRef.current && currentIndex > 0) {
      const nextIndex = currentIndex - 1; // Decrement the index
      swiperRef.current.scrollBy(-1); // Move to the previous slide
      setCurrentIndex(nextIndex);
    }
  };

  const signUpHandler = async () => {
    const mobilenumber = await AsyncStorage.getItem("Phone");

    if (
      mobilenumber !== "" &&
      name !== "" &&
      countryid !== "" &&
      provinceid !== "" &&
      profession !== "" &&
      districtid !== "" &&
      cityid !== "" &&
      pin !== "" &&
      imageBase64 !== ""
    ) {
      console.log("all required data is provided! ");
      setLoader(true);
      dispatch(
        signUp({
          mobilenumber,
          name,
          gender,
          dob,
          email,
          countryid,
          provinceid,
          profession,
          districtid,
          cityid,
          imageBase64,
          pin,
        })
      );
    } else {
      toast.show("Please Fill All Fields!", {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
    }
  };

  const errorHandler = () => {
    console.log("yes");
    if (!name) {
      setNameError(true);
    }
    // if (!gender) {
    //   setGenderError(true);
    // }
    // if (!dob) {
    //   setDobError(true);
    // }
    if (!image) {
      setImageError(true);
    }
  };

  useEffect(() => {
    if (name) {
      setNameError(false);
    }
    if (image) {
      setImageError(false);
    }
  }, [dob, gender, name, image]);

  const border_color = farmer ? COLORS.green : COLORS.grey;
  const agent_border = agent ? COLORS.green : COLORS.grey;
  const dotStyle =
    Platform.OS == "android" ? styles.androidDotStyle : styles.iosDotStyle;
  const headingText =
    Platform.OS == "android" ? STYLES.swiperTitle : styles.heading;
  const text = styles.text;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Swiper
        ref={swiperRef}
        loop={false}
        index={3}
        onIndexChanged={(index) => setCurrentIndex(index)}
        dotStyle={dotStyle}
        activeDotColor={COLORS.orange}
        activeDotStyle={dotStyle}
      >
        {/** step 4  */}
        <View
          style={{
            alignItems: "center",
            marginTop: hp("10"),
          }}
        >
          <Text style={headingText}>اپنا نیا لاگ ان پن درج کریں </Text>
          <Text
            style={[
              text,
              { color: COLORS.textgrey, textAlign: "center", width: wp("80") },
            ]}
          >
            آپ اپنےگروپاک اکاؤنٹ میں لاگ ان کرنے کے لیے ان 4 ہندسوں کا لاگ ان پن
            استعمال کریں گے
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "70%",
              alignSelf: "center",
              marginVertical: hp("5"),
            }}
          >
            {pinInputs.map((_, index) => (
              <TextInput
                key={index}
                style={{
                  width: wp("15"),
                  height: hp("7"),
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLORS.grey,
                  color: COLORS.black,
                  textAlign: "center",
                  fontSize: hp("4"),
                }}
                keyboardType="number-pad"
                maxLength={1}
                value={pin[index] || ""}
                ref={inputRefs.current[index]}
                onChangeText={(text) => handleTextInput(text, index)}
                secureTextEntry={true}
              />
            ))}
          </View>
          {pin !== "" ? (
            <TouchableOpacity onPress={signUpHandler}>
              <ActiveButton text="آگے بڑھیں" />
            </TouchableOpacity>
          ) : (
            <View
              style={{
                marginTop: hp("2"),
                marginBottom: hp("10"),
              }}
            >
              <DisabledButton text="آگے بڑھیں" />
            </View>
          )}
        </View>

        {/** step 3  */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enableOnAndroid={true}
          scrollEnabled={true}
        >
          <View style={styles.infocontainer}>
            <Text style={headingText}>آپ کہاں رہتے ہیں؟</Text>
            <Text style={[text, { color: COLORS.textgrey }]}>
              اپنی رہائشی معلومات درج کریں
            </Text>
            <Text style={text}> ملک </Text>

            {/** country dropdown */}
            <DropDownPicker
              style={styles.dropdown}
              keyboardShouldPersistTaps="always"
              placeholder="ملک"
              open={country}
              value={valueCountry}
              listMode="MODAL"
              modalProps={{
                animationType: "fade",
              }}
              showArrowIcon={false}
              searchable={true}
              searchTextInputProps={{
                maxLength: 25,
              }}
              searchPlaceholder="Search.."
              loading={
                loading ? (
                  <ActivityIndicator size="large" color={COLORS.green} />
                ) : null
              }
              items={countries.map((index) => ({
                label: index.name,
                value: index.id,
              }))}
              textStyle={{
                fontFamily: "CustomFont",
                color: COLORS.disableBlack,
                fontSize: 18,
                textAlign: "right",
              }}
              setOpen={setCountry}
              setValue={setValueCountry}
              setItems={setItemsCountry}
              onSelectItem={(item) => {
                setcountryid(item.value);
                setSelectedCountry(item.value);
              }}
            />

            {/** province dropdown */}
            <Text style={text}> صوبہ</Text>
            <DropDownPicker
              style={styles.dropdown}
              textStyle={{
                fontFamily: "CustomFont",
                color: COLORS.disableBlack,
                fontSize: 18,
                textAlign: "right",
              }}
              showArrowIcon={false}
              listMode="MODAL"
              placeholder="صوبہ"
              open={provinceOpen}
              value={provinceValue}
              items={provinceItems.map((index) => ({
                label: index.name,
                value: index.id,
              }))}
              setOpen={setProvinceOpen}
              setValue={setProvinceValue}
              onSelectItem={(item) => {
                setProvinceId(item.value);
                setSelectedProvince(item.value);
              }}
            />

            <Text style={text}>ضلع</Text>
            {/** distrcit dropdown */}
            <DropDownPicker
              style={styles.dropdown}
              textStyle={{
                fontFamily: "CustomFont",
                color: COLORS.disableBlack,
                fontSize: 18,
                textAlign: "right",
              }}
              showArrowIcon={false}
              listMode="MODAL"
              placeholder="ضلع"
              open={districtOpen}
              value={districtValue}
              items={districtItems.map((index) => ({
                label: index.name,
                value: index.id,
              }))}
              setOpen={setDistrictOpen}
              setValue={setDistrictValue}
              onSelectItem={(item) => {
                setDistrictId(item.value);
                setSelectedDistrict(item.value);
              }}
              searchable={true}
              searchPlaceholder="Search.."
            />

            <Text style={text}> شہر </Text>

            <DropDownPicker
              style={styles.dropdown}
              textStyle={{
                fontFamily: "CustomFont",
                color: COLORS.disableBlack,
                fontSize: 18,
                textAlign: "right",
              }}
              showArrowIcon={false}
              listMode="MODAL"
              placeholder="شہر"
              open={cityOpen}
              value={cityValue}
              items={cityItems.map((index) => ({
                label: index.name,
                value: index.id,
              }))}
              setOpen={setCityOpen}
              setValue={setCityValue}
              onSelectItem={(item) => {
                setcityid(item.value);
                setSelectedCity(item.value);
              }}
            />

            <View style={{ marginTop: hp("10"), alignSelf: "center" }}>
              {countryid !== "" &&
              provinceid !== "" &&
              districtid !== "" &&
              cityid !== "" ? (
                <TouchableOpacity onPress={handleNext}>
                  <ActiveButton text="آگے بڑھیں   " />
                </TouchableOpacity>
              ) : (
                <DisabledButton text="آگے بڑھیں   " />
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>

        {/** step 2 */}
        <View style={styles.infocontainer}>
          <Text style={headingText}>آپکا پیشہ کیا ہے؟</Text>
          <Text style={[text, { color: COLORS.textgrey }]}>ایک منتخب کریں</Text>
          <View
            style={[
              styles.optionContainer,
              { borderColor: border_color, marginVertical: hp("2") },
            ]}
          >
            <Text style={text}>میں کسان ہوں</Text>
            {/** id of farmer is 4, of agent is 3  */}
            {farmer ? (
              <TouchableOpacity
                onPress={() => {
                  setFarmer(false), setProfession("3");
                }}
              >
                <Fontisto
                  name="radio-btn-active"
                  size={hp("2")}
                  color={COLORS.green}
                  style={styles.icon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setFarmer(true), setAgent(false), setProfession("4");
                }}
              >
                <Fontisto
                  name="radio-btn-passive"
                  size={hp("2")}
                  color={COLORS.grey}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={[styles.optionContainer, { borderColor: agent_border }]}>
            <Text style={text}>میں ایجنٹ ہوں</Text>
            {agent ? (
              <TouchableOpacity
                onPress={() => {
                  setAgent(false), setProfession("4");
                }}
              >
                <Fontisto
                  name="radio-btn-active"
                  size={hp("2")}
                  color={COLORS.green}
                  style={styles.icon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setAgent(true), setFarmer(false), setProfession("3");
                }}
              >
                <Fontisto
                  name="radio-btn-passive"
                  size={hp("2")}
                  color={COLORS.grey}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              marginTop: hp("10"),
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            {agent == true || farmer == true ? (
              <TouchableOpacity onPress={handleNext}>
                <ActiveButton text="آگے بڑھیں   " />
              </TouchableOpacity>
            ) : (
              <DisabledButton text="آگے بڑھیں   " />
            )}
          </View>
        </View>

        {/** step 1 */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enableOnAndroid={true}
          scrollEnabled={true}
        >
          <View style={styles.infocontainer}>
            <Text style={headingText}>ذاتی معلومات</Text>

            <Text style={[text, { color: COLORS.textgrey }]}>
              اپنی تفصیلات درج کریں{" "}
            </Text>

            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={checkImagePermission}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 50,
                    overflow: "hidden",
                  }}
                  resizeMode="cover"
                />
              ) : (
                <FontAwesome5
                  name="user"
                  size={hp("4")}
                  color={COLORS.disableGrey}
                />
              )}
            </TouchableOpacity>

            {imageError && (
              <Text
                style={[styles.error, { textAlign: "center", width: "100%" }]}
              >
                تصویر لگائیں
              </Text>
            )}
            <Text style={text}> آپ کا نام </Text>

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            {nameError && <Text style={styles.error}>نام درج کریں</Text>}
            <Text style={styles.text}> صنف (آپشنل)</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <View style={[styles.genderContainer]}>
                <Text style={styles.radiotext}>مرد </Text>
                {/* gender = 1 => male */}
                {male ? (
                  <TouchableOpacity
                    onPress={() => {
                      setMale(false), setGender("");
                    }}
                  >
                    <Fontisto
                      name="radio-btn-active"
                      size={hp("2")}
                      color={COLORS.green}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setFemale(false), setMale(true), setGender("1");
                    }}
                  >
                    <Fontisto
                      name="radio-btn-passive"
                      size={hp("2")}
                      color={COLORS.grey}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <View style={[styles.genderContainer]}>
                <Text style={styles.radiotext}>عورت</Text>
                {/** id of farmer is 1, of agent is 2  */}
                {female ? (
                  <TouchableOpacity
                    onPress={() => {
                      setMale(false), setGender("");
                    }}
                  >
                    <Fontisto
                      name="radio-btn-active"
                      size={hp("2")}
                      color={COLORS.green}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setFemale(true), setMale(false), setGender("2");
                    }}
                  >
                    <Fontisto
                      name="radio-btn-passive"
                      size={hp("2")}
                      color={COLORS.grey}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Text style={text}>پیدائش (آپشنل)</Text>

            <TouchableOpacity
              style={[
                styles.inputContainer,
                { marginBottom: hp("1"), alignItems: "flex-end" },
              ]}
              onPress={showDatepicker}
            >
              <Text style={{ textAlign: "right", width: "100%" }}>{dob}</Text>
            </TouchableOpacity>

            <View
              style={{
                alignItems: "flex-start",
                width: "100%",
                marginVertical: hp(1),
              }}
            >
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </View>
            <Text style={text}>ای میل(آپشنل)</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <View
              style={{
                marginTop: hp("2"),
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              {/* <Divider /> */}
              {image && name ? (
                <TouchableOpacity onPress={handleNext}>
                  <ActiveButton text="آگے بڑھیں" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={errorHandler}>
                  <DisabledButton text="آگے بڑھیں" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Swiper>

      <Modal animationType="fade" transparent={true} visible={loader}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.overlay,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={COLORS.green} />
        </View>
      </Modal>

      {/* image permission modal */}
      <Modal animationType="fade" visible={imageModal} transparent={true}>
        <View
          style={{
            justifyContent: "center",
            flex: 1,
            backgroundColor: COLORS.overlay,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              // height: hp(20),
              alignItems: "center",
              justifyContent: "center",
              width: wp(80),
            }}
          >
            <Image
              source={require("../../assets/photos.webp")}
              style={styles.photo}
              resizeMode="contain"
            />
            <Text style={styles.locationHeading}>
              GrowPak requires your profile picture for creating your account.
              To use the GrowPak application, please grant access to your
              photos.
            </Text>
            <Text style={styles.locationHeading}>
              You can change this option later in the settings app
            </Text>
            <TouchableOpacity onPress={pickImage} style={styles.locationButton}>
              <Text style={styles.locationButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infocontainer: {
    marginTop: hp("5"),
    alignSelf: "center",
    width: wp("94"),
    alignItems: "flex-end",
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    paddingVertical: 5,
  },
  radiotext: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: hp("1"),
    width: wp("90"),
    borderRadius: 8,
    textAlign: "right",
    fontWeight: "400",
    fontSize: 16,
    marginBottom: hp("1"),
    fontFamily: "CustomFont",
    marginVertical: 5,
  },
  optionContainer: {
    borderWidth: 1,
    borderRadius: hp("5"),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: wp("50"),
  },
  genderContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  icon: {
    marginLeft: hp("1.2"),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: hp("1.5"),
    width: wp("90"),
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationinput: {
    textAlign: "right",
    fontWeight: "400",
    fontSize: 16,
    fontFamily: "CustomFont",
  },
  avatarContainer: {
    alignSelf: "center",
    borderRadius: 50,
    backgroundColor: COLORS.grey,
    padding: hp("0.3"),
    width: wp("23"),
    height: hp("11"),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  dropdown: {
    borderColor: COLORS.grey,
    width: wp("90"),
    alignSelf: "center",
    alignItems: "center",
  },
  androidDotStyle: {
    width: wp("12"),
    marginTop: hp("-176"),
  },
  iosDotStyle: {
    width: wp("12"),
    marginTop: hp("-168"),
  },
  error: {
    color: "red",
    fontSize: 14,
    fontWeight: "400",
  },
  locationButtonRow: {
    flexDirection: "row",
    gap: 10,
  },
  locationImage: {
    height: hp(30),
    width: wp(70),
    borderRadius: 10,
    overflow: "hidden",
  },
  locationHeading: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    margin: 10,
    textAlign: "center",
  },
  locationButton: {
    backgroundColor: COLORS.disableGrey,
    padding: 15,
    width: wp(70),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
  },
  locationButtonText: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
  images: {
    alignItems: "center",
    margin: 10,
    backgroundColor: "#fec4dc",
  },
  photo: {
    height: hp(40),
    width: wp(90),
  },
});

export default PersonalInfo;

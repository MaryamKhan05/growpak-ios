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
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
//internal imports
import COLORS from "../../../assets/colors/colors";
import { ActiveButton, DisabledButton } from "../../engComponents/Index";

import {
  signUp,
  getAllCountries,
  getProvinceByCountry,
  getDistrictByProvince,
  getCityByDistrict,
  clearSignupSuccessMessage,
  clearSignupErrorMessage,
  saveToken,
} from "../../redux/action";
import STYLES from "../../constants/styles";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  let countriesArray = [{ name: "", id: "" }];
  let provinceArray = [{ name: "", id: "" }];
  let districtArray = [{ name: "", id: "" }];
  let citiesArray = [{ name: "", id: "" }];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState(null);
  const [farmer, setFarmer] = useState(false);
  const [agent, setAgent] = useState(false);
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [date, setDate] = useState(new Date(2024, 0, 1));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [pin, setPin] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calledOnce, setCalledOnce] = useState(false);
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState();
  const [loader, setLoader] = useState(false);
  const [imageModal, setImageModal] = useState(false);

  //country
  const [country, setCountry] = useState("");
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

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CELL_COUNT = 4;

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
  console.log(signupresponse, "res");
  const successMessage = useSelector(
    (state) => state.api.signup?.successMessage
  );

  console.log(successMessage, "succes Message");
  const errorMessage = useSelector((state) => state.api.signup?.errorMessage);
  console.log(errorMessage, "errormessaege signup");
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

 

  const checkImagePermission = async () => {
    let { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(status, "image permission status on personal info urdu screen");

    if (status !== "granted") {
      setImageModal(true);
    }else{
      pickImage()
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
    if (swiperRef.current && currentIndex < 3) {
      const nextIndex = currentIndex + 1;
      swiperRef.current.scrollBy(+1);
      setCurrentIndex(nextIndex);
    }
  };

  const signUpHandler = async () => {
    const mobilenumber = await AsyncStorage.getItem("Phone");

    if (
      mobilenumber &&
      name &&
      gender &&
      dob &&
      countryid &&
      provinceid &&
      profession &&
      districtid &&
      cityid &&
      value &&
      image
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
          pin: value,
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
      console.log(
        mobilenumber,
        name,
        gender,
        dob,
        countryid,
        provinceid,
        profession,
        districtid,
        cityid,
        image,
        value
      );
    }
  };

  const errorHandler = () => {
    console.log("yes");
    if (!name) {
      setNameError(true);
    }
    if (!gender) {
      setGenderError(true);
    }
    if (!dob) {
      setDobError(true);
    }
    if (!image) {
      setImageError(true);
    }
  };

  useEffect(() => {
    if (name) {
      setNameError(false);
    }
    if (gender) {
      setGenderError(false);
    }
    if (dob) {
      setDobError(false);
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Swiper
        ref={swiperRef}
        loop={false}
        index={0}
        onIndexChanged={(index) => setCurrentIndex(index)}
        dotStyle={dotStyle}
        activeDotColor={COLORS.orange}
        activeDotStyle={dotStyle}
      >
        {/** step 1 */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enableOnAndroid={true}
          scrollEnabled={true}
        >
          <View style={styles.infocontainer}>
            <Text style={styles.headingText}>Personal Information</Text>

            <Text style={[styles.text, { color: COLORS.textgrey }]}>
              Enter your details
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
                Image is required
              </Text>
            )}
            <Text style={styles.text}> Name</Text>

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            {nameError && <Text style={styles.error}>Name is required</Text>}
            <Text style={styles.text}> Gender </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
                alignItems: "center",
              }}
            >
              <View style={[styles.genderContainer]}>
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
                <Text style={styles.radiotext}>Male </Text>
                {/* gender = 1 => male */}
              </View>

              <View style={[styles.genderContainer]}>
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
                <Text style={styles.radiotext}>Female</Text>
                {/** id of farmer is 1, of agent is 2  */}
              </View>
            </View>
            {genderError && (
              <Text style={styles.error}>Gender is required</Text>
            )}
            <Text style={styles.text}>Date of Birth </Text>

            <TouchableOpacity
              style={[styles.inputContainer, { marginBottom: hp("1") }]}
              onPress={showDatepicker}
            >
              <Text style={{  width: "100%" }}>{dob}</Text>
            </TouchableOpacity>
            {dobError && (
              <Text style={styles.error}>Date of Birth is required</Text>
            )}
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
            <Text style={styles.text}>Email (Optional)</Text>
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
              {image && name && dob && gender ? (
                <TouchableOpacity onPress={handleNext}>
                  <ActiveButton text="Next" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={errorHandler}>
                  <DisabledButton text="Next" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/** step 2 */}
        <View style={styles.infocontainer}>
          <Text style={styles.headingText}> What is your profession?</Text>
          <Text style={[styles.text, { color: COLORS.textgrey, left: 10 }]}>
            Select One
          </Text>
          <View
            style={[
              styles.optionContainer,
              { borderColor: border_color, marginVertical: hp("2") },
            ]}
          >
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
            <Text style={styles.text}>Farmer</Text>
            {/** id of farmer is 4, of agent is 3  */}
          </View>
          <View style={[styles.optionContainer, { borderColor: agent_border }]}>
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
            <Text style={styles.text}>Agent</Text>
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
                <ActiveButton text="Next" />
              </TouchableOpacity>
            ) : (
              <DisabledButton text="Next" />
            )}
          </View>
        </View>
        {/** step 3  */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enableOnAndroid={true}
          scrollEnabled={true}
        >
          <View style={styles.infocontainer}>
            <Text style={styles.headingText}>Where do you live?</Text>
            <Text style={[styles.text, { color: COLORS.textgrey }]}>
              Enter your residential informations
            </Text>
            <Text style={styles.text}> Country </Text>

            {/** country dropdown */}
            <DropDownPicker
              style={styles.dropdown}
              keyboardShouldPersistTaps="always"
              placeholder="Country"
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
                fontFamily: "PoppinsRegular",
                color: COLORS.disableBlack,
                fontSize: 12,
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
            <Text style={styles.text}> Province</Text>
            <DropDownPicker
              style={styles.dropdown}
              textStyle={{
                fontFamily: "PoppinsRegular",
                color: COLORS.disableBlack,
                fontSize: 12,
              }}
              showArrowIcon={false}
              listMode="MODAL"
              placeholder="Province"
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

            <Text style={styles.text}> District</Text>
            {/** distrcit dropdown */}
            <DropDownPicker
              style={styles.dropdown}
              textStyle={{
                fontFamily: "PoppinsRegular",
                color: COLORS.disableBlack,
                fontSize: 12,
              }}
              showArrowIcon={false}
              listMode="MODAL"
              placeholder="District"
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

            <Text style={styles.text}> City </Text>

            <DropDownPicker
              style={styles.dropdown}
              textStyle={{
                fontFamily: "PoppinsRegular",
                color: COLORS.disableBlack,
                fontSize: 12,
              }}
              showArrowIcon={false}
              listMode="MODAL"
              placeholder="City"
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
                  <ActiveButton text="Next" />
                </TouchableOpacity>
              ) : (
                <DisabledButton text="Next" />
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/** step 4  */}
        <View
          style={{
            alignItems: "center",
            marginTop: hp("10"),
          }}
        >
          <Text style={styles.headingText}>Enter Your Login Pin</Text>
          <Text
            style={[
              styles.text,
              { color: COLORS.textgrey, textAlign: "center", width: wp("80") },
            ]}
          >
            Enter a 4 Digit Pin to login to GrowPak
          </Text>

          <View style={styles.root}>
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || isFocused ? value[index] : null}
                </Text>
              )}
            />
          </View>

          {value !== "" ? (
            <TouchableOpacity
              onPress={signUpHandler}
              style={{
                marginTop: hp("2"),
                marginBottom: hp("10"),
              }}
            >
              <ActiveButton text="Next" />
            </TouchableOpacity>
          ) : (
            <View
              style={{
                marginTop: hp("2"),
                marginBottom: hp("10"),
              }}
            >
              <DisabledButton text="Next" />
            </View>
          )}
        </View>
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
              source={require("../../../assets/photos.webp")}
              style={styles.photo}
              resizeMode="contain"
            />
            <Text style={styles.locationHeading}>
              GrowPak requires your profile picture for creating your account.
              To use the GrowPak application, please grant access to your photos
              to upload your profile picture.
            </Text>
            <View style={styles.locationButtonRow}>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.locationButton}
              >
                <Text style={styles.locationButtonText}>Allow</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setImageModal(false)}
                style={styles.locationButton}
              >
                <Text style={styles.locationButtonText}>Maybe Later</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { paddingHorizontal: 60, paddingVertical: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: wp(15),
    height: hp(7),
    lineHeight: 50,
    fontSize: 24,
    textAlign: "center",
    borderRadius: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: COLORS.grey,
  },
  focusCell: {
    borderColor: COLORS.green,
  },
  infocontainer: {
    marginTop: hp("5"),
    alignSelf: "center",
    width: wp("94"),
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    fontFamily: "CustomFont",
  },
  text: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    marginVertical: hp(1),
  },
  radiotext: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: hp("1"),
    width: wp("90"),
    borderRadius: 8,
    fontWeight: "400",
    fontSize: 12,
    marginBottom: hp("1"),
    fontFamily: "PoppinsRegular",
    marginVertical: 5,
  },
  optionContainer: {
    borderWidth: 1,
    borderRadius: hp("5"),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: wp(35),
  },
  genderContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  icon: {
    marginRight: hp("1.2"),
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
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  dropdown: {
    borderColor: COLORS.grey,
    width: wp(93),
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
    fontSize: 12,
    fontFamily: "PoppinsRegular",
  },
  headingText: {
    fontFamily: "PoppinsBold",
    fontSize: 22,
    marginTop: hp(12),
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
    padding: 10,
    width: wp(30),
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

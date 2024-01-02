import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Modal,
} from "react-native";
import { TextInput } from "react-native-paper";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import {  useNavigation } from "@react-navigation/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import DropDownPicker from "react-native-dropdown-picker";

//internal imports
import COLORS from "../../../assets/colors/colors";
import { ActiveButton, DisabledButton } from "../../engComponents/Index";

import {
  getAllCountries,
  getProvinceByCountry,
  getDistrictByProvince,
  getCityByDistrict,
  getCountryCode,
  addFarmer,
  clearFarmerSuccessMessage,
  clearFarmerErrorMessage,
  clearCityData,
  clearDistrictData,
  clearProvinceData,
} from "../../redux/action";
import STYLES from "../../constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Farmer = () => {
  const dispatch = useDispatch();
    const navigation = useNavigation();
  const toast = useToast();
  let countriesArray = [{ name: "", id: "" }];
  let provinceArray = [{ name: "", id: "" }];
  let districtArray = [{ name: "", id: "" }];
  let citiesArray = [{ name: "", id: "" }];
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState(null);
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [calledOnce, setCalledOnce] = useState(false);
  const [phone, setPhone] = useState(null);

  const codeArray = [{ code: "", len: "" }];
  const [codeItems, setCodeItems] = useState([{ name: "", id: "" }]);
  const [selectedCode, setSelectedCode] = useState();
  const [phonelen, setPhoneLen] = useState();
  const [token, setToken] = useState();

  //country
  const [country, setCountry] = useState("");
  const [valueCountry, setValueCountry] = useState(null);
  const [itemsCountry, setItemsCountry] = useState([]);
  const [countries, setCountries] = useState([{ name: "", id: "" }]);
  const [countryid, setcountryid] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();

  //province
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [provinceValue, setProvinceValue] = useState(null);
  const [provinceItems, setProvinceItems] = useState([{ name: "", id: "" }]);
  const [provinceid, setProvinceId] = useState("");
  const [selectedProvince, setSelectedProvince] = useState();

  //district
  const [districtOpen, setDistrictOpen] = useState(false);
  const [districtValue, setDistrictValue] = useState(null);
  const [districtItems, setDistrictItems] = useState([{ name: "", id: "" }]);
  const [districtid, setDistrictId] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState();

  //city
  const [cityOpen, setCityOpen] = useState(false);
  const [cityValue, setCityValue] = useState(null);
  const [cityItems, setCityItems] = useState([{ name: "", id: "" }]);
  const [selectedCity, setSelectedCity] = useState();
  const [cityid, setcityid] = useState("");
  const [loader, setLoader] = useState(false);

  //error state

  const [nameError, setNameError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [provinceError, setProvinceError] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const coderesponse = useSelector(
    (state) => state.api.code?.data?.countryPhoneData
  );

  const countriesresponse = useSelector((state) => state.api.countries.data);
  const provinceresponse = useSelector(
    (state) => state.api.provinces.data?.data
  );

  const districtresponse = useSelector(
    (state) => state.api.district.data?.data
  );

  const cityresponse = useSelector((state) => state.api.city?.data?.data);

  const addFarmerResponse = useSelector(
    (state) => state.api.addFarmer?.status_code
  );
  console.log("addFarmerResponse", addFarmerResponse);

  let errorMessage = useSelector((state) => state.api.addFarmer?.errorMessage);

  let successMessage = useSelector(
    (state) => state.api.addFarmer?.successMessage
  );

  useEffect(() => {
    if (successMessage) {
      setLoader(false);
      toast.show(successMessage, {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      dispatch(clearFarmerSuccessMessage());
      dispatch(clearCityData());
      dispatch(clearDistrictData());
      dispatch(clearProvinceData());
        navigation.goBack();
    }

    if (errorMessage) {
      setLoader(false);
      toast.show(errorMessage, {
        type: "danger",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      dispatch(clearFarmerErrorMessage());
      dispatch(clearCityData());
      dispatch(clearDistrictData());
      dispatch(clearProvinceData());
    }
  }, [errorMessage, successMessage, dispatch]);

  useEffect(() => {
    getTokenHandler();
  }, []);

  const getTokenHandler = async () => {
    try {
      const TOKEN = await AsyncStorage.getItem("token");
      setToken(TOKEN);
    } catch (e) {
      console.log("error getting token on farmer screen", e);
    }
  };

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
    if (selectedCode) {
      setPhone("");
      setPhoneLen(codeItems.filter((x) => x.name == selectedCode)[0].id);
    }
  }, [selectedCode]);
  const getCountryCodeHandler = async () => {
    dispatch(getCountryCode());
  };
  useEffect(() => {
    if (!calledOnce) {
      setCalledOnce(true);
      getCountryCodeHandler();
    }
    if (coderesponse) {
      for (let i = 0; i < coderesponse.length; i++) {
        codeArray.push({
          name: coderesponse[i].country,
          id: coderesponse[i].phoneLength,
        });
      }
      codeArray.shift();

      setCodeItems(codeArray);
    }
  }, [coderesponse]);

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
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
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

  const pickImage = async () => {
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

  const addFarmerHandler = () => {
  
    setLoader(true);
    dispatch(
      addFarmer({
        phone,
        email,
        name,
        imageBase64,
        gender,
        countryid,
        provinceid,
        districtid,
        cityid,
        dob,
        token,
      })
    );
  };

  useEffect(() => {
    console.log(valueCountry, "country");
    console.log(districtValue, "district value");
    console.log(provinceValue, "provinceValue");
    console.log(cityValue, "city");
  }, [valueCountry, districtValue, provinceValue, cityValue]);

  const errorHandler = () => {

    if (!name) {
      setNameError(true);
    }
    if (!phone) {
      setPhoneError(true);
    }
    if (!gender) {
      setGenderError(true);
    }
    if (!dob) {
      setDobError(true);
    }
    if (!valueCountry) {
      setCountryError(true);
    }
    if (!provinceValue) {
      setProvinceError(true);
    }
    if (!cityValue) {
      setCityError(true);
    }
    if (!districtValue) {
      setDistrictError(true);
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
    if (valueCountry) {
      setCountryError(false);
    }
    if (provinceValue) {
      setProvinceError(false);
    }
    if (cityValue) {
      setCityError(false);
    }
    if (districtValue) {
      setDistrictError(false);
    }
    if (image) {
      setImageError(false);
    }
    if (phone) {
      setPhoneError(false);
    }
  }, [
    name,
    gender,
    dob,
    country,
    provinceValue,
    cityValue,
    districtValue,
    image,
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enableOnAndroid={true}
        scrollEnabled={true}
      >
        <View style={styles.infocontainer}>
          <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
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

          {imageError && <Text style={styles.error}>Upload Image</Text>}
          <Text style={styles.text}>Farmer's Name</Text>
          <TextInput
            style={styles.textInput}
            placeholderTextColor={"grey"}
            underlineColor="transparent"
            value={name}
            onChangeText={(text) => setName(text)}
          />

          {nameError && <Text style={styles.error}> Name is required </Text>}

          <Text style={styles.text}> Farmer's Mobile No.</Text>
          <TextInput
            placeholder=""
            style={styles.textInput}
            placeholderTextColor={"grey"}
            underlineColor="transparent"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            keyboardType="number-pad"
            maxLength={11}
          />
          {phoneError && (
            <Text style={styles.error}> Mobile no. is required</Text>
          )}
          <Text style={styles.text}> Gender </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
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
          {genderError && <Text style={styles.error}> Gender is required</Text>}
          <Text style={styles.text}>Farmer's Date of Birth</Text>

          <TouchableOpacity
            style={[
              styles.inputContainer,
              { marginBottom: hp("1"), alignItems: "flex-end" },
            ]}
            onPress={showDatepicker}
          >
            <Text style={{ width: "100%" }}>{dob}</Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: "flex-start",
              width: "100%",
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
          {dobError ? (
            <Text style={styles.error}>Date of birth is required</Text>
          ) : null}
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
          {countryError && (
            <Text style={styles.error}>Country is required</Text>
          )}
          {/** province dropdown */}
          <Text style={styles.text}>Province</Text>
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
          {provinceError && (
            <Text style={styles.error}>Province is required</Text>
          )}
          <Text style={styles.text}>District</Text>
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
          {districtError && (
            <Text style={styles.error}>District is required</Text>
          )}
          <Text style={styles.text}>City</Text>

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

          {cityError && <Text style={styles.error}>City is required</Text>}
          <Text style={styles.text}>Email (Optional)</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
            placeholderTextColor={"grey"}
            underlineColor="transparent"
          />
          <View style={styles.button}>
            {image &&
            name &&
            gender &&
            dob &&
            valueCountry &&
            districtValue &&
            cityValue &&
            provinceValue &&
            phone ? (
              <TouchableOpacity onPress={addFarmerHandler}>
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
      {/* </ScrollView> */}

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
    </View>
  );
};

const styles = StyleSheet.create({
  infocontainer: {
    marginTop: hp("5"),
    alignSelf: "center",
    width: wp("94"),
    height: "100%",
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    fontFamily: "PoppinsRegular",
  },
  text: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    marginTop: hp(3),
    marginHorizontal: hp(1.3),
  },
  radiotext: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
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
    marginRight: hp("1.2"),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: hp("1.6"),
    width: wp("90"),
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    height:hp(6)
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
  inputparentcontainer: {
    marginVertical: hp("1"),
    marginBottom: 10,
    marginRight: hp("1"),
  },
  button: {
    marginTop: hp(3),
    marginBottom: hp(10),
  },
  error: {
    color: "red",
    fontSize: 10,
    fontFamily: "PoppinsRegular",
    marginHorizontal: hp(1),
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    width: wp(90),
    alignSelf: "center",
    backgroundColor: "white",
    fontSize: 14,
    height: hp(6),
  },
});
export default Farmer;

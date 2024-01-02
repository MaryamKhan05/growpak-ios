//  IN THIS CODE COUNTRY REPRESENTS CROP
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import COLORS from "../../../assets/colors/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

//internal imports
import { ActiveButton, DisabledButton } from "../../engComponents/Index";
import {
  clearFarmErrorMessage,
  clearFarmSuccessMessage,
  createNewFarm,
  getAllCrops,
  getFarmerByAgentId,
} from "../../redux/action";
import STYLES from "../../constants/styles";

const FarmDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const toast = useToast();

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const [country, setCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();
  const [valueCountry, setValueCountry] = useState(null);
  const [itemsCountry, setItemsCountry] = useState([]);
  const [countries, setCountries] = useState([{ name: "", id: "" }]);
  const [countryid, setcountryid] = useState("");
  let countriesArray = [{ name: "", id: "" }];
  const [loader, setLoader] = useState(false);

  let farmerArray = [{ name: "", id: "", image: "" }];
  const [farmer, setFarmer] = useState("");
  const [valueFarmer, setValueFarmer] = useState(null);
  const [itemsFarmer, setItemsFarmer] = useState([]);
  const [farmers, setFarmers] = useState([{ name: "", id: "", image: "" }]);
  const [farmerId, setFarmerId] = useState("");

  const [variety, setVariety] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [sowDate, setSowDate] = useState("");
  const [reapDate, setReapDate] = useState("");
  const [mendmentDate1, setMendmentDate1] = useState(); //mendment==> کھاد
  const [mendmentName1, setMendmentName1] = useState();
  const [mendmentDate2, setMendmentDate2] = useState();
  const [mendmentName2, setMendmentName2] = useState();
  const [farmImage, setFarmImage] = useState();
  const [farmBase64, setFarmBase64] = useState();
  const [area, setArea] = useState();
  const [date, setDate] = useState(new Date(2024, 0, 1));
  const [mode, setMode] = useState("date");
  const [status, setStatus] = useState();

  const [reapShow, setReapShow] = useState(false);
  const [firstMendmentShow, setFirstMendmentShow] = useState(false);
  const [secondMendmentShow, setSecondMendmentShow] = useState(false);
  const [sowShow, setSowShow] = useState(false);
  const [type, setType] = useState();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageValue, setLanguageValue] = useState(null);
  const [items, setItems] = useState([
    { label: "English", value: "eng" },
    { label: "Urdu", value: "ur" },
  ]);
  const geolocationresponse = useSelector(
    (state) => state.api.geolocation?.data
  );
  const countryresponse = useSelector((state) => state.api.crops?.data);
  const farmerresponse = useSelector((state) => state.api.farmers?.data?.data);
  let error = useSelector((state) => state.api.newFarm?.errorMessage);
  let successMessage = useSelector(
    (state) => state.api.newFarm?.successMessage
  );

  console.log(error, "error message");
  console.log(successMessage, "success message");

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
      dispatch(clearFarmSuccessMessage());
      navigation.navigate("Farm");
    }

    if (error) {
      setLoader(false);
      toast.show(error, {
        type: "danger",
        placement: "bottom",
        duration: 5000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      dispatch(clearFarmErrorMessage());
      navigation.navigate("Farm");
    }
  }, [error, successMessage, dispatch]);

  useEffect(() => {
    if (geolocationresponse) {
      const city = geolocationresponse.address_components[0].long_name;
      const province = geolocationresponse.address_components[2].long_name;

      setCity(city);
      setProvince(province);
    }
  }, [geolocationresponse]);

  const getTypeHandler = async () => {
    try {
      let usertype = await AsyncStorage.getItem("type");
      let typ = JSON.parse(usertype);
      setType(typ);
    } catch (e) {
      console.log("error getting type from storage on home", e);
    }
  };

  useEffect(() => {
    dispatch(getAllCrops());
    dispatch(getFarmerByAgentId());
    getTypeHandler();
  }, []);
  useEffect(() => {
    if (route.params) {
      const uri = route.params;
      setFarmImage(uri);
      uriToBase64(uri);
      getAreaHandler();
    }
  }, []);

  const getAreaHandler = async () => {
    const AREA = await AsyncStorage.getItem("Area");
    const a = JSON.parse(AREA);
    setArea(a);
  };
  const uriToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setFarmBase64(base64);
    } catch (error) {
      console.error("Error converting URI to Base64:", error);
      return null;
    }
  };

  useEffect(() => {
    if (countryresponse) {
      for (let i = 0; i < countryresponse.data.length; i++) {
        countriesArray.push({
          name: countryresponse.data[i].name,
          id: countryresponse.data[i].id,
        });
      }
      countriesArray.shift();

      setCountries(countriesArray);
    }
  }, [countryresponse]);
  useEffect(() => {
    if (farmerresponse) {
      for (let i = 0; i < farmerresponse.length; i++) {
        farmerArray.push({
          name: farmerresponse[i].name,
          id: farmerresponse[i].uid,
          image: farmerresponse[i].image,
        });
      }
      farmerArray.shift();
      setFarmers(farmerArray);
    }
  }, [farmerresponse]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (reapShow) {
      setReapShow(Platform.OS === "ios");
    } else if (firstMendmentShow) {
      setFirstMendmentShow(Platform.OS === "ios");
    } else if (secondMendmentShow) {
      setSecondMendmentShow(Platform.OS === "ios");
    } else {
      setSowShow(Platform.OS === "ios");
    }

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    console.log(formattedDate, "farm details");
    if (reapShow) {
      setReapDate(formattedDate);
    } else if (firstMendmentShow) {
      setMendmentDate1(formattedDate);
    } else if (secondMendmentShow) {
      setMendmentDate2(formattedDate);
    } else {
      setSowDate(formattedDate);
    }
    setReapShow(false);
    setFirstMendmentShow(false);
    setSecondMendmentShow(false);
    setSowShow(false);
  };

  const showMode = (currentMode, type) => {
    if (type === "reap") {
      setReapShow(true);
    } else if (type === "firstmendment") {
      setFirstMendmentShow(true);
    } else if (type === "secondmendment") {
      setSecondMendmentShow(true);
    } else {
      setSowShow(true);
    }
  };

  const showDatepicker = (type) => {
    showMode("date", type);
  };

  const createFarmHandler = async () => {
    setLoader(true);
    const coords = await AsyncStorage.getItem("coords");
    const COORDS = JSON.parse(coords);
    const userId = await AsyncStorage.getItem("userId");
    
    dispatch(
      createNewFarm({
        name,
        countryid,
        variety,
        city,
        province,
        reapDate,
        mendmentDate1,
        mendmentDate2,
        mendmentName1,
        mendmentName2,
        farmBase64,
        COORDS,
        farmerId: type == "3" ? farmerId : userId,
        sowDate,
        languageValue
      })
    );
    setStatus(200);
  };
  const textInput =
    Platform.OS == "android" ? styles.androidInput : styles.textInput;
  return (
    <View style={styles.container}>
      {/* header */}


      {/* body */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enableOnAndroid={true}
          scrollEnabled={true}
        >
          <View style={styles.body}>
            <Image
              source={{ uri: farmImage }}
              style={styles.snapshot}
              resizeMode="cover"
            />
            <Text style={styles.text}>Farm Name</Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={textInput}
              placeholderTextColor={"grey"}
              underlineColor="transparent"
            />
            {type == "3" ? (
              <View>
                <Text style={styles.text}>Farmer Name</Text>
                <DropDownPicker
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.grey,
                    width: wp(91),
                    borderRadius: 8,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "center",
                  }}
                  keyboardShouldPersistTaps="always"
                  placeholder="Farmer"
                  open={farmer}
                  value={valueFarmer}
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
                  items={farmers.map((index) => ({
                    label: index.name,
                    value: index.id,
                  }))}
                  textStyle={{
                    fontFamily: "PoppinsRegular",
                    color: COLORS.disableBlack,
                    fontSize: 12,
                  }}
                  setOpen={setFarmer}
                  setValue={setValueFarmer}
                  setItems={setItemsFarmer}
                  onSelectItem={(item) => {
                    console.log(item.value);
                    setFarmerId(item.value);
                  }}
                />
              </View>
            ) : null}

            <Text style={styles.text}>Crop</Text>

            <DropDownPicker
              style={{
                borderWidth: 1,
                borderColor: COLORS.grey,
                width: wp(91),
                borderRadius: 8,
                alignSelf: "center",
              }}
              keyboardShouldPersistTaps="always"
              placeholder="Crop"
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

            <Text style={styles.text}>Variety</Text>
            <TextInput
              value={variety}
              onChangeText={(text) => setVariety(text)}
              style={textInput}
              placeholderTextColor={"grey"}
              underlineColor="transparent"
            />
            <Text style={styles.text}>Report Preferred Language</Text>
            <DropDownPicker
              open={languageOpen}
              value={languageValue}
              items={items}
              setOpen={setLanguageOpen}
              setValue={setLanguageValue}
              setItems={setItems}
              placeholder={"Choose Language"}
              style={{
                borderWidth: 1,
                borderColor: COLORS.grey,
                width: wp(91),
                borderRadius: 8,
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
              }}
              textStyle={{
                fontFamily: "PoppinsRegular",
                color: COLORS.disableBlack,
                fontSize: 12,
              }}
            />
            <Text style={styles.text}>City or Village</Text>
            <TextInput
              placeholder="City or Village"
              value={city}
              style={textInput}
              placeholderTextColor={"grey"}
              underlineColor="transparent"
              editable={false}
            />
            <Text style={styles.text}>Province</Text>
            <TextInput
              placeholder="Province"
              value={province}
              style={textInput}
              placeholderTextColor={"grey"}
              underlineColor="transparent"
              editable={false}
            />
            <Text style={styles.text}>Sowing Date</Text>
            <TouchableOpacity
              style={[
                styles.inputContainer,
                { marginBottom: hp("1"), alignItems: "flex-end" },
              ]}
              onPress={() => showDatepicker("")}
            >
              <Text style={{ width: "100%" }}>{sowDate}</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              {sowShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                  accentColor={"green"}
                  textColor={"red"}
                />
              )}
            </View>
            <Text style={styles.text}>Harvesting Date (Optional)</Text>
            <TouchableOpacity
              style={[
                styles.inputContainer,
                { marginBottom: hp("1"), alignItems: "flex-end" },
              ]}
              onPress={() => showDatepicker("reap")}
            >
              <Text style={{ width: "100%" }}>{reapDate}</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              {reapShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </View>

            <Text style={styles.text}>
              First Fertilizer Application Date (Optional)
            </Text>

            <TouchableOpacity
              style={[
                styles.inputContainer,
                { marginBottom: hp("1"), alignItems: "flex-end" },
              ]}
              onPress={() => showDatepicker("firstmendment")}
            >
              <Text style={{ width: "100%" }}>{mendmentDate1}</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              {firstMendmentShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </View>

            <Text style={styles.text}>First Fertilizer Name (Optional)</Text>
            <TextInput
              value={mendmentName1}
              onChangeText={(text) => setMendmentName1(text)}
              style={textInput}
              placeholderTextColor={"grey"}
              underlineColor="transparent"
            />
            <Text style={styles.text}>
              Second Fertilizer Application Date (Optional)
            </Text>
            <TouchableOpacity
              style={[
                styles.inputContainer,
                { marginBottom: hp("1"), alignItems: "flex-end" },
              ]}
              onPress={() => showDatepicker("secondmendment")}
            >
              <Text style={{ width: "100%" }}>{mendmentDate2}</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              {secondMendmentShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </View>

            <Text style={styles.text}>Second Fertilizer Name (Optional)</Text>
            <TextInput
              value={mendmentName2}
              onChangeText={(text) => setMendmentName2(text)}
              style={textInput}
              placeholderTextColor={"grey"}
              underlineColor="transparent"
            />
          </View>

          <View style={{ marginTop: hp(3), marginBottom: hp(5) }}>
            {name !== "" &&
            country !== "" &&
            variety !== "" &&
            city !== "" &&
            province !== "" &&
            sowDate !== "" ? (
              <TouchableOpacity onPress={createFarmHandler}>
                <ActiveButton text="Next" />
              </TouchableOpacity>
            ) : (
              <DisabledButton text="Next" />
            )}
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
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
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    fontFamily: "PoppinsRegular",
    width: wp(90),
    alignSelf: "center",
    backgroundColor: "white",
    fontSize: 12,
    height: hp(6),
  },
  androidInput: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    fontFamily: "PoppinsRegular",
    width: hp(45),
    alignSelf: "center",
    backgroundColor: "white",
    fontSize: 12,
    height: hp(6),
  },
  text: {
    fontFamily: "PoppinsMedium",
    fontSize: 12,
    marginVertical: 5,
    marginLeft: hp(1),
    marginTop:hp(3)
  },
  body: {
    width: "95%",
    alignSelf: "center",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: hp(1.5),
    width: wp(91),
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginVertical: hp(1),
    height:hp(6)
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  snapshot: {
    height: hp(15),
    width: wp(25),
    marginTop: 15,
    alignSelf: "center",
    borderRadius: 4,
  },
});

export default FarmDetails;

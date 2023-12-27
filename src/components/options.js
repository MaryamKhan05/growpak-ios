import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../assets/colors/colors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { delFarmByFarmId } from "../redux/action";

const Options = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [serviceModal, setServiceModal] = useState(false);
  const id = useSelector((state) => state.api.saveFarmId?.data);
  

  const deleteFarm = () => {
    let fid = id[0];
    dispatch(delFarmByFarmId(fid));
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setServiceModal(true)}>
        <Entypo
          name="dots-three-vertical"
          size={hp(2.5)}
          color={COLORS.white}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/*dots modal */}
      <Modal animationType="fade" transparent={true} visible={serviceModal}>
        <TouchableWithoutFeedback onPress={() => setServiceModal(false)}>
          <View style={styles.serviceCenteredView}>
            <View style={styles.serviceModalView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  width: "70%",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.serviceIconContainer}
                    onPress={() =>
                      navigation.navigate("FarmDuplication", {
                        name: id[1],
                        area: id[2],
                      })
                    }
                  >
                    <Feather name="copy" size={hp(3)} color={COLORS.black} />
                  </TouchableOpacity>
                  <Text style={styles.modalText}> کاپی کریں </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.serviceIconContainer}
                    onPress={deleteFarm}
                  >
                    <Feather name="trash-2" size={hp(3)} color="red" />
                  </TouchableOpacity>
                  <Text style={[styles.modalText, { color: "red" }]}>
                    ڈلیٹ کریں{" "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: hp(1),
  },
  serviceCenteredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  dotCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  dotModalView: {
    backgroundColor: "white",
    paddingVertical: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    borderRadius: 15,
  },
  serviceModalView: {
    backgroundColor: "white",
    paddingVertical: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    borderRadius: 15,
  },
  dotCrossContainer: {
    backgroundColor: COLORS.textgrey,
    borderRadius: 50,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalheading: {
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: "CustomFont",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "CustomFont",
    textAlign: "center",
    textAlign: "center",
  },
  dotIconContainer: {
    borderWidth: 1,
    borderColor: COLORS.disableGrey,
    borderRadius: 50,
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp(1),
  },
  serviceIconContainer: {
    borderWidth: 1,
    borderColor: COLORS.disableGrey,
    borderRadius: 50,
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp(1),
  },
});

export default Options;
